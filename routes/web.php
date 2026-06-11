<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\SuplierController;
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


    Route::middleware("super-admin")->prefix('super-admin')->group(function () {
        Route::get("/",function (Request $request){
            return Inertia::render('SuperAdmin/Home');
        });

        Route::get("/profile",[SuperAdminController::class,'profile'])->name('super-admin.profile');
        Route::patch("/profile",[SuperAdminController::class,'updateProfile'])->name('super-admin.profile.update');
    });

    Route::middleware('role:super_admin,admin_gudang')->group(function () {
        Route::get('/suplier', [SuplierController::class, 'index'])->name('suplier.index');
        Route::post('/suplier', [SuplierController::class, 'store'])->name('suplier.store');
        Route::delete('/suplier', [SuplierController::class, 'destroyBulk'])->name('suplier.destroy.bulk');
        Route::patch('/suplier/{suplier}', [SuplierController::class, 'update'])->name('suplier.update');
        Route::delete('/suplier/{suplier}', [SuplierController::class, 'destroy'])->name('suplier.destroy');
    });

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
