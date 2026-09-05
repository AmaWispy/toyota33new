<?php

namespace App\Http\Controllers;

use App\Mail\BookingReceived;
use App\Models\Booking;
use App\Models\Client;
use App\Services\SmartCaptchaVerifier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class BookingController extends Controller
{
    private const MIN_FORM_SECONDS = 3;
    private const MAX_FORM_SECONDS = 3600; // 1 hour

    public function store(Request $request)
    {
        // Bot protection: Honeypot (must stay empty)
        if ($request->filled('company_fax')) {
            return response()->json(['error' => 'Bot detected'], 422);
        }

        // Bot protection: reject instant / stale submissions
        $formTs = $request->input('form_ts');
        if (! is_numeric($formTs)) {
            return response()->json(['error' => 'Invalid form token'], 422);
        }

        $elapsed = time() - (int) $formTs;
        if ($elapsed < self::MIN_FORM_SECONDS || $elapsed > self::MAX_FORM_SECONDS) {
            return response()->json(['error' => 'Invalid form token'], 422);
        }

        $captchaOk = app(SmartCaptchaVerifier::class)->verify(
            $request->input('smart_token'),
            $request->ip(),
        );
        if (! $captchaOk) {
            return response()->json([
                'error' => 'Подтвердите, что вы не робот.',
                'code' => 'captcha',
            ], 422);
        }

        $limits = config('bookings.limits');
        $method = $request->input('contact_method', 'phone');

        $request->merge([
            'phone' => in_array($method, ['phone', 'max'], true) ? $request->input('phone') : null,
            'email' => $method === 'email' ? $request->input('email') : null,
            'contact_other' => $method === 'other' ? $request->input('contact_other') : null,
        ]);

        $validated = $request->validate([
            'name' => 'required|string|min:'.$limits['name']['min'].'|max:'.$limits['name']['max'],
            'contact_method' => 'required|in:phone,max,email,other',
            'phone' => [
                Rule::requiredIf(in_array($method, ['phone', 'max'], true)),
                'nullable',
                'string',
                'min:'.$limits['phone']['min'],
                'max:'.$limits['phone']['max'],
            ],
            'email' => [
                Rule::requiredIf($method === 'email'),
                'nullable',
                'email',
                'max:'.$limits['email']['max'],
            ],
            'contact_other' => [
                Rule::requiredIf($method === 'other'),
                'nullable',
                'string',
                'min:'.$limits['contact_other']['min'],
                'max:'.$limits['contact_other']['max'],
            ],
            'service' => 'nullable|string|max:'.$limits['service']['max'],
            'message' => 'nullable|string|max:'.$limits['message']['max'],
        ]);

        $validated['phone'] = in_array($validated['contact_method'], ['phone', 'max'], true)
            ? ($validated['phone'] ?? '')
            : '';
        $validated['email'] = $validated['contact_method'] === 'email'
            ? ($validated['email'] ?? null)
            : null;
        $validated['contact_other'] = $validated['contact_method'] === 'other'
            ? ($validated['contact_other'] ?? null)
            : null;

        if ($this->containsSpamLinks($validated)) {
            Log::info('Booking rejected as spam', [
                'ip' => $request->ip(),
                'name' => $validated['name'],
            ]);

            return response()->json([
                'error' => 'Ссылки в заявке запрещены. Уберите адреса вида http, t.me и отправьте заявку без них.',
                'code' => 'spam_links',
            ], 422);
        }

        $booking = Booking::create($validated);

        if (! empty($validated['phone'])) {
            Client::updateOrCreate(
                ['phone' => $validated['phone']],
                [
                    'name' => $validated['name'],
                    'email' => $validated['email'] ?? null,
                ]
            );
        }

        $notifyTo = config('bookings.notify_email');
        if ($notifyTo) {
            try {
                Mail::to($notifyTo)->send(new BookingReceived($booking));
            } catch (\Throwable $e) {
                Log::error('Failed to send booking email', [
                    'booking_id' => $booking->id,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        return response()->json($booking, 201);
    }

    public function index()
    {
        return response()->json(Booking::orderBy('created_at', 'desc')->get());
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:new,in_progress,completed,cancelled',
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update(['status' => $request->input('status')]);

        return response()->json($booking);
    }

    public function markAsRead($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->update(['is_read' => true]);

        return response()->json($booking);
    }

    /**
     * @param  array<string, mixed>  $fields
     */
    private function containsSpamLinks(array $fields): bool
    {
        $haystack = mb_strtolower(implode(' ', array_filter([
            $fields['name'] ?? null,
            $fields['email'] ?? null,
            $fields['contact_other'] ?? null,
            $fields['service'] ?? null,
            $fields['message'] ?? null,
        ], fn ($value) => is_string($value) && $value !== '')));

        foreach (config('bookings.spam_markers', []) as $marker) {
            if ($marker !== '' && str_contains($haystack, mb_strtolower((string) $marker))) {
                return true;
            }
        }

        return false;
    }
}
