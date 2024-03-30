<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Facility;


class FacilitiesController extends Controller
{
    public function get_all_facilities()
    {
        $facilities = Facility::all();
        return response()->json(['facilities' => $facilities], 200);
    }



    public function get_facilities($id)
    {
        $facilities = Facility::find($id);

        if (!$facilities) {
            return response()->json(['message' => 'Facility not found'], 404);
        }

        return response()->json(['facility' => $facilities], 200);
    }



    public function update_facilities(Request $request, $id)
    {
        $user = Auth::user();
    
        if (!$user || $user->role_id !== 2) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $facility = Facility::find($id);

        if (!$facility) {
            return response()->json(['message' => 'Facility not found'], 404);
        }

        $request->validate([
            'type' => 'required|in:toilets,restaurant,parking,wifi,atm,pharmacy,store',
        ]);

        $facility->type = $request->type;
        $facility->save();

        return response()->json(['message' => 'Facility updated successfully', 'facility' => $facility], 200);
    }

}