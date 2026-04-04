import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

function Section({ title, subtitle, children }) {
    return (
        <div className="card-luxury p-6">
            <div className="mb-6">
                <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
                {subtitle && <p className="text-xs font-body text-white/30 mt-1">{subtitle}</p>}
            </div>
            {children}
        </div>
    );
}

function Field({ label, name, type = 'text', data, setData, errors, placeholder, hint }) {
    return (
        <div>
            <label className="block text-[10px] font-body tracking-widest uppercase text-white/40 mb-2">
                {label}
            </label>
            <input
                type={type}
                value={data[name] || ''}
                onChange={e => setData(name, e.target.value)}
                placeholder={placeholder}
                className={`input-luxury w-full px-4 py-3 text-sm ${errors[name] ? 'border-red-500' : ''}`}
            />
            {hint && <p className="text-[10px] font-body text-white/20 mt-1">{hint}</p>}
            {errors[name] && <p className="text-xs text-red-400 mt-1 font-body">{errors[name]}</p>}
        </div>
    );
}

export default function ProfileEdit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const dashboardRoute = user.is_admin ? route('admin.dashboard') : route('dashboard');
    const accountLinks = user.is_admin
        ? [
            { label: 'Admin Dashboard', href: route('admin.dashboard'), icon: '◈' },
            { label: 'Products', href: route('admin.products.index'), icon: '◇' },
            { label: 'Orders', href: route('admin.orders.index'), icon: '◻' },
        ]
        : [
            { label: 'My Orders', href: route('orders.index'), icon: '◻' },
            { label: 'Cart', href: route('cart.index'), icon: '◈' },
            { label: 'Wishlist', href: route('wishlist.index'), icon: '♡' },
        ];

    const profileForm = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const deleteForm = useForm({ password: '' });

    const updateProfile = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'));
    };

    const updatePassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            onSuccess: () => passwordForm.reset(),
        });
    };

    const deleteAccount = (e) => {
        e.preventDefault();
        if (confirm('Are you absolutely sure? This will permanently delete your account and all order history.')) {
            deleteForm.delete(route('profile.destroy'));
        }
    };

    return (
        <AppLayout>
            <Head title="Edit Profile" />

            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <Link
                            href={dashboardRoute}
                            className="text-xs font-body text-white/30 hover:text-gold-400 tracking-widest uppercase transition-colors mb-3 block"
                        >
                            {user.is_admin ? '← Admin Dashboard' : '← Dashboard'}
                        </Link>
                        <h1 className="font-display text-4xl font-bold text-white">Account Settings</h1>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 font-display font-bold text-xl">
                        {user.name[0]}
                    </div>
                </div>

                <div className="space-y-6">
                    <Section title="Profile Information" subtitle="Update your name, email and contact details.">
                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div className="mb-5 p-4 border border-yellow-500/20 bg-yellow-950/20">
                                <p className="text-xs font-body text-yellow-400">
                                    Your email is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="underline hover:text-yellow-300 transition-colors"
                                    >
                                        Resend verification email
                                    </Link>
                                </p>
                            </div>
                        )}
                        {status === 'profile-updated' && (
                            <div className="mb-5 text-xs font-body text-green-400 border border-green-500/20 bg-green-950/30 px-4 py-3">
                                Profile updated successfully.
                            </div>
                        )}
                        <form onSubmit={updateProfile} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="Full Name" name="name" data={profileForm.data} setData={profileForm.setData} errors={profileForm.errors} />
                                <Field label="Email Address" name="email" data={profileForm.data} setData={profileForm.setData} errors={profileForm.errors} type="email" />
                                <Field label="Phone Number" name="phone" data={profileForm.data} setData={profileForm.setData} errors={profileForm.errors} placeholder="+63 912 345 6789" />
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-body tracking-widest uppercase text-white/40 mb-2">
                                        Default Address
                                    </label>
                                    <textarea
                                        value={profileForm.data.address || ''}
                                        onChange={e => profileForm.setData('address', e.target.value)}
                                        placeholder="Your delivery address"
                                        rows={2}
                                        className="input-luxury w-full px-4 py-3 text-sm resize-none"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-2">
                                <button type="submit" disabled={profileForm.processing} className="btn-gold px-8 py-3 disabled:opacity-50 text-xs">
                                    {profileForm.processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </Section>

                    <Section title="Change Password" subtitle="Use a strong password you don't use elsewhere.">
                        {status === 'password-updated' && (
                            <div className="mb-5 text-xs font-body text-green-400 border border-green-500/20 bg-green-950/30 px-4 py-3">
                                Password updated successfully.
                            </div>
                        )}
                        <form onSubmit={updatePassword} className="space-y-4">
                            <Field
                                label="Current Password"
                                name="current_password"
                                type="password"
                                data={passwordForm.data}
                                setData={passwordForm.setData}
                                errors={passwordForm.errors}
                                placeholder="••••••••"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field
                                    label="New Password"
                                    name="password"
                                    type="password"
                                    data={passwordForm.data}
                                    setData={passwordForm.setData}
                                    errors={passwordForm.errors}
                                    placeholder="••••••••"
                                    hint="Minimum 8 characters"
                                />
                                <Field
                                    label="Confirm New Password"
                                    name="password_confirmation"
                                    type="password"
                                    data={passwordForm.data}
                                    setData={passwordForm.setData}
                                    errors={passwordForm.errors}
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="flex justify-end pt-2">
                                <button type="submit" disabled={passwordForm.processing} className="btn-gold px-8 py-3 disabled:opacity-50 text-xs">
                                    {passwordForm.processing ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    </Section>

                    <Section
                        title="Account Actions"
                        subtitle={user.is_admin ? 'Jump into store management tools.' : 'Manage your orders and shopping preferences.'}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {accountLinks.map(l => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="flex items-center gap-3 p-4 border border-white/5 hover:border-gold-500/20 hover:bg-gold-500/5 transition-all duration-200 group"
                                >
                                    <span className="text-gold-500/40 font-display group-hover:text-gold-400 transition-colors">{l.icon}</span>
                                    <span className="text-xs font-body tracking-widest uppercase text-white/50 group-hover:text-white/80 transition-colors">{l.label}</span>
                                </Link>
                            ))}
                        </div>
                    </Section>

                    <Section title="Danger Zone" subtitle="Permanent actions that cannot be undone.">
                        <div className="border border-red-500/10 bg-red-950/10 p-5">
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <h3 className="text-sm font-body font-medium text-red-400 mb-1">Delete Account</h3>
                                    <p className="text-xs font-body text-white/30 leading-relaxed">
                                        Once deleted, all your data including order history will be permanently removed.
                                        This action cannot be undone.
                                    </p>
                                </div>
                                <form onSubmit={deleteAccount} className="flex-shrink-0">
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            value={deleteForm.data.password}
                                            onChange={e => deleteForm.setData('password', e.target.value)}
                                            placeholder="Confirm password"
                                            className={`input-luxury px-3 py-2 text-xs w-40 ${deleteForm.errors.password ? 'border-red-500' : ''}`}
                                        />
                                        {deleteForm.errors.password && (
                                            <p className="text-[10px] text-red-400 mt-1 font-body">{deleteForm.errors.password}</p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={deleteForm.processing}
                                        className="w-full py-2 text-[10px] font-body tracking-widest uppercase text-red-500 border border-red-500/30 hover:bg-red-500/10 transition-all disabled:opacity-50"
                                    >
                                        {deleteForm.processing ? 'Deleting...' : 'Delete Account'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </Section>
                </div>
            </div>
        </AppLayout>
    );
}
