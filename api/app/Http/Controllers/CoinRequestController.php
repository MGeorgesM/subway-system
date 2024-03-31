<?php

namespace App\Http\Controllers;
use App\Models\CoinsRequest;
use Illuminate\Http\Request;

class CoinRequestController extends Controller
{
    public function requestCoin(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:1',
        ]);

        $coinRequest = CoinsRequest::create([ // Update model name here
            'user_id' => $request->user_id,
            'amount' => $request->amount,
            'status' => 'pending', // Initial status is pending
        ]);

        return response()->json([
            'message' => 'Coin request created successfully',
            'coin_request' => $coinRequest
        ], 201);
    }

    public function viewRequests()
    {
        $coinRequests = CoinsRequest::all(); // Update model name here

        return response()->json([
            'message' => 'List of all coin requests',
            'coin_requests' => $coinRequests
        ], 200);
    }

    public function acceptRequest($id)
    {
        $coinRequest = CoinsRequest::find($id); // Update model name here
        
        if (!$coinRequest) {
            return response()->json([
                'message' => 'Coin request not found',
            ], 404);
        }

        $coinRequest->update(['status' => 'approved']);

        return response()->json([
            'message' => 'Coin request accepted',
            'coin_request' => $coinRequest
        ], 200);
    }

    public function discardRequest($id)
    {
        $coinRequest = CoinsRequest::find($id); // Update model name here

        if (!$coinRequest) {
            return response()->json([
                'message' => 'Coin request not found',
            ], 404);
        }

        $coinRequest->update(['status' => 'rejected']);

        return response()->json([
            'message' => 'Coin request discarded',
            'coin_request' => $coinRequest
        ], 200);
    }

    public function userRequests($userId)
    {
        $coinRequests = CoinsRequest::where('user_id', $userId)->get(); // Update model name here

        return response()->json([
            'message' => 'User coin requests',
            'coin_requests' => $coinRequests
        ], 200);
    }
}
