<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $monthExpression = Order::query()->getConnection()->getDriverName() === 'sqlite'
            ? "strftime('%Y-%m', created_at)"
            : "DATE_FORMAT(created_at, '%Y-%m')";

        $totalSales     = Order::whereNotIn('status', ['cancelled'])->sum('total');
        $totalOrders    = Order::count();
        $totalCustomers = User::where('is_admin', false)->count();
        $lowStock       = Product::active()->lowStock()->get()
            ->map(fn($p) => [
                'id'            => $p->id,
                'name'          => $p->name,
                'stock'         => $p->stock,
                'category_label'=> $p->category_label,
                'primary_image' => $p->primary_image,
            ]);

        $recentOrders = Order::with('user')
            ->latest()
            ->take(10)
            ->get()
            ->map(fn($o) => [
                'id'           => $o->id,
                'order_number' => $o->order_number,
                'status'       => $o->status,
                'status_info'  => $o->status_info,
                'total'        => (float) $o->total,
                'customer'     => $o->user->name,
                'created_at'   => $o->created_at->format('M j, Y'),
            ]);

        $salesByMonth = Order::selectRaw("{$monthExpression} as month, SUM(total) as total")
            ->whereNotIn('status', ['cancelled'])
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalSales'     => (float) $totalSales,
                'totalOrders'    => $totalOrders,
                'totalCustomers' => $totalCustomers,
                'lowStockCount'  => $lowStock->count(),
            ],
            'lowStock'     => $lowStock,
            'recentOrders' => $recentOrders,
            'salesByMonth' => $salesByMonth,
        ]);
    }
}
