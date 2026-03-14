import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const statusColors = {
    pending:   'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
    paid:      'bg-blue-500/20 text-blue-400 border-blue-500/20',
    shipped:   'bg-purple-500/20 text-purple-400 border-purple-500/20',
    completed: 'bg-green-500/20 text-green-400 border-green-500/20',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/20',
};

export default function OrderShow({ order }) {
    const { flash } = usePage().props;
    const steps = order.tracking_steps || ['pending', 'paid', 'shipped', 'completed'];
    const isCancelled = order.status === 'cancelled';

    const cancelOrder = () => {
        if (confirm('Cancel this order?')) {
            router.post(route('orders.cancel', order.id));
        }
    };

    return (
        <AppLayout>
            <Head title={`Order ${order.order_number}`} />

            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-start justify-between mb-10">
                    <div>
                        <Link href={route('orders.index')}
                            className="text-xs font-body text-white/30 hover:text-gold-400 tracking-widest uppercase transition-colors mb-3 block">
                            ← My Orders
                        </Link>
                        <h1 className="font-display text-3xl font-bold text-white">{order.order_number}</h1>
                        <p className="text-sm font-body text-white/30 mt-1">Placed {order.created_at}</p>
                    </div>
                    <span className={`badge-status border ${statusColors[order.status] || 'bg-white/10 text-white/40 border-white/10'}`}>
                        {order.status_info.label}
                    </span>
                </div>

                {/* Success message */}
                {flash?.success && (
                    <div className="card-luxury border-gold-500/30 p-5 mb-6 flex items-center gap-4">
                        <span className="text-2xl">🎉</span>
                        <div>
                            <p className="font-body font-medium text-gold-400">{flash.success}</p>
                            <p className="text-xs font-body text-white/40 mt-0.5">
                                We'll notify you when your order status changes.
                            </p>
                        </div>
                    </div>
                )}

                {/* Tracker */}
                {!isCancelled && (
                    <div className="card-luxury p-6 mb-6">
                        <h2 className="font-display text-base font-semibold text-white mb-8">Order Tracking</h2>
                        <div className="relative">
                            {/* Progress bar */}
                            <div className="absolute top-4 left-0 right-0 h-px bg-white/5 z-0">
                                <div className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700"
                                    style={{ width: `${(order.tracking_step / (steps.length - 1)) * 100}%` }} />
                            </div>
                            {/* Steps */}
                            <div className="relative z-10 flex justify-between">
                                {steps.map((step, idx) => {
                                    const isCompleted = idx <= order.tracking_step;
                                    const isCurrent   = idx === order.tracking_step;
                                    return (
                                        <div key={step} className="flex flex-col items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-all duration-500 border ${
                                                isCompleted
                                                    ? 'bg-gold-500 border-gold-500 text-obsidian shadow-lg shadow-gold-500/30'
                                                    : 'bg-obsidian border-white/10 text-white/20'
                                            } ${isCurrent ? 'ring-2 ring-gold-500/30 ring-offset-2 ring-offset-obsidian' : ''}`}>
                                                {isCompleted && !isCurrent ? '✓' : idx + 1}
                                            </div>
                                            <span className={`text-[10px] font-body tracking-widest uppercase capitalize text-center ${
                                                isCurrent ? 'text-gold-400' : isCompleted ? 'text-white/50' : 'text-white/20'
                                            }`}>
                                                {step}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Items + Address */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Items */}
                        <div className="card-luxury p-6">
                            <h2 className="font-display text-base font-semibold text-white mb-5">
                                Items Ordered
                            </h2>
                            <div className="space-y-4">
                                {order.items?.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                        <img
                                            src={item.product_image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80'}
                                            alt={item.product_name}
                                            className="w-16 h-16 object-cover border border-white/5 flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-body text-white/80">{item.product_name}</p>
                                            <p className="text-xs font-body text-white/30 mt-0.5">
                                                ₱{Number(item.price).toLocaleString()} × {item.quantity}
                                            </p>
                                        </div>
                                        <span className="font-display text-sm text-gold-400 font-semibold">
                                            ₱{Number(item.subtotal).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping */}
                        <div className="card-luxury p-6">
                            <h2 className="font-display text-base font-semibold text-white mb-4">Delivery Address</h2>
                            <div className="text-sm font-body text-white/50 space-y-1">
                                <p className="text-white/80 font-medium">{order.shipping_name}</p>
                                <p>{order.shipping_phone}</p>
                                <p className="mt-2">{order.shipping_address}</p>
                                <p>{order.shipping_city}, {order.shipping_state} {order.shipping_zip}</p>
                                <p>{order.shipping_country}</p>
                            </div>
                            {order.notes && (
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <p className="text-[10px] font-body tracking-widest uppercase text-white/30 mb-1">Your Note</p>
                                    <p className="text-sm font-body text-white/40 italic">"{order.notes}"</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Summary sidebar */}
                    <div className="space-y-5">
                        <div className="card-luxury p-6">
                            <h2 className="font-display text-base font-semibold text-white mb-5">Payment Summary</h2>
                            <div className="space-y-3 text-sm font-body text-white/50">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₱{Number(order.subtotal).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{order.shipping_fee === 0 ? 'FREE' : `₱${Number(order.shipping_fee).toLocaleString()}`}</span>
                                </div>
                                <div className="flex justify-between font-display text-base font-bold text-white border-t border-white/10 pt-3">
                                    <span>Total</span>
                                    <span className="text-gold-400">₱{Number(order.total).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-5 pt-5 border-t border-white/10 space-y-2">
                                <div className="flex justify-between text-xs font-body text-white/30">
                                    <span className="tracking-widest uppercase">Payment</span>
                                    <span className="uppercase">{order.payment_method?.replace('_', ' ')}</span>
                                </div>
                                <div className="flex justify-between text-xs font-body text-white/30">
                                    <span className="tracking-widest uppercase">Payment Status</span>
                                    <span className={order.payment_status === 'paid' ? 'text-green-400' : 'text-yellow-400'}>
                                        {order.payment_status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <Link href={route('products.index')} className="btn-outline-gold w-full py-3 text-center block">
                                Continue Shopping
                            </Link>
                            {order.can_cancel && (
                                <button onClick={cancelOrder}
                                    className="w-full py-3 text-[10px] font-body tracking-widest uppercase text-red-500/50 hover:text-red-400 border border-red-500/10 hover:border-red-500/30 transition-all">
                                    Cancel Order
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
