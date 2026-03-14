<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    private function format(Product $p): array
    {
        return [
            'id'                  => $p->id,
            'name'                => $p->name,
            'slug'                => $p->slug,
            'short_description'   => $p->short_description,
            'description'         => $p->description,
            'price'               => (float) $p->price,
            'sale_price'          => $p->sale_price ? (float) $p->sale_price : null,
            'current_price'       => (float) $p->current_price,
            'is_on_sale'          => $p->is_on_sale,
            'discount_percentage' => $p->discount_percentage,
            'category'            => $p->category,
            'category_label'      => $p->category_label,
            'material'            => $p->material,
            'carat'               => $p->carat,
            'metal'               => $p->metal,
            'certification'       => $p->certification,
            'stock'               => $p->stock,
            'images'              => $p->images ?? [],
            'primary_image'       => $p->primary_image,
            'tags'                => $p->tags ?? [],
            'is_featured'         => $p->is_featured,
            'is_active'           => $p->is_active,
            'is_low_stock'        => $p->is_low_stock,
            'rating'              => (float) $p->rating,
            'reviews_count'       => $p->reviews_count,
            'created_at'          => $p->created_at->format('M j, Y'),
        ];
    }

    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->filled('q')) {
            $query->where('name', 'LIKE', "%{$request->q}%")
                  ->orWhere('category', 'LIKE', "%{$request->q}%");
        }
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $products = $query->latest()
            ->paginate(15)
            ->withQueryString()
            ->through(fn($p) => $this->format($p));

        return Inertia::render('Admin/Products/Index', [
            'products'   => $products,
            'categories' => Product::CATEGORIES,
            'filters'    => $request->only('q', 'category'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Product::CATEGORIES,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'              => 'required|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'description'       => 'required|string',
            'price'             => 'required|numeric|min:0',
            'sale_price'        => 'nullable|numeric|min:0|lt:price',
            'category'          => 'required|in:' . implode(',', array_keys(Product::CATEGORIES)),
            'material'          => 'nullable|string|max:100',
            'carat'             => 'nullable|string|max:50',
            'metal'             => 'nullable|string|max:100',
            'certification'     => 'nullable|string|max:100',
            'stock'             => 'required|integer|min:0',
            'is_featured'       => 'boolean',
            'is_active'         => 'boolean',
            'images.*'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $imagePaths[] = Storage::url($path);
            }
        }

        Product::create(array_merge($validated, [
            'images' => $imagePaths,
            'slug'   => Str::slug($validated['name']) . '-' . Str::random(5),
        ]));

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product'    => $this->format($product),
            'categories' => Product::CATEGORIES,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name'              => 'required|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'description'       => 'required|string',
            'price'             => 'required|numeric|min:0',
            'sale_price'        => 'nullable|numeric|min:0',
            'category'          => 'required|in:' . implode(',', array_keys(Product::CATEGORIES)),
            'material'          => 'nullable|string|max:100',
            'carat'             => 'nullable|string|max:50',
            'metal'             => 'nullable|string|max:100',
            'certification'     => 'nullable|string|max:100',
            'stock'             => 'required|integer|min:0',
            'is_featured'       => 'boolean',
            'is_active'         => 'boolean',
            'images.*'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $imagePaths = $product->images ?? [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $imagePaths[] = Storage::url($path);
            }
        }

        $product->update(array_merge($validated, ['images' => $imagePaths]));

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return back()->with('success', 'Product deleted.');
    }

    public function toggleActive(Product $product)
    {
        $product->update(['is_active' => !$product->is_active]);
        $msg = $product->is_active ? 'Product activated.' : 'Product deactivated.';
        return back()->with('success', $msg);
    }

    public function removeImage(Request $request, Product $product)
    {
        $request->validate(['image_url' => 'required|string']);
        $images = collect($product->images ?? [])
            ->filter(fn($img) => $img !== $request->image_url)
            ->values()
            ->toArray();

        $product->update(['images' => $images]);
        return back()->with('success', 'Image removed.');
    }
}
