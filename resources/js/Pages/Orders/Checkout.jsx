import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const InputField = ({ label, name, type = 'text', data, setData, errors, placeholder, required, colSpan }) => (
    <div className={colSpan === 2 ? 'md:col-span-2' : ''}>
        <label className="block text-[10px] font-body tracking-widest uppercase text-white/40 mb-2">
            {label} {required && <span className="text-gold-500">*</span>}
        </label>
        <input
            type={type}
            value={data[name] || ''}
            onChange={e => setData(name, e.target.value)}
            placeholder={placeholder}
            className={`input-luxury w-full px-4 py-3 text-sm ${errors[name] ? 'border-red-500' : ''}`}
        />
        {errors[name] && <p className="text-xs text-red-400 mt-1 font-body">{errors[name]}</p>}
    </div>
);

export default function Checkout({ cartItems, subtotal, shippingFee, total, user }) {
    const { data, setData, post, processing, errors } = useForm({
        shipping_name:    user?.name || '',
        shipping_email:   user?.email || '',
        shipping_phone:   user?.phone || '',
        shipping_address: user?.address || '',
        shipping_city:    '',
        shipping_state:   '',
        shipping_zip:     '',
        shipping_country: 'Philippines',
        payment_method:   'cod',
        notes:            '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('checkout.process'));
    };

    const paymentMethods = [
        { value: 'cod',           label: 'Cash on Delivery',  desc: 'Pay when you receive' },
        { value: 'gcash',         label: 'GCash',             desc: 'Mobile wallet payment' },
        { value: 'bank_transfer', label: 'Bank Transfer',     desc: 'Direct bank deposit' },
        { value: 'card',          label: 'Credit / Debit Card', desc: 'Visa, Mastercard' },
    ];

    return (
        <AppLayout>
            <Head title="Checkout" />

            <div className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="font-display text-4xl font-bold text-white mb-10">Checkout</h1>

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Shipping */}
                            <div className="card-luxury p-6">
                                <h2 className="font-display text-lg font-semibold text-white mb-6">
                                    Shipping Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Full Name"     name="shipping_name"    data={data} setData={setData} errors={errors} required />
                                    <InputField label="Email Address" name="shipping_email"   data={data} setData={setData} errors={errors} type="email" required />
                                    <InputField label="Phone Number"  name="shipping_phone"   data={data} setData={setData} errors={errors} placeholder="+63 912 345 6789" required />
                                    <InputField label="Street Address" name="shipping_address" data={data} setData={setData} errors={errors} placeholder="House/Unit, Street, Barangay" required colSpan={2} />
                                    <InputField label="City / Municipality" name="shipping_city"  data={data} setData={setData} errors={errors} required />
                                    <InputField label="Province / State"    name="shipping_state" data={data} setData={setData} errors={errors} required />
                                    <InputField label="ZIP Code"  name="shipping_zip"     data={data} setData={setData} errors={errors} required />
                                    <InputField label="Country"   name="shipping_country" data={data} setData={setData} errors={errors} required />
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="card-luxury p-6">
                                <h2 className="font-display text-lg font-semibold text-white mb-6">Payment Method</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {paymentMethods.map(pm => (
                                        <label key={pm.value}
                                            className={`flex items-start gap-3 p-4 cursor-pointer border transition-all duration-200 ${
                                                data.payment_method === pm.value
                                                    ? 'border-gold-500/60 bg-gold-500/5'
                                                    : 'border-white/10 hover:border-white/20'
                                            }`}>
                                            <input type="radio" name="payment_method" value={pm.value}
                                                checked={data.payment_method === pm.value}
                                                onChange={() => setData('payment_method', pm.value)}
                                                className="mt-0.5 text-gold-500 border-white/20 bg-transparent focus:ring-gold-500" />
                                            <div>
                                                <div className="text-sm font-body text-white/80 font-medium">{pm.label}</div>
                                                <div className="text-xs font-body text-white/30 mt-0.5">{pm.desc}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.payment_method && (
                                    <p className="text-xs text-red-400 mt-2 font-body">{errors.payment_method}</p>
                                )}
                            </div>

                            {/* Notes */}
                            <div className="card-luxury p-6">
                                <h2 className="font-display text-base font-semibold text-white mb-4">Order Notes
                                    <span className="text-xs font-body font-normal text-white/30 ml-2">(Optional)</span>
                                </h2>
                                <textarea
                                    value={data.notes}
                                    onChange={e => setData('notes', e.target.value)}
                                    placeholder="Special instructions, gift message, delivery preferences..."
                                    rows={3}
                                    className="input-luxury w-full px-4 py-3 text-sm resize-none"
                                />
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-5">
                            <div className="card-luxury p-6 sticky top-24">
                                <h2 className="font-display text-lg font-semibold text-white mb-5">Order Summary</h2>

                                {/* Items */}
                                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto scrollbar-luxury pr-1">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <img
                                                src={item.product.primary_image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80'}
                                                alt={item.product.name}
                                                className="w-12 h-12 object-cover border border-white/5 flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-body text-white/60 leading-snug truncate">{item.product.name}</p>
                                                <p className="text-[10px] font-body text-white/30">× {item.quantity}</p>
                                            </div>
                                            <span className="text-xs font-display text-gold-400 flex-shrink-0">
                                                ₱{Number(item.subtotal).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="border-t border-white/10 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm font-body text-white/40">
                                        <span>Subtotal</span>
                                        <span>₱{Number(subtotal).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-body text-white/40">
                                        <span>Shipping</span>
                                        <span className={shippingFee === 0 ? 'text-green-400' : ''}>
                                            {shippingFee === 0 ? 'FREE' : `₱${Number(shippingFee).toLocaleString()}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-display text-base font-bold text-white border-t border-white/10 pt-3 mt-3">
                                        <span>Total</span>
                                        <span className="text-gold-400">₱{Number(total).toLocaleString()}</span>
                                    </div>
                                </div>

                                <button type="submit" disabled={processing}
                                    className="btn-gold w-full py-4 mt-6 disabled:opacity-50 text-xs">
                                    {processing ? 'Placing Order...' : 'Place Order'}
                                </button>

                                <p className="text-[10px] font-body text-white/20 text-center mt-3 leading-relaxed">
                                    By placing your order you agree to our terms of service and privacy policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
