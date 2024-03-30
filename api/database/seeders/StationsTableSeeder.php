<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Station;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class StationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $stationName = 'Station_' . uniqid();

            $openingTime = rand(6, 10) . ':00';
            $closingTime = rand(16, 20) . ':00';
            $isActive = (bool) rand(0, 1);

            $station = new Station();
            $station->name = $stationName;
            $station->location = $user->location;
            $station->opening_time = $openingTime;
            $station->closing_time = $closingTime;
            $station->active = $isActive;
            $station->branch_id = $user->id;
            $station->save();
        }
    }
}
