<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    private function cartData()
    {
        $items = auth()->user()->cartItems()->with('product')->get()
            ->map(fn($item) => [
                'id'       => $item->id,
                'quantity' => $item->quantity,
                'subtotal' => (float) $item->subtotal,
                'product'  => [
                    'id'            => $item->product->id,
                    'name'          => $item->product->name,
                    'slug'          => $item->product->slug,
                    'category_label'=> $item->product->category_label,
                    'current_price' => (float) $item->product->current_price,
                    'price'         => (float) $item->product->price,
                    'sale_price'    => $item->product->sale_price ? (float) $item->product->sale_price : null,
                    'primary_image' => $item->product->primary_image,
                    'stock'         => $item->product->stock,
                ],
            ]);

        $subtotal    = $items->sum('subtotal');
        $shippingFee = $subtotal >= 50000 ? 0 : 500;
        $total       = $subtotal + $shippingFee;

        return compact('items', 'subtotal', 'shippingFee', 'total');
    }

    public function index()
    {
        return Inertia::render('Cart/Index', $this->cartData());
    }

    public function add(Request $request, Product $product)
    {
        $request->validate(['quantity' => 'sometimes|integer|min:1|max:10']);
        $qty = $request->get('quantity', 1);

        if ($product->stock < $qty) {
            return back()->with('error', 'Insufficient stock available.');
        }

        $cartItem = CartItem::where('user_id', auth()->id())
            ->where('product_id', $product->id)->first();

        if ($cartItem) {
            $newQty = $cartItem->quantity + $qty;
            if ($newQty > $product->stock) {
                return back()->with('error', 'Cannot add more than available stock.');
            }
            $cartItem->update(['quantity' => $newQty]);
        } else {
            CartItem::create([
                'user_id'    => auth()->id(),
                'product_id' => $product->id,
                'quantity'   => $qty,
            ]);
        }

        return back()->with('success', "'{$product->name}' added to cart.");
    }

    public function update(Request $request, CartItem $cartItem)
    {
        abort_if($cartItem->user_id !== auth()->id(), 403);
        $request->validate(['quantity' => 'required|integer|min:1|max:10']);

        if ($request->quantity > $cartItem->product->stock) {
            return back()->with('error', 'Exceeds available stock.');
        }

        $cartItem->update(['quantity' => $request->quantity]);
        return back()->with('success', 'Cart updated.');
    }

    public function remove(CartItem $cartItem)
    {
        abort_if($cartItem->user_id !== auth()->id(), 403);
        $cartItem->delete();
        return back()->with('success', 'Item removed.');
    }

    public function clear()
    {
        auth()->user()->cartItems()->delete();
        return redirect()->route('cart.index')->with('success', 'Cart cleared.');
    }
}
