<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flags', function (Blueprint $table) {
            $table->id();
            $table->boolean('door_sensor');
            $table->boolean('door');
            $table->boolean('pet_sensor');

            $table->boolean('light_sensor');
            $table->boolean('light');

            $table->boolean('water_sensor');
            $table->boolean('pump');

            $table->boolean('heat_sensor');
            $table->boolean('fan');
            $table->float('temp');

            $table->boolean('camera');
            $table->string('link');

            $table->boolean('food_bool');
            $table->integer('weight_value');

            $table->boolean('food_bool_1');
            $table->time('food_time_1');
            $table->integer('weight_value_1');

            $table->boolean('food_bool_2');
            $table->time('food_time_2');
            $table->integer('weight_value_2');

            $table->boolean('food_bool_3');
            $table->time('food_time_3');
            $table->integer('weight_value_3');

            $table->boolean('feed1_f');
            $table->boolean('feed2_f');
            $table->boolean('feed3_f');

            $table->float('latitude');
            $table->float('longitude');
            $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flags');
    }
};
