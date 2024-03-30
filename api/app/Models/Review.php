<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'rid_id',
        'rating',
        'comment'
    ];

    public function users() {
        return $this->belongsTo(User::class);
    }

    public function rides() {
        return $this->belongsTo(Ride::class);
    }

}
