<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [ApiController::class, 'authenticate']);
Route::post('register', [ApiController::class, 'register']);
Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('logout', [ApiController::class, 'logout']);
    Route::get('getuser', [ApiController::class, 'get_user']);
    /**
      * Silahkan tambahkan route anda disini ...
    */
    Route::post('hospitals', [ApiController::class, 'add_hospitals']);
    Route::get('gethospitals', [ApiController::class, 'get_hospitals']);
    Route::get('hospitals/{id_rs}', [ApiController::class, 'get_hospitals_id']);
    Route::put('hospitals/{id_rs}', [ApiController::class, 'edit_hospitals']);
    Route::delete('hospitals/{id_rs}', [ApiController::class, 'delete_hospitals']);
});
