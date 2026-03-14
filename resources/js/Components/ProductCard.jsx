import { Link, router, usePage } from '@inertiajs/react';

export default function ProductCard({ product }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const addToCart = (e) => {
        e.preventDefault();
        if (!user) {
            router.visit(route('login'));
            return;
        }
        router.post(route('cart.add', product.id), { quantity: 1 }, { preserveScroll: true });
    };

    const toggleWishlist = (e) => {
        e.preventDefault();
        if (!user) {
            router.visit(route('login'));
            return;
        }
        router.post(route('wishlist.toggle', product.id), {}, { preserveScroll: true });
    };

    return (
        <div className="group relative product-card-hover">
            {/* Image */}
            <div className="relative overflow-hidden bg-white/3 aspect-square">
                <Link href={route('products.show', product.slug)}>
                    <img
                        src={product.primary_image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.is_on_sale && (
                        <span className="bg-gold-500 text-obsidian text-[10px] font-body font-semibold tracking-widest uppercase px-2 py-0.5">
                            -{product.discount_percentage}%
                        </span>
                    )}
                    {product.certification && (
                        <span className="bg-white/10 backdrop-blur-sm text-white/70 text-[10px] font-body tracking-wider px-2 py-0.5">
                            {product.certification.split(' ')[0]}
                        </span>
                    )}
                </div>

                {/* Wishlist */}
                <button onClick={toggleWishlist}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70">
                    <svg className={`w-4 h-4 ${product.is_wishlisted ? 'text-red-400 fill-current' : 'text-white/60'}`}
                        fill={product.is_wishlisted ? 'currentColor' : 'none'}
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>

                {/* Quick Add */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button onClick={addToCart}
                        className="w-full btn-gold py-3 text-center text-[10px]">
                        {user ? 'Add to Cart' : 'Sign In to Purchase'}
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="pt-4 pb-2">
                <p className="text-[10px] font-body tracking-widest uppercase text-gold-500/60 mb-1">
                    {product.category_label}
                    {product.carat && <span className="ml-2 text-white/30">· {product.carat}</span>}
                </p>
                <Link href={route('products.show', product.slug)}>
                    <h3 className="font-display text-sm font-semibold text-white/90 hover:text-gold-400 transition-colors leading-snug mb-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Stars */}
                {product.reviews_count > 0 && (
                    <div className="flex items-center gap-1.5 mb-2">
                        <div className="flex">
                            {[1,2,3,4,5].map(i => (
                                <svg key={i} className={`w-3 h-3 ${i <= Math.round(product.rating) ? 'text-gold-400 fill-current' : 'text-white/20 fill-current'}`} viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            ))}
                        </div>
                        <span className="text-[10px] text-white/30 font-body">({product.reviews_count})</span>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="font-display text-base font-semibold text-gold-400">
                        ₱{Number(product.current_price).toLocaleString()}
                    </span>
                    {product.is_on_sale && (
                        <span className="text-xs font-body text-white/30 line-through">
                            ₱{Number(product.price).toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
