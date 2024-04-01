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
        'opening_time',
        'closing_time',
        'active'
    ];
    public function station()
    {
        return $this->belongsTo(User::class, 'branch_id');
    }

    
    
}
