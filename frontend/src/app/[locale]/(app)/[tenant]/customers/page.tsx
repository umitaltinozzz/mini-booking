'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UserCircle, Plus, Search, MoreHorizontal, Edit2, Trash2,
    Phone, Mail, Calendar, Clock, X, Save, Star, History
} from 'lucide-react';

// Mock customers data
const mockCustomers = [
    {
        id: '1',
        firstName: 'Ahmet',
        lastName: 'Yılmaz',
        email: 'ahmet@email.com',
        phone: '+90 532 XXX XX 01',
        avatar: 'AY',
        totalVisits: 24,
        lastVisit: '2026-01-08',
        totalSpent: 2450,
        notes: 'Saç kesimine kısa tercih ediyor',
        favoriteServices: ['Saç Kesimi', 'Sakal Tıraşı'],
    },
    {
        id: '2',
        firstName: 'Burak',
        lastName: 'Demir',
        email: 'burak@email.com',
        phone: '+90 532 XXX XX 02',
        avatar: 'BD',
        totalVisits: 12,
        lastVisit: '2026-01-05',
        totalSpent: 1180,
        notes: '',
        favoriteServices: ['Saç Kesimi'],
    },
    {
        id: '3',
        firstName: 'Can',
        lastName: 'Özkan',
        email: 'can@email.com',
        phone: '+90 532 XXX XX 03',
        avatar: 'CÖ',
        totalVisits: 45,
        lastVisit: '2026-01-10',
        totalSpent: 5670,
        notes: 'VIP müşteri, her zaman Canberk ile randevu alır',
        favoriteServices: ['Saç Kesimi', 'Sakal Tıraşı', 'Cilt Bakımı'],
    },
    {
        id: '4',
        firstName: 'Emre',
        lastName: 'Kara',
        email: 'emre@email.com',
        phone: '+90 532 XXX XX 04',
        avatar: 'EK',
        totalVisits: 8,
        lastVisit: '2025-12-28',
        totalSpent: 680,
        notes: '',
        favoriteServices: ['Saç Boyama'],
    },
    {
        id: '5',
        firstName: 'Fatih',
        lastName: 'Şahin',
        email: 'fatih@email.com',
        phone: '+90 532 XXX XX 05',
        avatar: 'FŞ',
        totalVisits: 32,
        lastVisit: '2026-01-09',
        totalSpent: 3890,
        notes: 'Perşembe günleri tercih ediyor',
        favoriteServices: ['Saç Kesimi', 'Sakal Tıraşı'],
    },
];

interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    totalVisits: number;
    lastVisit: string;
    totalSpent: number;
    notes: string;
    favoriteServices: string[];
}

export default function CustomersPage() {
    const [customers] = useState<Customer[]>(mockCustomers);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const filteredCustomers = customers.filter(c =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black text-brand-text">Müşteriler</h1>
                    <p className="text-sm text-brand-muted mt-1">Müşteri bilgilerini görüntüleyin ve yönetin</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-brand-accent text-brand-bg font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20"
                >
                    <Plus size={18} />
                    Yeni Müşteri
                </button>
            </div>

            {/* Search & Stats */}
            <div className="grid lg:grid-cols-4 gap-4 mb-6">
                <div className="lg:col-span-2 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                    <input
                        type="text"
                        placeholder="İsim, telefon veya e-posta ile ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-brand-surface border border-brand-border text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent"
                    />
                </div>
                <div className="bg-brand-surface border border-brand-border rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                        <UserCircle size={20} className="text-brand-accent" />
                    </div>
                    <div>
                        <p className="text-xl font-black text-brand-text">{customers.length}</p>
                        <p className="text-[10px] font-bold text-brand-muted uppercase">Toplam Müşteri</p>
                    </div>
                </div>
                <div className="bg-brand-surface border border-brand-border rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                        <History size={20} className="text-green-500" />
                    </div>
                    <div>
                        <p className="text-xl font-black text-brand-text">{customers.filter(c => new Date(c.lastVisit) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}</p>
                        <p className="text-[10px] font-bold text-brand-muted uppercase">Bu Hafta Gelen</p>
                    </div>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-brand-border">
                                <th className="text-left px-5 py-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest">Müşteri</th>
                                <th className="text-left px-5 py-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest hidden sm:table-cell">İletişim</th>
                                <th className="text-left px-5 py-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest hidden md:table-cell">Ziyaret</th>
                                <th className="text-left px-5 py-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest hidden lg:table-cell">Harcama</th>
                                <th className="text-left px-5 py-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest">Son Ziyaret</th>
                                <th className="text-right px-5 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer, index) => (
                                <motion.tr
                                    key={customer.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="border-b border-brand-border last:border-0 hover:bg-brand-surface2/30 transition-colors cursor-pointer"
                                    onClick={() => setSelectedCustomer(customer)}
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-brand-accent to-brand-accent2 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                                                {customer.avatar}
                                            </div>
                                            <div>
                                                <p className="font-bold text-brand-text">{customer.firstName} {customer.lastName}</p>
                                                <p className="text-xs text-brand-muted sm:hidden">{customer.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 hidden sm:table-cell">
                                        <p className="text-sm text-brand-text">{customer.phone}</p>
                                        <p className="text-xs text-brand-muted truncate max-w-[180px]">{customer.email}</p>
                                    </td>
                                    <td className="px-5 py-4 hidden md:table-cell">
                                        <p className="font-bold text-brand-text">{customer.totalVisits}</p>
                                        <p className="text-xs text-brand-muted">ziyaret</p>
                                    </td>
                                    <td className="px-5 py-4 hidden lg:table-cell">
                                        <p className="font-bold text-brand-text">₺{customer.totalSpent.toLocaleString()}</p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <p className="text-sm text-brand-text">{formatDate(customer.lastVisit)}</p>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); }}
                                            className="p-2 hover:bg-brand-surface2 rounded-lg transition-colors"
                                        >
                                            <MoreHorizontal size={16} className="text-brand-muted" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Customer Detail Modal */}
            <AnimatePresence>
                {selectedCustomer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedCustomer(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-brand-surface border border-brand-border rounded-2xl p-6 w-full max-w-lg"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-brand-accent to-brand-accent2 rounded-2xl flex items-center justify-center text-white font-black text-xl">
                                        {selectedCustomer.avatar}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-brand-text">{selectedCustomer.firstName} {selectedCustomer.lastName}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Star size={14} className="text-yellow-500" fill="currentColor" />
                                            <span className="text-sm text-brand-muted">{selectedCustomer.totalVisits} ziyaret</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedCustomer(null)}
                                    className="p-2 hover:bg-brand-surface2 rounded-lg transition-colors"
                                >
                                    <X size={18} className="text-brand-muted" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 p-4 bg-brand-surface2/50 rounded-xl">
                                    <div>
                                        <p className="text-[10px] font-bold text-brand-muted uppercase">Toplam Harcama</p>
                                        <p className="text-xl font-black text-brand-text">₺{selectedCustomer.totalSpent.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-brand-muted uppercase">Son Ziyaret</p>
                                        <p className="font-bold text-brand-text">{formatDate(selectedCustomer.lastVisit)}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 p-3 bg-brand-surface2/30 rounded-xl">
                                        <Phone size={16} className="text-brand-muted" />
                                        <span className="text-sm text-brand-text">{selectedCustomer.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-brand-surface2/30 rounded-xl">
                                        <Mail size={16} className="text-brand-muted" />
                                        <span className="text-sm text-brand-text">{selectedCustomer.email}</span>
                                    </div>
                                </div>

                                {selectedCustomer.notes && (
                                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                                        <p className="text-xs font-bold text-yellow-600 uppercase mb-1">Not</p>
                                        <p className="text-sm text-brand-text">{selectedCustomer.notes}</p>
                                    </div>
                                )}

                                <div>
                                    <p className="text-xs font-bold text-brand-muted uppercase mb-2">Favori Hizmetler</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCustomer.favoriteServices.map((service) => (
                                            <span
                                                key={service}
                                                className="px-3 py-1.5 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-lg"
                                            >
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button className="flex-1 h-11 rounded-xl bg-brand-accent text-brand-bg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                                    <Calendar size={16} />
                                    Randevu Al
                                </button>
                                <button className="h-11 px-5 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold flex items-center justify-center gap-2 hover:bg-brand-surface transition-colors">
                                    <Edit2 size={16} />
                                    Düzenle
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-brand-surface border border-brand-border rounded-2xl p-6 w-full max-w-md"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-black text-brand-text">Yeni Müşteri</h3>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 hover:bg-brand-surface2 rounded-lg transition-colors"
                                >
                                    <X size={18} className="text-brand-muted" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-brand-muted uppercase mb-2">Ad</label>
                                        <input
                                            type="text"
                                            className="w-full h-11 px-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-brand-muted uppercase mb-2">Soyad</label>
                                        <input
                                            type="text"
                                            className="w-full h-11 px-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-brand-muted uppercase mb-2">Telefon</label>
                                    <input
                                        type="tel"
                                        className="w-full h-11 px-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-brand-muted uppercase mb-2">E-posta</label>
                                    <input
                                        type="email"
                                        className="w-full h-11 px-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-brand-muted uppercase mb-2">Not (Opsiyonel)</label>
                                    <textarea
                                        rows={3}
                                        className="w-full p-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/20 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 h-11 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold hover:bg-brand-surface transition-colors"
                                >
                                    İptal
                                </button>
                                <button className="flex-1 h-11 rounded-xl bg-brand-accent text-brand-bg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                                    <Save size={16} />
                                    Kaydet
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
