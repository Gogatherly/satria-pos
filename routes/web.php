<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', function () {
    return Inertia::render('Auth/Login', []);
})->name('login');
Route::post('/login', [AuthenticationController::class, 'index'])->name('login.attempt');
Route::get('/', function () {
    return Inertia::render('Home', []);
});


Route::middleware(['auth', 'auth.session'])->group(function () {
    Route::post('/logout', [AuthenticationController::class, 'logout'])->name('logout');

//    Super Admin

    Route::middleware("super-admin")->prefix('super-admin')->group(function () {
        Route::get("/",function (Request $request){
            return Inertia::render('SuperAdmin/Home');
        });
    });

//    Kasir
    Route::middleware("kasir")->prefix("kasir")->group(function () {
        Route::get("/",function (Request $request){
            return Inertia::render('Kasir/Home');
        });
    });

//    Admin Gudang
    Route::middleware("admin-gudang")->prefix("admin-gudang")->group(function () {
        Route::get("/",function (Request $request){
            return Inertia::render('AdminGudang/Home');
        });
    });
});
