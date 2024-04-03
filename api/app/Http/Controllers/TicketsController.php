<?php

namespace App\Http\Controllers;

use App\Models\Ride;
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
        $ride = Ride::where('id', $req->rideId)->first();
        $ticket_price = $ride->price * $req->count;

        if ($user->coins_balance >= $ticket_price) {
            $ticket = Ticket::create([
                'user_id' => $user->id,
                'departure_ride_id' => $req->rideId,
                'return_ride_id' => $req->return_ride_id,
                'price' => $ticket_price,
            ]);

            $user_db = User::find($user->id);
            $user_db->coins_balance = $user_db->coins_balance - $ticket_price;
            $user_db->save();

            return response()->json(['message' => 'Ticket created successfully.', 'ticket' => $ticket], 201);
        }

        return response()->json(['message' => 'Not enough coins.'], 400);
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
