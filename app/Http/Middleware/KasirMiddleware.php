<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class KasirMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()->role == 'kasir') {
            return $next($request);
        }

        abort(403);
    }
}
