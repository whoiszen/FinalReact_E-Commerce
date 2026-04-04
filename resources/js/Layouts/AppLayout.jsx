import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AppLayout({ children }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const accountRoute = user?.is_admin ? route('admin.dashboard') : route('dashboard');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showFlash, setShowFlash] = useState(!!flash?.success || !!flash?.error);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowFlash(true);
            const t = setTimeout(() => setShowFlash(false), 4000);
            return () => clearTimeout(t);
        }
    }, [flash]);

    const navLinks = [
        { label: 'Home',      href: route('welcome') },
        { label: 'About',     href: route('about') },
        { label: 'Community', href: route('community') },
        { label: 'Shop',      href: route('products.index') },
    ];

    const categories = [
        { slug: 'diamond-rings',     label: 'Diamond Rings' },
        { slug: 'diamond-necklaces', label: 'Necklaces' },
        { slug: 'diamond-bracelets', label: 'Bracelets' },
        { slug: 'diamond-earrings',  label: 'Earrings' },
        { slug: 'diamond-watches',   label: 'Watches' },
        { slug: 'diamond-pendants',  label: 'Pendants' },
        { slug: 'loose-diamonds',    label: 'Loose Diamonds' },
    ];

    return (
        <div className="min-h-screen bg-obsidian text-ivory">
            {/* Flash */}
            {showFlash && (flash?.success || flash?.error) && (
                <div className={`fixed top-4 right-4 z-[100] px-6 py-3 text-sm font-body tracking-wider flex items-center gap-3 shadow-2xl border ${
                    flash?.success
                        ? 'bg-obsidian border-gold-500/50 text-gold-400'
                        : 'bg-obsidian border-red-500/50 text-red-400'
                }`}>
                    <span>{flash?.success || flash?.error}</span>
                    <button onClick={() => setShowFlash(false)} className="text-white/40 hover:text-white">✕</button>
                </div>
            )}

            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled ? 'bg-obsidian/95 backdrop-blur-md border-b border-white/5 shadow-2xl' : 'bg-transparent'
            }`}>
                {/* Top bar */}
                <div className="border-b border-white/5 hidden md:block">
                    <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
                        <p className="text-xs font-body text-white/30 tracking-widest uppercase">
                            ✦ Free Shipping on Orders ₱50,000+
                        </p>
                        <div className="flex items-center gap-6">
                            {user ? (
                                <>
                                    <Link href={accountRoute} className="text-xs font-body text-white/40 hover:text-gold-400 tracking-widest uppercase transition-colors">
                                        {user.is_admin ? 'Admin Home' : 'My Account'}
                                    </Link>
                                    <form method="POST" action={route('logout')} className="inline">
                                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                                        <button type="submit" className="text-xs font-body text-white/40 hover:text-gold-400 tracking-widest uppercase transition-colors">
                                            Logout
                                        </button>
                                    </form>
                                    {user.is_admin && (
                                        <Link href={route('admin.dashboard')} className="text-xs font-body text-gold-500 hover:text-gold-300 tracking-widest uppercase transition-colors">
                                            Admin ↗
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-xs font-body text-white/40 hover:text-gold-400 tracking-widest uppercase transition-colors">Sign In</Link>
                                    <Link href={route('register')} className="text-xs font-body text-gold-500 hover:text-gold-300 tracking-widest uppercase transition-colors">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main nav */}
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href={route('welcome')} className="flex flex-col leading-none">
                            <span className="font-display text-2xl font-bold text-gold-shimmer">LUMINARY</span>
                            <span className="text-[9px] font-body tracking-[0.4em] uppercase text-white/30 -mt-1">Luxury Diamond Co.</span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map(l => (
                                <Link key={l.href} href={l.href} className="nav-link-luxury">{l.label}</Link>
                            ))}
                            {/* Collections Dropdown */}
                            <div className="relative group">
                                <button className="nav-link-luxury flex items-center gap-1">
                                    Collections
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 bg-obsidian border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    {categories.map(c => (
                                        <Link key={c.slug} href={route('products.category', c.slug)}
                                            className="block px-5 py-2.5 text-xs font-body tracking-wider text-white/60 hover:text-gold-400 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                            {c.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right icons */}
                        <div className="flex items-center gap-4">
                            <Link href={route('products.search')} className="text-white/40 hover:text-gold-400 transition-colors p-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </Link>

                            {user && !user.is_admin && (
                                <>
                                    <Link href={route('wishlist.index')} className="text-white/40 hover:text-gold-400 transition-colors p-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </Link>
                                    <Link href={route('cart.index')} className="relative text-white/40 hover:text-gold-400 transition-colors p-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        {user.cart_count > 0 && (
                                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-obsidian text-[10px] font-bold rounded-full flex items-center justify-center">
                                                {user.cart_count}
                                            </span>
                                        )}
                                    </Link>
                                </>
                            )}

                            {/* Mobile hamburger */}
                            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/60 hover:text-gold-400 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {mobileOpen
                                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                                    }
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden bg-obsidian border-t border-white/10">
                        <div className="px-6 py-4 space-y-3">
                            {navLinks.map(l => (
                                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                                    className="block text-sm font-body tracking-widest uppercase text-white/60 hover:text-gold-400 py-2 transition-colors">
                                    {l.label}
                                </Link>
                            ))}
                            <div className="border-t border-white/10 pt-3 space-y-2">
                                {categories.map(c => (
                                    <Link key={c.slug} href={route('products.category', c.slug)} onClick={() => setMobileOpen(false)}
                                        className="block text-xs font-body tracking-wider text-white/40 hover:text-gold-400 py-1.5 pl-3 transition-colors">
                                        — {c.label}
                                    </Link>
                                ))}
                            </div>
                            {user ? (
                                <div className="border-t border-white/10 pt-3 space-y-2">
                                    <Link href={accountRoute} className="block text-sm font-body text-white/60 hover:text-gold-400 py-1 tracking-widest uppercase">
                                        {user.is_admin ? 'Admin Home' : 'Dashboard'}
                                    </Link>
                                    {!user.is_admin && (
                                        <>
                                            <Link href={route('cart.index')} className="block text-sm font-body text-white/60 hover:text-gold-400 py-1 tracking-widest uppercase">Cart ({user.cart_count})</Link>
                                            <Link href={route('wishlist.index')} className="block text-sm font-body text-white/60 hover:text-gold-400 py-1 tracking-widest uppercase">Wishlist</Link>
                                        </>
                                    )}
                                    <form method="POST" action={route('logout')} className="pt-2">
                                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                                        <button type="submit" className="block text-sm font-body text-white/60 hover:text-gold-400 py-1 tracking-widest uppercase w-full text-left">
                                            Logout
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="border-t border-white/10 pt-3 flex gap-4">
                                    <Link href={route('login')} className="text-sm font-body text-white/60 hover:text-gold-400 tracking-widest uppercase">Sign In</Link>
                                    <Link href={route('register')} className="text-sm font-body text-gold-500 tracking-widest uppercase">Register</Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Page content */}
            <main className="pt-20">{children}</main>

            {/* Footer */}
            <footer className="bg-black border-t border-white/5 mt-24">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="md:col-span-1">
                            <div className="font-display text-2xl font-bold text-gold-shimmer mb-2">LUMINARY</div>
                            <p className="text-xs font-body text-white/30 tracking-widest uppercase mb-6">Luxury Diamond Co.</p>
                            <p className="text-sm font-body text-white/40 leading-relaxed">
                                Crafting extraordinary diamond pieces for those who appreciate the finest things in life.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xs font-body font-medium tracking-widest uppercase text-gold-500/70 mb-5">Collections</h4>
                            <ul className="space-y-3">
                                {categories.slice(0, 5).map(c => (
                                    <li key={c.slug}>
                                        <Link href={route('products.category', c.slug)}
                                            className="text-sm font-body text-white/40 hover:text-gold-400 transition-colors">
                                            {c.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-body font-medium tracking-widest uppercase text-gold-500/70 mb-5">Company</h4>
                            <ul className="space-y-3">
                                {[
                                    { label: 'About Us', href: route('about') },
                                    { label: 'Community', href: route('community') },
                                    { label: 'Track Order', href: user ? (user.is_admin ? route('admin.orders.index') : route('orders.index')) : route('login') },
                                ].map(l => (
                                    <li key={l.href}>
                                        <Link href={l.href} className="text-sm font-body text-white/40 hover:text-gold-400 transition-colors">{l.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-body font-medium tracking-widest uppercase text-gold-500/70 mb-5">Newsletter</h4>
                            <p className="text-sm font-body text-white/40 mb-4">Private previews & exclusive offers.</p>
                            <div className="flex">
                                <input type="email" placeholder="your@email.com"
                                    className="flex-1 bg-white/5 border border-white/10 text-white/60 text-xs font-body px-4 py-2.5 focus:outline-none focus:border-gold-500 placeholder-white/20" />
                                <button className="btn-gold px-4 py-2.5 text-xs">→</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs font-body text-white/20">© {new Date().getFullYear()} Luminary Diamond Co. All rights reserved.</p>
                        <div className="flex gap-3">
                            {['VISA', 'MC', 'GCash', 'Bank Transfer', 'COD'].map(p => (
                                <span key={p} className="text-[10px] font-body tracking-wider text-white/20 border border-white/10 px-2 py-1">{p}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
