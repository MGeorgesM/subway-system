<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = 
    [
        'user_id',
        'departure_ride_id',
        'return_ride_id',
        'price',
        'activated'
    ];

    public $timestamps = false;

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function departureRide()
    {
        return $this->belongsTo(Ride::class, 'departure_ride_id');
    }

    public function returnRide()
    {
        return $this->belongsTo(Ride::class, 'return_ride_id');
    }
}
