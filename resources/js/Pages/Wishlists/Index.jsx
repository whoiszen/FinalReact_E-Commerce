import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function WishlistIndex({ items }) {
    const removeItem = (productId) => {
        router.post(route('wishlist.toggle', productId), {}, { preserveScroll: true });
    };

    const addToCart = (productId) => {
        router.post(route('cart.add', productId), { quantity: 1 }, { preserveScroll: true });
    };

    return (
        <AppLayout>
            <Head title="My Wishlist" />

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-10">
                    <h1 className="font-display text-4xl font-bold text-white">Wishlist</h1>
                    {items.length > 0 && (
                        <span className="text-sm font-body text-white/30">{items.length} saved piece{items.length !== 1 ? 's' : ''}</span>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-28 card-luxury">
                        <div className="text-6xl text-white/10 font-display mb-4">♡</div>
                        <h2 className="font-display text-2xl font-bold text-white/40 mb-3">Your wishlist is empty</h2>
                        <p className="text-sm font-body text-white/30 mb-8">Save pieces you love for later</p>
                        <Link href={route('products.index')} className="btn-gold px-10 py-3.5">
                            Explore Collections
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="card-luxury p-5 flex flex-col sm:flex-row sm:items-center gap-5 hover:border-white/15 transition-all duration-300">
                                <Link href={route('products.show', item.product.slug)} className="flex-shrink-0">
                                    <img
                                        src={item.product.primary_image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200'}
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover border border-white/5"
                                    />
                                </Link>

                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-body tracking-widest uppercase text-gold-500/60 mb-0.5">
                                        {item.product.category_label}
                                    </p>
                                    <Link href={route('products.show', item.product.slug)}>
                                        <h3 className="font-display text-base font-semibold text-white/90 hover:text-gold-400 transition-colors leading-snug">
                                            {item.product.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-baseline gap-2 mt-2">
                                        <span className="font-display text-sm font-bold text-gold-400">
                                            ₱{Number(item.product.current_price).toLocaleString()}
                                        </span>
                                        {item.product.is_on_sale && (
                                            <span className="text-xs font-body text-white/30 line-through">
                                                ₱{Number(item.product.price).toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${item.product.stock > 0 ? 'bg-green-400' : 'bg-red-400'}`} />
                                        <span className="text-[10px] font-body text-white/30">
                                            {item.product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 flex-shrink-0">
                                    {item.product.stock > 0 && (
                                        <button onClick={() => addToCart(item.product.id)} className="btn-gold px-5 py-2.5 text-xs">
                                            Add to Cart
                                        </button>
                                    )}
                                    <button onClick={() => removeItem(item.product.id)}
                                        className="text-white/20 hover:text-red-400 transition-colors p-2" title="Remove from wishlist">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
