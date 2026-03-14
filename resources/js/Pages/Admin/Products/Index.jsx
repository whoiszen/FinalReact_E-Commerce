import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';

const statusColors = {
    true:  'bg-green-500/20 text-green-400 border-green-500/20',
    false: 'bg-red-500/20 text-red-400 border-red-500/20',
};

export default function AdminProductsIndex({ products, categories, filters }) {
    const [search, setSearch] = useState(filters?.q || '');
    const [category, setCategory] = useState(filters?.category || '');

    const applyFilters = (e) => {
        e.preventDefault();
        router.get(route('admin.products.index'), { q: search, category }, { preserveState: true });
    };

    const toggleActive = (product) => {
        router.post(route('admin.products.toggle-active', product.id), {}, { preserveScroll: true });
    };

    const deleteProduct = (product) => {
        if (confirm(`Delete "${product.name}"? This cannot be undone.`)) {
            router.delete(route('admin.products.destroy', product.id), { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Products">
            <Head title="Admin — Products" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-sm font-body text-white/40">
                        {products.total} products total
                    </p>
                </div>
                <Link href={route('admin.products.create')} className="btn-gold px-6 py-2.5 text-xs">
                    + Add Product
                </Link>
            </div>

            {/* Filters */}
            <form onSubmit={applyFilters} className="flex flex-wrap gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="input-luxury px-4 py-2 text-sm flex-1 min-w-48"
                />
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="input-luxury px-4 py-2 text-sm"
                >
                    <option value="">All Categories</option>
                    {Object.entries(categories).map(([slug, label]) => (
                        <option key={slug} value={slug}>{label}</option>
                    ))}
                </select>
                <button type="submit" className="btn-gold px-6 py-2 text-xs">Filter</button>
                {(filters?.q || filters?.category) && (
                    <button type="button" onClick={() => router.get(route('admin.products.index'))}
                        className="btn-outline-gold px-4 py-2 text-xs">Clear</button>
                )}
            </form>

            {/* Table */}
            <div className="card-luxury overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full table-luxury">
                        <thead>
                            <tr className="px-6">
                                <th className="text-left pl-6">Product</th>
                                <th className="text-left">Category</th>
                                <th className="text-left">Price</th>
                                <th className="text-center">Stock</th>
                                <th className="text-center">Status</th>
                                <th className="text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-16 text-white/30 font-body text-sm">
                                        No products found
                                    </td>
                                </tr>
                            )}
                            {products.data.map(product => (
                                <tr key={product.id} className="hover:bg-white/2 transition-colors">
                                    <td className="pl-6">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.primary_image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80'}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover flex-shrink-0 border border-white/5"
                                            />
                                            <div>
                                                <div className="text-sm font-body text-white/80 font-medium">{product.name}</div>
                                                {product.carat && (
                                                    <div className="text-[10px] font-body text-gold-500/50 tracking-wider">{product.carat} · {product.metal}</div>
                                                )}
                                                {product.is_low_stock && (
                                                    <div className="text-[10px] font-body text-red-400 mt-0.5">⚠ Low Stock</div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-xs font-body text-white/40 tracking-wider">{product.category_label}</span>
                                    </td>
                                    <td>
                                        <div className="font-display text-sm text-gold-400">₱{Number(product.current_price).toLocaleString()}</div>
                                        {product.is_on_sale && (
                                            <div className="text-[10px] text-white/30 font-body line-through">₱{Number(product.price).toLocaleString()}</div>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <span className={`font-display text-sm font-bold ${product.stock === 0 ? 'text-red-400' : product.is_low_stock ? 'text-yellow-400' : 'text-white/70'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button onClick={() => toggleActive(product)}
                                            className={`badge-status border text-[10px] cursor-pointer hover:opacity-80 transition-opacity ${statusColors[product.is_active]}`}>
                                            {product.is_active ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="text-right pr-6">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link href={route('admin.products.edit', product.id)}
                                                className="text-xs font-body text-white/40 hover:text-gold-400 transition-colors tracking-wider">
                                                Edit
                                            </Link>
                                            <button onClick={() => deleteProduct(product)}
                                                className="text-xs font-body text-white/40 hover:text-red-400 transition-colors tracking-wider">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs font-body text-white/30">
                            Page {products.current_page} of {products.last_page}
                        </span>
                        <div className="flex gap-2">
                            {products.links.map((link, i) => (
                                <button key={i}
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url}
                                    className={`px-3 py-1 text-xs font-body border transition-all ${
                                        link.active
                                            ? 'border-gold-500 text-gold-400 bg-gold-500/10'
                                            : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/50'
                                    } disabled:opacity-30 disabled:cursor-not-allowed`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
