<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = 
    [
        'departure_ride_id',
        'return_ride_id',
        'price',
        'activated',
    ];

    public $timestamps = false;
}
