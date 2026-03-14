<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Inertia\Inertia;

class PageController extends Controller
{
    public function welcome()
    {
        $featured = Product::active()->featured()->inStock()->take(8)->get()
            ->map(fn($p) => $this->formatProduct($p));

        $categories = Product::CATEGORIES;

        $categoryCounts = collect(array_keys($categories))
            ->mapWithKeys(fn($cat) => [
                $cat => Product::active()->byCategory($cat)->count()
            ]);

        return Inertia::render('Welcome', [
            'featured'       => $featured,
            'categories'     => $categories,
            'categoryCounts' => $categoryCounts,
        ]);
    }

    public function about()
    {
        return Inertia::render('About');
    }

    public function community()
    {
        return Inertia::render('Community');
    }

    public function dashboard()
    {
        $user         = auth()->user();
        $recentOrders = $user->orders()->with('items')->take(5)->get()
            ->map(fn($o) => $this->formatOrder($o));

        return Inertia::render('Dashboard', [
            'recentOrders'  => $recentOrders,
            'cartCount'     => $user->cart_count,
            'wishlistCount' => $user->wishlist()->count(),
            'totalOrders'   => $user->orders()->count(),
            'totalSpent'    => $user->orders()
                ->whereNotIn('status', ['cancelled'])
                ->sum('total'),
        ]);
    }

    private function formatProduct($p)
    {
        return [
            'id'                  => $p->id,
            'name'                => $p->name,
            'slug'                => $p->slug,
            'category'            => $p->category,
            'category_label'      => $p->category_label,
            'price'               => $p->price,
            'sale_price'          => $p->sale_price,
            'current_price'       => $p->current_price,
            'is_on_sale'          => $p->is_on_sale,
            'discount_percentage' => $p->discount_percentage,
            'primary_image'       => $p->primary_image,
            'images'              => $p->images,
            'rating'              => $p->rating,
            'reviews_count'       => $p->reviews_count,
            'material'            => $p->material,
            'carat'               => $p->carat,
            'metal'               => $p->metal,
            'certification'       => $p->certification,
            'stock'               => $p->stock,
            'is_featured'         => $p->is_featured,
            'is_active'           => $p->is_active,
            'short_description'   => $p->short_description,
            'description'         => $p->description,
        ];
    }

    private function formatOrder($o)
    {
        return [
            'id'           => $o->id,
            'order_number' => $o->order_number,
            'status'       => $o->status,
            'status_info'  => $o->status_info,
            'total'        => $o->total,
            'items_count'  => $o->items->count(),
            'created_at'   => $o->created_at->format('M j, Y'),
        ];
    }
}
