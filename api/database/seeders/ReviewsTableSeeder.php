<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Review;

class ReviewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stationIds = range(1, 11);
        $userIds = [1, 2, 3];
        $stationReviews = [];

        foreach ($stationIds as $stationId) {
            foreach ($userIds as $userId) {
                $stationReviews[] = [
                    'user_id' => $userId,
                    'station_id' => $stationId,
                    'rating' => rand(1, 5),
                    'comment' => 'This station is great!',
                    'created_at' => now(),
                ];
            }
        }

        $rideIds = range(1, 30);
        $rideReviews = [];

        foreach ($rideIds as $rideId) {
            foreach ($userIds as $userId) {
                $rideReviews[] = [
                    'user_id' => $userId,
                    'ride_id' => $rideId,
                    'rating' => rand(1, 5),
                    'comment' => 'This ride was amazing!',
                    'created_at' => now(),
                ];
            }
        }

        foreach ($stationReviews as $stationReview) {
            Review::create($stationReview);
        }

        foreach ($rideReviews as $rideReview) {
            Review::create($rideReview);
        }
    }
}
