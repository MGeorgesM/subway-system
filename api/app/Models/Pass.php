<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pass extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'remaining',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
