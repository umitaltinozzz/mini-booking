'use client';

import React, { useState } from 'react';
import { useTenant, useModule } from '@/providers/TenantProvider';
import { motion } from 'framer-motion';
import {
    TrendingUp, TrendingDown, Calendar, Users, Clock, DollarSign,
    Download, Star, PieChart, BarChart3, Activity
} from 'lucide-react';

export default function ReportsPage() {
    const { tenant } = useTenant();
    const module = useModule();
    const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');

    const isBarber = module.id === 'barber';

    // Mock stats data
    const stats = {
        revenue: { value: 25304, change: 12.5, isPositive: true },
        appointments: { value: 99, change: 8.2, isPositive: true },
        newCustomers: { value: 24, change: -3.1, isPositive: false },
        avgDuration: { value: 52, change: 2.4, isPositive: true },
    };

    // Mock weekly revenue data
    const weeklyRevenue = [
        { day: 'Pzt', value: 3200, appointments: 12 },
        { day: 'Sal', value: 4100, appointments: 16 },
        { day: 'Çar', value: 3800, appointments: 14 },
        { day: 'Per', value: 4500, appointments: 18 },
        { day: 'Cum', value: 5200, appointments: 22 },
        { day: 'Cmt', value: 4000, appointments: 15 },
        { day: 'Paz', value: 2800, appointments: 8 },
    ];

    // Mock service distribution
    const serviceDistribution = isBarber
        ? [
            { name: 'Saç Kesimi', percentage: 45, color: '#3b82f6', revenue: 11400 },
            { name: 'Sakal Tıraşı', percentage: 25, color: '#8b5cf6', revenue: 6300 },
            { name: 'Saç + Sakal', percentage: 20, color: '#ec4899', revenue: 5100 },
            { name: 'Premium Bakım', percentage: 10, color: '#f97316', revenue: 2500 },
        ]
        : [
            { name: 'Ana Yemek', percentage: 40, color: '#3b82f6', revenue: 10100 },
            { name: 'Başlangıç', percentage: 25, color: '#8b5cf6', revenue: 6300 },
            { name: 'İçecek', percentage: 20, color: '#ec4899', revenue: 5100 },
            { name: 'Tatlı', percentage: 15, color: '#f97316', revenue: 3800 },
        ];

    // Mock hourly distribution
    const hourlyData = [
        { hour: '09:00', value: 2 },
        { hour: '10:00', value: 5 },
        { hour: '11:00', value: 8 },
        { hour: '12:00', value: 6 },
        { hour: '13:00', value: 4 },
        { hour: '14:00', value: 7 },
        { hour: '15:00', value: 9 },
        { hour: '16:00', value: 11 },
        { hour: '17:00', value: 8 },
        { hour: '18:00', value: 5 },
        { hour: '19:00', value: 3 },
    ];

    // Mock top performers
    const topPerformers = isBarber
        ? [
            { rank: 1, name: 'Canberk Hoca', appointments: 85, revenue: 12500, rating: 4.9 },
            { rank: 2, name: 'Mehmet Usta', appointments: 72, revenue: 10800, rating: 4.8 },
            { rank: 3, name: 'Deniz Kalfa', appointments: 68, revenue: 9200, rating: 4.7 },
        ]
        : [
            { rank: 1, name: 'Ayşe Garson', appointments: 120, revenue: 8500, rating: 4.9 },
            { rank: 2, name: 'Ali Garson', appointments: 98, revenue: 7200, rating: 4.8 },
            { rank: 3, name: 'Zeynep Garson', appointments: 85, revenue: 6100, rating: 4.7 },
        ];

    const maxRevenue = Math.max(...weeklyRevenue.map(d => d.value));
    const maxHourly = Math.max(...hourlyData.map(d => d.value));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-brand-text tracking-tight">Raporlar</h1>
                    <p className="text-brand-muted font-medium mt-1">{tenant.name} performans analizi</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
                        {(['week', 'month', 'year'] as const).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${period === p
                                    ? 'bg-brand-accent text-brand-bg'
                                    : 'text-brand-muted hover:text-brand-text'
                                    }`}
                            >
                                {p === 'week' ? 'Bu Hafta' : p === 'month' ? 'Bu Ay' : 'Bu Yıl'}
                            </button>
                        ))}
                    </div>
                    <button className="h-10 px-4 rounded-xl bg-brand-surface border border-brand-border text-brand-text font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-brand-surface2 transition-colors">
                        <Download size={14} />
                        Dışa Aktar
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Toplam Ciro"
                    value={`₺${stats.revenue.value.toLocaleString()}`}
                    change={stats.revenue.change}
                    isPositive={stats.revenue.isPositive}
                    icon={DollarSign}
                    color="from-emerald-500 to-green-600"
                />
                <StatCard
                    label={isBarber ? 'Randevu Sayısı' : 'Rezervasyon Sayısı'}
                    value={stats.appointments.value.toString()}
                    change={stats.appointments.change}
                    isPositive={stats.appointments.isPositive}
                    icon={Calendar}
                    color="from-blue-500 to-indigo-600"
                />
                <StatCard
                    label="Yeni Müşteri"
                    value={stats.newCustomers.value.toString()}
                    change={stats.newCustomers.change}
                    isPositive={stats.newCustomers.isPositive}
                    icon={Users}
                    color="from-purple-500 to-pink-600"
                />
                <StatCard
                    label="Ortalama Süre"
                    value={`${stats.avgDuration.value} dk`}
                    change={stats.avgDuration.change}
                    isPositive={stats.avgDuration.isPositive}
                    icon={Clock}
                    color="from-orange-500 to-red-500"
                />
            </div>

            {/* Main Charts Row */}
            <div className="grid lg:grid-cols-5 gap-6">
                {/* Weekly Revenue Bar Chart */}
                <div className="lg:col-span-3 bg-brand-surface border border-brand-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-black text-brand-text flex items-center gap-2">
                                <BarChart3 size={20} className="text-brand-accent" />
                                Haftalık Ciro
                            </h3>
                            <p className="text-sm text-brand-muted mt-1">Günlük gelir ve randevu dağılımı</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-brand-text">₺{weeklyRevenue.reduce((a, b) => a + b.value, 0).toLocaleString()}</p>
                            <p className="text-xs text-green-500 font-bold">+12.5% geçen haftaya göre</p>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="relative h-64">
                        {/* Y-axis labels */}
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] font-bold text-brand-muted pr-2">
                            <span>₺6K</span>
                            <span>₺4K</span>
                            <span>₺2K</span>
                            <span>₺0</span>
                        </div>

                        {/* Chart area */}
                        <div className="ml-10 h-full flex items-end justify-between gap-4 border-l border-b border-brand-border pl-4 pb-8">
                            {weeklyRevenue.map((day, index) => (
                                <motion.div
                                    key={day.day}
                                    className="flex-1 flex flex-col items-center"
                                    initial={{ opacity: 0, scaleY: 0 }}
                                    animate={{ opacity: 1, scaleY: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    style={{ transformOrigin: 'bottom' }}
                                >
                                    {/* Bar with gradient */}
                                    <div className="w-full relative group cursor-pointer">
                                        {/* Tooltip */}
                                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-brand-bg border border-brand-border rounded-lg px-3 py-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                            <p className="text-xs font-black text-brand-text">₺{day.value.toLocaleString()}</p>
                                            <p className="text-[10px] text-brand-muted">{day.appointments} randevu</p>
                                        </div>

                                        {/* Bar */}
                                        <div
                                            className="w-full rounded-t-lg bg-gradient-to-t from-brand-accent to-brand-accent2 group-hover:from-brand-accent2 group-hover:to-brand-accent transition-all shadow-lg"
                                            style={{ height: `${(day.value / 6000) * 180}px` }}
                                        />
                                    </div>

                                    {/* Day label */}
                                    <span className="mt-3 text-xs font-bold text-brand-muted">{day.day}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pie Chart - Service Distribution */}
                <div className="lg:col-span-2 bg-brand-surface border border-brand-border rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <PieChart size={20} className="text-brand-accent" />
                        <h3 className="text-lg font-black text-brand-text">
                            {isBarber ? 'Hizmet Dağılımı' : 'Kategori Dağılımı'}
                        </h3>
                    </div>

                    {/* Donut Chart */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative w-40 h-40">
                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                {serviceDistribution.map((service, index) => {
                                    const offset = serviceDistribution
                                        .slice(0, index)
                                        .reduce((acc, s) => acc + s.percentage, 0);
                                    const circumference = 2 * Math.PI * 35;
                                    const strokeDasharray = `${(service.percentage / 100) * circumference} ${circumference}`;
                                    const strokeDashoffset = -(offset / 100) * circumference;

                                    return (
                                        <motion.circle
                                            key={service.name}
                                            cx="50"
                                            cy="50"
                                            r="35"
                                            fill="none"
                                            stroke={service.color}
                                            strokeWidth="12"
                                            strokeDasharray={strokeDasharray}
                                            strokeDashoffset={strokeDashoffset}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.2 }}
                                            className="drop-shadow-lg"
                                        />
                                    );
                                })}
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black text-brand-text">₺25.3K</span>
                                <span className="text-[10px] font-bold text-brand-muted uppercase">Toplam</span>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-3">
                        {serviceDistribution.map((service, index) => (
                            <motion.div
                                key={service.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
                                    <span className="text-sm font-bold text-brand-text">{service.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-black text-brand-muted">%{service.percentage}</span>
                                    <span className="text-sm font-bold text-brand-text">₺{(service.revenue / 1000).toFixed(1)}K</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Second Row - Line Chart & Top Performers */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Hourly Distribution - Area Chart */}
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity size={20} className="text-brand-accent" />
                        <div>
                            <h3 className="text-lg font-black text-brand-text">Saat Bazlı Yoğunluk</h3>
                            <p className="text-sm text-brand-muted">Randevu dağılımı</p>
                        </div>
                    </div>

                    {/* Area Chart */}
                    <div className="relative h-48">
                        <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
                            {/* Grid lines */}
                            {[0, 1, 2, 3].map(i => (
                                <line
                                    key={i}
                                    x1="0"
                                    y1={i * 37.5}
                                    x2="400"
                                    y2={i * 37.5}
                                    stroke="currentColor"
                                    strokeOpacity="0.1"
                                    className="text-brand-border"
                                />
                            ))}

                            {/* Area */}
                            <motion.path
                                d={`
                                    M 0,${150 - (hourlyData[0].value / maxHourly) * 120}
                                    ${hourlyData.map((d, i) => `L ${(i / (hourlyData.length - 1)) * 400},${150 - (d.value / maxHourly) * 120}`).join(' ')}
                                    L 400,150
                                    L 0,150
                                    Z
                                `}
                                fill="url(#areaGradient)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            />

                            {/* Line */}
                            <motion.path
                                d={`
                                    M 0,${150 - (hourlyData[0].value / maxHourly) * 120}
                                    ${hourlyData.map((d, i) => `L ${(i / (hourlyData.length - 1)) * 400},${150 - (d.value / maxHourly) * 120}`).join(' ')}
                                `}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="text-brand-accent"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />

                            {/* Dots */}
                            {hourlyData.map((d, i) => (
                                <motion.circle
                                    key={i}
                                    cx={(i / (hourlyData.length - 1)) * 400}
                                    cy={150 - (d.value / maxHourly) * 120}
                                    r="5"
                                    fill="currentColor"
                                    className="text-brand-accent"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 + i * 0.05 }}
                                />
                            ))}

                            {/* Gradient definition */}
                            <defs>
                                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" className="text-brand-accent" />
                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" className="text-brand-accent" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* X-axis labels */}
                        <div className="flex justify-between mt-2 text-[10px] font-bold text-brand-muted">
                            {hourlyData.filter((_, i) => i % 2 === 0).map(d => (
                                <span key={d.hour}>{d.hour}</span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-brand-accent" />
                            <span className="text-brand-muted">En yoğun: <strong className="text-brand-text">16:00</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-brand-surface2" />
                            <span className="text-brand-muted">En sakin: <strong className="text-brand-text">09:00</strong></span>
                        </div>
                    </div>
                </div>

                {/* Top Performers */}
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Star size={20} className="text-yellow-500" />
                            <h3 className="text-lg font-black text-brand-text">En İyi Performans</h3>
                        </div>
                        <span className="text-xs font-bold text-brand-muted uppercase tracking-widest">Bu Hafta</span>
                    </div>

                    <div className="space-y-4">
                        {topPerformers.map((person, index) => (
                            <motion.div
                                key={person.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className="flex items-center gap-4 p-4 bg-brand-surface2/30 hover:bg-brand-surface2/50 rounded-xl border border-brand-border transition-all group"
                            >
                                {/* Rank Badge */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shadow-lg ${person.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-yellow-900' :
                                    person.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700' :
                                        'bg-gradient-to-br from-orange-400 to-orange-500 text-orange-900'
                                    }`}>
                                    {person.rank}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <p className="font-black text-brand-text group-hover:text-brand-accent transition-colors">{person.name}</p>
                                    <p className="text-xs text-brand-muted">{person.appointments} {isBarber ? 'randevu' : 'servis'} tamamlandı</p>
                                </div>

                                {/* Stats */}
                                <div className="text-right">
                                    <p className="font-black text-brand-text text-lg">₺{person.revenue.toLocaleString()}</p>
                                    <div className="flex items-center justify-end gap-1 text-yellow-500">
                                        <Star size={12} fill="currentColor" />
                                        <span className="text-sm font-bold">{person.rating}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({
    label, value, change, isPositive, icon: Icon, color
}: {
    label: string;
    value: string;
    change: number;
    isPositive: boolean;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-surface border border-brand-border rounded-2xl p-5 hover:shadow-lg hover:shadow-brand-accent/5 transition-all"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon size={22} className="text-white" />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${isPositive
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                    }`}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {isPositive ? '+' : ''}{change}%
                </div>
            </div>
            <p className="text-2xl font-black text-brand-text">{value}</p>
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mt-1">{label}</p>
        </motion.div>
    );
}
