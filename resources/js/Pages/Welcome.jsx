import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ProductCard from '@/Components/ProductCard';

export default function Welcome({ featured, categories, categoryCounts }) {
    const categoryIcons = {
        'diamond-rings':     '💍',
        'diamond-necklaces': '📿',
        'diamond-bracelets': '✨',
        'diamond-earrings':  '💎',
        'diamond-watches':   '⌚',
        'diamond-pendants':  '🔮',
        'loose-diamonds':    '◇',
    };

    return (
        <AppLayout>
            <Head title="Luxury Diamond Accessories" />

            {/* ── Hero ── */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-diamond-gradient" />
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #d4971a22 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6b55a322 0%, transparent 50%)' }} />
                {/* Grain overlay */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

                <div className="relative max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Text */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-px w-12 bg-gold-500/50" />
                            <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/70">
                                Certified Luxury Since 2010
                            </span>
                        </div>

                        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-8">
                            <span className="text-white">Diamonds</span>
                            <br />
                            <span className="text-gold-shimmer">Reimagined</span>
                            <br />
                            <span className="text-white/40 text-4xl md:text-5xl">for Eternity</span>
                        </h1>

                        <p className="font-body text-white/50 text-base leading-relaxed mb-10 max-w-md">
                            Each piece is a testament to nature's most extraordinary creation —
                            GIA-certified diamonds, masterfully set by artisan hands.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href={route('products.index')} className="btn-gold px-10 py-4 text-center">
                                Explore Collection
                            </Link>
                            <Link href={route('about')} className="btn-outline-gold px-10 py-4 text-center">
                                Our Story
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-14 grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
                            {[
                                { value: '2,400+', label: 'Diamonds Sold' },
                                { value: 'GIA', label: 'All Certified' },
                                { value: '14yr', label: 'Heritage' },
                            ].map(s => (
                                <div key={s.label}>
                                    <div className="font-display text-2xl font-bold text-gold-400">{s.value}</div>
                                    <div className="text-[10px] font-body tracking-widest uppercase text-white/30 mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hero visual */}
                    <div className="hidden lg:block relative">
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            <div className="absolute inset-8 rounded-full border border-gold-500/10 animate-[spin_30s_linear_infinite]" />
                            <div className="absolute inset-16 rounded-full border border-gold-500/5 animate-[spin_20s_linear_infinite_reverse]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full animate-glow" />
                                    <img
                                        src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500"
                                        alt="Diamond Ring"
                                        className="relative w-80 h-80 object-cover rounded-full border-2 border-gold-500/20 shadow-2xl animate-float"
                                    />
                                </div>
                            </div>
                            {/* Floating badges */}
                            <div className="absolute top-8 -right-4 bg-black/80 border border-white/10 backdrop-blur-sm px-4 py-3">
                                <div className="text-[10px] font-body tracking-widest uppercase text-white/40">Certified</div>
                                <div className="font-display text-sm font-bold text-gold-400 mt-0.5">GIA ◇ IGI</div>
                            </div>
                            <div className="absolute bottom-8 -left-4 bg-black/80 border border-white/10 backdrop-blur-sm px-4 py-3">
                                <div className="text-[10px] font-body tracking-widest uppercase text-white/40">Free Shipping</div>
                                <div className="font-display text-sm font-bold text-gold-400 mt-0.5">₱50,000+</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll cue */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-[10px] font-body tracking-widest uppercase text-white/40">Discover</span>
                    <div className="w-px h-12 bg-gradient-to-b from-gold-500/50 to-transparent animate-pulse" />
                </div>
            </section>

            {/* ── Categories ── */}
            <section className="py-24 bg-black/40">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">Browse By Type</span>
                        <h2 className="font-display text-4xl font-bold text-white mt-3 mb-4">Our Collections</h2>
                        <div className="section-divider" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {Object.entries(categories).map(([slug, label]) => (
                            <Link key={slug} href={route('products.category', slug)}
                                className="group card-luxury p-5 text-center hover:border-gold-500/30 transition-all duration-300">
                                <div className="text-3xl mb-3">{categoryIcons[slug] || '✦'}</div>
                                <div className="text-xs font-body font-medium tracking-wider text-white/60 group-hover:text-gold-400 transition-colors leading-snug">
                                    {label.replace('Diamond ', '')}
                                </div>
                                <div className="text-[10px] text-white/20 mt-1 font-body">{categoryCounts[slug] || 0} pieces</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Products ── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-14">
                        <div>
                            <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">Curator's Selection</span>
                            <h2 className="font-display text-4xl font-bold text-white mt-2">Featured Pieces</h2>
                        </div>
                        <Link href={route('products.index')} className="btn-outline-gold px-6 py-2.5 text-center hidden md:block">
                            View All
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featured.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why Us ── */}
            <section className="py-24 bg-black/40">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">The Luminary Promise</span>
                        <h2 className="font-display text-4xl font-bold text-white mt-3 mb-4">Why Choose Luminary</h2>
                        <div className="section-divider" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: '◇', title: 'GIA Certified', desc: 'Every diamond accompanied by a GIA or IGI certificate guaranteeing quality and authenticity.' },
                            { icon: '◈', title: 'Master Crafted', desc: 'Each piece is hand-crafted by certified master jewelers with decades of experience.' },
                            { icon: '◻', title: 'Lifetime Warranty', desc: 'Our diamonds and settings are backed by a comprehensive lifetime warranty.' },
                            { icon: '✦', title: 'White Glove Service', desc: 'Complimentary sizing, cleaning, and insured delivery on every order.' },
                        ].map(item => (
                            <div key={item.title} className="card-luxury p-8 text-center hover:border-gold-500/20 transition-all duration-300 group">
                                <div className="text-3xl text-gold-500/60 mb-4 group-hover:text-gold-400 transition-colors font-display">
                                    {item.icon}
                                </div>
                                <h3 className="font-display text-lg font-semibold text-white mb-3">{item.title}</h3>
                                <p className="text-sm font-body text-white/40 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">Client Stories</span>
                        <h2 className="font-display text-4xl font-bold text-white mt-3">Voices of Distinction</h2>
                        <div className="section-divider mt-4" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Isabella R.', location: 'Manila', text: 'The 2-carat solitaire exceeded every expectation. The GIA certification gave me complete confidence. Luminary is truly in a class of its own.', rating: 5 },
                            { name: 'Miguel C.', location: 'Cebu', text: 'Proposed with the Eternal Rose ring. She cried. The craftsmanship is extraordinary — you can feel the quality immediately.', rating: 5 },
                            { name: 'Sophia T.', location: 'BGC', text: 'My tennis bracelet is a work of art. Every diamond is perfectly matched. The white glove delivery experience was impeccable.', rating: 5 },
                        ].map(r => (
                            <div key={r.name} className="card-luxury p-8 relative">
                                <div className="text-4xl font-display text-gold-500/20 absolute top-6 right-8">"</div>
                                <div className="flex mb-4">
                                    {[...Array(r.rating)].map((_, i) => (
                                        <span key={i} className="text-gold-400 text-sm">★</span>
                                    ))}
                                </div>
                                <p className="font-body text-white/50 text-sm leading-relaxed mb-6 italic">"{r.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 font-display font-bold text-sm">
                                        {r.name[0]}
                                    </div>
                                    <div>
                                        <div className="text-sm font-body font-medium text-white/80">{r.name}</div>
                                        <div className="text-[10px] font-body tracking-widest uppercase text-white/30">{r.location}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 bg-gradient-to-r from-black via-diamond-900/30 to-black border-y border-white/5">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">Begin Your Journey</span>
                    <h2 className="font-display text-5xl font-bold text-white mt-4 mb-6">
                        Find Your Perfect<br />
                        <span className="text-gold-shimmer">Diamond</span>
                    </h2>
                    <p className="font-body text-white/40 mb-10 max-w-lg mx-auto">
                        Every great love story deserves an extraordinary diamond. Let us help you find the one.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={route('products.index')} className="btn-gold px-12 py-4">
                            Shop All Diamonds
                        </Link>
                        <Link href={route('register')} className="btn-outline-gold px-12 py-4">
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
