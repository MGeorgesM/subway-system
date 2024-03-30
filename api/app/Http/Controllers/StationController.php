<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Station;
use App\Models\User;

class StationController extends Controller
{
    // Get all stations
    public function get_all_stations()
    {
        $stations = Station::all();
        return response()->json(['stations' => $stations], 200);
    }

    // Get a single station by ID
    public function get_stations($id)
    {
        $station = Station::find($id);

        if (!$station) {
            return response()->json(['message' => 'Station not found'], 404);
        }

        return response()->json(['station' => $station], 200);
    }

    // Create a station
    public function create_station(Request $req)
    {
        $req->validate([
            // 'branch_id' => 'required'
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
        

        return response()->json(['message' => 'Unauthorized. User role: ' . $user->role_id], 401);
    }


    
    // Update the station
    public function update_station(Request $req, $id)
    {
    $station = Station::find($id);
    
    if (!$station) {
        return response()->json(['message' => 'Station not found'], 404);
    }
    
    $user = auth()->user();
    if (!$user || $user->role_id !== 3) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }
    
    $req->validate([
        'name' => 'required|string|max:255',
        'location' => 'required|string|max:255',
        'opening_time' => 'required|date_format:H:i',
        'closing_time' => 'required|date_format:H:i|after:opening_time',
    ]);
    
    $station->update([
        'name' => $req->name,
        'location' => $req->location,
        'opening_time' => $req->opening_time,
        'closing_time' => $req->closing_time,
    ]);
    
    return response()->json(['message' => 'Station updated successfully'], 200);
    }


    
    // Delete a station
    public function delete_station($id)
{
    $station = Station::find($id);

    if (!$station) {
        return response()->json(['message' => 'Station not found'], 404);
    }

    $user = auth()->user();
    if (!$user || $user->role_id !== 3) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    $station->delete();
    return response()->json(['message' => 'Station deleted successfully'], 200);
}
}
