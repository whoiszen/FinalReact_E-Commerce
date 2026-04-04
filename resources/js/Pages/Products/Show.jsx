import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ProductCard from '@/Components/ProductCard';

export default function ProductShow({ product, related }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [activeImage, setActiveImage] = useState(product.primary_image);
    const [qty, setQty] = useState(1);

    const addToCart = () => {
        if (!user) { router.visit(route('login')); return; }
        if (user.is_admin) { router.visit(route('admin.dashboard')); return; }
        router.post(route('cart.add', product.id), { quantity: qty }, { preserveScroll: true });
    };

    const toggleWishlist = () => {
        if (!user) { router.visit(route('login')); return; }
        if (user.is_admin) { router.visit(route('admin.dashboard')); return; }
        router.post(route('wishlist.toggle', product.id), {}, { preserveScroll: true });
    };

    const specs = [
        { label: 'Stone',         value: product.material },
        { label: 'Carat',         value: product.carat },
        { label: 'Metal',         value: product.metal },
        { label: 'Certification', value: product.certification },
        { label: 'Category',      value: product.category_label },
    ].filter(s => s.value);

    return (
        <AppLayout>
            <Head title={product.name} />

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs font-body text-white/30 mb-10">
                    <Link href={route('welcome')} className="hover:text-gold-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href={route('products.index')} className="hover:text-gold-400 transition-colors">Collections</Link>
                    <span>/</span>
                    <Link href={route('products.category', product.category)} className="hover:text-gold-400 transition-colors">
                        {product.category_label}
                    </Link>
                    <span>/</span>
                    <span className="text-white/50">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Images */}
                    <div>
                        <div className="relative aspect-square overflow-hidden bg-white/3 border border-white/5">
                            <img
                                src={activeImage || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.is_on_sale && (
                                <span className="absolute top-4 left-4 bg-gold-500 text-obsidian text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1">
                                    -{product.discount_percentage}% OFF
                                </span>
                            )}
                            {product.certification && (
                                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-2">
                                    <div className="text-[9px] font-body tracking-[0.3em] uppercase text-white/40">Certified</div>
                                    <div className="text-xs font-body text-gold-400 font-medium">{product.certification}</div>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {(product.images?.length || 0) > 1 && (
                            <div className="flex gap-3 mt-4">
                                {product.images.map((img, i) => (
                                    <button key={i} onClick={() => setActiveImage(img)}
                                        className={`w-20 h-20 overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                                            activeImage === img ? 'border-gold-500' : 'border-white/10 hover:border-white/30'
                                        }`}>
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Category + Cert */}
                        <div className="flex items-center gap-3 mb-3">
                            <Link href={route('products.category', product.category)}
                                className="text-[10px] font-body tracking-[0.3em] uppercase text-gold-500/70 hover:text-gold-400 transition-colors">
                                {product.category_label}
                            </Link>
                            {product.certification && (
                                <span className="text-[10px] font-body tracking-wider text-white/30 border border-white/10 px-2 py-0.5">
                                    {product.certification}
                                </span>
                            )}
                        </div>

                        <h1 className="font-display text-4xl font-bold text-white leading-tight mb-4">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        {product.reviews_count > 0 && (
                            <div className="flex items-center gap-2 mb-5">
                                <div className="flex">
                                    {[1,2,3,4,5].map(i => (
                                        <svg key={i} className={`w-4 h-4 ${i <= Math.round(product.rating) ? 'text-gold-400 fill-current' : 'text-white/20 fill-current'}`} viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs font-body text-white/30">{product.rating} · {product.reviews_count} reviews</span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="font-display text-4xl font-bold text-gold-400">
                                ₱{Number(product.current_price).toLocaleString()}
                            </span>
                            {product.is_on_sale && (
                                <>
                                    <span className="font-body text-xl text-white/30 line-through">
                                        ₱{Number(product.price).toLocaleString()}
                                    </span>
                                    <span className="text-xs font-body text-gold-500 border border-gold-500/30 px-2 py-0.5">
                                        Save ₱{Number(product.price - product.current_price).toLocaleString()}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Short description */}
                        {product.short_description && (
                            <p className="font-body text-white/50 text-sm leading-relaxed mb-6 border-l-2 border-gold-500/30 pl-4">
                                {product.short_description}
                            </p>
                        )}

                        {/* Specs */}
                        {specs.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {specs.map(s => (
                                    <div key={s.label} className="bg-white/3 border border-white/5 px-4 py-3">
                                        <div className="text-[9px] font-body tracking-[0.3em] uppercase text-white/30 mb-0.5">{s.label}</div>
                                        <div className="text-sm font-body text-white/70">{s.value}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Stock indicator */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-green-400' : product.stock > 0 ? 'bg-yellow-400' : 'bg-red-400'}`} />
                            <span className="text-xs font-body text-white/40 tracking-wider">
                                {product.stock > 5 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                            </span>
                        </div>

                        {/* Qty + Add to Cart */}
                        {product.stock > 0 && (
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center border border-white/10">
                                    <button onClick={() => setQty(q => Math.max(1, q - 1))}
                                        className="w-10 h-10 text-white/40 hover:text-gold-400 transition-colors font-body text-lg">
                                        −
                                    </button>
                                    <span className="w-10 text-center font-body text-sm text-white/70">{qty}</span>
                                    <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                                        className="w-10 h-10 text-white/40 hover:text-gold-400 transition-colors font-body text-lg">
                                        +
                                    </button>
                                </div>
                                <button onClick={addToCart} className="flex-1 btn-gold py-3">
                                    {user ? (user.is_admin ? 'Admin Preview' : 'Add to Cart') : 'Sign In to Purchase'}
                                </button>
                                {!user?.is_admin && (
                                    <button onClick={toggleWishlist}
                                        className={`w-11 h-11 border flex items-center justify-center transition-all duration-200 ${
                                            product.is_wishlisted
                                                ? 'border-red-500/50 bg-red-500/10 text-red-400'
                                                : 'border-white/10 text-white/40 hover:border-gold-500/30 hover:text-gold-400'
                                        }`}>
                                        <svg className="w-5 h-5" fill={product.is_wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Trust badges */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {[
                                { icon: '◇', text: 'GIA / IGI Certified' },
                                { icon: '◈', text: 'Lifetime Warranty' },
                                { icon: '◻', text: 'Free Insured Shipping' },
                                { icon: '✦', text: '30-Day Returns' },
                            ].map(b => (
                                <div key={b.text} className="flex items-center gap-2">
                                    <span className="text-gold-500/50 font-display text-xs">{b.icon}</span>
                                    <span className="text-[10px] font-body tracking-wider text-white/30">{b.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Full description */}
                        <div className="border-t border-white/5 pt-6">
                            <h3 className="text-xs font-body tracking-[0.3em] uppercase text-white/40 mb-4">Description</h3>
                            <p className="font-body text-sm text-white/50 leading-relaxed">{product.description}</p>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <section className="mt-24 pt-16 border-t border-white/5">
                        <div className="text-center mb-12">
                            <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">You May Also Love</span>
                            <h2 className="font-display text-3xl font-bold text-white mt-2">Related Pieces</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {related.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}
