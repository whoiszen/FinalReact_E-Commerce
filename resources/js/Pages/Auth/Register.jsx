import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', password: '', password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    const fields = [
        { label: 'Full Name',         name: 'name',                  type: 'text',     placeholder: 'Your full name',    autoComplete: 'name' },
        { label: 'Email Address',     name: 'email',                 type: 'email',    placeholder: 'your@email.com',    autoComplete: 'username' },
        { label: 'Password',          name: 'password',              type: 'password', placeholder: '••••••••',          autoComplete: 'new-password' },
        { label: 'Confirm Password',  name: 'password_confirmation', type: 'password', placeholder: '••••••••',          autoComplete: 'new-password' },
    ];

    return (
        <GuestLayout>
            <Head title="Create Account" />

            <div className="mb-8 text-center">
                <h1 className="font-display text-2xl font-bold text-white">Join Luminary</h1>
                <p className="text-xs font-body text-white/30 tracking-widest mt-1">Create your account</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {fields.map(f => (
                    <div key={f.name}>
                        <label className="block text-[10px] font-body tracking-widest uppercase text-white/40 mb-2">
                            {f.label}
                        </label>
                        <input type={f.type} value={data[f.name]} onChange={e => setData(f.name, e.target.value)}
                            placeholder={f.placeholder} autoComplete={f.autoComplete}
                            className={`input-luxury w-full px-4 py-3 text-sm ${errors[f.name] ? 'border-red-500' : ''}`} />
                        {errors[f.name] && <p className="text-xs text-red-400 mt-1 font-body">{errors[f.name]}</p>}
                    </div>
                ))}

                <button type="submit" disabled={processing}
                    className="btn-gold w-full py-3.5 mt-2 disabled:opacity-50">
                    {processing ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>

            <div className="mt-6 text-center border-t border-white/5 pt-6">
                <p className="text-xs font-body text-white/30">
                    Already have an account?{' '}
                    <Link href={route('login')} className="text-gold-500/80 hover:text-gold-400 transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
