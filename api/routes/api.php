<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('stations/create', [StationController::class, 'create_station']);


// Route::get('stations/get', function(){
//     return 'this is a test api';
// });