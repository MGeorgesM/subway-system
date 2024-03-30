<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;

class ChatsController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $chat = Chat::create([
            'sender_id' => $request->sender_id,
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        return response()->json([
            'message' => 'Message sent successfully',
            'chat' => $chat,
        ], 201);
    }

    public function getSentChats($userId)
    {
        $user = User::findOrFail($userId);
        $sentChats = $user->sentChats()->with('receiver')->get();

        return response()->json([
            'message' => 'Sent chats retrieved successfully',
            'sent_chats' => $sentChats,
        ], 200);
    }

    public function getReceivedChats($userId)
    {
        $user = User::findOrFail($userId);
        $receivedChats = $user->receivedChats()->with('sender')->get();

        return response()->json([
            'message' => 'Received chats retrieved successfully',
            'received_chats' => $receivedChats,
        ], 200);
    }
}
