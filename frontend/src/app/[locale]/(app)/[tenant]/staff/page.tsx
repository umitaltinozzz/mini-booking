'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Plus, Search, MoreHorizontal, Edit2, Trash2,
    Phone, Mail, Star, Calendar, Clock, X, Save, UserPlus
} from 'lucide-react';

// Mock staff data
const mockStaff = [
    {
        id: '1',
        firstName: 'Canberk',
        lastName: 'Hızarcı',
        email: 'canberk@asil-berber.com',
        phone: '+90 532 XXX XX 01',
        role: 'Kıdemli Berber',
        avatar: 'CH',
        isActive: true,
        rating: 4.9,
        totalAppointments: 1245,
        todayAppointments: 8,
        specialties: ['Saç Kesimi', 'Sakal Tıraşı', 'Cilt Bakımı'],
    },
    {
        id: '2',
        firstName: 'Mehmet',
        lastName: 'Aydın',
        email: 'mehmet@asil-berber.com',
        phone: '+90 532 XXX XX 02',
        role: 'Berber',
        avatar: 'MA',
        isActive: true,
        rating: 4.7,
        totalAppointments: 892,
        todayAppointments: 6,
        specialties: ['Saç Kesimi', 'Saç Boyama'],
    },
    {
        id: '3',
        firstName: 'Deniz',
        lastName: 'Kaya',
        email: 'deniz@asil-berber.com',
        phone: '+90 532 XXX XX 03',
        role: 'Çırak',
        avatar: 'DK',
        isActive: false,
        rating: 4.5,
        totalAppointments: 234,
        todayAppointments: 0,
        specialties: ['Saç Yıkama', 'Fön'],
    },
];

interface Staff {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    isActive: boolean;
    rating: number;
    totalAppointments: number;
    todayAppointments: number;
    specialties: string[];
}

export default function StaffManagementPage() {
    const [staff, setStaff] = useState<Staff[]>(mockStaff);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

    const filteredStaff = staff.filter(s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black text-brand-text">Personel Yönetimi</h1>
                    <p className="text-sm text-brand-muted mt-1">Ekibinizi yönetin ve performanslarını takip edin</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-brand-accent text-brand-bg font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20"
                >
                    <UserPlus size={18} />
                    Yeni Personel
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                    type="text"
                    placeholder="Personel ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-brand-surface border border-brand-border text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent"
                />
            </div>

            {/* Staff Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStaff.map((member, index) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-brand-surface border border-brand-border rounded-2xl p-5 hover:border-brand-accent/30 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-lg ${member.isActive
                                        ? 'bg-gradient-to-br from-brand-accent to-brand-accent2'
                                        : 'bg-gray-400'
                                    }`}>
                                    {member.avatar}
                                </div>
                                <div>
                                    <h3 className="font-black text-brand-text">{member.firstName} {member.lastName}</h3>
                                    <p className="text-sm text-brand-muted">{member.role}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setEditingStaff(member)}
                                    className="p-2 hover:bg-brand-surface2 rounded-lg transition-colors"
                                >
                                    <Edit2 size={16} className="text-brand-muted" />
                                </button>
                                <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <Trash2 size={16} className="text-red-500" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-brand-muted">
                                <Phone size={14} />
                                <span>{member.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-brand-muted">
                                <Mail size={14} />
                                <span className="truncate">{member.email}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                            <div className="flex items-center gap-1">
                                <Star size={14} className="text-yellow-500" fill="currentColor" />
                                <span className="font-bold text-brand-text text-sm">{member.rating}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-brand-muted">
                                <span className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    {member.todayAppointments} bugün
                                </span>
                                <span className={`px-2 py-0.5 rounded-full font-bold ${member.isActive
                                        ? 'bg-green-500/10 text-green-500'
                                        : 'bg-gray-500/10 text-gray-500'
                                    }`}>
                                    {member.isActive ? 'Aktif' : 'Pasif'}
                                </span>
                            </div>
                        </div>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-1 mt-3">
                            {member.specialties.slice(0, 3).map((spec) => (
                                <span
                                    key={spec}
                                    className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent text-[10px] font-bold rounded"
                                >
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {(showAddModal || editingStaff) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => { setShowAddModal(false); setEditingStaff(null); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-brand-surface border border-brand-border rounded-2xl p-6 w-full max-w-md"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-black text-brand-text">
                                    {editingStaff ? 'Personel Düzenle' : 'Yeni Personel'}
                                </h3>
                                <button
                                    onClick={() => { setShowAddModal(false); setEditingStaff(null); }}
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
                                            defaultValue={editingStaff?.firstName}
                                            className="w-full h-11 px-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-brand-muted uppercase mb-2">Soyad</label>
                                        <input
                                            type="text"
                                            defaultValue={editingStaff?.lastName}
                                            className="w-full h-11 px-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-brand-muted uppercase mb-2">E-posta</label>
                                    <input
                                        type="email"
                                        defaultValue={editingStaff?.email}
                                        className="w-full h-11 px-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-brand-muted uppercase mb-2">Telefon</label>
                                    <input
                                        type="tel"
                                        defaultValue={editingStaff?.phone}
                                        className="w-full h-11 px-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-brand-muted uppercase mb-2">Rol</label>
                                    <select
                                        defaultValue={editingStaff?.role}
                                        className="w-full h-11 px-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                                    >
                                        <option>Kıdemli Berber</option>
                                        <option>Berber</option>
                                        <option>Çırak</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => { setShowAddModal(false); setEditingStaff(null); }}
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
