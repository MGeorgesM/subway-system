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
        $rides = [];
        $numberOfRides = 30;
        $stations = [
            'Beirut Central Station',
            'Jounieh Express',
            'Zgharta Transit Hub',
            'Saida South Station',
            'Tripoli Central Depot',
            'Baalbek Transit Center',
            'Tyre Terminal',
            'Byblos Junction',
            'Nabatieh Transfer Point',
            'Aley Stop',
        ];

        for ($i = 0; $i < $numberOfRides; $i++) {
            $startStationIndex = rand(0, count($stations) - 1);
            $endStationIndex = rand(0, count($stations) - 1);

            while ($startStationIndex === $endStationIndex) {
                $endStationIndex = rand(0, count($stations) - 1);
            }

            $rideName = 'Ride ' . rand(1, 999);

            $price = rand(10, 100);
            $lastDigit = substr($price, -1);
            if ($lastDigit != 0 && $lastDigit != 9) {
                $price = floor($price / 10) * 10 + (rand(0, 1) ? 0 : 9);
            }

            $rides[] = [
                'name' => $rideName,
                'start_station_id' => $startStationIndex + 1,
                'end_station_id' => $endStationIndex + 1,
                'start_time' => now()->addDays(rand(0, 30))->addHours(rand(0, 23))->addMinutes(rand(0, 59))->format('Y-m-d H:i:s'),
                'end_time' => now()->addDays(rand(0, 30))->addHours(rand(0, 23))->addMinutes(rand(0, 59))->format('Y-m-d H:i:s'),
                'price' => $price,
            ];
        }

        foreach ($rides as $ride) {
            Ride::create($ride);
        }
    }
}
