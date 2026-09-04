<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class BookingReceived extends Mailable
{
    public function __construct(public Booking $booking) {}

    public function envelope(): Envelope
    {
        $service = $this->booking->service;
        $subject = $service
            ? "Новая заявка: {$service} — Тойота33"
            : 'Новая заявка с сайта Тойота33';

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-received',
            text: 'emails.booking-received-text',
        );
    }
}
