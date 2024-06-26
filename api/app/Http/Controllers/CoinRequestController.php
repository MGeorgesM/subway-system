<?php

namespace App\Http\Controllers;
use App\Models\CoinsRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CoinRequestController extends Controller
{
    public function requestCoin(Request $request)
    {
        $user = Auth::user();
        
        if ($user) {
            $request->validate([
                'amount' => 'required|numeric|min:1',
            ]);
    
            $coinRequest = CoinsRequest::create([
                'user_id' => $user->id,
                'amount' => $request->amount,
                'status' => 'pending',
            ]);
    
            return response()->json([
                'message' => 'Coin request created successfully',
                'coin_request' => $coinRequest
            ], 200);
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }

    public function viewRequests()
    {
        $coinRequests = CoinsRequest::with('user')->get(); // Update model name here

        return response()->json([
            'message' => 'List of all coin requests',
            'coin_requests' => $coinRequests
        ], 200);
    }

    public function acceptRequest($id)
{
    $coinRequest = CoinsRequest::find($id);

    if (!$coinRequest) {
        return response()->json([
            'error' => 'Coin request not found',
        ], 404);
    }

    if ($coinRequest->status === 'approved') {
        return response()->json([
            'error' => 'Coin request has already been approved',
        ], 400);
    }

    $coinRequest->update(['status' => 'approved']);

    $user = User::find($coinRequest->user_id);

    if (!$user) {
        return response()->json([
            'error' => 'User not found for this coin request',
        ], 404);
    }

    $user->increment('coins_balance', $coinRequest->amount);

    return response()->json([
        'message' => 'Coin request accepted',
        'coin_request' => $coinRequest,
    ], 200);
}

    public function discardRequest($id)
    {
        $coinRequest = CoinsRequest::find($id);

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
        $coinRequests = CoinsRequest::where('user_id', $userId)->get();

        return response()->json([
            'message' => 'User coin requests',
            'coin_requests' => $coinRequests
        ], 200);
    }
}
