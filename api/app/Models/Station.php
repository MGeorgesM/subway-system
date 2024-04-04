<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    use HasFactory;

    protected $table = 'stations';
    protected $fillable = [
        'branch_id',
        'name',
        'location',
        'lat',
        'lng',
        'opening_time',
        'closing_time',
        'active'
    ];
    public function station()
    {
        return $this->belongsTo(User::class, 'branch_id');
    }
    public function rides()
    {
        return $this->hasMany(Ride::class);
    }
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function facilities()
    {
        return $this->belongsToMany(Facility::class, 'stations_facilities');
    }
}
