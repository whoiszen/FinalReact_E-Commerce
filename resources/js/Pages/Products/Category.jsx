import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ProductCard from '@/Components/ProductCard';

export default function ProductCategory({ products, category, categoryLabel, categories }) {
    return (
        <AppLayout>
            <Head title={categoryLabel} />

            <section className="py-20 border-b border-white/5 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, #d4971a 0%, transparent 60%)' }} />
                <div className="relative">
                    <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">Collection</span>
                    <h1 className="font-display text-5xl font-bold text-white mt-3 mb-4">{categoryLabel}</h1>
                    <div className="section-divider" />
                    <p className="font-body text-white/40 mt-4 text-sm">{products.total} certified pieces</p>
                </div>
            </section>

            {/* Category tabs */}
            <div className="border-b border-white/5 overflow-x-auto">
                <div className="max-w-7xl mx-auto px-6 flex gap-0">
                    <Link href={route('products.index')}
                        className="text-[10px] font-body tracking-widest uppercase px-5 py-4 text-white/30 hover:text-gold-400 transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-gold-500/30">
                        All
                    </Link>
                    {Object.entries(categories).map(([slug, label]) => (
                        <Link key={slug} href={route('products.category', slug)}
                            className={`text-[10px] font-body tracking-widest uppercase px-5 py-4 whitespace-nowrap border-b-2 transition-colors ${
                                category === slug
                                    ? 'text-gold-400 border-gold-500'
                                    : 'text-white/30 hover:text-gold-400 border-transparent hover:border-gold-500/30'
                            }`}>
                            {label.replace('Diamond ', '')}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {products.data.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="text-5xl text-white/10 mb-4 font-display">◇</div>
                        <h3 className="font-display text-xl text-white/40 mb-2">No pieces in this collection yet</h3>
                        <Link href={route('products.index')} className="btn-outline-gold px-8 py-2.5 mt-4 inline-block">
                            Browse All
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.data.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                        {products.last_page > 1 && (
                            <div className="flex justify-center gap-2 mt-14">
                                {products.links.map((link, i) => (
                                    <button key={i} onClick={() => link.url && router.get(link.url)} disabled={!link.url}
                                        className={`px-4 py-2 text-xs font-body border transition-all ${link.active ? 'border-gold-500 text-gold-400 bg-gold-500/10' : 'border-white/10 text-white/30 hover:border-white/20'} disabled:opacity-20`}
                                        dangerouslySetInnerHTML={{ __html: link.label }} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AppLayout>
    );
}
