'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { motion } from 'framer-motion';
import {
    CreditCard,
    Edit,
    Check,
    Sparkles,
    Users,
    Calendar,
    Layers,
    Zap,
} from 'lucide-react';
import { mockPlans, Plan } from '@/data/admin/mockPlans';
import { mockTenants } from '@/data/admin/mockTenants';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const planGradients: Record<string, string> = {
    trial: 'from-gray-500 to-slate-500',
    basic: 'from-green-500 to-emerald-500',
    pro: 'from-blue-500 to-cyan-500',
    enterprise: 'from-purple-500 to-pink-500',
};

export default function PlansPage() {
    const [editingPlan, setEditingPlan] = useState<string | null>(null);

    const subscriberCount = (planSlug: string) => {
        return mockTenants.filter(t => t.subscription.plan === planSlug).length;
    };

    return (
        <>
            <AdminHeader title="Planlar" subtitle="Abonelik planlarını yönetin" />

            <div className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-7xl mx-auto space-y-8"
                >
                    {/* Stats */}
                    <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {mockPlans.map((plan) => (
                            <div key={plan.slug} className="bg-brand-surface border border-brand-border rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${planGradients[plan.slug]} flex items-center justify-center`}>
                                        <Zap size={14} className="text-white" />
                                    </div>
                                    <span className="text-2xl font-black text-brand-text">{subscriberCount(plan.slug)}</span>
                                </div>
                                <p className="text-xs font-bold text-brand-muted uppercase tracking-widest">{plan.name}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Plans Grid */}
                    <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {mockPlans.map((plan) => (
                            <div
                                key={plan.slug}
                                className={`relative bg-brand-surface border rounded-2xl overflow-hidden transition-all ${plan.isPopular ? 'border-blue-500/50 ring-1 ring-blue-500/20' : 'border-brand-border'
                                    }`}
                            >
                                {plan.isPopular && (
                                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] font-bold uppercase tracking-widest text-center py-1">
                                        En Popüler
                                    </div>
                                )}

                                <div className="p-6 space-y-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${planGradients[plan.slug]} flex items-center justify-center mb-3`}>
                                                <CreditCard size={20} className="text-white" />
                                            </div>
                                            <h3 className="text-xl font-black text-brand-text">{plan.name}</h3>
                                            <div className="flex items-baseline gap-1 mt-1">
                                                <span className="text-3xl font-black text-brand-text">
                                                    {plan.price === 0 ? 'Ücretsiz' : `₺${plan.price}`}
                                                </span>
                                                {plan.price > 0 && (
                                                    <span className="text-sm text-brand-muted">/ay</span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setEditingPlan(plan.slug)}
                                            className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted hover:text-brand-text transition-colors"
                                        >
                                            <Edit size={16} />
                                        </button>
                                    </div>

                                    {/* Limits */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 rounded-xl bg-brand-surface2/30 border border-brand-border">
                                            <Users size={14} className="text-brand-muted mb-1" />
                                            <p className="text-sm font-black text-brand-text">{plan.limits.maxStaff}</p>
                                            <p className="text-[9px] text-brand-muted uppercase">Personel</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-brand-surface2/30 border border-brand-border">
                                            <Layers size={14} className="text-brand-muted mb-1" />
                                            <p className="text-sm font-black text-brand-text">{plan.limits.maxResources}</p>
                                            <p className="text-[9px] text-brand-muted uppercase">Kaynak</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-brand-surface2/30 border border-brand-border">
                                            <Calendar size={14} className="text-brand-muted mb-1" />
                                            <p className="text-sm font-black text-brand-text">
                                                {plan.limits.maxAppointmentsPerMonth > 1000 ? '∞' : plan.limits.maxAppointmentsPerMonth}
                                            </p>
                                            <p className="text-[9px] text-brand-muted uppercase">Randevu/Ay</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-brand-surface2/30 border border-brand-border">
                                            <Users size={14} className="text-brand-muted mb-1" />
                                            <p className="text-sm font-black text-brand-text">
                                                {plan.limits.maxCustomers > 1000 ? '∞' : plan.limits.maxCustomers}
                                            </p>
                                            <p className="text-[9px] text-brand-muted uppercase">Müşteri</p>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Özellikler</p>
                                        <ul className="space-y-2">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-brand-text">
                                                    <Check size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Stats */}
                                    <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Abone Sayısı</span>
                                        <span className="text-sm font-black text-brand-text">{subscriberCount(plan.slug)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Revenue Summary */}
                    <motion.div variants={item} className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles size={20} className="text-brand-muted" />
                            <h2 className="text-lg font-black text-brand-text tracking-tight">Gelir Özeti</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="p-4 rounded-xl bg-brand-surface2/30 border border-brand-border">
                                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Toplam Aylık</p>
                                <p className="text-2xl font-black text-brand-text">
                                    ₺{mockTenants.reduce((acc, t) => {
                                        const plan = mockPlans.find(p => p.slug === t.subscription.plan);
                                        return acc + (t.isActive && plan ? plan.price : 0);
                                    }, 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-brand-surface2/30 border border-brand-border">
                                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Ortalama</p>
                                <p className="text-2xl font-black text-brand-text">
                                    ₺{Math.round(mockTenants.reduce((acc, t) => {
                                        const plan = mockPlans.find(p => p.slug === t.subscription.plan);
                                        return acc + (t.isActive && plan ? plan.price : 0);
                                    }, 0) / mockTenants.filter(t => t.isActive).length)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-brand-surface2/30 border border-brand-border">
                                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Aktif Abone</p>
                                <p className="text-2xl font-black text-brand-text">{mockTenants.filter(t => t.isActive).length}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-brand-surface2/30 border border-brand-border">
                                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Deneme Sürümü</p>
                                <p className="text-2xl font-black text-brand-text">{subscriberCount('trial')}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
