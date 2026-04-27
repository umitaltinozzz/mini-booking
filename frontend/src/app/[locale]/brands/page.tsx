'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Search, MapPin, Clock, Star, ChevronLeft, ChevronRight,
    Scissors, UtensilsCrossed, Stethoscope, Dumbbell, Car, Sparkles
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { BrandsNavbar } from '@/components/brands/BrandsNavbar';
import { Footer } from '@/components/sections/Footer';


// Demo İşletmeler - 8 tane
const DEMO_BUSINESSES = [
    {
        id: 'asil-berber',
        name: 'Asil Berber Salonu',
        category: 'Berber',
        categoryIcon: Scissors,
        rating: 4.9,
        reviews: 128,
        address: 'Kadıköy, İstanbul',
        image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400',
    },
    {
        id: 'mamma-mia',
        name: 'Mamma Mia Trattoria',
        category: 'Restoran',
        categoryIcon: UtensilsCrossed,
        rating: 4.8,
        reviews: 342,
        address: 'Beşiktaş, İstanbul',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    },
    {
        id: 'fit-life',
        name: 'FitLife Spor Merkezi',
        category: 'Spor Salonu',
        categoryIcon: Dumbbell,
        rating: 4.7,
        reviews: 89,
        address: 'Şişli, İstanbul',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    },
    {
        id: 'bella-guzellik',
        name: 'Bella Güzellik Salonu',
        category: 'Güzellik Salonu',
        categoryIcon: Sparkles,
        rating: 4.6,
        reviews: 156,
        address: 'Bakırköy, İstanbul',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    },
    {
        id: 'yasam-klinik',
        name: 'Yaşam Sağlık Kliniği',
        category: 'Klinik',
        categoryIcon: Stethoscope,
        rating: 4.9,
        reviews: 234,
        address: 'Levent, İstanbul',
        image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400',
    },
    {
        id: 'expert-oto',
        name: 'Expert Oto Servis',
        category: 'Oto Servis',
        categoryIcon: Car,
        rating: 4.5,
        reviews: 67,
        address: 'Ataşehir, İstanbul',
        image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400',
    },
    {
        id: 'elit-kuafor',
        name: 'Elit Kuaför',
        category: 'Kuaför',
        categoryIcon: Scissors,
        rating: 4.8,
        reviews: 203,
        address: 'Beşiktaş, İstanbul',
        image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400',
    },
    {
        id: 'zen-spa',
        name: 'Zen Spa & Wellness',
        category: 'Spa',
        categoryIcon: Sparkles,
        rating: 4.9,
        reviews: 178,
        address: 'Nişantaşı, İstanbul',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
    },
];

// Animated Counter Hook - Slow increment one by one
// Animated Counter Hook - Random increments to simulate live bookings
function useCounter(initialValue: number) {
    const [count, setCount] = useState(initialValue);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const scheduleNext = () => {
            // Random delay between 3000ms (3s) and 8000ms (8s)
            const delay = Math.random() * 5000 + 3000;
            timeoutId = setTimeout(() => {
                setCount((prev) => prev + 1);
                scheduleNext();
            }, delay);
        };

        scheduleNext();

        return () => clearTimeout(timeoutId);
    }, []);

    return { count, ref };
}

// Scrollable Section Component
function ScrollableSection({ title, businesses }: { title: string; businesses: typeof DEMO_BUSINESSES }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-brand-text">{title}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center hover:bg-brand-surface2 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 text-brand-muted" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center hover:bg-brand-surface2 transition-colors"
                    >
                        <ChevronRight className="w-4 h-4 text-brand-muted" />
                    </button>
                </div>
            </div>
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2"
                style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {businesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                ))}
            </div>
        </section>
    );
}

// Business Card Component
function BusinessCard({ business }: { business: typeof DEMO_BUSINESSES[0] }) {
    return (
        <Link href={`/book/${business.id}`} className="flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
            <div className="w-[260px] group cursor-pointer">
                {/* Image */}
                <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                    <img
                        src={business.image}
                        alt={business.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                {/* Content */}
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-brand-accent hover:underline text-sm">
                            {business.name}
                        </h3>
                        <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-medium text-brand-text">{business.rating}</span>
                            <span className="text-xs text-brand-muted">({business.reviews})</span>
                        </div>
                    </div>
                    <p className="text-xs text-brand-muted">{business.address}</p>
                    <p className="text-xs text-brand-muted/70">{business.category}</p>
                </div>
            </div>
        </Link>
    );
}

export default function BrandsPage() {
    const counter = useCounter(107031);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('İstanbul');

    // Filter businesses based on search
    const filteredBusinesses = DEMO_BUSINESSES.filter(business =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Brands Navbar */}
            <BrandsNavbar />

            <main className="min-h-screen bg-brand-bg">

                {/* Hero Section */}
                <div className="pt-20">
                    <div className="relative py-24 px-6">

                        <div className="max-w-5xl mx-auto text-center relative z-10">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-black text-brand-text mb-4 tracking-tight"
                            >
                                Yerel hizmetleri <span className="text-brand-accent">keşfet</span>,<br />
                                anında <span className="text-brand-accent">randevu</span> al
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-brand-muted mb-10 text-lg"
                            >
                                En iyi salonları, restoranları, klinikleri bul. Milyonların güvendiği platform.
                            </motion.p>

                            {/* Search Bar - Wider */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-brand-surface2 border border-brand-border rounded-full shadow-xl p-2 flex flex-col md:flex-row items-stretch w-full mx-auto"
                            >
                                <div className="flex-1 flex items-center gap-2 px-4 py-3 md:py-0 md:border-r border-brand-border">
                                    <Search className="w-5 h-5 text-brand-muted" />
                                    <input
                                        type="text"
                                        placeholder="Hizmet veya işletme"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-transparent focus:outline-none text-brand-text placeholder:text-brand-muted"
                                    />
                                </div>
                                <div className="flex-1 flex items-center gap-2 px-4 py-3 md:py-0 md:border-r border-brand-border">
                                    <MapPin className="w-5 h-5 text-brand-muted" />
                                    <input
                                        type="text"
                                        placeholder="Konum"
                                        value={locationQuery}
                                        onChange={(e) => setLocationQuery(e.target.value)}
                                        className="w-full bg-transparent focus:outline-none text-brand-text placeholder:text-brand-muted"
                                    />
                                </div>
                                <div className="flex-1 flex items-center gap-2 px-4 py-3 md:py-0">
                                    <Clock className="w-5 h-5 text-brand-muted" />
                                    <input
                                        type="text"
                                        placeholder="Herhangi bir zaman"
                                        className="w-full bg-transparent focus:outline-none text-brand-text placeholder:text-brand-muted"
                                    />
                                </div>
                                <button className="bg-brand-accent hover:bg-brand-accent2 text-[#06080C] font-bold px-8 py-3 rounded-full transition-colors">
                                    Ara
                                </button>
                            </motion.div>

                            {/* Counter */}
                            <motion.div
                                ref={counter.ref}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-16 text-xl text-brand-muted"
                            >
                                <span className="font-black text-3xl md:text-4xl text-brand-accent">{counter.count.toLocaleString('tr-TR')}</span>
                                <span className="ml-2">randevu bugün alındı</span>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Business Sections */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    {/* Search Results - Only show when searching */}
                    {searchQuery && (
                        <section className="mb-10">
                            <h2 className="text-xl font-black text-brand-text mb-4">
                                Arama Sonuçları ({filteredBusinesses.length})
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredBusinesses.length > 0 ? (
                                    filteredBusinesses.map((business) => (
                                        <BusinessCard key={business.id} business={business} />
                                    ))
                                ) : (
                                    <p className="text-brand-muted col-span-full text-center py-8">
                                        &quot;{searchQuery}&quot; için sonuç bulunamadı
                                    </p>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Regular Sections - Hide when searching */}
                    {!searchQuery && (
                        <>
                            <ScrollableSection
                                title="Önerilen"
                                businesses={DEMO_BUSINESSES}
                            />
                            <ScrollableSection
                                title="Yeni Eklenenler"
                                businesses={[...DEMO_BUSINESSES].reverse()}
                            />
                            <ScrollableSection
                                title="Popüler"
                                businesses={DEMO_BUSINESSES.slice(2, 6).concat(DEMO_BUSINESSES.slice(0, 2))}
                            />
                        </>
                    )}
                </div>

                <Footer />
            </main>
        </>
    );
}
