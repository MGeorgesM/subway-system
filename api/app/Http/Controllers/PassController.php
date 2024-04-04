<?php

namespace App\Http\Controllers;

use App\Models\Pass;
use Illuminate\Http\Request;
use App\Models\User;

class PassController extends Controller
{
    public function get(Request $request)
    {
        $id = $request->id;
        $pass = Pass::find($id);


        if ($pass == null) {
            return response()->json(['message' => 'Pass not found'], 404);
        }

        return response()->json($pass);
    }

    public function add()
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = auth()->user();

        if ($user->coins_balance < 100) {
            return response()->json(['message' => 'Insufficient coins'], 403);
        }

        $user_db = User::find($user->id);
        $user_db->coins_balance = $user_db->coins_balance - 100;
        $user_db->save();

        $pass = Pass::create([
            'user_id' => $user->id,
        ]);

        return response()->json($pass, 201);
    }

    public function update(Request $request)
    {
        $pass_id = $request->id;
        $pass = Pass::find($pass_id);

        if ($pass == null) {
            return response()->json(['message' => 'Pass not found'], 404);
        }

        if ($pass->remaining == 0) {
            return response()->json(['message' => 'No passes remaining'], 403);
        }

        $pass->remaining = $pass->remaining - 1;
        $pass->save();
        return response()->json($pass);
    }
}
