<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
          \App\Models\Flag::factory()->create([

            'door_sensor'=>'false',
            'door'=>'false',
            'pet_sensor'=>'false',

            'light_sensor'=>'false',
            'light'=>'false',

            'water_sensor'=>'false',
            'pump'=>'false',

            'heat_sensor'=>'false',
            'fan'=>'false',
            'temp'=>'35',


            'camera'=>'false',
            'link'=>'192.168.43.94',


            'food_bool'=>'false',
            'weight_value'=>'50',

            'food_bool_1'=>'false',
            'food_time_1'=>'48:56:1',
            'weight_value_1'=>'5',

            'food_bool_2'=>'false',
            'food_time_2'=>'57:29:4',
            'weight_value_2'=>'40',

            'food_bool_3'=>'false',
            'food_time_3'=>'57:30:4',
            'weight_value_3'=>'50',

            'feed1_f'=>'false',
            'feed2_f'=>'false',
            'feed3_f'=>'false',


            'latitude'=>'32.243051',
            'longitude'=>'35.229',

        ]);
    }
}
