<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Station;

class StationController extends Controller
{
    public function create_station(Request $req)
    {

        $req->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'opening_time' => 'required|date_format:H:i',
            'closing_time' => 'required|date_format:H:i|after:opening_time',
        ]);

        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $token_user_id = auth()->user()->id;
        $user = User::find($token_user_id);

        if ($user->role_id === 2) {
            $station = Station::create([
                'branch_id' => $req->branch_id,
                'name' => $req->name,
                'location' => $req->location,
                'opening_time' => $req->opening_time,
                'closing_time' => $req->closing_time,
            ]);
            return response()->json(['station' => $station], 201);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
