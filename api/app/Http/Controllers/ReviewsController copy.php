<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Ride;
use App\Models\Station;
use App\Models\Ticket;
use Illuminate\Http\Request;

class ReviewsController extends Controller
{
    public function addReviews(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string',
            'ride_id' => 'required_without:station_id|exists:rides,id',
            'station_id' => 'required_without:ride_id|exists:stations,id',
        ]);

        // Check if the user is aboard the specified ride
        // $isPassenger = // Implement logic to check if the user is aboard the ride
        // if (!$isPassenger) {
        //     return response()->json(['error' => 'You are not a passenger on this ride.'], 403);
        // }

        if ($request->has('ride_id')) {
            $ride_id = $request->ride_id;
            $user_id = $request->user_id;

            $ticket = Ticket::where('ride_id', $ride_id)->where('user_id', $user_id)->where('activated', true)->first();
            if (!$ticket) {
                return response()->json(['error' => 'You are not a passenger on this ride.'], 403);
            } else {
                $ride = Ride::find($ride_id);
                $reviewed = 'ride';
                $reviewed_id = $ride_id;
            }
        } elseif ($request->has('station_id')) {
            $reviewed = 'station';
            $reviewed_id = $request->station_id;
        } else {
            return response()->json(['error' => 'You must provide either ride_id or station_id.'], 400);
        }

        $review = Review::create([
            'user_id' => $request->user_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            "{$reviewed}_id" => $reviewed_id,
        ]);
    }

    public function getPassengerReviews($userId)
    {
        // Retrieve all reviews for a specific user
        $reviews = Review::where('user_id', $userId)->get();

        return response()->json(['reviews' => $reviews], 200);
    }

    public function getAverageRating(Request $request)
    {
        $request->validate([
            'rideId' => 'nullable|exists:rides,id',
            'stationId' => 'nullable|exists:stations,id',
        ]);

        $rideId = $request->query('rideId');
        $stationId = $request->query('stationId');

        if (!$rideId && !$stationId) {
            return response()->json(['error' => 'Either rideId or stationId must be provided'], 400);
        }

        $rideRating = $rideId ? Review::where('ride_id', $rideId)->avg('rating') : null;
        $stationRating = $stationId ? Review::where('station_id', $stationId)->avg('rating') : null;

        return response()->json([
            'ride_rating' => $rideRating,
            'station_rating' => $stationRating,
        ], 200);
    }
}
