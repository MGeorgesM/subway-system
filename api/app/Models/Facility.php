<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
    ];

    public $timestamps = false;


    public function stations()
    {
        return $this->belongsToMany(Station::class, 'stations_facilities');
    }
}
