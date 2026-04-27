'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { motion } from 'framer-motion';
import {
    Users,
    Search,
    Plus,
    MoreVertical,
    Calendar,
    TrendingUp,
    ExternalLink,
    Settings,
    Trash2,
} from 'lucide-react';
import { mockTenants, Tenant } from '@/data/admin/mockTenants';
import { Link } from '@/i18n/routing';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.03 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const planColors: Record<string, { bg: string; text: string }> = {
    trial: { bg: 'bg-amber-500/10', text: 'text-amber-500' },
    basic: { bg: 'bg-green-500/10', text: 'text-green-500' },
    pro: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
    enterprise: { bg: 'bg-purple-500/10', text: 'text-purple-500' },
};

const statusColors: Record<string, { bg: string; text: string }> = {
    active: { bg: 'bg-green-500/10', text: 'text-green-500' },
    expired: { bg: 'bg-red-500/10', text: 'text-red-500' },
    cancelled: { bg: 'bg-gray-500/10', text: 'text-gray-500' },
    trial: { bg: 'bg-amber-500/10', text: 'text-amber-500' },
};

export default function TenantsPage() {
    const [search, setSearch] = useState('');
    const [sectorFilter, setSectorFilter] = useState<'all' | 'restaurant' | 'barber'>('all');

    const filteredTenants = mockTenants.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.email.toLowerCase().includes(search.toLowerCase());
        const matchesSector = sectorFilter === 'all' || t.sector === sectorFilter;
        return matchesSearch && matchesSector;
    });

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <>
            <AdminHeader title="İşletmeler" subtitle="Tüm işletmeleri yönetin" />

            <div className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-7xl mx-auto space-y-6"
                >
                    {/* Actions Bar */}
                    <motion.div variants={item} className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <div className="flex items-center gap-3 px-4 h-10 rounded-xl bg-brand-surface border border-brand-border w-64">
                                <Search size={16} className="text-brand-muted" />
                                <input
                                    type="text"
                                    placeholder="İşletme ara..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 bg-transparent text-sm font-medium text-brand-text placeholder:text-brand-muted outline-none"
                                />
                            </div>

                            {/* Sector Filter */}
                            <div className="flex bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
                                {(['all', 'restaurant', 'barber'] as const).map((sector) => (
                                    <button
                                        key={sector}
                                        onClick={() => setSectorFilter(sector)}
                                        className={`px-4 h-10 text-xs font-bold uppercase tracking-widest transition-all ${sectorFilter === sector
                                                ? 'bg-brand-surface2 text-brand-text'
                                                : 'text-brand-muted hover:text-brand-text'
                                            }`}
                                    >
                                        {sector === 'all' ? 'Tümü' : sector === 'restaurant' ? '🍽️' : '💈'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/admin/tenants/create"
                            className="h-10 px-5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:shadow-lg hover:shadow-red-500/20 transition-all"
                        >
                            <Plus size={16} />
                            Yeni İşletme
                        </Link>
                    </motion.div>

                    {/* Tenants Table */}
                    <motion.div variants={item} className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-brand-border">
                                    <th className="text-left p-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest">İşletme</th>
                                    <th className="text-left p-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest hidden md:table-cell">Plan</th>
                                    <th className="text-left p-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest hidden lg:table-cell">Durum</th>
                                    <th className="text-left p-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest hidden xl:table-cell">İstatistik</th>
                                    <th className="text-left p-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest hidden lg:table-cell">Bitiş</th>
                                    <th className="text-right p-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTenants.map((tenant) => (
                                    <motion.tr
                                        key={tenant.id}
                                        variants={item}
                                        className="border-b border-brand-border/50 hover:bg-brand-surface2/30 transition-colors"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-brand-surface2 border border-brand-border flex items-center justify-center text-lg">
                                                    {tenant.sector === 'restaurant' ? '🍽️' : '💈'}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-brand-text">{tenant.name}</p>
                                                    <p className="text-xs text-brand-muted">{tenant.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 hidden md:table-cell">
                                            <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${planColors[tenant.subscription.plan].bg} ${planColors[tenant.subscription.plan].text}`}>
                                                {tenant.subscription.plan}
                                            </span>
                                        </td>
                                        <td className="p-4 hidden lg:table-cell">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${tenant.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                                                <span className={`text-xs font-bold ${statusColors[tenant.subscription.status].text}`}>
                                                    {tenant.subscription.status === 'active' ? 'Aktif' :
                                                        tenant.subscription.status === 'trial' ? 'Deneme' :
                                                            tenant.subscription.status === 'expired' ? 'Süresi Dolmuş' : 'İptal'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 hidden xl:table-cell">
                                            <div className="flex items-center gap-4 text-xs text-brand-muted">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {tenant.stats.totalAppointments}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users size={12} />
                                                    {tenant.stats.totalCustomers}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 hidden lg:table-cell">
                                            <span className="text-xs text-brand-muted">
                                                {formatDate(tenant.subscription.endDate)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/${tenant.slug}/dashboard`}
                                                    className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted hover:text-brand-text transition-colors"
                                                    title="Dashboard'a Git"
                                                >
                                                    <ExternalLink size={16} />
                                                </Link>
                                                <button
                                                    className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted hover:text-brand-text transition-colors"
                                                    title="Ayarlar"
                                                >
                                                    <Settings size={16} />
                                                </button>
                                                <button
                                                    className="p-2 rounded-lg hover:bg-red-500/10 text-brand-muted hover:text-red-500 transition-colors"
                                                    title="Sil"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredTenants.length === 0 && (
                            <div className="p-12 text-center">
                                <Users size={32} className="mx-auto text-brand-muted mb-3" />
                                <p className="text-sm font-bold text-brand-muted uppercase tracking-widest">
                                    İşletme bulunamadı
                                </p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
