'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { motion } from 'framer-motion';
import {
    MessageSquare,
    Clock,
    Phone,
    Mail,
    Building2,
    CheckCircle,
    XCircle,
    PhoneCall,
    Eye,
    Filter,
} from 'lucide-react';
import { mockDemoRequests, DemoRequest, DemoRequestStatus } from '@/data/admin/mockDemoRequests';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const statusConfig: Record<DemoRequestStatus, { label: string; color: string; bg: string }> = {
    pending: { label: 'Beklemede', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    contacted: { label: 'İletişime Geçildi', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    approved: { label: 'Onaylandı', color: 'text-green-500', bg: 'bg-green-500/10' },
    rejected: { label: 'Reddedildi', color: 'text-red-500', bg: 'bg-red-500/10' },
};

const sectorEmoji: Record<string, string> = {
    restaurant: '🍽️',
    barber: '💈',
    clinic: '🏥',
    salon: '💅',
    other: '🏢',
};

export default function DemoRequestsPage() {
    const [filter, setFilter] = useState<DemoRequestStatus | 'all'>('all');
    const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);

    const filteredRequests = filter === 'all'
        ? mockDemoRequests
        : mockDemoRequests.filter(r => r.status === filter);

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
            <AdminHeader title="Demo Talepleri" subtitle="Gelen demo taleplerini yönetin" />

            <div className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-7xl mx-auto space-y-6"
                >
                    {/* Stats */}
                    <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(['pending', 'contacted', 'approved', 'rejected'] as const).map((status) => {
                            const count = mockDemoRequests.filter(r => r.status === status).length;
                            const config = statusConfig[status];
                            return (
                                <button
                                    key={status}
                                    onClick={() => setFilter(filter === status ? 'all' : status)}
                                    className={`p-4 rounded-xl border transition-all ${filter === status
                                            ? 'border-brand-text/30 bg-brand-surface'
                                            : 'border-brand-border bg-brand-surface/50 hover:bg-brand-surface'
                                        }`}
                                >
                                    <p className={`text-2xl font-black ${config.color}`}>{count}</p>
                                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">{config.label}</p>
                                </button>
                            );
                        })}
                    </motion.div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                        {/* Request List */}
                        <motion.div variants={item} className="xl:col-span-7 bg-brand-surface border border-brand-border rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <MessageSquare size={18} className="text-brand-muted" />
                                    <h2 className="text-lg font-black text-brand-text tracking-tight">
                                        {filter === 'all' ? 'Tüm Talepler' : statusConfig[filter].label}
                                    </h2>
                                    <span className="text-xs font-bold text-brand-muted">({filteredRequests.length})</span>
                                </div>
                                {filter !== 'all' && (
                                    <button
                                        onClick={() => setFilter('all')}
                                        className="text-xs font-bold text-brand-muted hover:text-brand-text flex items-center gap-1"
                                    >
                                        <Filter size={12} /> Filtreyi Temizle
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3">
                                {filteredRequests.map((request) => (
                                    <button
                                        key={request.id}
                                        onClick={() => setSelectedRequest(request)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all ${selectedRequest?.id === request.id
                                                ? 'border-red-500/30 bg-red-500/5'
                                                : 'border-brand-border bg-brand-surface2/30 hover:bg-brand-surface2'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-lg">
                                                    {sectorEmoji[request.sector]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-brand-text">{request.businessName}</p>
                                                    <p className="text-xs text-brand-muted">{request.contactName}</p>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusConfig[request.status].bg} ${statusConfig[request.status].color}`}>
                                                {statusConfig[request.status].label}
                                            </span>
                                        </div>
                                        <p className="text-xs text-brand-muted mt-3 line-clamp-2">{request.notes}</p>
                                        <div className="flex items-center gap-2 mt-3 text-[10px] text-brand-muted">
                                            <Clock size={10} />
                                            {formatDate(request.createdAt)}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Detail Panel */}
                        <motion.div variants={item} className="xl:col-span-5 sticky top-24">
                            {selectedRequest ? (
                                <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-brand-surface2 border border-brand-border flex items-center justify-center text-2xl">
                                                {sectorEmoji[selectedRequest.sector]}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-brand-text">{selectedRequest.businessName}</h3>
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${statusConfig[selectedRequest.status].bg} ${statusConfig[selectedRequest.status].color}`}>
                                                    {statusConfig[selectedRequest.status].label}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedRequest(null)}
                                            className="text-xs font-bold text-brand-muted hover:text-brand-text"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-3">
                                        <div className="p-3 rounded-xl bg-brand-surface2/50 border border-brand-border flex items-center gap-3">
                                            <Building2 size={16} className="text-brand-muted" />
                                            <div>
                                                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">İletişim Kişisi</p>
                                                <p className="text-sm font-bold text-brand-text">{selectedRequest.contactName}</p>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-brand-surface2/50 border border-brand-border flex items-center gap-3">
                                            <Mail size={16} className="text-brand-muted" />
                                            <div>
                                                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">E-Posta</p>
                                                <p className="text-sm font-bold text-brand-text">{selectedRequest.contactEmail}</p>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-brand-surface2/50 border border-brand-border flex items-center gap-3">
                                            <Phone size={16} className="text-brand-muted" />
                                            <div>
                                                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Telefon</p>
                                                <p className="text-sm font-bold text-brand-text">{selectedRequest.contactPhone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div className="p-4 rounded-xl bg-brand-surface2/30 border border-brand-border">
                                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">Notlar</p>
                                        <p className="text-sm text-brand-text leading-relaxed">{selectedRequest.notes}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="h-10 rounded-xl bg-blue-500/10 text-blue-500 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all">
                                            <PhoneCall size={14} />
                                            Ara
                                        </button>
                                        <button className="h-10 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-surface transition-all">
                                            <Eye size={14} />
                                            Detay
                                        </button>
                                    </div>

                                    {selectedRequest.status === 'pending' && (
                                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-border">
                                            <button className="h-12 rounded-xl bg-green-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-600 transition-all">
                                                <CheckCircle size={14} />
                                                Onayla
                                            </button>
                                            <button className="h-12 rounded-xl bg-red-500/10 text-red-500 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all">
                                                <XCircle size={14} />
                                                Reddet
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="h-96 border-2 border-dashed border-brand-border rounded-2xl flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <MessageSquare size={32} className="mx-auto text-brand-muted mb-3" />
                                        <p className="text-sm font-bold text-brand-muted uppercase tracking-widest">
                                            Detay görmek için bir talep seçin
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
