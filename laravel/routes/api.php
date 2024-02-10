<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::middleware('auth:sanctum')->put('articles/{id}/approve', [ ArticleController::class, 'odobri']);


Route::get('articles/statistics', [ArticleController::class, 'statistics']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::get('/fetchScienceEvents', [ArticleController::class, 'fetchScienceEvents']);
Route::middleware('auth:sanctum')->get('mojiArtikli', [ArticleController::class, 'mojiArtikli']);
Route::middleware('auth:sanctum')->resource('articles', ArticleController::class);
Route::get('/articles/search', [ArticleController::class,'search']);
Route::prefix('comments')->group(function () {
    Route::get('/', [CommentController::class, 'index']);
    Route::get('/{id}', [CommentController::class, 'show']);
    Route::middleware('auth:sanctum')->  post('/', [CommentController::class, 'store']);
    Route::middleware('auth:sanctum')->  put('/{id}', [CommentController::class, 'update']);
    Route::middleware('auth:sanctum')->  delete('/{id}', [CommentController::class, 'destroy']);
});