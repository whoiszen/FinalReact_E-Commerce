import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });
    const submit = (e) => { e.preventDefault(); post(route('password.email')); };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <div className="mb-8 text-center">
                <h1 className="font-display text-2xl font-bold text-white">Reset Password</h1>
                <p className="text-xs font-body text-white/30 mt-2 leading-relaxed">
                    Enter your email and we'll send a reset link.
                </p>
            </div>
            {status && <div className="mb-5 text-xs font-body text-green-400 border border-green-500/20 bg-green-950/30 px-4 py-3">{status}</div>}
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-[10px] font-body tracking-widest uppercase text-white/40 mb-2">Email Address</label>
                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)}
                        className={`input-luxury w-full px-4 py-3 text-sm ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="your@email.com" />
                    {errors.email && <p className="text-xs text-red-400 mt-1 font-body">{errors.email}</p>}
                </div>
                <button type="submit" disabled={processing} className="btn-gold w-full py-3.5 disabled:opacity-50">
                    {processing ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            <div className="mt-6 text-center">
                <Link href={route('login')} className="text-xs font-body text-white/30 hover:text-gold-400 transition-colors tracking-widest">
                    ← Back to Sign In
                </Link>
            </div>
        </GuestLayout>
    );
}

export function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token, email, password: '', password_confirmation: '',
    });
    const submit = (e) => { e.preventDefault(); post(route('password.store'), { onFinish: () => reset('password', 'password_confirmation') }); };

    return (
        <GuestLayout>
            <Head title="Reset Password" />
            <div className="mb-8 text-center">
                <h1 className="font-display text-2xl font-bold text-white">New Password</h1>
            </div>
            <form onSubmit={submit} className="space-y-5">
                {[
                    { label: 'Email',            name: 'email',                 type: 'email',    readOnly: true },
                    { label: 'New Password',      name: 'password',              type: 'password' },
                    { label: 'Confirm Password',  name: 'password_confirmation', type: 'password' },
                ].map(f => (
                    <div key={f.name}>
                        <label className="block text-[10px] font-body tracking-widest uppercase text-white/40 mb-2">{f.label}</label>
                        <input type={f.type} value={data[f.name]} onChange={e => !f.readOnly && setData(f.name, e.target.value)}
                            readOnly={f.readOnly}
                            className={`input-luxury w-full px-4 py-3 text-sm ${f.readOnly ? 'opacity-50' : ''} ${errors[f.name] ? 'border-red-500' : ''}`} />
                        {errors[f.name] && <p className="text-xs text-red-400 mt-1 font-body">{errors[f.name]}</p>}
                    </div>
                ))}
                <button type="submit" disabled={processing} className="btn-gold w-full py-3.5 disabled:opacity-50">
                    {processing ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </GuestLayout>
    );
}

export function VerifyEmail({ status }) {
    const { post, processing } = useForm({});
    const resend = (e) => { e.preventDefault(); post(route('verification.send')); };

    return (
        <GuestLayout>
            <Head title="Verify Email" />
            <div className="text-center mb-6">
                <div className="text-4xl mb-4 font-display text-gold-400">✉</div>
                <h1 className="font-display text-2xl font-bold text-white mb-3">Verify Your Email</h1>
                <p className="text-sm font-body text-white/40 leading-relaxed">
                    We sent a verification link to your email address. Click the link to continue.
                </p>
            </div>
            {status === 'verification-link-sent' && (
                <div className="mb-5 text-xs font-body text-green-400 border border-green-500/20 bg-green-950/30 px-4 py-3 text-center">
                    A new verification link has been sent.
                </div>
            )}
            <form onSubmit={resend}>
                <button type="submit" disabled={processing} className="btn-gold w-full py-3.5 disabled:opacity-50">
                    {processing ? 'Sending...' : 'Resend Verification Email'}
                </button>
            </form>
            <form method="POST" action={route('logout')} className="mt-4">
                <button type="submit" className="w-full text-xs font-body text-white/30 hover:text-red-400 transition-colors py-2 tracking-widest uppercase">
                    Sign Out
                </button>
            </form>
        </GuestLayout>
    );
}

export function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({ password: '' });
    const submit = (e) => { e.preventDefault(); post(route('password.confirm'), { onFinish: () => reset('password') }); };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />
            <div className="mb-8 text-center">
                <h1 className="font-display text-2xl font-bold text-white">Confirm Identity</h1>
                <p className="text-xs font-body text-white/30 mt-2">Please confirm your password to continue.</p>
            </div>
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-[10px] font-body tracking-widest uppercase text-white/40 mb-2">Password</label>
                    <input type="password" value={data.password} onChange={e => setData('password', e.target.value)}
                        className={`input-luxury w-full px-4 py-3 text-sm ${errors.password ? 'border-red-500' : ''}`}
                        placeholder="••••••••" autoComplete="current-password" />
                    {errors.password && <p className="text-xs text-red-400 mt-1 font-body">{errors.password}</p>}
                </div>
                <button type="submit" disabled={processing} className="btn-gold w-full py-3.5 disabled:opacity-50">
                    {processing ? 'Confirming...' : 'Confirm'}
                </button>
            </form>
        </GuestLayout>
    );
}

// Default exports for Inertia page resolution
export default ForgotPassword;
