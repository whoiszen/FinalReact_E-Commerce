import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const statusColors = {
    pending:   'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
    paid:      'bg-blue-500/20 text-blue-400 border-blue-500/20',
    shipped:   'bg-purple-500/20 text-purple-400 border-purple-500/20',
    completed: 'bg-green-500/20 text-green-400 border-green-500/20',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/20',
};

export default function OrdersIndex({ orders }) {
    return (
        <AppLayout>
            <Head title="My Orders" />

            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="font-display text-4xl font-bold text-white mb-10">My Orders</h1>

                {orders.data.length === 0 ? (
                    <div className="text-center py-24 card-luxury">
                        <div className="text-6xl text-white/10 font-display mb-4">◻</div>
                        <h2 className="font-display text-2xl font-bold text-white/40 mb-3">No orders yet</h2>
                        <p className="text-sm font-body text-white/30 mb-8">Your order history will appear here</p>
                        <Link href={route('products.index')} className="btn-gold px-10 py-3.5">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.data.map(order => (
                            <Link key={order.id} href={route('orders.show', order.id)}
                                className="card-luxury p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-gold-500/20 transition-all duration-300 block group">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-xs font-body tracking-widest text-gold-400/70 group-hover:text-gold-400 transition-colors">
                                            {order.order_number}
                                        </span>
                                        <span className={`badge-status border text-[10px] ${statusColors[order.status] || 'bg-white/10 text-white/40 border-white/10'}`}>
                                            {order.status_info.label}
                                        </span>
                                    </div>
                                    <p className="text-xs font-body text-white/30">{order.created_at}</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-display text-lg font-semibold text-gold-400">
                                        ₱{Number(order.total).toLocaleString()}
                                    </div>
                                    <div className="text-[10px] font-body text-white/30">
                                        {order.items_count} item{order.items_count !== 1 ? 's' : ''}
                                    </div>
                                </div>
                                <span className="text-white/20 group-hover:text-gold-400/60 transition-colors text-lg">→</span>
                            </Link>
                        ))}

                        {/* Pagination */}
                        {orders.last_page > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                {orders.links.map((link, i) => (
                                    <button key={i} onClick={() => link.url && router.get(link.url)} disabled={!link.url}
                                        className={`px-4 py-2 text-xs font-body border transition-all ${link.active ? 'border-gold-500 text-gold-400 bg-gold-500/10' : 'border-white/10 text-white/30 hover:border-white/20'} disabled:opacity-20`}
                                        dangerouslySetInnerHTML={{ __html: link.label }} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
