<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    private function format($p, $withWishlist = false)
    {
        $data = [
            'id'                  => $p->id,
            'name'                => $p->name,
            'slug'                => $p->slug,
            'category'            => $p->category,
            'category_label'      => $p->category_label,
            'price'               => (float) $p->price,
            'sale_price'          => $p->sale_price ? (float) $p->sale_price : null,
            'current_price'       => (float) $p->current_price,
            'is_on_sale'          => $p->is_on_sale,
            'discount_percentage' => $p->discount_percentage,
            'primary_image'       => $p->primary_image,
            'images'              => $p->images ?? [],
            'rating'              => (float) $p->rating,
            'reviews_count'       => $p->reviews_count,
            'material'            => $p->material,
            'carat'               => $p->carat,
            'metal'               => $p->metal,
            'certification'       => $p->certification,
            'stock'               => $p->stock,
            'short_description'   => $p->short_description,
            'description'         => $p->description,
            'tags'                => $p->tags ?? [],
            'is_featured'         => $p->is_featured,
        ];

        if ($withWishlist && auth()->check()) {
            $data['is_wishlisted'] = auth()->user()->hasInWishlist($p->id);
        }

        return $data;
    }

    public function index(Request $request)
    {
        $query = Product::active()->inStock();

        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }
        if ($request->filled('q')) {
            $query->search($request->q);
        }
        if ($request->filled('sort')) {
            match ($request->sort) {
                'price_asc'  => $query->orderByRaw('COALESCE(sale_price, price) ASC'),
                'price_desc' => $query->orderByRaw('COALESCE(sale_price, price) DESC'),
                'rating'     => $query->orderByDesc('rating'),
                default      => $query->latest(),
            };
        } else {
            $query->orderByDesc('is_featured')->latest();
        }

        $paginated   = $query->paginate(12)->withQueryString();
        $products    = $paginated->through(fn($p) => $this->format($p, true));

        return Inertia::render('Products/Index', [
            'products'        => $products,
            'categories'      => Product::CATEGORIES,
            'currentCategory' => $request->category,
            'currentSort'     => $request->sort,
            'currentQ'        => $request->q,
        ]);
    }

    public function show(Product $product)
    {
        abort_if(!$product->is_active, 404);

        $related = Product::active()->inStock()
            ->byCategory($product->category)
            ->where('id', '!=', $product->id)
            ->take(4)->get()
            ->map(fn($p) => $this->format($p, true));

        return Inertia::render('Products/Show', [
            'product'     => $this->format($product, true),
            'related'     => $related,
            'cartItem'    => auth()->check()
                ? auth()->user()->cartItems()->where('product_id', $product->id)->first()
                : null,
        ]);
    }

    public function category($category)
    {
        abort_unless(array_key_exists($category, Product::CATEGORIES), 404);

        $products = Product::active()->inStock()
            ->byCategory($category)
            ->paginate(12)
            ->through(fn($p) => $this->format($p, true));

        return Inertia::render('Products/Category', [
            'products'      => $products,
            'category'      => $category,
            'categoryLabel' => Product::CATEGORIES[$category],
            'categories'    => Product::CATEGORIES,
        ]);
    }

    public function search(Request $request)
    {
        $term     = $request->get('q', '');
        $products = Product::active()->inStock()
            ->search($term)
            ->paginate(12)
            ->withQueryString()
            ->through(fn($p) => $this->format($p, true));

        return Inertia::render('Products/Search', [
            'products'   => $products,
            'term'       => $term,
            'categories' => Product::CATEGORIES,
        ]);
    }
}
