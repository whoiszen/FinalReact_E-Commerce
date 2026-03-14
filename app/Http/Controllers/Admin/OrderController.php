<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    private function format(Order $order, bool $withItems = false): array
    {
        $data = [
            'id'               => $order->id,
            'order_number'     => $order->order_number,
            'status'           => $order->status,
            'status_info'      => $order->status_info,
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
            'paid_at'          => $order->paid_at?->format('M j, Y g:i A'),
            'shipped_at'       => $order->shipped_at?->format('M j, Y g:i A'),
            'completed_at'     => $order->completed_at?->format('M j, Y g:i A'),
            'customer'         => $order->user ? [
                'id'    => $order->user->id,
                'name'  => $order->user->name,
                'email' => $order->user->email,
            ] : null,
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

    public function index(Request $request)
    {
        $query = Order::with('user')->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('q')) {
            $query->where('order_number', 'LIKE', "%{$request->q}%")
                  ->orWhereHas('user', fn($u) => $u->where('name', 'LIKE', "%{$request->q}%"));
        }

        $orders = $query->paginate(15)
            ->withQueryString()
            ->through(fn($o) => $this->format($o));

        return Inertia::render('Admin/Orders/Index', [
            'orders'   => $orders,
            'statuses' => Order::STATUSES,
            'filters'  => $request->only('status', 'q'),
        ]);
    }

    public function show(Order $order)
    {
        $order->load('user', 'items');
        return Inertia::render('Admin/Orders/Show', [
            'order'    => $this->format($order, true),
            'statuses' => Order::STATUSES,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,paid,shipped,completed,cancelled',
        ]);

        $timestamps = [];
        if ($request->status === 'paid' && !$order->paid_at) {
            $timestamps['paid_at'] = now();
            $timestamps['payment_status'] = 'paid';
        }
        if ($request->status === 'shipped' && !$order->shipped_at) {
            $timestamps['shipped_at'] = now();
        }
        if ($request->status === 'completed' && !$order->completed_at) {
            $timestamps['completed_at'] = now();
        }

        $order->update(array_merge(['status' => $request->status], $timestamps));

        return back()->with('success', "Order status updated to {$request->status}.");
    }
}
