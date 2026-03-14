import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-diamond-gradient" />
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #d4971a22 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6b55a322 0%, transparent 50%)' }} />

            <div className="relative w-full max-w-md px-6">
                {/* Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block">
                        <div className="font-display text-3xl font-bold text-gold-shimmer">LUMINARY</div>
                        <div className="text-[9px] font-body tracking-[0.4em] uppercase text-white/30 mt-1">Luxury Diamond Co.</div>
                    </Link>
                </div>

                {/* Card */}
                <div className="card-luxury p-8 border border-white/10">
                    {children}
                </div>

                {/* Footer */}
                <p className="text-center text-[10px] font-body text-white/20 tracking-widest mt-8">
                    © {new Date().getFullYear()} Luminary Diamond Co.
                </p>
            </div>
        </div>
    );
}
