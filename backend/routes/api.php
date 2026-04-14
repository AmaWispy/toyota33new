<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::middleware('web')->group(function () {
    Route::get('/chat/history', [ChatController::class, 'getHistory']);
    Route::post('/chat/send', [ChatController::class, 'sendMessage'])->middleware('throttle:10,1');
    
    // Бронирования (Заявки) с лимитом 1 в минуту
    Route::post('/bookings', [\App\Http\Controllers\BookingController::class, 'store'])->middleware('throttle:1,1');
    
    // Админские маршруты
    Route::get('/admin/chats', [ChatController::class, 'getAllChats']);
    Route::get('/admin/chats/{sessionId}', [ChatController::class, 'getChatBySession']);
    Route::get('/admin/prompt', [ChatController::class, 'getSystemPrompt']);
    Route::post('/admin/prompt', [ChatController::class, 'updateSystemPrompt']);
    Route::get('/admin/bookings', [\App\Http\Controllers\BookingController::class, 'index']);
    Route::patch('/admin/bookings/{id}/status', [\App\Http\Controllers\BookingController::class, 'updateStatus']);
    Route::patch('/admin/bookings/{id}/read', [\App\Http\Controllers\BookingController::class, 'markAsRead']);
    
    // Клиенты
    Route::get('/admin/clients', [\App\Http\Controllers\ClientController::class, 'index']);
    Route::post('/admin/clients', [\App\Http\Controllers\ClientController::class, 'store']);
    Route::patch('/admin/clients/{id}', [\App\Http\Controllers\ClientController::class, 'update']);
    Route::delete('/admin/clients/{id}', [\App\Http\Controllers\ClientController::class, 'destroy']);
});
