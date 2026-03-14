import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

function CartRow({ item, onUpdate, onRemove }) {
    const { data, setData, patch, processing } = useForm({ quantity: item.quantity });

    const update = (newQty) => {
        const qty = Math.max(1, Math.min(item.product.stock, newQty));
        setData('quantity', qty);
        router.patch(route('cart.update', item.id), { quantity: qty }, { preserveScroll: true });
    };

    return (
        <div className="flex gap-5 py-6 border-b border-white/5 last:border-0">
            <Link href={route('products.show', item.product.slug)} className="flex-shrink-0">
                <img
                    src={item.product.primary_image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200'}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover border border-white/5"
                />
            </Link>

            <div className="flex-1 min-w-0">
                <Link href={route('products.category', item.product.slug)}>
                    <span className="text-[10px] font-body tracking-widest uppercase text-gold-500/60">
                        {item.product.category_label}
                    </span>
                </Link>
                <Link href={route('products.show', item.product.slug)}>
                    <h3 className="font-display text-base font-semibold text-white/90 hover:text-gold-400 transition-colors mt-0.5 leading-snug">
                        {item.product.name}
                    </h3>
                </Link>
                <p className="text-xs font-body text-white/30 mt-1">
                    ₱{Number(item.product.current_price).toLocaleString()} each
                </p>

                <div className="flex items-center justify-between mt-3">
                    {/* Qty controls */}
                    <div className="flex items-center border border-white/10">
                        <button onClick={() => update(item.quantity - 1)}
                            className="w-8 h-8 text-white/40 hover:text-gold-400 transition-colors text-base font-body flex items-center justify-center">
                            −
                        </button>
                        <span className="w-8 text-center text-sm font-body text-white/70">{item.quantity}</span>
                        <button onClick={() => update(item.quantity + 1)}
                            className="w-8 h-8 text-white/40 hover:text-gold-400 transition-colors text-base font-body flex items-center justify-center">
                            +
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="font-display text-base font-semibold text-gold-400">
                            ₱{Number(item.subtotal).toLocaleString()}
                        </span>
                        <button
                            onClick={() => router.delete(route('cart.remove', item.id), { preserveScroll: true })}
                            className="text-white/20 hover:text-red-400 transition-colors p-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CartIndex({ items, subtotal, shippingFee, total }) {
    const isEmpty = items.length === 0;

    return (
        <AppLayout>
            <Head title="Shopping Cart" />

            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-10">
                    <h1 className="font-display text-4xl font-bold text-white">Your Cart</h1>
                    {!isEmpty && (
                        <button onClick={() => router.delete(route('cart.clear'))}
                            className="text-xs font-body tracking-widest uppercase text-white/30 hover:text-red-400 transition-colors">
                            Clear Cart
                        </button>
                    )}
                </div>

                {isEmpty ? (
                    <div className="text-center py-28 card-luxury">
                        <div className="text-6xl text-white/10 font-display mb-4">◇</div>
                        <h2 className="font-display text-2xl font-bold text-white/40 mb-3">Your cart is empty</h2>
                        <p className="text-sm font-body text-white/30 mb-8">Discover our curated diamond collections</p>
                        <Link href={route('products.index')} className="btn-gold px-10 py-3.5">
                            Explore Collections
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Items */}
                        <div className="lg:col-span-2 card-luxury p-6">
                            {items.map(item => (
                                <CartRow key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="space-y-4">
                            <div className="card-luxury p-6">
                                <h2 className="font-display text-lg font-semibold text-white mb-5">Order Summary</h2>

                                <div className="space-y-3 mb-5">
                                    <div className="flex justify-between text-sm font-body text-white/50">
                                        <span>Subtotal ({items.length} items)</span>
                                        <span>₱{Number(subtotal).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-body text-white/50">
                                        <span>Shipping</span>
                                        <span className={shippingFee === 0 ? 'text-green-400' : ''}>
                                            {shippingFee === 0 ? 'FREE' : `₱${Number(shippingFee).toLocaleString()}`}
                                        </span>
                                    </div>
                                    {shippingFee > 0 && (
                                        <p className="text-[10px] font-body text-white/20">
                                            Free shipping on orders ₱50,000+
                                        </p>
                                    )}
                                </div>

                                <div className="border-t border-white/10 pt-4 flex justify-between font-display text-base font-bold text-white mb-6">
                                    <span>Total</span>
                                    <span className="text-gold-400">₱{Number(total).toLocaleString()}</span>
                                </div>

                                <Link href={route('checkout')} className="btn-gold w-full py-4 text-center block">
                                    Proceed to Checkout
                                </Link>
                            </div>

                            {/* Trust badges */}
                            <div className="card-luxury p-5 space-y-3">
                                {[
                                    { icon: '◇', text: 'GIA / IGI Certified Diamonds' },
                                    { icon: '◈', text: 'Lifetime Warranty Included' },
                                    { icon: '◻', text: 'Insured Express Delivery' },
                                    { icon: '✦', text: '30-Day Return Policy' },
                                ].map(b => (
                                    <div key={b.text} className="flex items-center gap-3">
                                        <span className="text-gold-500/50 font-display text-sm">{b.icon}</span>
                                        <span className="text-[10px] font-body tracking-wider text-white/30">{b.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
