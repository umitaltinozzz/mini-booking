'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search, MapPin, Star, Clock, Scissors, UtensilsCrossed,
    Stethoscope, Dumbbell, Car, Sparkles, Filter, ChevronDown,
    Users, Calendar
} from 'lucide-react';
import { Link } from '@/i18n/routing';

// Demo İşletmeler
const DEMO_BUSINESSES = [
    {
        id: 'asil-berber',
        name: 'Asil Berber Salonu',
        category: 'Kuaför / Berber',
        categoryIcon: Scissors,
        rating: 4.9,
        reviews: 128,
        address: 'Kadıköy, İstanbul',
        image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
        openNow: true,
        priceRange: '₺₺',
        services: ['Saç Kesimi', 'Sakal Tıraşı', 'Cilt Bakımı'],
    },
    {
        id: 'mamma-mia',
        name: 'Mamma Mia Trattoria',
        category: 'Restoran',
        categoryIcon: UtensilsCrossed,
        rating: 4.8,
        reviews: 342,
        address: 'Beşiktaş, İstanbul',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        openNow: true,
        priceRange: '₺₺₺',
        services: ['İtalyan Mutfağı', 'Rezervasyon', 'Özel Oda'],
    },
    {
        id: 'fit-life',
        name: 'FitLife Spor Merkezi',
        category: 'Spor Salonu',
        categoryIcon: Dumbbell,
        rating: 4.7,
        reviews: 89,
        address: 'Şişli, İstanbul',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
        openNow: true,
        priceRange: '₺₺',
        services: ['Fitness', 'Personal Training', 'Grup Dersleri'],
    },
    {
        id: 'guzellik-merkezi',
        name: 'Bella Güzellik Salonu',
        category: 'Güzellik Salonu',
        categoryIcon: Sparkles,
        rating: 4.6,
        reviews: 156,
        address: 'Bakırköy, İstanbul',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
        openNow: false,
        priceRange: '₺₺₺',
        services: ['Manikür', 'Pedikür', 'Cilt Bakımı', 'Makyaj'],
    },
    {
        id: 'saglik-klinik',
        name: 'Yaşam Sağlık Kliniği',
        category: 'Klinik / Sağlık',
        categoryIcon: Stethoscope,
        rating: 4.9,
        reviews: 234,
        address: 'Levent, İstanbul',
        image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800',
        openNow: true,
        priceRange: '₺₺₺₺',
        services: ['Diş Hekimi', 'Göz Muayene', 'Check-up'],
    },
    {
        id: 'oto-servis',
        name: 'Expert Oto Servis',
        category: 'Oto Servis',
        categoryIcon: Car,
        rating: 4.5,
        reviews: 67,
        address: 'Ataşehir, İstanbul',
        image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800',
        openNow: true,
        priceRange: '₺₺',
        services: ['Bakım', 'Lastik Değişimi', 'Motor Tamir'],
    },
];

const CATEGORIES = [
    { id: 'all', name: 'Tümü', icon: Filter },
    { id: 'barber', name: 'Kuaför / Berber', icon: Scissors },
    { id: 'restaurant', name: 'Restoran', icon: UtensilsCrossed },
    { id: 'gym', name: 'Spor Salonu', icon: Dumbbell },
    { id: 'beauty', name: 'Güzellik Salonu', icon: Sparkles },
    { id: 'clinic', name: 'Klinik / Sağlık', icon: Stethoscope },
    { id: 'auto', name: 'Oto Servis', icon: Car },
];

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredBusinesses = DEMO_BUSINESSES.filter(business => {
        const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            business.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            business.category.toLowerCase().includes(CATEGORIES.find(c => c.id === selectedCategory)?.name.toLowerCase() || '');
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-brand-bg">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-b from-brand-surface to-brand-bg pt-24 pb-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-brand-text mb-4"
                    >
                        İşletmeleri <span className="text-brand-accent">Keşfet</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-brand-muted mb-8"
                    >
                        Randevu alabileceğin en iyi işletmeleri bul
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="İşletme adı veya hizmet ara..."
                                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-brand-surface2 border border-brand-border text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent text-lg"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Categories */}
            <div className="border-b border-brand-border sticky top-0 bg-brand-bg/95 backdrop-blur-sm z-10">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {CATEGORIES.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${selectedCategory === category.id
                                            ? 'bg-brand-accent text-[#06080C] font-bold'
                                            : 'bg-brand-surface2 text-brand-muted hover:bg-brand-surface hover:text-brand-text'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span className="text-sm font-medium">{category.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Business Grid */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-brand-muted">
                        <span className="font-bold text-brand-text">{filteredBusinesses.length}</span> işletme bulundu
                    </p>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-surface2 text-brand-muted hover:text-brand-text transition-colors">
                        <span className="text-sm">Sırala</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBusinesses.map((business, index) => {
                        const CategoryIcon = business.categoryIcon;
                        return (
                            <motion.div
                                key={business.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/book/${business.id}`}>
                                    <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:border-brand-accent/50 hover:shadow-lg hover:shadow-brand-accent/5 transition-all group cursor-pointer">
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={business.image}
                                                alt={business.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute top-3 left-3">
                                                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${business.openNow
                                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                    }`}>
                                                    {business.openNow ? 'Açık' : 'Kapalı'}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-3 left-3 right-3">
                                                <h3 className="text-lg font-black text-white mb-1">{business.name}</h3>
                                                <div className="flex items-center gap-2 text-white/80 text-sm">
                                                    <CategoryIcon className="w-4 h-4" />
                                                    <span>{business.category}</span>
                                                    <span>•</span>
                                                    <span>{business.priceRange}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                    <span className="font-bold text-brand-text">{business.rating}</span>
                                                    <span className="text-brand-muted text-sm">({business.reviews})</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-brand-muted text-sm">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{business.address}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {business.services.slice(0, 3).map((service) => (
                                                    <span
                                                        key={service}
                                                        className="px-2 py-1 rounded-lg bg-brand-surface2 text-brand-muted text-xs"
                                                    >
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>

                                            <button className="w-full h-10 rounded-xl bg-brand-accent/10 text-brand-accent font-bold text-sm hover:bg-brand-accent hover:text-[#06080C] transition-all">
                                                Randevu Al
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {filteredBusinesses.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-brand-surface2 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-brand-muted" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-text mb-2">İşletme bulunamadı</h3>
                        <p className="text-brand-muted">Farklı bir arama terimi veya kategori deneyin.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
