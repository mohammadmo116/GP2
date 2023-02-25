<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flag extends Model
{
    use HasFactory;

        protected $fillable = [
        'light',
        'light_sensor',
        'water_sensor',
        'pump',
        'heat_sensor',
        'heat',
        'fan',
        'camera',
        'link',
        'weight_bool',
        'weight_value',
        'food_1',
        'food_2',
        'food_3',
        'weight_value_1',
        'weight_value_2',
        'weight_value_3',
        'weight_bool_1',
        'weight_bool_2',
        'weight_bool_3',
        'latitude',
        'longitude',
        'IR'];



}
