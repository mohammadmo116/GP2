<?php

namespace App\Console;

use App\Models\Flag;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
       $schedule->call(function () {
        $record=Flag::first()->get()[0];
        $record['feed1_f']="true";
        $record->save();
        })->dailyAt(Flag::first()->get()[0]['food_time_1'])->when(Flag::first()->get()[0]['food_bool_1']=='true');


        $schedule->call(function () {
            $record=Flag::first()->get()[0];
            $record['feed2_f']="true";
            $record->save();
        })->dailyAt(Flag::first()->get()[0]['food_time_2'])->when(Flag::first()->get()[0]['food_bool_2']=='true');

        $schedule->call(function () {
            $record=Flag::first()->get()[0];
            $record['feed3_f']="true";
            $record->save();
        })->dailyAt(Flag::first()->get()[0]['food_time_3'])->when(Flag::first()->get()[0]['food_bool_3']=='true');


        // $schedule->command('inspire')->hourly();

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
