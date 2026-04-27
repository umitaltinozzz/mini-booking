'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    Calendar,
    Clock,
    ArrowUpRight,
    Utensils,
    UserCheck,
} from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    change?: string;
    positive?: boolean;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
}

export function StatCard({ label, value, change, positive = true, icon: Icon, color }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-surface border border-brand-border rounded-2xl p-5 hover:border-brand-text/10 transition-all group"
        >
            <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon size={18} className="text-white" />
                </div>
                {change && (
                    <div className={`flex items-center gap-0.5 text-xs font-bold ${positive ? 'text-green-500' : 'text-red-500'}`}>
                        <ArrowUpRight size={12} className={!positive ? 'rotate-90' : ''} />
                        {change}
                    </div>
                )}
            </div>
            <p className="text-2xl font-black text-brand-text tracking-tight">{value}</p>
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mt-1">{label}</p>
        </motion.div>
    );
}

// Restaurant-specific stats
export function RestaurantStats() {
    const stats = [
        { label: 'Bugünkü Rezervasyon', value: 24, change: '+8%', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
        { label: 'Toplam Misafir', value: 86, change: '+12%', icon: Users, color: 'from-purple-500 to-pink-500' },
        { label: 'Doluluk Oranı', value: '78%', change: '+5%', icon: Utensils, color: 'from-green-500 to-emerald-500' },
        { label: 'Ortalama Süre', value: '1.5 saat', icon: Clock, color: 'from-orange-500 to-amber-500' },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
            ))}
        </div>
    );
}

// Barber-specific stats
export function BarberStats() {
    const stats = [
        { label: 'Bugünkü Randevu', value: 18, change: '+15%', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
        { label: 'Aktif Personel', value: '3/4', icon: UserCheck, color: 'from-green-500 to-emerald-500' },
        { label: 'Tamamlanan', value: 12, change: '+8%', icon: Users, color: 'from-purple-500 to-pink-500' },
        { label: 'Ort. Hizmet Süresi', value: '45 dk', icon: Clock, color: 'from-orange-500 to-amber-500' },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
            ))}
        </div>
    );
}
