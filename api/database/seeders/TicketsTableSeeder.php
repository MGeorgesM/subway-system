<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ticket;
use App\Models\User;
use App\Models\Ride;

class TicketsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
 public function run(): void
    {
        $userIds = [1, 2, 3];
        $rideIds = [1, 2, 3, 4];

        foreach ($userIds as $userId) {
            foreach ($rideIds as $rideId) {

                $user = User::find($userId);
                $departureRide = Ride::find($rideId);

                $ticket = new Ticket();
                $ticket->user_id = $userId;
                $ticket->departure_ride_id = $rideId;
                $ticket->return_ride_id = $rideId;
                $ticket->price = 20;
                $ticket->activated = 0;
                $ticket->save();
            }
        }
    }
}
