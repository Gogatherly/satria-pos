<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function index(LoginRequest $request): RedirectResponse
    {


        if (Auth::attempt(['email' => $request->email, 'password' => $request->password], $request->boolean('remember_me'))) {
            $request->session()->regenerate();
            $role = Auth::user()->role;
            if($role == 'super_admin'){
                return redirect()->intended('/super-admin');
            }elseif($role == 'kasir'){
                return redirect()->intended('/kasir');
            }elseif($role == 'admin_gudang'){
                return redirect()->intended('/admin-gudang');
            }
        }

        return back()
            ->withErrors(['email' => 'Email atau password tidak valid.'])
            ->onlyInput('email');
    }
}
