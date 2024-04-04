<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StationsFacility;

class StationsFacilityController extends Controller
{
    public function getByStationId(Request $request)
    {
        $id = $request->query('id');

        $facilities = StationsFacility::where('station_id', $id)
            ->with('facility')
            ->get();

        return response()->json(['stationFacilities' => $facilities], 200);
    }
}
