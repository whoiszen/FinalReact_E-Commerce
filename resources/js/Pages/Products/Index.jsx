import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ProductCard from '@/Components/ProductCard';

export default function ProductsIndex({ products, categories, currentCategory, currentSort, currentQ }) {
    const [search, setSearch] = useState(currentQ || '');

    const applyFilter = (params) => {
        router.get(route('products.index'), {
            category: currentCategory,
            sort: currentSort,
            q: currentQ,
            ...params,
        }, { preserveState: true });
    };

    const sorts = [
        { value: '',           label: 'Featured' },
        { value: 'newest',     label: 'Newest' },
        { value: 'price_asc',  label: 'Price: Low → High' },
        { value: 'price_desc', label: 'Price: High → Low' },
        { value: 'rating',     label: 'Top Rated' },
    ];

    return (
        <AppLayout>
            <Head title="All Collections" />

            {/* Page Header */}
            <section className="py-20 border-b border-white/5 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, #d4971a 0%, transparent 60%)' }} />
                <div className="relative">
                    <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">
                        {currentCategory ? categories[currentCategory] : 'Our Collection'}
                    </span>
                    <h1 className="font-display text-5xl font-bold text-white mt-3 mb-4">
                        {currentCategory ? categories[currentCategory] : 'All Diamonds'}
                    </h1>
                    <div className="section-divider" />
                    <p className="font-body text-white/40 mt-4 max-w-md mx-auto text-sm">
                        {products.total} certified pieces available
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-56 flex-shrink-0">
                        {/* Search */}
                        <form onSubmit={e => { e.preventDefault(); applyFilter({ q: search }); }}
                            className="mb-8">
                            <div className="relative">
                                <input type="text" placeholder="Search diamonds..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="input-luxury w-full px-4 py-2.5 pr-10 text-sm" />
                                <button type="submit"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-gold-400 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        {/* Categories */}
                        <div className="mb-8">
                            <h3 className="text-[10px] font-body tracking-[0.3em] uppercase text-gold-500/60 mb-4">Collections</h3>
                            <div className="space-y-1">
                                <button
                                    onClick={() => applyFilter({ category: '' })}
                                    className={`w-full text-left text-xs font-body tracking-wider py-2 px-3 transition-all duration-200 ${
                                        !currentCategory
                                            ? 'text-gold-400 bg-gold-500/10 border-l-2 border-gold-500'
                                            : 'text-white/40 hover:text-gold-400 border-l-2 border-transparent hover:bg-white/5'
                                    }`}>
                                    All Pieces
                                </button>
                                {Object.entries(categories).map(([slug, label]) => (
                                    <button key={slug}
                                        onClick={() => applyFilter({ category: slug })}
                                        className={`w-full text-left text-xs font-body tracking-wider py-2 px-3 transition-all duration-200 ${
                                            currentCategory === slug
                                                ? 'text-gold-400 bg-gold-500/10 border-l-2 border-gold-500'
                                                : 'text-white/40 hover:text-gold-400 border-l-2 border-transparent hover:bg-white/5'
                                        }`}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort */}
                        <div>
                            <h3 className="text-[10px] font-body tracking-[0.3em] uppercase text-gold-500/60 mb-4">Sort By</h3>
                            <div className="space-y-1">
                                {sorts.map(s => (
                                    <button key={s.value}
                                        onClick={() => applyFilter({ sort: s.value })}
                                        className={`w-full text-left text-xs font-body tracking-wider py-2 px-3 transition-all duration-200 ${
                                            currentSort === s.value || (!currentSort && s.value === '')
                                                ? 'text-gold-400 bg-gold-500/10 border-l-2 border-gold-500'
                                                : 'text-white/40 hover:text-gold-400 border-l-2 border-transparent hover:bg-white/5'
                                        }`}>
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Clear filters */}
                        {(currentCategory || currentSort || currentQ) && (
                            <button onClick={() => router.get(route('products.index'))}
                                className="mt-6 w-full btn-outline-gold py-2 text-[10px]">
                                Clear All Filters
                            </button>
                        )}
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Active filter chips */}
                        {(currentCategory || currentQ) && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {currentCategory && (
                                    <span className="flex items-center gap-2 text-xs font-body text-gold-400 border border-gold-500/30 bg-gold-500/5 px-3 py-1">
                                        {categories[currentCategory]}
                                        <button onClick={() => applyFilter({ category: '' })} className="hover:text-white">✕</button>
                                    </span>
                                )}
                                {currentQ && (
                                    <span className="flex items-center gap-2 text-xs font-body text-gold-400 border border-gold-500/30 bg-gold-500/5 px-3 py-1">
                                        "{currentQ}"
                                        <button onClick={() => { setSearch(''); applyFilter({ q: '' }); }} className="hover:text-white">✕</button>
                                    </span>
                                )}
                            </div>
                        )}

                        {products.data.length === 0 ? (
                            <div className="text-center py-24">
                                <div className="text-5xl text-white/10 mb-4 font-display">◇</div>
                                <h3 className="font-display text-xl text-white/40 mb-2">No pieces found</h3>
                                <p className="text-sm font-body text-white/30 mb-6">Try adjusting your filters</p>
                                <button onClick={() => router.get(route('products.index'))}
                                    className="btn-outline-gold px-8 py-2.5">
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {products.data.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {products.last_page > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-14">
                                        {products.links.map((link, i) => (
                                            <button key={i}
                                                onClick={() => link.url && router.get(link.url)}
                                                disabled={!link.url}
                                                className={`px-4 py-2 text-xs font-body border transition-all ${
                                                    link.active
                                                        ? 'border-gold-500 text-gold-400 bg-gold-500/10'
                                                        : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/50'
                                                } disabled:opacity-20`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
