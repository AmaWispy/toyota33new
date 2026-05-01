<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Models\SystemPrompt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

class ChatController extends Controller
{
    private function getChatSessionId(Request $request)
    {
        // Try to get from header first (for frontend widget)
        $sessionId = $request->header('X-Chat-Session-Id');
        
        if (!$sessionId) {
            // Fallback to Laravel session (for admin panel or if not provided)
            $sessionId = Session::getId();
        }
        
        return $sessionId;
    }

    public function getHistory(Request $request)
    {
        $sessionId = $this->getChatSessionId($request);
        $messages = ChatMessage::where('session_id', $sessionId)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function sendMessage(Request $request)
    {
        // Bot protection: Honeypot
        if ($request->filled('website')) {
            return response()->json(['error' => 'Bot detected'], 422);
        }

        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $sessionId = $this->getChatSessionId($request);
        $userMessage = $request->input('message');

        // Save user message
        ChatMessage::create([
            'session_id' => $sessionId,
            'role' => 'user',
            'content' => $userMessage,
        ]);

        // Get last 12 messages for context
        $history = ChatMessage::where('session_id', $sessionId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get()
            ->reverse()
            ->map(function ($msg) {
                return [
                    'role' => $msg->role,
                    'content' => $msg->content,
                ];
            })
            ->toArray();

        // Load system prompt from database
        $systemPromptModel = SystemPrompt::latest()->first();
        $systemPrompt = $systemPromptModel ? $systemPromptModel->content : "Ты — консультант официального чата автосервиса «тойота33».";

        $payload = [
            'messages' => array_merge([
                ['role' => 'system', 'content' => $systemPrompt]
            ], $history),
            'temperature' => 0.1,
            'max_tokens' => 2000,
            'stream' => false
        ];

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('services.timeweb_ai.token'),
                'Content-Type' => 'application/json',
            ])
            ->withoutVerifying()
            ->post(config('services.timeweb_ai.url'), $payload);

            if ($response->successful()) {
                $aiData = $response->json();
                $aiContent = $aiData['choices'][0]['message']['content'] ?? '';

                // Save assistant message
                ChatMessage::create([
                    'session_id' => $sessionId,
                    'role' => 'assistant',
                    'content' => $aiContent,
                ]);

                return response()->json([
                    'role' => 'assistant',
                    'content' => $aiContent,
                ]);
            }

            return response()->json(['error' => 'AI API error'], 500);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getSystemPrompt()
    {
        $prompt = SystemPrompt::latest()->first();
        return response()->json($prompt);
    }

    public function updateSystemPrompt(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $prompt = SystemPrompt::create([
            'content' => $request->input('content'),
        ]);

        return response()->json($prompt);
    }

    public function getAllChats()
    {
        $chats = ChatMessage::select('session_id')
            ->selectRaw('MAX(created_at) as last_activity_at')
            ->groupBy('session_id')
            ->orderBy('last_activity_at', 'desc')
            ->get()
            ->map(function ($chat) {
                // Находим последнее сообщение именно от пользователя
                $lastUserMessage = ChatMessage::where('session_id', $chat->session_id)
                    ->where('role', 'user')
                    ->orderBy('created_at', 'desc')
                    ->first();
                
                // Если сообщений от пользователя нет (маловероятно), берем любое последнее
                if (!$lastUserMessage) {
                    $lastUserMessage = ChatMessage::where('session_id', $chat->session_id)
                        ->orderBy('created_at', 'desc')
                        ->first();
                }
                
                return [
                    'session_id' => $chat->session_id,
                    'last_message' => $lastUserMessage->content,
                    'last_message_role' => $lastUserMessage->role,
                    'last_message_at' => $chat->last_activity_at,
                ];
            });

        return response()->json($chats);
    }

    public function getChatBySession($sessionId)
    {
        $messages = ChatMessage::where('session_id', $sessionId)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }
}
