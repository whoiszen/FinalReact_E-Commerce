import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function About() {
    return (
        <AppLayout>
            <Head title="About Us" />

            {/* Hero */}
            <section className="relative py-32 overflow-hidden text-center">
                <div className="absolute inset-0 bg-diamond-gradient" />
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 50% 80%, #d4971a 0%, transparent 60%)' }} />
                <div className="relative max-w-3xl mx-auto px-6">
                    <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">Our Story</span>
                    <h1 className="font-display text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                        Crafted for<br />
                        <span className="text-gold-shimmer">Eternity</span>
                    </h1>
                    <div className="section-divider" />
                    <p className="font-body text-white/50 text-lg leading-relaxed mt-6">
                        For over a decade, Luminary has been the Philippines' most trusted source
                        for certified luxury diamonds and fine jewelry.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-24 max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700"
                            alt="Our Atelier"
                            className="w-full aspect-square object-cover border border-white/5"
                        />
                    </div>
                    <div>
                        <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">How We Began</span>
                        <h2 className="font-display text-4xl font-bold text-white mt-3 mb-6">Founded on Brilliance</h2>
                        <div className="section-divider mx-0 mb-6" />
                        {[
                            'Luminary was founded in 2010 in Manila with one unwavering conviction: every person deserves access to diamonds of the highest quality, authenticated and certified with complete transparency.',
                            'We partnered directly with GIA and IGI certified cutters, eliminating middlemen to bring you extraordinary diamonds at honest prices. Each stone in our collection undergoes rigorous grading before it reaches your hands.',
                            'Today, we serve discerning clients across the Philippines — from first-time diamond buyers to collectors — each trusting us with their most meaningful moments.',
                        ].map((p, i) => (
                            <p key={i} className="font-body text-white/50 text-sm leading-relaxed mb-4">{p}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-black/40">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">What Drives Us</span>
                        <h2 className="font-display text-4xl font-bold text-white mt-3">Our Pillars</h2>
                        <div className="section-divider mt-4" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: '◇', title: 'Transparency', desc: 'Every diamond comes with its GIA or IGI certificate. No secrets, no surprises — just the complete, unbiased truth about your stone.' },
                            { icon: '◈', title: 'Mastery', desc: 'Our master jewelers bring decades of expertise to every setting. Each piece is a convergence of art and precision engineering.' },
                            { icon: '✦', title: 'Legacy', desc: 'We design pieces meant to outlast generations — diamonds that will be passed down with pride through your family\'s story.' },
                        ].map(v => (
                            <div key={v.title} className="card-luxury p-8 text-center hover:border-gold-500/20 transition-all duration-300 group">
                                <div className="text-3xl text-gold-500/40 mb-5 font-display group-hover:text-gold-400 transition-colors">{v.icon}</div>
                                <h3 className="font-display text-xl font-bold text-white mb-4">{v.title}</h3>
                                <p className="font-body text-sm text-white/40 leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '2,400+', label: 'Diamonds Placed' },
                            { value: '14',     label: 'Years of Excellence' },
                            { value: '100%',   label: 'GIA / IGI Certified' },
                            { value: '4.9★',   label: 'Average Rating' },
                        ].map(s => (
                            <div key={s.label} className="card-luxury p-6">
                                <div className="font-display text-3xl font-bold text-gold-400 mb-2">{s.value}</div>
                                <div className="text-[10px] font-body tracking-widest uppercase text-white/30">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-black/40 text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="font-display text-4xl font-bold text-white mb-5">
                        Begin Your<br />
                        <span className="text-gold-shimmer">Diamond Journey</span>
                    </h2>
                    <p className="font-body text-white/40 mb-8">
                        Let us help you find the perfect diamond for your most important moments.
                    </p>
                    <Link href={route('products.index')} className="btn-gold px-12 py-4">
                        Explore Collections
                    </Link>
                </div>
            </section>
        </AppLayout>
    );
}
