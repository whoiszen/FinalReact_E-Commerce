import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const statusColors = {
    pending:   'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
    paid:      'bg-blue-500/20 text-blue-400 border-blue-500/20',
    shipped:   'bg-purple-500/20 text-purple-400 border-purple-500/20',
    completed: 'bg-green-500/20 text-green-400 border-green-500/20',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/20',
};

export default function Dashboard({ recentOrders, cartCount, wishlistCount, totalOrders, totalSpent }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const stats = [
        { label: 'Total Orders',  value: totalOrders,                             icon: '◻', href: route('orders.index') },
        { label: 'Total Spent',   value: `₱${Number(totalSpent).toLocaleString()}`, icon: '◈', href: route('orders.index') },
        { label: 'Cart Items',    value: cartCount,                               icon: '◇', href: route('cart.index') },
        { label: 'Wishlist',      value: wishlistCount,                           icon: '♡', href: route('wishlist.index') },
    ];

    const quickLinks = [
        { label: 'Browse Collections', icon: '◇', href: route('products.index'),  desc: 'Explore diamonds' },
        { label: 'My Orders',          icon: '◻', href: route('orders.index'),    desc: 'Track & manage' },
        { label: 'Cart',               icon: '◈', href: route('cart.index'),      desc: `${cartCount} items` },
        { label: 'Wishlist',           icon: '♡', href: route('wishlist.index'),  desc: `${wishlistCount} saved` },
        { label: 'Edit Profile',       icon: '✦', href: route('profile.edit'),    desc: 'Account settings' },
    ];

    return (
        <AppLayout>
            <Head title="My Account" />

            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Welcome */}
                <div className="flex items-start justify-between mb-12">
                    <div>
                        <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">Welcome Back</span>
                        <h1 className="font-display text-4xl font-bold text-white mt-2">
                            {user.name.split(' ')[0]}
                        </h1>
                        <p className="font-body text-sm text-white/30 mt-1">{user.email}</p>
                    </div>
                    <Link href={route('profile.edit')} className="btn-outline-gold px-5 py-2.5 text-xs hidden sm:block">
                        Edit Profile
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {stats.map(s => (
                        <Link key={s.label} href={s.href}
                            className="card-luxury p-5 hover:border-gold-500/20 transition-all duration-300 group">
                            <div className="text-xl text-gold-500/40 mb-3 font-display group-hover:text-gold-400 transition-colors">
                                {s.icon}
                            </div>
                            <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                            <div className="text-[10px] font-body tracking-widest uppercase text-white/30 mt-1">{s.label}</div>
                        </Link>
                    ))}
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
                    {quickLinks.map(l => (
                        <Link key={l.href} href={l.href}
                            className="card-luxury p-4 text-center hover:border-gold-500/20 transition-all duration-300 group">
                            <div className="text-2xl text-gold-500/40 mb-2 font-display group-hover:text-gold-400 transition-colors">
                                {l.icon}
                            </div>
                            <div className="text-xs font-body font-medium text-white/70 group-hover:text-white/90 transition-colors">
                                {l.label}
                            </div>
                            <div className="text-[10px] font-body text-white/25 mt-0.5">{l.desc}</div>
                        </Link>
                    ))}
                </div>

                {/* Recent Orders */}
                <div className="card-luxury p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display text-lg font-semibold text-white">Recent Orders</h2>
                        <Link href={route('orders.index')}
                            className="text-xs font-body tracking-widest uppercase text-gold-500/60 hover:text-gold-400 transition-colors">
                            View All →
                        </Link>
                    </div>

                    {recentOrders.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="text-3xl text-white/10 mb-3 font-display">◻</div>
                            <p className="text-sm font-body text-white/30">No orders placed yet</p>
                            <Link href={route('products.index')} className="btn-gold px-8 py-3 mt-4 inline-block text-xs">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentOrders.map(order => (
                                <Link key={order.id} href={route('orders.show', order.id)}
                                    className="flex items-center justify-between p-4 border border-white/5 hover:border-white/15 transition-all duration-200 group">
                                    <div>
                                        <span className="text-xs font-body tracking-wider text-gold-400/70 group-hover:text-gold-400 transition-colors">
                                            {order.order_number}
                                        </span>
                                        <p className="text-[10px] font-body text-white/30 mt-0.5">{order.created_at}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`badge-status border text-[10px] ${statusColors[order.status] || 'bg-white/10 text-white/40 border-white/10'}`}>
                                            {order.status_info.label}
                                        </span>
                                        <span className="font-display text-sm text-gold-400">
                                            ₱{Number(order.total).toLocaleString()}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
