<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Test;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/test', function () {
    return Inertia::render('Test');
});

Route::get('/ajax-test', [Test::class, 'ajaxTest']);
Route::get('/addToDo', [Test::class, 'addToDo']);
Route::post('/addToDo', [Test::class, 'addToDo']);
Route::post('/getAllToDos', [Test::class, 'getAllToDos']);
Route::post('/toggleToDo', [Test::class, 'toggleToDo']);
Route::post('/deleteToDo', [Test::class, 'deleteToDo']);
Route::patch('updateToDo', [Test::class, 'updateToDo']);
