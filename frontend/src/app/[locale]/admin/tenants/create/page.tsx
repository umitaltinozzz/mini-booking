'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Building2,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    Calendar,
    Save,
    Sparkles,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { mockPlans } from '@/data/admin/mockPlans';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function CreateTenantPage() {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        sector: 'restaurant',
        email: '',
        phone: '',
        address: '',
        plan: 'basic',
        startDate: new Date().toISOString().split('T')[0],
        adminEmail: '',
        adminName: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Auto-generate slug from name
            ...(name === 'name' && { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // TODO: API call
        alert('İşletme oluşturuldu! (Mock)');
    };

    return (
        <>
            <AdminHeader title="Yeni İşletme Oluştur" subtitle="Platform'a yeni bir işletme ekleyin" />

            <div className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-4xl mx-auto space-y-6"
                >
                    {/* Back Button */}
                    <motion.div variants={item}>
                        <Link
                            href="/admin/tenants"
                            className="inline-flex items-center gap-2 text-sm font-bold text-brand-muted hover:text-brand-text transition-colors"
                        >
                            <ArrowLeft size={16} />
                            İşletmelere Dön
                        </Link>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Business Info */}
                        <motion.div variants={item} className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
                                <Building2 size={20} className="text-brand-muted" />
                                <h2 className="text-lg font-black text-brand-text tracking-tight">İşletme Bilgileri</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                        İşletme Adı *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Örn: Lezzet Durağı"
                                        className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium placeholder:text-brand-muted outline-none focus:border-red-500/50 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                        URL Slug *
                                    </label>
                                    <div className="flex items-center h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border">
                                        <span className="text-brand-muted text-sm">/book/</span>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleChange}
                                            required
                                            placeholder="lezzet-duragi"
                                            className="flex-1 bg-transparent text-brand-text font-medium placeholder:text-brand-muted outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                        Sektör *
                                    </label>
                                    <select
                                        name="sector"
                                        value={formData.sector}
                                        onChange={handleChange}
                                        className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-red-500/50 transition-colors cursor-pointer"
                                    >
                                        <option value="restaurant">🍽️ Restoran</option>
                                        <option value="barber">💈 Berber</option>
                                        <option value="salon">💅 Güzellik Salonu</option>
                                        <option value="clinic">🏥 Klinik</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                        E-Posta
                                    </label>
                                    <div className="flex items-center h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border">
                                        <Mail size={16} className="text-brand-muted mr-3" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="info@isletme.com"
                                            className="flex-1 bg-transparent text-brand-text font-medium placeholder:text-brand-muted outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                        Telefon
                                    </label>
                                    <div className="flex items-center h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border">
                                        <Phone size={16} className="text-brand-muted mr-3" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+90 5XX XXX XX XX"
                                            className="flex-1 bg-transparent text-brand-text font-medium placeholder:text-brand-muted outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                        Adres
                                    </label>
                                    <div className="flex items-center h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border">
                                        <MapPin size={16} className="text-brand-muted mr-3" />
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="İlçe, Şehir"
                                            className="flex-1 bg-transparent text-brand-text font-medium placeholder:text-brand-muted outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Plan Selection */}
                        <motion.div variants={item} className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
                                <CreditCard size={20} className="text-brand-muted" />
                                <h2 className="text-lg font-black text-brand-text tracking-tight">Abonelik Planı</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {mockPlans.map((plan) => (
                                    <button
                                        key={plan.slug}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, plan: plan.slug }))}
                                        className={`relative p-4 rounded-xl border-2 text-left transition-all ${formData.plan === plan.slug
                                                ? 'border-red-500 bg-red-500/5'
                                                : 'border-brand-border hover:border-brand-text/20'
                                            }`}
                                    >
                                        {plan.isPopular && (
                                            <span className="absolute -top-2 right-3 px-2 py-0.5 rounded bg-red-500 text-white text-[10px] font-bold uppercase">
                                                Popüler
                                            </span>
                                        )}
                                        <p className="font-black text-brand-text">{plan.name}</p>
                                        <p className="text-xl font-black text-brand-text mt-1">
                                            {plan.price === 0 ? 'Ücretsiz' : `₺${plan.price}`}
                                            {plan.price > 0 && <span className="text-xs text-brand-muted font-medium">/ay</span>}
                                        </p>
                                        <ul className="mt-3 space-y-1">
                                            {plan.features.slice(0, 3).map((feature, i) => (
                                                <li key={i} className="text-[10px] text-brand-muted flex items-center gap-1">
                                                    <Sparkles size={8} className="text-red-500" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                        Başlangıç Tarihi
                                    </label>
                                    <div className="flex items-center h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border">
                                        <Calendar size={16} className="text-brand-muted mr-3" />
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className="flex-1 bg-transparent text-brand-text font-medium outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Admin User */}
                        <motion.div variants={item} className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
                                <Mail size={20} className="text-brand-muted" />
                                <h2 className="text-lg font-black text-brand-text tracking-tight">Admin Kullanıcı</h2>
                            </div>

                            <p className="text-sm text-brand-muted">
                                İşletme yöneticisine davet e-postası gönderilecektir.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                        Admin Adı *
                                    </label>
                                    <input
                                        type="text"
                                        name="adminName"
                                        value={formData.adminName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Ahmet Yılmaz"
                                        className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium placeholder:text-brand-muted outline-none focus:border-red-500/50 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                        Admin E-Posta *
                                    </label>
                                    <input
                                        type="email"
                                        name="adminEmail"
                                        value={formData.adminEmail}
                                        onChange={handleChange}
                                        required
                                        placeholder="admin@isletme.com"
                                        className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium placeholder:text-brand-muted outline-none focus:border-red-500/50 transition-colors"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Submit */}
                        <motion.div variants={item} className="flex justify-end gap-4">
                            <Link
                                href="/admin/tenants"
                                className="h-12 px-6 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold text-sm uppercase tracking-widest flex items-center hover:bg-brand-surface transition-colors"
                            >
                                İptal
                            </Link>
                            <button
                                type="submit"
                                className="h-12 px-8 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:shadow-lg hover:shadow-red-500/20 transition-all"
                            >
                                <Save size={16} />
                                Oluştur & Davet Gönder
                            </button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </>
    );
}
