import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const initiatives = [
    {
        title:    'Diamond Connoisseur Program',
        category: 'Membership',
        badge:    '✦ Active',
        color:    'gold',
        image:    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600',
        desc:     'Join our exclusive members circle and gain early access to new collections, private viewings, and dedicated diamond consultants. Members enjoy priority service and exclusive pricing.',
        details:  ['Priority access to new arrivals', 'Dedicated diamond consultant', 'Members-only pricing', 'Annual jewelry appraisal'],
    },
    {
        title:    'Artisan Certification Fund',
        category: 'Social Impact',
        badge:    '◈ Ongoing',
        color:    'blue',
        image:    'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600',
        desc:     '5% of every purchase funds GIA certification training for Filipino jewelry artisans. We believe in elevating local craftsmanship to world-class standards.',
        details:  ['GIA training scholarships', 'Local artisan support', 'Ethical sourcing practices', 'Fair wage commitment'],
    },
    {
        title:    'Luminary Styling Sessions',
        category: 'Events',
        badge:    '◇ Monthly',
        color:    'purple',
        image:    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600',
        desc:     'Monthly in-store and virtual styling sessions where our expert gemologists help you discover diamonds that complement your personal style and life story.',
        details:  ['Expert gemologist guidance', 'In-store & virtual options', 'Complimentary consultation', 'Personal styling report'],
    },
    {
        title:    'Custom Design Atelier',
        category: 'Bespoke',
        badge:    '✦ Year-Round',
        color:    'rose',
        image:    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
        desc:     'Work one-on-one with our master jewelers to create a completely unique, bespoke diamond piece that tells your personal story. From concept to creation.',
        details:  ['One-on-one design sessions', '3D CAD previews', 'Premium materials only', 'Lifetime craftsmanship warranty'],
    },
    {
        title:    'Diamond Education Series',
        category: 'Education',
        badge:    '◻ Quarterly',
        color:    'green',
        image:    'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600',
        desc:     'Free quarterly seminars covering the 4Cs, diamond grading, investment value, and care. Empowering buyers to make confident, informed decisions.',
        details:  ['Free to all customers', 'GIA-certified educators', 'Certificate of completion', 'Online & in-person options'],
    },
    {
        title:    'Heirloom Restoration',
        category: 'Services',
        badge:    '◈ Available',
        color:    'amber',
        image:    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
        desc:     'Breathe new life into treasured family diamonds. Our restoration service preserves the sentimental value of heirloom pieces while bringing them to modern brilliance.',
        details:  ['Professional cleaning & polishing', 'Setting restoration', 'Re-certification available', 'Insurance documentation'],
    },
];

const colorMap = {
    gold:   'border-gold-500/20 bg-gold-500/5 text-gold-400',
    blue:   'border-blue-500/20 bg-blue-500/5 text-blue-400',
    purple: 'border-purple-500/20 bg-purple-500/5 text-purple-400',
    rose:   'border-rose-500/20 bg-rose-500/5 text-rose-400',
    green:  'border-green-500/20 bg-green-500/5 text-green-400',
    amber:  'border-amber-500/20 bg-amber-500/5 text-amber-400',
};

export default function Community() {
    return (
        <AppLayout>
            <Head title="Community" />

            {/* Hero */}
            <section className="py-32 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-diamond-gradient" />
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #d4971a 0%, transparent 50%), radial-gradient(circle at 70% 50%, #6b55a3 0%, transparent 50%)' }} />
                <div className="relative max-w-3xl mx-auto px-6">
                    <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">Together We Shine</span>
                    <h1 className="font-display text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                        The Luminary<br />
                        <span className="text-gold-shimmer">Circle</span>
                    </h1>
                    <div className="section-divider" />
                    <p className="font-body text-white/50 text-lg leading-relaxed mt-6 max-w-xl mx-auto">
                        A community of diamond connoisseurs, collectors, and enthusiasts united
                        by a passion for extraordinary beauty.
                    </p>
                </div>
            </section>

            {/* Initiatives Grid */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">Our Programs</span>
                    <h2 className="font-display text-4xl font-bold text-white mt-3">Community Initiatives</h2>
                    <div className="section-divider mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initiatives.map((item) => (
                        <div key={item.title} className="card-luxury overflow-hidden hover:border-white/20 transition-all duration-500 group product-card-hover">
                            {/* Image */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="text-[10px] font-body tracking-wider text-white/60 bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-1">
                                        {item.category}
                                    </span>
                                    <span className={`text-[10px] font-body tracking-wider border px-2 py-1 ${colorMap[item.color] || colorMap.gold}`}>
                                        {item.badge}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="font-body text-sm text-white/40 leading-relaxed mb-5">
                                    {item.desc}
                                </p>

                                {/* Details */}
                                <ul className="space-y-2 mb-5">
                                    {item.details.map(d => (
                                        <li key={d} className="flex items-center gap-2 text-xs font-body text-white/40">
                                            <span className="text-gold-500/50">◇</span>
                                            {d}
                                        </li>
                                    ))}
                                </ul>

                                <Link href={route('products.index')}
                                    className="text-xs font-body tracking-widest uppercase text-gold-500/60 hover:text-gold-400 transition-colors flex items-center gap-2 group/link">
                                    Learn More
                                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Join CTA */}
            <section className="py-24 bg-black/40 text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-500/60">Join Us</span>
                    <h2 className="font-display text-4xl font-bold text-white mt-3 mb-5">
                        Become Part of<br />
                        <span className="text-gold-shimmer">The Circle</span>
                    </h2>
                    <p className="font-body text-white/40 mb-10">
                        Create your account today and gain access to exclusive programs,
                        early collection previews, and personalized diamond consultations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={route('register')} className="btn-gold px-12 py-4">
                            Join Luminary Circle
                        </Link>
                        <Link href={route('products.index')} className="btn-outline-gold px-12 py-4">
                            Explore Collections
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
