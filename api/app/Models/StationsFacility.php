<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StationsFacility extends Model
{
    use HasFactory;


    protected $fillable = [
        'station_id',
        'facility_id',
    ];

    public function station()
    {
        return $this->belongsTo(Station::class, 'station_id');
    }

    public function facility()
    {
        return $this->belongsTo(Facility::class, 'facility_id');
    }
}
