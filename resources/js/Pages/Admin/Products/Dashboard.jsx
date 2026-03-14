import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const StatCard = ({ label, value, icon, sub, color = 'gold' }) => (
    <div className="card-luxury p-6 relative overflow-hidden group hover:border-gold-500/20 transition-all duration-300">
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 ${color === 'gold' ? 'bg-gold-500' : color === 'blue' ? 'bg-blue-500' : color === 'green' ? 'bg-green-500' : 'bg-red-500'}`} />
        <div className="relative">
            <div className="text-2xl mb-3">{icon}</div>
            <div className="font-display text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs font-body tracking-widest uppercase text-white/40">{label}</div>
            {sub && <div className="text-xs font-body text-white/20 mt-2">{sub}</div>}
        </div>
    </div>
);

const statusColors = {
    pending:   'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
    paid:      'bg-blue-500/20 text-blue-400 border-blue-500/20',
    shipped:   'bg-purple-500/20 text-purple-400 border-purple-500/20',
    completed: 'bg-green-500/20 text-green-400 border-green-500/20',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/20',
};

export default function AdminDashboard({ stats, lowStock, recentOrders }) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatCard
                    label="Total Sales"
                    value={`₱${Number(stats.totalSales).toLocaleString()}`}
                    icon="◈"
                    color="gold"
                    sub="All completed orders"
                />
                <StatCard
                    label="Total Orders"
                    value={stats.totalOrders}
                    icon="◻"
                    color="blue"
                    sub="Lifetime orders"
                />
                <StatCard
                    label="Customers"
                    value={stats.totalCustomers}
                    icon="◇"
                    color="green"
                    sub="Registered accounts"
                />
                <StatCard
                    label="Low Stock"
                    value={stats.lowStockCount}
                    icon="⚠"
                    color={stats.lowStockCount > 0 ? 'red' : 'green'}
                    sub={stats.lowStockCount > 0 ? 'Needs restocking' : 'All well stocked'}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2 card-luxury p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display text-lg font-semibold text-white">Recent Orders</h2>
                        <Link href={route('admin.orders.index')} className="text-xs font-body tracking-widest uppercase text-gold-500/60 hover:text-gold-400 transition-colors">
                            View All →
                        </Link>
                    </div>
                    <table className="w-full table-luxury">
                        <thead>
                            <tr>
                                <th className="text-left">Order</th>
                                <th className="text-left">Customer</th>
                                <th className="text-left">Status</th>
                                <th className="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center text-white/30 py-8 font-body text-sm">No orders yet</td>
                                </tr>
                            )}
                            {recentOrders.map(order => (
                                <tr key={order.id}>
                                    <td>
                                        <Link href={route('admin.orders.show', order.id)}
                                            className="font-body text-gold-400/80 hover:text-gold-400 transition-colors text-xs tracking-wider">
                                            {order.order_number}
                                        </Link>
                                        <div className="text-[10px] text-white/20">{order.created_at}</div>
                                    </td>
                                    <td className="font-body text-sm text-white/60">{order.customer}</td>
                                    <td>
                                        <span className={`badge-status border text-[10px] ${statusColors[order.status] || 'bg-white/10 text-white/40 border-white/10'}`}>
                                            {order.status_info.label}
                                        </span>
                                    </td>
                                    <td className="text-right font-display text-sm text-gold-400">
                                        ₱{Number(order.total).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Low Stock Alert */}
                <div className="card-luxury p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display text-lg font-semibold text-white">Low Stock Alert</h2>
                        {stats.lowStockCount > 0 && (
                            <span className="w-5 h-5 rounded-full bg-red-500/30 text-red-400 text-[10px] flex items-center justify-center">
                                {stats.lowStockCount}
                            </span>
                        )}
                    </div>

                    {lowStock.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-3xl mb-3">✓</div>
                            <p className="text-sm font-body text-white/30">All products well stocked</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {lowStock.map(p => (
                                <div key={p.id} className="flex items-center gap-3 p-3 bg-red-950/20 border border-red-500/10">
                                    <img
                                        src={p.primary_image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80'}
                                        alt={p.name}
                                        className="w-10 h-10 object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-body text-white/70 truncate">{p.name}</div>
                                        <div className="text-[10px] font-body text-white/30 tracking-wider">{p.category_label}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-display font-bold text-red-400">{p.stock}</div>
                                        <div className="text-[10px] font-body text-white/30">left</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Link href={route('admin.products.index')}
                        className="mt-4 block text-center text-xs font-body tracking-widest uppercase text-gold-500/60 hover:text-gold-400 transition-colors border border-white/10 py-2 hover:border-gold-500/30">
                        Manage Products →
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
