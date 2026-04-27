'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User, Mail, Phone, Camera, Star, Calendar,
    Award, Edit2, Save, Check
} from 'lucide-react';
import { useTenant } from '@/providers/TenantProvider';

// Staff profiles based on tenant
const STAFF_PROFILES: Record<string, {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    bio: string;
    rating: number;
    totalReviews: number;
    todayAppointments: number;
    todayCompleted: number;
    specialties?: string[];
}> = {
    'asil-berber': {
        firstName: 'Canberk',
        lastName: 'Hoca',
        title: 'Kıdemli Berber',
        email: 'canberk@asilberber.com',
        phone: '+90 532 XXX XX XX',
        bio: 'Asil Berber\'de 5 yıldır çalışıyorum. Saç kesimi ve sakal tıraşı konusunda uzmanım.',
        rating: 4.9,
        totalReviews: 342,
        todayAppointments: 12,
        todayCompleted: 8,
        specialties: ['Saç Kesimi', 'Sakal Tıraşı', 'Premium Bakım'],
    },
    'mamma-mia': {
        firstName: 'Ayşe',
        lastName: 'Garson',
        title: 'Kıdemli Garson',
        email: 'ayse@mammamia.com',
        phone: '+90 533 XXX XX XX',
        bio: 'Mamma Mia\'da 3 yıldır çalışıyorum. Misafir memnuniyeti ve servis konusunda deneyimliyim.',
        rating: 4.9,
        totalReviews: 156,
        todayAppointments: 24,
        todayCompleted: 18,
        specialties: ['VIP Servis', 'Şarap Önerileri', 'İtalyan Mutfağı'],
    },
    'test-tenant': {
        firstName: 'Test',
        lastName: 'Çalışan',
        title: 'Test Personeli',
        email: 'test@test.com',
        phone: '+90 500 XXX XX XX',
        bio: 'Test hesabı için örnek biyografi.',
        rating: 5.0,
        totalReviews: 0,
        todayAppointments: 0,
        todayCompleted: 0,
    },
};

export default function StaffProfilePage() {
    const { tenant } = useTenant();
    const staffProfile = STAFF_PROFILES[tenant.slug] || STAFF_PROFILES['test-tenant'];
    const [isEditing, setIsEditing] = useState(false);
    const [saved, setSaved] = useState(false);

    const [formData, setFormData] = useState({
        firstName: staffProfile.firstName,
        lastName: staffProfile.lastName,
        email: staffProfile.email,
        phone: staffProfile.phone,
        bio: staffProfile.bio,
    });

    const handleSave = () => {
        setSaved(true);
        setIsEditing(false);
        setTimeout(() => setSaved(false), 2000);
    };

    const isRestaurant = tenant.sector === 'restaurant';
    const themeColor = isRestaurant ? 'orange' : 'purple';

    return (
        <div className="animate-in fade-in duration-500 max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-brand-text">Profilim</h1>
                    <p className="text-sm text-brand-muted mt-1">Kişisel bilgilerinizi görüntüleyin ve düzenleyin</p>
                </div>
                <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${saved
                            ? 'bg-green-500 text-white'
                            : isEditing
                                ? `${isRestaurant ? 'bg-orange-500 hover:bg-orange-600' : 'bg-purple-500 hover:bg-purple-600'} text-white`
                                : 'bg-brand-surface2 text-brand-text hover:bg-brand-surface'
                        }`}
                >
                    {saved ? <Check size={18} /> : isEditing ? <Save size={18} /> : <Edit2 size={18} />}
                    {saved ? 'Kaydedildi!' : isEditing ? 'Kaydet' : 'Düzenle'}
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-1"
                >
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 text-center">
                        {/* Avatar */}
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <div className={`w-full h-full bg-gradient-to-br ${isRestaurant ? 'from-orange-500 to-red-500' : 'from-purple-500 to-pink-500'} rounded-2xl flex items-center justify-center text-white text-4xl font-black shadow-lg`}>
                                {staffProfile.firstName[0]}{staffProfile.lastName[0]}
                            </div>
                            {isEditing && (
                                <button className={`absolute -bottom-2 -right-2 w-10 h-10 ${isRestaurant ? 'bg-orange-500 hover:bg-orange-600' : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-xl flex items-center justify-center shadow-lg transition-colors`}>
                                    <Camera size={18} />
                                </button>
                            )}
                        </div>

                        <h2 className="text-xl font-black text-brand-text">{staffProfile.firstName} {staffProfile.lastName}</h2>
                        <p className="text-sm text-brand-muted mt-1">{staffProfile.title}</p>

                        {/* Rating */}
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <Star size={18} className="text-yellow-500" fill="currentColor" />
                            <span className="font-black text-brand-text">{staffProfile.rating}</span>
                            <span className="text-sm text-brand-muted">({staffProfile.totalReviews} yorum)</span>
                        </div>

                        {/* Specialties */}
                        {staffProfile.specialties && (
                            <div className="mt-6">
                                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-3">Uzmanlıklar</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {staffProfile.specialties.map((spec) => (
                                        <span
                                            key={spec}
                                            className={`px-3 py-1.5 ${isRestaurant ? 'bg-orange-500/10 text-orange-600' : 'bg-purple-500/10 text-purple-600'} rounded-lg text-xs font-bold`}
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats Card */}
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <Calendar size={24} className={`mx-auto ${isRestaurant ? 'text-orange-500' : 'text-purple-500'} mb-2`} />
                                <p className="text-2xl font-black text-brand-text">{staffProfile.todayAppointments}</p>
                                <p className="text-xs text-brand-muted">{isRestaurant ? 'Servis' : 'Randevu'}</p>
                            </div>
                            <div className="text-center">
                                <Award size={24} className="mx-auto text-green-500 mb-2" />
                                <p className="text-2xl font-black text-brand-text">{staffProfile.todayCompleted}</p>
                                <p className="text-xs text-brand-muted">Tamamlanan</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2"
                >
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                        <h3 className="font-black text-brand-text mb-6">Kişisel Bilgiler</h3>

                        <div className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">
                                        Ad
                                    </label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            disabled={!isEditing}
                                            className={`w-full h-12 pl-12 pr-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 ${isRestaurant ? 'focus:ring-orange-500/20 focus:border-orange-500' : 'focus:ring-purple-500/20 focus:border-purple-500'} disabled:opacity-60`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">
                                        Soyad
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full h-12 px-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">
                                    E-posta
                                </label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">
                                    Telefon
                                </label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">
                                    Hakkımda
                                </label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    disabled={!isEditing}
                                    rows={4}
                                    className="w-full p-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 disabled:opacity-60 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
