<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ride;

class RidesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ride = new Ride();
        $ride->name = 'Ride A';
        $ride->start_station_id = '1';
        $ride->end_station_id = '2';
        $ride->start_time = '08:00';
        $ride->end_time = '18:00';
        $ride->save();

        $ride = new Ride();
        $ride->name = 'Ride B';
        $ride->start_station_id = '1';
        $ride->end_station_id = '2';
        $ride->start_time = '10:00';
        $ride->end_time = '12:00';
        $ride->save();

        $ride = new Ride();
        $ride->name = 'Ride C';
        $ride->start_station_id = '1';
        $ride->end_station_id = '3';
        $ride->start_time = '08:00';
        $ride->end_time = '10:00';
        $ride->save();

        $ride = new Ride();
        $ride->name = 'Ride A';
        $ride->start_station_id = '3';
        $ride->end_station_id = '5';
        $ride->start_time = '14:00';
        $ride->end_time = '15:00';
        $ride->save();

        $ride = new Ride();
        $ride->name = 'Ride A';
        $ride->start_station_id = '4';
        $ride->end_station_id = '1';
        $ride->start_time = '12:30';
        $ride->end_time = '13:50';
        $ride->save();
    }
}
