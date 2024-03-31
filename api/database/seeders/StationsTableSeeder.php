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
        $stations = [
            [
                'name' => 'Beirut Central Station',
                'location' => 'Beirut, Lebanon',
                'lat' => 33.8938,
                'lng' => 35.5018,
                'opening_time' => '06:00:00',
                'closing_time' => '22:00:00',
            ],
            [
                'name' => 'Jounieh Express',
                'location' => 'Jounieh, Lebanon',
                'lat' => 33.9803,
                'lng' => 35.6188,
                'opening_time' => '07:00:00',
                'closing_time' => '20:00:00',
            ],
            [
                'name' => 'Zgharta Transit Hub',
                'location' => 'Zgharta, Lebanon',
                'lat' => 34.4321,
                'lng' => 35.8665,
                'opening_time' => '08:00:00',
                'closing_time' => '18:00:00',
            ],
            [
                'name' => 'Saida South Station',
                'location' => 'Saida, Lebanon',
                'lat' => 33.5635,
                'lng' => 35.3676,
                'opening_time' => '07:30:00',
                'closing_time' => '21:30:00',
            ],
            [
                'name' => 'Tripoli Central Depot',
                'location' => 'Tripoli, Lebanon',
                'lat' => 34.4369,
                'lng' => 35.8497,
                'opening_time' => '06:30:00',
                'closing_time' => '23:00:00',
            ],
            [
                'name' => 'Baalbek Transit Center',
                'location' => 'Baalbek, Lebanon',
                'lat' => 34.0043,
                'lng' => 36.2189,
                'opening_time' => '09:00:00',
                'closing_time' => '20:00:00',
            ],
            [
                'name' => 'Tyre Gateway',
                'location' => 'Tyre, Lebanon',
                'lat' => 33.2725,
                'lng' => 35.1956,
                'opening_time' => '08:30:00',
                'closing_time' => '19:30:00',
            ],
            [
                'name' => 'Byblos Terminal',
                'location' => 'Byblos, Lebanon',
                'lat' => 34.1236,
                'lng' => 35.6516,
                'opening_time' => '07:00:00',
                'closing_time' => '22:00:00',
            ],
            [
                'name' => 'Batroun Express',
                'location' => 'Batroun, Lebanon',
                'lat' => 34.2559,
                'lng' => 35.6599,
                'opening_time' => '06:00:00',
                'closing_time' => '20:30:00',
            ],
            [
                'name' => 'Jbeil Metro',
                'location' => 'Jbeil, Lebanon',
                'lat' => 34.1213,
                'lng' => 35.6516,
                'opening_time' => '07:30:00',
                'closing_time' => '21:00:00',
            ],
            [
                'name' => 'Nabatieh Interchange',
                'location' => 'Nabatieh, Lebanon',
                'lat' => 33.3739,
                'lng' => 35.4822,
                'opening_time' => '08:00:00',
                'closing_time' => '19:00:00',
            ],
        ];

        foreach ($stations as $stationData) {
            Station::create($stationData);
        }       

    }
}
