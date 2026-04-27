'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users, Clock, Star, Phone, Mail, Calendar,
    UserPlus, Search, Filter
} from 'lucide-react';

interface Guest {
    id: string;
    name: string;
    phone: string;
    email?: string;
    visits: number;
    lastVisit: string;
    totalSpent: number;
    favoriteItems: string[];
    notes?: string;
    isVIP: boolean;
}

const MOCK_GUESTS: Guest[] = [
    {
        id: 'g1',
        name: 'Ahmet Yılmaz',
        phone: '+90 532 XXX XX XX',
        email: 'ahmet@email.com',
        visits: 12,
        lastVisit: '2 gün önce',
        totalSpent: 2450,
        favoriteItems: ['Margherita Pizza', 'Tiramisu'],
        notes: 'Glutensiz tercih eder',
        isVIP: true,
    },
    {
        id: 'g2',
        name: 'Ayşe Demir',
        phone: '+90 533 XXX XX XX',
        visits: 8,
        lastVisit: '1 hafta önce',
        totalSpent: 1680,
        favoriteItems: ['Pasta Carbonara', 'Limonata'],
        isVIP: false,
    },
    {
        id: 'g3',
        name: 'Mehmet Kaya',
        phone: '+90 535 XXX XX XX',
        email: 'mehmet.k@email.com',
        visits: 23,
        lastVisit: 'Bugün',
        totalSpent: 4890,
        favoriteItems: ['Karışık Izgara', 'Baklava'],
        notes: 'Masa 9 favorisi',
        isVIP: true,
    },
    {
        id: 'g4',
        name: 'Zeynep Arslan',
        phone: '+90 536 XXX XX XX',
        visits: 5,
        lastVisit: '3 gün önce',
        totalSpent: 920,
        favoriteItems: ['Salata', 'Smoothie'],
        isVIP: false,
    },
];

export function RestaurantStaffGuests() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'vip'>('all');

    const filteredGuests = MOCK_GUESTS.filter(guest => {
        const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guest.phone.includes(searchTerm);
        const matchesFilter = filter === 'all' || (filter === 'vip' && guest.isVIP);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-brand-text">Misafirler</h1>
                    <p className="text-sm text-brand-muted mt-1">Düzenli misafirlerinizi takip edin</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
                    <UserPlus size={18} />
                    Yeni Misafir
                </button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                    <input
                        type="text"
                        placeholder="Misafir ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-brand-surface border border-brand-border text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-xl font-bold transition-all ${filter === 'all'
                                ? 'bg-orange-500 text-white'
                                : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text'
                            }`}
                    >
                        Tümü
                    </button>
                    <button
                        onClick={() => setFilter('vip')}
                        className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${filter === 'vip'
                                ? 'bg-orange-500 text-white'
                                : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text'
                            }`}
                    >
                        <Star size={16} />
                        VIP
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-4">
                    <Users size={20} className="text-orange-500 mb-2" />
                    <p className="text-2xl font-black text-brand-text">{MOCK_GUESTS.length}</p>
                    <p className="text-xs text-brand-muted">Toplam Misafir</p>
                </div>
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-4">
                    <Star size={20} className="text-yellow-500 mb-2" />
                    <p className="text-2xl font-black text-brand-text">{MOCK_GUESTS.filter(g => g.isVIP).length}</p>
                    <p className="text-xs text-brand-muted">VIP Misafir</p>
                </div>
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-4">
                    <Calendar size={20} className="text-blue-500 mb-2" />
                    <p className="text-2xl font-black text-brand-text">{MOCK_GUESTS.reduce((acc, g) => acc + g.visits, 0)}</p>
                    <p className="text-xs text-brand-muted">Toplam Ziyaret</p>
                </div>
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-4">
                    <Clock size={20} className="text-green-500 mb-2" />
                    <p className="text-2xl font-black text-brand-text">₺{MOCK_GUESTS.reduce((acc, g) => acc + g.totalSpent, 0).toLocaleString()}</p>
                    <p className="text-xs text-brand-muted">Toplam Harcama</p>
                </div>
            </div>

            {/* Guest List */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
                {filteredGuests.map((guest, index) => (
                    <motion.div
                        key={guest.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-5 hover:bg-brand-surface2/30 transition-colors ${index !== filteredGuests.length - 1 ? 'border-b border-brand-border' : ''
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-lg ${guest.isVIP
                                    ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                                    : 'bg-gradient-to-br from-gray-500 to-gray-600'
                                }`}>
                                {guest.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-black text-brand-text">{guest.name}</h3>
                                    {guest.isVIP && (
                                        <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 text-yellow-500 rounded text-xs font-bold">
                                            <Star size={10} fill="currentColor" />
                                            VIP
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-sm text-brand-muted">
                                    <span className="flex items-center gap-1">
                                        <Phone size={12} />
                                        {guest.phone}
                                    </span>
                                    {guest.email && (
                                        <span className="flex items-center gap-1">
                                            <Mail size={12} />
                                            {guest.email}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {guest.favoriteItems.map(item => (
                                        <span key={item} className="px-2 py-1 bg-orange-500/10 text-orange-600 rounded text-xs font-bold">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                {guest.notes && (
                                    <p className="text-xs text-brand-muted mt-2 italic">📝 {guest.notes}</p>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="font-black text-brand-text">₺{guest.totalSpent.toLocaleString()}</p>
                                <p className="text-xs text-brand-muted">{guest.visits} ziyaret</p>
                                <p className="text-xs text-orange-500 font-bold mt-1">{guest.lastVisit}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {filteredGuests.length === 0 && (
                    <div className="p-8 text-center">
                        <Users size={32} className="mx-auto text-brand-muted mb-3" />
                        <p className="font-bold text-brand-text">Misafir bulunamadı</p>
                        <p className="text-xs text-brand-muted mt-1">Arama kriterlerinizi değiştirin</p>
                    </div>
                )}
            </div>
        </div>
    );
}
