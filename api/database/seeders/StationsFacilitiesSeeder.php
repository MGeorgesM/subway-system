<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StationsFacility;

class StationsFacilitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     */
    public function run()
    {
        $data = [];
        $stationCount = 11;
        $facilityCount = 7;

        for ($stationId = 1; $stationId <= $stationCount; $stationId++) {
            $selectedFacilities = [];
            $numFacilities = rand(1, $facilityCount);

            while (count($selectedFacilities) < $numFacilities) {
                $facilityId = rand(1, $facilityCount);
                if (!in_array($facilityId, $selectedFacilities)) {
                    $selectedFacilities[] = $facilityId;
                }
            }

            foreach ($selectedFacilities as $facilityId) {
                $data[] = [
                    'station_id' => $stationId,
                    'facility_id' => $facilityId,
                ];
            }
        }

        StationsFacility::insert($data);
    }
}