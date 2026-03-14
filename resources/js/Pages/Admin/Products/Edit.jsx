import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';

function ProductForm({ product, categories, onSubmit, processing, errors, data, setData, isEdit }) {
    const [previewImages, setPreviewImages] = useState(product?.images || []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData('images', files);
        const previews = files.map(f => URL.createObjectURL(f));
        setPreviewImages([...(product?.images || []), ...previews]);
    };

    const removeExistingImage = (imageUrl) => {
        if (!isEdit) return;
        router.delete(route('admin.products.remove-image', product.id), {
            data: { image_url: imageUrl },
            preserveScroll: true,
            onSuccess: () => setPreviewImages(prev => prev.filter(img => img !== imageUrl)),
        });
    };

    const Field = ({ label, name, type = 'text', required, children, hint }) => (
        <div>
            <label className="block text-xs font-body tracking-widest uppercase text-white/50 mb-2">
                {label} {required && <span className="text-gold-500">*</span>}
            </label>
            {children || (
                <input type={type} value={data[name] || ''} onChange={e => setData(name, e.target.value)}
                    className={`input-luxury w-full px-4 py-2.5 ${errors[name] ? 'border-red-500' : ''}`} />
            )}
            {hint && <p className="text-[10px] text-white/20 mt-1 font-body">{hint}</p>}
            {errors[name] && <p className="text-xs text-red-400 mt-1 font-body">{errors[name]}</p>}
        </div>
    );

    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Details */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="card-luxury p-6">
                        <h3 className="font-display text-base font-semibold text-white mb-5">Product Details</h3>
                        <div className="space-y-4">
                            <Field label="Product Name" name="name" required />
                            <Field label="Short Description" name="short_description"
                                hint="Brief tagline shown on product cards (max 500 chars)" />
                            <Field label="Full Description" name="description" required>
                                <textarea value={data.description || ''} onChange={e => setData('description', e.target.value)} rows={5}
                                    className={`input-luxury w-full px-4 py-2.5 resize-none ${errors.description ? 'border-red-500' : ''}`} />
                                {errors.description && <p className="text-xs text-red-400 mt-1 font-body">{errors.description}</p>}
                            </Field>
                        </div>
                    </div>

                    {/* Diamond Specs */}
                    <div className="card-luxury p-6">
                        <h3 className="font-display text-base font-semibold text-white mb-5">Diamond Specifications</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Material / Stone" name="material" hint="e.g. VS1 Diamond, Round Brilliant" />
                            <Field label="Carat Weight" name="carat" hint="e.g. 1.2ct, 5.0ct Total" />
                            <Field label="Metal / Setting" name="metal" hint="e.g. 18K Rose Gold, Platinum" />
                            <Field label="Certification" name="certification" hint="e.g. GIA Certified, IGI Certified" />
                        </div>
                    </div>

                    {/* Images */}
                    <div className="card-luxury p-6">
                        <h3 className="font-display text-base font-semibold text-white mb-5">Product Images</h3>
                        <div className="border-2 border-dashed border-white/10 p-8 text-center hover:border-gold-500/30 transition-colors">
                            <input type="file" multiple accept="image/*" onChange={handleImageChange}
                                className="hidden" id="images-input" />
                            <label htmlFor="images-input" className="cursor-pointer">
                                <div className="text-2xl text-white/20 mb-2">◇</div>
                                <p className="text-sm font-body text-white/40 mb-1">Click to upload images</p>
                                <p className="text-xs font-body text-white/20">JPG, PNG, WebP — Max 5MB each</p>
                            </label>
                        </div>
                        {previewImages.length > 0 && (
                            <div className="grid grid-cols-4 gap-3 mt-4">
                                {previewImages.map((img, i) => (
                                    <div key={i} className="relative group aspect-square">
                                        <img src={img} alt="" className="w-full h-full object-cover border border-white/10" />
                                        {isEdit && (product?.images || []).includes(img) && (
                                            <button type="button" onClick={() => removeExistingImage(img)}
                                                className="absolute top-1 right-1 w-6 h-6 bg-red-900/80 text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                ✕
                                            </button>
                                        )}
                                        {i === 0 && (
                                            <span className="absolute bottom-1 left-1 text-[9px] bg-gold-500/80 text-obsidian px-1 font-body">Primary</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                    {/* Pricing */}
                    <div className="card-luxury p-6">
                        <h3 className="font-display text-base font-semibold text-white mb-5">Pricing</h3>
                        <div className="space-y-4">
                            <Field label="Regular Price (₱)" name="price" type="number" required hint="Base price in PHP" />
                            <Field label="Sale Price (₱)" name="sale_price" type="number" hint="Leave empty if not on sale" />
                            <Field label="Stock Quantity" name="stock" type="number" required hint="Set to 0 to mark as out of stock" />
                        </div>
                    </div>

                    {/* Organization */}
                    <div className="card-luxury p-6">
                        <h3 className="font-display text-base font-semibold text-white mb-5">Organization</h3>
                        <div className="space-y-4">
                            <Field label="Category" name="category" required>
                                <select value={data.category || ''} onChange={e => setData('category', e.target.value)}
                                    className={`input-luxury w-full px-4 py-2.5 ${errors.category ? 'border-red-500' : ''}`}>
                                    <option value="">Select category...</option>
                                    {Object.entries(categories).map(([slug, label]) => (
                                        <option key={slug} value={slug}>{label}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-xs text-red-400 mt-1 font-body">{errors.category}</p>}
                            </Field>

                            <div className="space-y-3 pt-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={data.is_featured || false}
                                        onChange={e => setData('is_featured', e.target.checked)}
                                        className="w-4 h-4 border-white/20 bg-transparent text-gold-500 focus:ring-gold-500" />
                                    <div>
                                        <span className="text-sm font-body text-white/70">Featured Product</span>
                                        <p className="text-[10px] text-white/30 font-body">Show on homepage</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={data.is_active !== false}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="w-4 h-4 border-white/20 bg-transparent text-gold-500 focus:ring-gold-500" />
                                    <div>
                                        <span className="text-sm font-body text-white/70">Active / Visible</span>
                                        <p className="text-[10px] text-white/30 font-body">Show in store</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <button type="submit" disabled={processing}
                            className="btn-gold w-full py-3 text-center disabled:opacity-50">
                            {processing ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
                        </button>
                        <Link href={route('admin.products.index')} className="btn-outline-gold w-full py-3 text-center">
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}

export function AdminProductCreate({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '', short_description: '', description: '',
        price: '', sale_price: '', stock: '',
        category: '', material: '', carat: '', metal: '', certification: '',
        is_featured: false, is_active: true, images: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <AdminLayout title="Add Product">
            <Head title="Add Product" />
            <div className="mb-6">
                <Link href={route('admin.products.index')} className="text-xs font-body text-white/30 hover:text-gold-400 tracking-widest uppercase transition-colors">
                    ← Back to Products
                </Link>
            </div>
            <ProductForm {...{ categories, data, setData, errors, processing }} onSubmit={submit} isEdit={false} />
        </AdminLayout>
    );
}

export default function AdminProductEdit({ product, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: product.name || '',
        short_description: product.short_description || '',
        description: product.description || '',
        price: product.price || '',
        sale_price: product.sale_price || '',
        stock: product.stock || 0,
        category: product.category || '',
        material: product.material || '',
        carat: product.carat || '',
        metal: product.metal || '',
        certification: product.certification || '',
        is_featured: product.is_featured || false,
        is_active: product.is_active !== false,
        images: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.update', product.id));
    };

    return (
        <AdminLayout title="Edit Product">
            <Head title={`Edit — ${product.name}`} />
            <div className="mb-6">
                <Link href={route('admin.products.index')} className="text-xs font-body text-white/30 hover:text-gold-400 tracking-widest uppercase transition-colors">
                    ← Back to Products
                </Link>
            </div>
            <ProductForm {...{ product, categories, data, setData, errors, processing }} onSubmit={submit} isEdit={true} />
        </AdminLayout>
    );
}
