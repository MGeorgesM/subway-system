<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\User;
use App\Models\Station;

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

        if ($user->role_id === 1) {
            $ticket = Ticket::create([
                'user_id' => $user->id,
                'departure_ride_id' => $req->departure_ride_id,
                'return_ride_id' => $req->return_ride_id,
                'price' => $req->price,
                'activated' => $req->activated,
            ]);
            return response()->json(['ticket' => 'Ticket created successfully.', $ticket], 201);
        }

        return response()->json(['message' => 'Unauthorized. User role: ' . $user->role_id], 401);
    }





    public function update_ticket(Request $request, $id)
{
    if (!auth()->check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    $user = auth()->user();

    if ($user->role_id !== 2) {
        return response()->json(['message' => 'Unauthorized. User role: ' . $user->role_id], 401);
    }

    $ticket = Ticket::find($id);

    if (!$ticket) {
        return response()->json(['message' => 'Ticket not found'], 404);
    }

    $ticket->activated = $request->activated;
    $ticket->save();

    return response()->json(['ticket' => 'Ticket activated status updated successfully.', 'data' => $ticket], 200);
}
}
