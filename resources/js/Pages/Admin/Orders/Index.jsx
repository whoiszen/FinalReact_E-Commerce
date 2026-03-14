import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';

const statusColors = {
    pending:   'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
    paid:      'bg-blue-500/20 text-blue-400 border-blue-500/20',
    shipped:   'bg-purple-500/20 text-purple-400 border-purple-500/20',
    completed: 'bg-green-500/20 text-green-400 border-green-500/20',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/20',
};

export default function AdminOrdersIndex({ orders, statuses, filters }) {
    const [search, setSearch] = useState(filters?.q || '');
    const [status, setStatus] = useState(filters?.status || '');

    const applyFilters = (e) => {
        e.preventDefault();
        router.get(route('admin.orders.index'), { q: search, status }, { preserveState: true });
    };

    return (
        <AdminLayout title="Orders">
            <Head title="Admin — Orders" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm font-body text-white/40">{orders.total} orders total</p>
            </div>

            {/* Filters */}
            <form onSubmit={applyFilters} className="flex flex-wrap gap-3 mb-6">
                <input type="text" placeholder="Search order # or customer..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    className="input-luxury px-4 py-2 text-sm flex-1 min-w-48" />
                <select value={status} onChange={e => setStatus(e.target.value)}
                    className="input-luxury px-4 py-2 text-sm">
                    <option value="">All Statuses</option>
                    {Object.entries(statuses).map(([val, info]) => (
                        <option key={val} value={val}>{info.label}</option>
                    ))}
                </select>
                <button type="submit" className="btn-gold px-6 py-2 text-xs">Filter</button>
                {(filters?.q || filters?.status) && (
                    <button type="button" onClick={() => router.get(route('admin.orders.index'))}
                        className="btn-outline-gold px-4 py-2 text-xs">Clear</button>
                )}
            </form>

            {/* Table */}
            <div className="card-luxury overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full table-luxury">
                        <thead>
                            <tr>
                                <th className="text-left pl-6">Order</th>
                                <th className="text-left">Customer</th>
                                <th className="text-left">Date</th>
                                <th className="text-left">Payment</th>
                                <th className="text-center">Status</th>
                                <th className="text-right">Total</th>
                                <th className="text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.length === 0 && (
                                <tr><td colSpan={7} className="text-center py-16 text-white/30 font-body text-sm">No orders found</td></tr>
                            )}
                            {orders.data.map(order => (
                                <tr key={order.id} className="hover:bg-white/2 transition-colors">
                                    <td className="pl-6">
                                        <Link href={route('admin.orders.show', order.id)}
                                            className="text-xs font-body text-gold-400/80 hover:text-gold-400 transition-colors tracking-wider">
                                            {order.order_number}
                                        </Link>
                                    </td>
                                    <td>
                                        <div className="text-sm font-body text-white/60">{order.customer?.name}</div>
                                        <div className="text-[10px] font-body text-white/30">{order.customer?.email}</div>
                                    </td>
                                    <td className="text-sm font-body text-white/40">{order.created_at}</td>
                                    <td>
                                        <span className="text-xs font-body text-white/40 tracking-wider uppercase">
                                            {order.payment_method?.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <span className={`badge-status border text-[10px] ${statusColors[order.status] || 'bg-white/10 text-white/40 border-white/10'}`}>
                                            {order.status_info.label}
                                        </span>
                                    </td>
                                    <td className="text-right font-display text-sm text-gold-400">
                                        ₱{Number(order.total).toLocaleString()}
                                    </td>
                                    <td className="text-right pr-6">
                                        <Link href={route('admin.orders.show', order.id)}
                                            className="text-xs font-body text-white/40 hover:text-gold-400 transition-colors tracking-wider">
                                            View →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {orders.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs font-body text-white/30">
                            Page {orders.current_page} of {orders.last_page}
                        </span>
                        <div className="flex gap-2">
                            {orders.links.map((link, i) => (
                                <button key={i} onClick={() => link.url && router.get(link.url)} disabled={!link.url}
                                    className={`px-3 py-1 text-xs font-body border transition-all ${link.active ? 'border-gold-500 text-gold-400 bg-gold-500/10' : 'border-white/10 text-white/30 hover:border-white/20'} disabled:opacity-30`}
                                    dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
