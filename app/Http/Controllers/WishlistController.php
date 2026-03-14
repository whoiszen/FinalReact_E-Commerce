<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Wishlist;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index()
    {
        $items = auth()->user()->wishlist()->with('product')->get()
            ->map(fn($w) => [
                'id'      => $w->id,
                'product' => [
                    'id'                  => $w->product->id,
                    'name'                => $w->product->name,
                    'slug'                => $w->product->slug,
                    'category_label'      => $w->product->category_label,
                    'current_price'       => (float) $w->product->current_price,
                    'price'               => (float) $w->product->price,
                    'sale_price'          => $w->product->sale_price ? (float) $w->product->sale_price : null,
                    'is_on_sale'          => $w->product->is_on_sale,
                    'discount_percentage' => $w->product->discount_percentage,
                    'primary_image'       => $w->product->primary_image,
                    'stock'               => $w->product->stock,
                ],
            ]);

        return Inertia::render('Wishlist/Index', compact('items'));
    }

    public function toggle(Product $product)
    {
        $user    = auth()->user();
        $exists  = Wishlist::where('user_id', $user->id)
            ->where('product_id', $product->id)->first();

        if ($exists) {
            $exists->delete();
            $message = 'Removed from wishlist.';
            $wishlisted = false;
        } else {
            Wishlist::create(['user_id' => $user->id, 'product_id' => $product->id]);
            $message = 'Added to wishlist.';
            $wishlisted = true;
        }

        return back()->with(['success' => $message, 'wishlisted' => $wishlisted]);
    }
}
