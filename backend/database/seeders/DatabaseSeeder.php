<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\SystemPrompt;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Создание администратора
        $adminEmail = 'admin@toyota.ameliq.ru';
        $adminPassword = 'password'; // 32 символа

        User::updateOrCreate(
            ['email' => $adminEmail],
            [
                'name' => 'Administrator',
                'password' => Hash::make($adminPassword),
            ]
        );
    }
}
