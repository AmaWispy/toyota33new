<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmartCaptchaVerifier
{
    public function verify(?string $token, ?string $ip): bool
    {
        $secret = (string) config('services.smartcaptcha.secret');

        if ($secret === '') {
            if (app()->isProduction()) {
                Log::error('YANDEX_SMARTCAPTCHA_SECRET is not set');

                return false;
            }

            Log::warning('SmartCaptcha skipped: no server key in local .env');

            return true;
        }

        if (! is_string($token) || $token === '') {
            return false;
        }

        try {
            $response = Http::asForm()
                ->timeout(8)
                ->post('https://smartcaptcha.cloud.yandex.ru/validate', [
                    'secret' => $secret,
                    'token' => $token,
                    'ip' => $ip,
                ]);

            // Yandex: treat transport errors as pass so users are not blocked.
            if (! $response->successful()) {
                Log::warning('SmartCaptcha HTTP error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return true;
            }

            return $response->json('status') === 'ok';
        } catch (\Throwable $e) {
            Log::warning('SmartCaptcha request failed', ['error' => $e->getMessage()]);

            return true;
        }
    }
}
