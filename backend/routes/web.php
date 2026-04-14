<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', ['tab' => 'chats']);
    })->name('dashboard');

    Route::get('/dashboard/bookings', function () {
        return Inertia::render('Dashboard', ['tab' => 'bookings']);
    })->name('bookings');

    Route::get('/dashboard/clients', function (Illuminate\Http\Request $request) {
        return Inertia::render('Dashboard', [
            'tab' => 'clients'
        ]);
    })->name('clients');

    Route::get('/dashboard/clients/create', function () {
        return Inertia::render('Clients/Create');
    })->name('clients.create');

    Route::get('/dashboard/prompt', function () {
        return Inertia::render('Dashboard', ['tab' => 'prompt']);
    })->name('prompt');
});

Route::get('/admin', function () {
    return redirect('/dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
