<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewsController extends Controller
{
    public function addReviews(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'ride_id' => 'required|exists:rides,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string',
        ]);

        // Check if the user is aboard the specified ride
        // $isPassenger = // Implement logic to check if the user is aboard the ride
        // if (!$isPassenger) {
        //     return response()->json(['error' => 'You are not a passenger on this ride.'], 403);
        // }

        $review = Review::create([
            'user_id' => $request->user_id,
            'ride_id' => $request->ride_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'created_at' => now(),
        ]);

        return response()->json(['message' => 'Review added successfully', 'review' => $review], 201);
    }

    public function getPassengerReviews($userId)
    {
        // Retrieve all reviews for a specific user
        $reviews = Review::where('user_id', $userId)->get();

        return response()->json(['reviews' => $reviews], 200);
    }
}
