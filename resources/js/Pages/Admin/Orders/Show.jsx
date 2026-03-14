import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const statusColors = {
    pending:   'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
    paid:      'bg-blue-500/20 text-blue-400 border-blue-500/20',
    shipped:   'bg-purple-500/20 text-purple-400 border-purple-500/20',
    completed: 'bg-green-500/20 text-green-400 border-green-500/20',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/20',
};

export default function AdminOrderShow({ order, statuses }) {
    const { data, setData, put, processing } = useForm({ status: order.status });

    const updateStatus = (e) => {
        e.preventDefault();
        put(route('admin.orders.update-status', order.id));
    };

    return (
        <AdminLayout title={`Order ${order.order_number}`}>
            <Head title={`Order ${order.order_number}`} />

            <div className="mb-6 flex items-center justify-between">
                <Link href={route('admin.orders.index')}
                    className="text-xs font-body text-white/30 hover:text-gold-400 tracking-widest uppercase transition-colors">
                    ← Back to Orders
                </Link>
                <span className={`badge-status border text-[10px] ${statusColors[order.status] || 'bg-white/10 text-white/40 border-white/10'}`}>
                    {order.status_info.label}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left — Items + Addresses */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Order Items */}
                    <div className="card-luxury p-6">
                        <h2 className="font-display text-base font-semibold text-white mb-5">
                            Items Ordered
                            <span className="ml-2 text-xs font-body text-white/30">({order.items?.length})</span>
                        </h2>
                        <div className="space-y-4">
                            {order.items?.map(item => (
                                <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                    <img
                                        src={item.product_image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80'}
                                        alt={item.product_name}
                                        className="w-16 h-16 object-cover border border-white/10 flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-body text-white/80 font-medium">{item.product_name}</p>
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

                        {/* Totals */}
                        <div className="mt-5 pt-5 border-t border-white/10 space-y-2">
                            {[
                                { label: 'Subtotal',      value: order.subtotal },
                                { label: 'Shipping',      value: order.shipping_fee },
                                { label: 'Discount',      value: -order.discount, hide: !order.discount },
                            ].map(row => !row.hide && (
                                <div key={row.label} className="flex justify-between text-sm font-body text-white/50">
                                    <span>{row.label}</span>
                                    <span>₱{Number(Math.abs(row.value)).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="flex justify-between font-display text-base text-gold-400 font-semibold pt-2 border-t border-white/10">
                                <span>Total</span>
                                <span>₱{Number(order.total).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="card-luxury p-6">
                        <h2 className="font-display text-base font-semibold text-white mb-4">Shipping Address</h2>
                        <div className="text-sm font-body text-white/50 space-y-1">
                            <p className="text-white/80 font-medium">{order.shipping_name}</p>
                            <p>{order.shipping_phone}</p>
                            <p>{order.shipping_email}</p>
                            <p className="mt-2">{order.shipping_address}</p>
                            <p>{order.shipping_city}, {order.shipping_state} {order.shipping_zip}</p>
                            <p>{order.shipping_country}</p>
                        </div>
                        {order.notes && (
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <p className="text-xs font-body tracking-widest uppercase text-white/30 mb-1">Customer Note</p>
                                <p className="text-sm font-body text-white/50 italic">"{order.notes}"</p>
                            </div>
                        )}
                    </div>

                    {/* Customer Info */}
                    {order.customer && (
                        <div className="card-luxury p-6">
                            <h2 className="font-display text-base font-semibold text-white mb-4">Customer</h2>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 font-display font-bold">
                                    {order.customer.name[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-body text-white/80">{order.customer.name}</p>
                                    <p className="text-xs font-body text-white/40">{order.customer.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-5">
                    {/* Update Status */}
                    <div className="card-luxury p-6">
                        <h2 className="font-display text-base font-semibold text-white mb-5">Update Status</h2>
                        <form onSubmit={updateStatus} className="space-y-4">
                            <div className="space-y-2">
                                {Object.entries(statuses).map(([val, info]) => (
                                    <label key={val}
                                        className={`flex items-center gap-3 p-3 cursor-pointer border transition-all duration-200 ${
                                            data.status === val
                                                ? 'border-gold-500/50 bg-gold-500/5'
                                                : 'border-white/5 hover:border-white/15'
                                        }`}>
                                        <input type="radio" name="status" value={val}
                                            checked={data.status === val}
                                            onChange={() => setData('status', val)}
                                            className="text-gold-500 border-white/20 bg-transparent focus:ring-gold-500" />
                                        <span className={`badge-status border text-[10px] ${statusColors[val] || 'bg-white/10 text-white/40 border-white/10'}`}>
                                            {info.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            <button type="submit" disabled={processing || data.status === order.status}
                                className="btn-gold w-full py-3 text-xs disabled:opacity-50">
                                {processing ? 'Updating...' : 'Update Status'}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="card-luxury p-6">
                        <h2 className="font-display text-base font-semibold text-white mb-4">Order Summary</h2>
                        <div className="space-y-3 text-xs font-body">
                            <div className="flex justify-between text-white/40">
                                <span className="tracking-widest uppercase">Order #</span>
                                <span className="text-gold-400/70">{order.order_number}</span>
                            </div>
                            <div className="flex justify-between text-white/40">
                                <span className="tracking-widest uppercase">Placed</span>
                                <span>{order.created_at}</span>
                            </div>
                            <div className="flex justify-between text-white/40">
                                <span className="tracking-widest uppercase">Payment</span>
                                <span className="uppercase">{order.payment_method?.replace('_', ' ')}</span>
                            </div>
                            <div className="flex justify-between text-white/40">
                                <span className="tracking-widest uppercase">Payment Status</span>
                                <span className={order.payment_status === 'paid' ? 'text-green-400' : 'text-yellow-400'}>
                                    {order.payment_status}
                                </span>
                            </div>
                            {order.paid_at && (
                                <div className="flex justify-between text-white/40">
                                    <span className="tracking-widest uppercase">Paid At</span>
                                    <span>{order.paid_at}</span>
                                </div>
                            )}
                            {order.shipped_at && (
                                <div className="flex justify-between text-white/40">
                                    <span className="tracking-widest uppercase">Shipped</span>
                                    <span>{order.shipped_at}</span>
                                </div>
                            )}
                            {order.completed_at && (
                                <div className="flex justify-between text-white/40">
                                    <span className="tracking-widest uppercase">Completed</span>
                                    <span>{order.completed_at}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
