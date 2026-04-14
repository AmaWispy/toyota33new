<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Client;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        // Bot protection: Honeypot
        if ($request->filled('website')) {
            return response()->json(['error' => 'Bot detected'], 422);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'service' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ]);

        $booking = Booking::create($validated);

        // Автоматически создаем или обновляем клиента
        Client::updateOrCreate(
            ['phone' => $validated['phone']],
            [
                'name' => $validated['name'],
                'email' => $validated['email'] ?? null,
            ]
        );

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
}
