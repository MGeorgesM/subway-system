<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ride;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class RidesController extends Controller
{
    public function get_all_rides()
    {
        $rides = Ride::all();
        return response()->json(['rides' => $rides], 200);
    }

    public function get_rides($id)
    {
        $rides = Ride::find($id);

        if(!$rides){
            return response()->json(['message' => 'Ride does not exist'], 404);
        }


        return response()->json(['rides' => $rides], 200);
    }

    public function create_rides(Request $req)
    {
        $req->validate([
            'name' => 'required|string|max:255',
            'start_station_id' => 'required|integer|exists:stations,id',
            'end_station_id' => 'required|integer|exists:stations,id|different:start_station_id',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $user = Auth::user();

        if ($user && $user->role_id === 2) {
            $$ride = Ride::create([
                'name' => $req->name,
                'start_station_id' => $req->start_station_id,
                'end_station_id' => $req->end_station_id,
                'start_time' => $req->start_time,
                'end_time' => $req->end_time,
            ]);
            return response()->json(['message' => 'Ride created successfully', 'ride' => $ride], 201);
        }
    
        return response()->json(['message' => 'Unauthorized'], 401);
    }
        
}
