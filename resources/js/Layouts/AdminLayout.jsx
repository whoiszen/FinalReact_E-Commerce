import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

const NavItem = ({ href, icon, label, active }) => (
    <Link href={href}
        className={`flex items-center gap-3 px-4 py-2.5 text-xs font-body tracking-widest uppercase transition-all duration-200 ${
            active
                ? 'text-gold-400 bg-gold-500/10 border-l-2 border-gold-500'
                : 'text-white/40 hover:text-gold-400 hover:bg-white/5 border-l-2 border-transparent'
        }`}>
        <span className="text-base">{icon}</span>
        {label}
    </Link>
);

export default function AdminLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { href: route('admin.dashboard'),       icon: '◈', label: 'Dashboard',   match: 'admin.dashboard' },
        { href: route('admin.products.index'),  icon: '◇', label: 'Products',    match: 'admin.products.*' },
        { href: route('admin.orders.index'),    icon: '◻', label: 'Orders',      match: 'admin.orders.*' },
    ];

    const logout = () => router.post(route('logout'));

    return (
        <div className="min-h-screen bg-obsidian flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-black border-r border-white/5 flex flex-col transition-transform duration-300 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}>
                {/* Logo */}
                <div className="px-6 py-6 border-b border-white/5">
                    <Link href={route('admin.dashboard')} className="block">
                        <div className="font-display text-xl font-bold text-gold-shimmer">LUMINARY</div>
                        <div className="text-[9px] font-body tracking-[0.4em] uppercase text-white/20 mt-0.5">Admin Console</div>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-6 space-y-1">
                    {navItems.map(item => (
                        <NavItem key={item.href} {...item}
                            active={route().current(item.match)} />
                    ))}
                </nav>

                {/* User */}
                <div className="px-4 py-4 border-t border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 text-sm font-display font-bold">
                            {auth.user?.name[0]}
                        </div>
                        <div>
                            <div className="text-xs font-body text-white/70">{auth.user?.name}</div>
                            <div className="text-[10px] font-body text-white/30 tracking-widest uppercase">Administrator</div>
                        </div>
                    </div>
                    <Link href={route('welcome')}
                        className="block text-[10px] font-body tracking-widest uppercase text-white/30 hover:text-gold-400 transition-colors mb-1.5">
                        ← View Store
                    </Link>
                    <button onClick={logout}
                        className="text-[10px] font-body tracking-widest uppercase text-red-500/50 hover:text-red-400 transition-colors">
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Overlay mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main */}
            <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="bg-black border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-white/40 hover:text-gold-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {title && (
                            <h1 className="font-display text-lg font-semibold text-white/90">{title}</h1>
                        )}
                    </div>
                    <div className="text-xs font-body text-white/20 tracking-widest uppercase hidden md:block">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </header>

                {/* Flash */}
                {(flash?.success || flash?.error) && (
                    <div className={`mx-6 mt-4 px-5 py-3 text-sm font-body tracking-wider border ${
                        flash?.success
                            ? 'bg-green-950/30 border-green-500/30 text-green-400'
                            : 'bg-red-950/30 border-red-500/30 text-red-400'
                    }`}>
                        {flash?.success || flash?.error}
                    </div>
                )}

                {/* Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
