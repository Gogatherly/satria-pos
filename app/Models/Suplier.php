<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Suplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'number_phone',
        'city',
        'province',
        'address',
    ];
}
