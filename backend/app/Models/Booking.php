<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'name',
        'contact_method',
        'phone',
        'email',
        'contact_other',
        'service',
        'message',
        'status',
        'is_read',
    ];

    public function contactMethodLabel(): string
    {
        return match ($this->contact_method) {
            'max' => 'Макс',
            'email' => 'Email',
            'other' => 'Другое',
            default => 'Телефон',
        };
    }

    public function contactDisplay(): string
    {
        return match ($this->contact_method) {
            'email' => (string) $this->email,
            'other' => (string) $this->contact_other,
            default => (string) $this->phone,
        };
    }
}
