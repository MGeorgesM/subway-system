<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StationController;

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