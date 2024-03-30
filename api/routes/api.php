<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\RidesController;
use App\Http\Controllers\TicketsController;

use Illuminate\Support\Facades\Route;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::group([

//     'middleware' => 'api',
//     'prefix' => 'auth'

// ], function ($router) {

//     Route::post('login', 'AuthController@login');
//     Route::post('logout', 'AuthController@logout');
//     Route::post('refresh', 'AuthController@refresh');
//     Route::post('me', 'AuthController@me');
// });

Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/logout', [AuthController::class, 'logout']);


Route::get('users/get/{id?}', [UsersController::class, 'getUsers']);
Route::post('users/update', [UsersController::class, 'updateUser']);


Route::get('stations/getAll', [StationController::class, 'get_all_stations']);
Route::get('stations/get/{id}', [StationController::class, 'get_stations']);
Route::post('stations/create', [StationController::class, 'create_station']);
Route::delete('stations/delete/{id}', [StationController::class, 'delete_station']);
Route::put('stations/update/{id}', [StationController::class, 'update_station']);


Route::get('rides/getAll', [RidesController::class, 'get_all_rides']);
Route::get('rides/get/{id}', [RidesController::class, 'get_rides']);
Route::post('rides/create', [RidesController::class, 'create_rides']);
Route::put('rides/update/{id}', [RidesController::class, 'update_rides']);
Route::delete('rides/delete/{id}', [RidesController::class, 'delete_rides']);



Route::get('tickets/getAll', [TicketsController::class, 'get_all_tickets']);
Route::get('tickets/get/{id}', [TicketsController::class, 'get_tickets']);
Route::post('tickets/create', [TicketsController::class, 'create_ticket']);
Route::put('tickets/update/{id}', [TicketsController::class, 'update_ticket']);