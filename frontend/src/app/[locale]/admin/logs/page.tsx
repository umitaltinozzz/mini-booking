'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { motion } from 'framer-motion';
import {
    ScrollText,
    Filter,
    Search,
    CheckCircle,
    AlertCircle,
    XCircle,
    Info,
    Clock,
    User,
    Building2,
    Download,
} from 'lucide-react';
import { mockActivityLogs, ActivityLog, LogType, LogCategory } from '@/data/admin/mockActivityLogs';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.03 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const typeConfig: Record<LogType, { icon: typeof CheckCircle; color: string; bg: string }> = {
    success: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    warning: { icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    error: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
    info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/10' },
};

const categoryLabels: Record<LogCategory, string> = {
    auth: 'Kimlik Doğrulama',
    tenant: 'İşletme',
    subscription: 'Abonelik',
    demo: 'Demo',
    system: 'Sistem',
};

export default function LogsPage() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<LogType | 'all'>('all');
    const [categoryFilter, setCategoryFilter] = useState<LogCategory | 'all'>('all');

    const filteredLogs = mockActivityLogs.filter(log => {
        const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) ||
            (log.details?.toLowerCase().includes(search.toLowerCase()));
        const matchesType = typeFilter === 'all' || log.type === typeFilter;
        const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
        return matchesSearch && matchesType && matchesCategory;
    });

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <AdminHeader title="Aktivite Logları" subtitle="Platform aktivitelerini izleyin" />

            <div className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-5xl mx-auto space-y-6"
                >
                    {/* Filters */}
                    <motion.div variants={item} className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Search */}
                            <div className="flex items-center gap-3 px-4 h-10 rounded-xl bg-brand-surface border border-brand-border w-64">
                                <Search size={16} className="text-brand-muted" />
                                <input
                                    type="text"
                                    placeholder="Log ara..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 bg-transparent text-sm font-medium text-brand-text placeholder:text-brand-muted outline-none"
                                />
                            </div>

                            {/* Type Filter */}
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value as LogType | 'all')}
                                className="h-10 px-4 rounded-xl bg-brand-surface border border-brand-border text-sm font-medium text-brand-text outline-none cursor-pointer"
                            >
                                <option value="all">Tüm Tipler</option>
                                <option value="success">✓ Başarılı</option>
                                <option value="info">ℹ Bilgi</option>
                                <option value="warning">⚠ Uyarı</option>
                                <option value="error">✗ Hata</option>
                            </select>

                            {/* Category Filter */}
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value as LogCategory | 'all')}
                                className="h-10 px-4 rounded-xl bg-brand-surface border border-brand-border text-sm font-medium text-brand-text outline-none cursor-pointer"
                            >
                                <option value="all">Tüm Kategoriler</option>
                                <option value="auth">Kimlik Doğrulama</option>
                                <option value="tenant">İşletme</option>
                                <option value="subscription">Abonelik</option>
                                <option value="demo">Demo</option>
                                <option value="system">Sistem</option>
                            </select>
                        </div>

                        <button className="h-10 px-5 rounded-xl bg-brand-surface border border-brand-border text-brand-text font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-brand-surface2 transition-colors">
                            <Download size={14} />
                            Dışa Aktar
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div variants={item} className="grid grid-cols-4 gap-4">
                        {(['success', 'info', 'warning', 'error'] as const).map((type) => {
                            const count = mockActivityLogs.filter(l => l.type === type).length;
                            const config = typeConfig[type];
                            return (
                                <button
                                    key={type}
                                    onClick={() => setTypeFilter(typeFilter === type ? 'all' : type)}
                                    className={`p-4 rounded-xl border transition-all ${typeFilter === type
                                            ? `${config.bg} border-current ${config.color}`
                                            : 'bg-brand-surface border-brand-border hover:bg-brand-surface2'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <config.icon size={16} className={config.color} />
                                        <span className={`text-xl font-black ${typeFilter === type ? config.color : 'text-brand-text'}`}>
                                            {count}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Logs List */}
                    <motion.div variants={item} className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-brand-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ScrollText size={18} className="text-brand-muted" />
                                <h2 className="font-bold text-brand-text">Loglar</h2>
                                <span className="text-xs text-brand-muted">({filteredLogs.length})</span>
                            </div>
                            {(typeFilter !== 'all' || categoryFilter !== 'all' || search) && (
                                <button
                                    onClick={() => {
                                        setTypeFilter('all');
                                        setCategoryFilter('all');
                                        setSearch('');
                                    }}
                                    className="text-xs font-bold text-brand-muted hover:text-brand-text flex items-center gap-1"
                                >
                                    <Filter size={12} /> Sıfırla
                                </button>
                            )}
                        </div>

                        <div className="divide-y divide-brand-border/50">
                            {filteredLogs.map((log) => {
                                const config = typeConfig[log.type];
                                return (
                                    <motion.div
                                        key={log.id}
                                        variants={item}
                                        className="p-4 hover:bg-brand-surface2/30 transition-colors"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                                                <config.icon size={14} className={config.color} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="font-bold text-brand-text">{log.message}</p>
                                                        {log.details && (
                                                            <p className="text-sm text-brand-muted mt-1">{log.details}</p>
                                                        )}
                                                    </div>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.color} flex-shrink-0`}>
                                                        {categoryLabels[log.category]}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 mt-3 text-xs text-brand-muted">
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={10} />
                                                        {formatDate(log.createdAt)}
                                                    </span>
                                                    {log.userName && (
                                                        <span className="flex items-center gap-1">
                                                            <User size={10} />
                                                            {log.userName}
                                                        </span>
                                                    )}
                                                    {log.tenantName && (
                                                        <span className="flex items-center gap-1">
                                                            <Building2 size={10} />
                                                            {log.tenantName}
                                                        </span>
                                                    )}
                                                    {log.ipAddress && (
                                                        <span className="text-brand-muted/50 font-mono">
                                                            {log.ipAddress}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {filteredLogs.length === 0 && (
                            <div className="p-12 text-center">
                                <ScrollText size={32} className="mx-auto text-brand-muted mb-3" />
                                <p className="text-sm font-bold text-brand-muted uppercase tracking-widest">
                                    Log bulunamadı
                                </p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
