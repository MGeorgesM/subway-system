<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\User;

class TicketsController extends Controller
{
    public function get_all_tickets()
    {
        $ticket = Ticket::all();
        return response()->json(['ticket' => $ticket], 200);
    }


    
    public function get_tickets($id)
    {
        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        return response()->json(['ticket' => $ticket], 200);
    }



    public function create_ticket(Request $req)
    {

        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = auth()->user();

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


}
