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

        $review = Review::create([
            'user_id' => $request->user_id,
            'ride_id' => $request->ride_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json(['message' => 'Review added successfully', 'review' => $review], 201);
    }

    public function getPassengerReviews($userId)
    {
        $reviews = Review::where('user_id', $userId)->get();

        return response()->json(['reviews' => $reviews], 200);
    }
}
