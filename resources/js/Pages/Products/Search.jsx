import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ProductCard from '@/Components/ProductCard';

export default function ProductSearch({ products, term, categories }) {
    const [q, setQ] = useState(term || '');

    const doSearch = (e) => {
        e.preventDefault();
        router.get(route('products.search'), { q });
    };

    return (
        <AppLayout>
            <Head title={term ? `Search: ${term}` : 'Search'} />

            <section className="py-20 border-b border-white/5 text-center">
                <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">Search</span>
                <h1 className="font-display text-5xl font-bold text-white mt-3 mb-8">Find Your Diamond</h1>

                <form onSubmit={doSearch} className="max-w-xl mx-auto px-6">
                    <div className="flex">
                        <input type="text" value={q} onChange={e => setQ(e.target.value)}
                            placeholder="Search by name, material, metal..."
                            className="input-luxury flex-1 px-5 py-3.5 text-sm" />
                        <button type="submit" className="btn-gold px-8 py-3.5 text-xs flex-shrink-0">
                            Search
                        </button>
                    </div>
                </form>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {term && (
                    <p className="text-sm font-body text-white/40 mb-8">
                        {products.total} result{products.total !== 1 ? 's' : ''} for
                        <span className="text-gold-400 ml-1">"{term}"</span>
                    </p>
                )}

                {products.data.length === 0 && term ? (
                    <div className="text-center py-24">
                        <div className="text-5xl text-white/10 mb-4 font-display">◇</div>
                        <h3 className="font-display text-xl text-white/40 mb-2">No results for "{term}"</h3>
                        <p className="text-sm font-body text-white/30 mb-8">Try a different search term or browse our collections</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {Object.entries(categories).map(([slug, label]) => (
                                <Link key={slug} href={route('products.category', slug)}
                                    className="text-xs font-body border border-white/10 px-4 py-2 text-white/40 hover:border-gold-500/30 hover:text-gold-400 transition-all">
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.data.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
