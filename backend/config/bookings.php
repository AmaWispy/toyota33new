<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Booking notification recipient
    |--------------------------------------------------------------------------
    |
    | New site bookings are emailed here. Change BOOKING_NOTIFY_EMAIL in .env
    | (then `php artisan config:clear` on the server if config is cached).
    |
    */

    'notify_email' => env('BOOKING_NOTIFY_EMAIL'),

    'limits' => [
        'name' => ['min' => 2, 'max' => 80],
        'phone' => ['min' => 10, 'max' => 32],
        'email' => ['max' => 255],
        'contact_other' => ['min' => 2, 'max' => 120],
        'service' => ['max' => 80],
        'message' => ['max' => 1500],
    ],

    /*
    | If these substrings appear in the form (case-insensitive), the request
    | is treated as spam: nothing is saved and no email is sent.
    */
    'spam_markers' => [
        'http',
        '://',
        't.me',
    ],

];
