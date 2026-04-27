'use client';

import React from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { motion } from 'framer-motion';
import {
    Users,
    MessageSquare,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    Info,
} from 'lucide-react';
import { mockTenants, getTenantStats } from '@/data/admin/mockTenants';
import { getDemoRequestStats } from '@/data/admin/mockDemoRequests';
import { mockActivityLogs } from '@/data/admin/mockActivityLogs';
import { Link } from '@/i18n/routing';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function AdminDashboardPage() {
    const tenantStats = getTenantStats();
    const demoStats = getDemoRequestStats();

    const statCards = [
        {
            label: 'Toplam İşletme',
            value: tenantStats.total,
            change: '+2',
            positive: true,
            icon: Users,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            label: 'Bekleyen Demo',
            value: demoStats.pending,
            change: `${demoStats.total} toplam`,
            positive: true,
            icon: MessageSquare,
            color: 'from-orange-500 to-amber-500',
        },
        {
            label: 'Aylık Gelir',
            value: `₺${tenantStats.totalRevenue.toLocaleString()}`,
            change: '+12%',
            positive: true,
            icon: TrendingUp,
            color: 'from-green-500 to-emerald-500',
        },
        {
            label: 'Bu Ay Randevu',
            value: '3.2K',
            change: '+8%',
            positive: true,
            icon: Calendar,
            color: 'from-purple-500 to-pink-500',
        },
    ];

    const getLogIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle size={14} className="text-green-500" />;
            case 'warning': return <AlertCircle size={14} className="text-amber-500" />;
            case 'error': return <XCircle size={14} className="text-red-500" />;
            default: return <Info size={14} className="text-blue-500" />;
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            <AdminHeader title="Dashboard" subtitle="Platform genel bakış ve istatistikler" />

            <div className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-7xl mx-auto space-y-8"
                >
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {statCards.map((stat) => (
                            <motion.div
                                key={stat.label}
                                variants={item}
                                className="bg-brand-surface border border-brand-border rounded-2xl p-6 hover:border-brand-text/10 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                        <stat.icon size={20} className="text-white" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-xs font-bold ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                                        {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                        {stat.change}
                                    </div>
                                </div>
                                <p className="text-2xl font-black text-brand-text tracking-tight">{stat.value}</p>
                                <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mt-1">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                        {/* Recent Tenants */}
                        <motion.div variants={item} className="xl:col-span-7 bg-brand-surface border border-brand-border rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-black text-brand-text tracking-tight">Son İşletmeler</h2>
                                    <p className="text-xs font-medium text-brand-muted">En son eklenen işletmeler</p>
                                </div>
                                <Link
                                    href="/admin/tenants"
                                    className="text-xs font-bold text-brand-muted hover:text-brand-text uppercase tracking-widest"
                                >
                                    Tümünü Gör →
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {mockTenants.slice(0, 4).map((tenant) => (
                                    <div key={tenant.id} className="flex items-center gap-4 p-4 rounded-xl bg-brand-surface2/30 hover:bg-brand-surface2 transition-colors">
                                        <div className="w-10 h-10 rounded-xl bg-brand-surface flex items-center justify-center border border-brand-border text-sm font-black text-brand-text">
                                            {tenant.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-brand-text truncate">{tenant.name}</p>
                                            <p className="text-xs text-brand-muted">{tenant.sector === 'restaurant' ? '🍽️ Restoran' : '💈 Berber'}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                                                ${tenant.subscription.plan === 'enterprise' ? 'bg-purple-500/10 text-purple-500' : ''}
                                                ${tenant.subscription.plan === 'pro' ? 'bg-blue-500/10 text-blue-500' : ''}
                                                ${tenant.subscription.plan === 'basic' ? 'bg-green-500/10 text-green-500' : ''}
                                                ${tenant.subscription.plan === 'trial' ? 'bg-amber-500/10 text-amber-500' : ''}
                                            `}>
                                                {tenant.subscription.plan}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Activity Logs */}
                        <motion.div variants={item} className="xl:col-span-5 bg-brand-surface border border-brand-border rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Activity size={18} className="text-brand-muted" />
                                    <h2 className="text-lg font-black text-brand-text tracking-tight">Son Aktiviteler</h2>
                                </div>
                                <Link
                                    href="/admin/logs"
                                    className="text-xs font-bold text-brand-muted hover:text-brand-text uppercase tracking-widest"
                                >
                                    Tümü →
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {mockActivityLogs.slice(0, 6).map((log) => (
                                    <div key={log.id} className="flex items-start gap-3">
                                        <div className="mt-0.5">{getLogIcon(log.type)}</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-brand-text leading-tight">{log.message}</p>
                                            {log.tenantName && (
                                                <p className="text-xs text-brand-muted mt-0.5">{log.tenantName}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-brand-muted">
                                            <Clock size={10} />
                                            {formatDate(log.createdAt)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Stats Row */}
                    <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-brand-surface2/30 border border-brand-border rounded-xl p-4 text-center">
                            <p className="text-2xl font-black text-brand-text">{tenantStats.bySector.restaurant}</p>
                            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">🍽️ Restoran</p>
                        </div>
                        <div className="bg-brand-surface2/30 border border-brand-border rounded-xl p-4 text-center">
                            <p className="text-2xl font-black text-brand-text">{tenantStats.bySector.barber}</p>
                            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">💈 Berber</p>
                        </div>
                        <div className="bg-brand-surface2/30 border border-brand-border rounded-xl p-4 text-center">
                            <p className="text-2xl font-black text-brand-text">{tenantStats.active}</p>
                            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">✅ Aktif</p>
                        </div>
                        <div className="bg-brand-surface2/30 border border-brand-border rounded-xl p-4 text-center">
                            <p className="text-2xl font-black text-brand-text">{demoStats.pending}</p>
                            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">⏳ Bekleyen</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
