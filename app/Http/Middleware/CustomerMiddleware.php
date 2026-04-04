<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CustomerMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (! $user) {
            abort(403, 'Access denied.');
        }

        if ($user->is_admin) {
            return redirect()
                ->route('admin.dashboard')
                ->with('error', 'Admin accounts cannot place orders or use customer shopping tools.');
        }

        return $next($request);
    }
}
