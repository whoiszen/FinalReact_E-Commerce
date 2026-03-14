import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Sign In" />

            {status && (
                <div className="mb-6 text-xs font-body text-green-400 border border-green-500/20 bg-green-950/30 px-4 py-3">
                    {status}
                </div>
            )}

            <div className="mb-8 text-center">
                <h1 className="font-display text-2xl font-bold text-white">Welcome Back</h1>
                <p className="text-xs font-body text-white/30 tracking-widest mt-1">Sign in to your account</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-[10px] font-body tracking-widest uppercase text-white/40 mb-2">
                        Email Address
                    </label>
                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)}
                        className={`input-luxury w-full px-4 py-3 text-sm ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="your@email.com" autoComplete="username" />
                    {errors.email && <p className="text-xs text-red-400 mt-1 font-body">{errors.email}</p>}
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-[10px] font-body tracking-widest uppercase text-white/40">Password</label>
                        {canResetPassword && (
                            <Link href={route('password.request')}
                                className="text-[10px] font-body text-gold-500/60 hover:text-gold-400 transition-colors tracking-wider">
                                Forgot password?
                            </Link>
                        )}
                    </div>
                    <input type="password" value={data.password} onChange={e => setData('password', e.target.value)}
                        className={`input-luxury w-full px-4 py-3 text-sm ${errors.password ? 'border-red-500' : ''}`}
                        placeholder="••••••••" autoComplete="current-password" />
                    {errors.password && <p className="text-xs text-red-400 mt-1 font-body">{errors.password}</p>}
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={data.remember} onChange={e => setData('remember', e.target.checked)}
                        className="w-4 h-4 border-white/20 bg-transparent text-gold-500 focus:ring-gold-500" />
                    <span className="text-xs font-body text-white/40">Remember me</span>
                </label>

                <button type="submit" disabled={processing}
                    className="btn-gold w-full py-3.5 disabled:opacity-50">
                    {processing ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-6 text-center border-t border-white/5 pt-6">
                <p className="text-xs font-body text-white/30">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="text-gold-500/80 hover:text-gold-400 transition-colors">
                        Create one
                    </Link>
                </p>
            </div>

            {/* Demo hint */}
            <div className="mt-4 p-3 border border-gold-500/10 bg-gold-500/5">
                <p className="text-[10px] font-body text-white/30 text-center">
                    Demo: <span className="text-gold-500/60">admin@luminary.com</span> or <span className="text-gold-500/60">demo@luminary.com</span> / password
                </p>
            </div>
        </GuestLayout>
    );
}
