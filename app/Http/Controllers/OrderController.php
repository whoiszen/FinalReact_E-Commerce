<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    private function formatOrder(Order $order, bool $withItems = false): array
    {
        $data = [
            'id'               => $order->id,
            'order_number'     => $order->order_number,
            'status'           => $order->status,
            'status_info'      => $order->status_info,
            'tracking_step'    => $order->tracking_step,
            'can_cancel'       => $order->can_cancel,
            'subtotal'         => (float) $order->subtotal,
            'shipping_fee'     => (float) $order->shipping_fee,
            'discount'         => (float) $order->discount,
            'total'            => (float) $order->total,
            'payment_method'   => $order->payment_method,
            'payment_status'   => $order->payment_status,
            'shipping_name'    => $order->shipping_name,
            'shipping_email'   => $order->shipping_email,
            'shipping_phone'   => $order->shipping_phone,
            'shipping_address' => $order->shipping_address,
            'shipping_city'    => $order->shipping_city,
            'shipping_state'   => $order->shipping_state,
            'shipping_zip'     => $order->shipping_zip,
            'shipping_country' => $order->shipping_country,
            'notes'            => $order->notes,
            'created_at'       => $order->created_at->format('M j, Y g:i A'),
            'tracking_steps'   => Order::TRACKING_STEPS,
        ];

        if ($withItems) {
            $data['items'] = $order->items->map(fn($i) => [
                'id'            => $i->id,
                'product_name'  => $i->product_name,
                'product_image' => $i->product_image,
                'price'         => (float) $i->price,
                'quantity'      => $i->quantity,
                'subtotal'      => (float) $i->subtotal,
            ]);
        }

        return $data;
    }

    public function index()
    {
        $orders = auth()->user()->orders()
            ->paginate(10)
            ->through(fn($o) => $this->formatOrder($o));

        return Inertia::render('Orders/Index', compact('orders'));
    }

    public function show(Order $order)
    {
        abort_if($order->user_id !== auth()->id(), 403);
        $order->load('items');
        return Inertia::render('Orders/Show', [
            'order' => $this->formatOrder($order, true),
        ]);
    }

    public function checkout()
    {
        $cartItems = auth()->user()->cartItems()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        $items = $cartItems->map(fn($item) => [
            'id'            => $item->id,
            'quantity'      => $item->quantity,
            'subtotal'      => (float) $item->subtotal,
            'product'       => [
                'id'            => $item->product->id,
                'name'          => $item->product->name,
                'primary_image' => $item->product->primary_image,
                'current_price' => (float) $item->product->current_price,
            ],
        ]);

        $subtotal    = $items->sum('subtotal');
        $shippingFee = $subtotal >= 50000 ? 0 : 500;
        $total       = $subtotal + $shippingFee;

        return Inertia::render('Orders/Checkout', [
            'cartItems'   => $items,
            'subtotal'    => $subtotal,
            'shippingFee' => $shippingFee,
            'total'       => $total,
            'user'        => auth()->user()->only('name', 'email', 'phone', 'address'),
        ]);
    }

    public function processCheckout(Request $request)
    {
        $request->validate([
            'shipping_name'    => 'required|string|max:255',
            'shipping_email'   => 'required|email',
            'shipping_phone'   => 'required|string|max:20',
            'shipping_address' => 'required|string|max:500',
            'shipping_city'    => 'required|string|max:100',
            'shipping_state'   => 'required|string|max:100',
            'shipping_zip'     => 'required|string|max:20',
            'shipping_country' => 'required|string|max:100',
            'payment_method'   => 'required|in:cod,gcash,card,bank_transfer',
            'notes'            => 'nullable|string|max:1000',
        ]);

        $cartItems = auth()->user()->cartItems()->with('product')->get();
        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        foreach ($cartItems as $item) {
            if ($item->product->stock < $item->quantity) {
                return back()->with('error', "'{$item->product->name}' is out of stock.");
            }
        }

        $orderId = null;
        DB::transaction(function () use ($request, $cartItems, &$orderId) {
            $subtotal    = $cartItems->sum('subtotal');
            $shippingFee = $subtotal >= 50000 ? 0 : 500;

            $order = Order::create([
                'user_id'          => auth()->id(),
                'status'           => 'pending',
                'subtotal'         => $subtotal,
                'shipping_fee'     => $shippingFee,
                'discount'         => 0,
                'total'            => $subtotal + $shippingFee,
                'shipping_name'    => $request->shipping_name,
                'shipping_email'   => $request->shipping_email,
                'shipping_phone'   => $request->shipping_phone,
                'shipping_address' => $request->shipping_address,
                'shipping_city'    => $request->shipping_city,
                'shipping_state'   => $request->shipping_state,
                'shipping_zip'     => $request->shipping_zip,
                'shipping_country' => $request->shipping_country,
                'payment_method'   => $request->payment_method,
                'payment_status'   => 'pending',
                'notes'            => $request->notes,
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id'      => $order->id,
                    'product_id'    => $item->product_id,
                    'product_name'  => $item->product->name,
                    'product_image' => $item->product->primary_image,
                    'price'         => $item->product->current_price,
                    'quantity'      => $item->quantity,
                    'subtotal'      => $item->subtotal,
                ]);
                $item->product->decrement('stock', $item->quantity);
            }

            auth()->user()->cartItems()->delete();
            $orderId = $order->id;
        });

        return redirect()->route('orders.show', $orderId)
            ->with('success', 'Order placed successfully! 🎉');
    }

    public function cancel(Order $order)
    {
        abort_if($order->user_id !== auth()->id(), 403);
        abort_unless($order->can_cancel, 400, 'Cannot cancel this order.');

        $order->update(['status' => 'cancelled']);

        foreach ($order->items as $item) {
            if ($item->product) {
                $item->product->increment('stock', $item->quantity);
            }
        }

        return back()->with('success', 'Order cancelled.');
    }
}
