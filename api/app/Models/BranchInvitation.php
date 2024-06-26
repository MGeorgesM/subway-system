<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class BranchInvitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'branch_email',
        'expires_at',
    ];

    public $timestamps = false;
}
