<?php

use Illuminate\Support\Facades\Http;
use App\Events\trackPetEvent;
use App\Events\trackPetEventk;
use App\Models\Flag;
use Illuminate\Http\Client\Response as ClientResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Spatie\FlareClient\Http\Response as HttpResponse;
use function PHPUnit\Framework\returnSelf;
use Pusher\Pusher;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/all', function () {
    return response()->json( Flag::first()->get(['water_sensor','heat_sensor'
    ,'light','light_sensor'
    ,'fan','temp'
    ,'camera'
    ,'pump'
    ,'door_sensor','door','pet_sensor'
    ,'food_bool','weight_value'
    ,'food_bool_1','weight_value_1','food_bool_2','weight_value_2','food_bool_3','weight_value_3'
    ,'feed1_f','feed2_f','feed3_f'])[0], 200);
});

Route::get('/watersensor', function () {
    return Flag::first('water_sensor')->water_sensor;

});


Route::get('/heatsensor', function () {
    return Flag::first()->get('heat_sensor');
});


Route::get('/led', function () {
    return Flag::first()->get('light');
});

Route::get('/lightsensor', function () {
    return Flag::first()->get('light_sensor');
});

Route::get('/fan', function () {
    return Flag::first()->get('fan');
});

Route::get('/camera', function () {
    return Flag::first()->get('camera');
});

Route::get('/pump', function () {
    return Flag::first()->get('pump');
});


Route::put('/setSensor', function (Request $request) {

     $record=Flag::first()->get()[0];
     $sensor=$request->post('Sensor');
     $sensorType=$request->post('sensorType');
     if($sensor)
     $record[$sensorType]='true';
     else
     $record[$sensorType]='false';

     $record->save();

});
Route::put('/turnOn', function (Request $request) {

    $record=Flag::first()->get()[0];
    $deviceType=$request->post('deviceType');
    $record[$deviceType]='true';
    $record->save();

});
Route::put('/turnOff', function (Request $request) {

    $record=Flag::first()->get()[0];
    $deviceType=$request->post('deviceType');
    $record[$deviceType]='false';
    $record->save();

});

Route::put('/setMeal', function (Request $request) {
    $record=Flag::first()->get()[0];
    $mealNumber=$request->post('mealNumber');
    $time=date('G:i', strtotime($request->post('time')));
    $weight=$request->post('weight');
    $record['food_bool_'.$mealNumber]='true';
    $record['food_time_'.$mealNumber]=$time;
    $record['weight_value_'.$mealNumber]=$weight;
    $record->save();

});

Route::put('/dropMeal', function (Request $request) {
    $record=Flag::first()->get()[0];
    $weight=$request->post('weight');
    $record['food_bool']='true';
    $record['weight_value']=$weight;
    $record->save();

});
Route::get('/gps', function () {
    $record=Flag::first()->get(['latitude','longitude'])[0];
    return $record;

});
Route::put('/setGps', function (Request $request) {
    $record=Flag::first()->get()[0];
    $latitude=$request->post('latitude');
    $longitude=$request->post('longitude');
    $record['latitude']=$latitude;
    $record['longitude']=$longitude;
    $record->save();

});

Route::get('/link', function () {
    $record=Flag::first()->get(['link'])[0];
    return $record;

});

Route::put('/link', function (Request $request) {
    $record=Flag::first()->get()[0];
    $record['link']=$request->post('link');
    $record->save();

});
Route::put('/setTemp', function (Request $request) {
    $record=Flag::first()->get()[0];
    $record['temp']=$request->post('temp');
    $record->save();

});
Route::get('/date1', function (Request $request) {
    return $record=Flag::find(1)->food_time_1;

});
Route::get('/date2', function (Request $request) {
    return $record=Flag::find(1)->food_time_2;

});
Route::get('/date3', function (Request $request) {
    return $record=Flag::find(1)->food_time_3;

});

Route::put('/setDate1', function (Request $request) {
    $record=Flag::first()->get()[0];
    $start=date('s:i:H', strtotime($request->post('date1')));
    $record['food_time_1']= $start;
    $record->save();

});
Route::put('/setDate2', function (Request $request) {
    $record=Flag::first()->get()[0];
    $start=date('s:i:H', strtotime($request->post('date2')));
    $record['food_time_2']= $start;
    $record->save();

});

Route::put('/setDate3', function (Request $request) {
    $record=Flag::first()->get()[0];
    $start=date('s:i:H', strtotime($request->post('date3')));
    $record['food_time_3']= $start;
    $record->save();

});

Route::put('/food_bool', function (Request $request) {
    $record=Flag::first()->get()[0];
    $record['food_bool']="false";
    $record->save();

});
Route::put('/feed_f', function (Request $request) {
    $mealNumber=$request->post('a');
    $record=Flag::first()->get()[0];
    $record['feed'.$mealNumber.'_f']="false";
    $record->save();

});
Route::get('/notify', function (Request $request) {

    $data= [
        "to"=>"ExponentPushToken[arj5sDOYAMbK5hY_likBJX]",
        "title"=>"Your pet might be out!",
        "body"=>"press here to track you pet location now!",
        "data"=>[
            "url"=>"GPS",
        ],
    ];

   return Http::post('exp.host/--/api/v2/push/send',$data);


});
