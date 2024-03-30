<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ride extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'start_station_id',
        'end_station_id',
        'start_time',
        'end_time',
    ];

    public function reviews() {
        return $this->hasMany(Review::class);
    }
}