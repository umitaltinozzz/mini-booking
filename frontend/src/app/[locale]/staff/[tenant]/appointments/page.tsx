'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Clock, User, Phone, ChevronLeft, ChevronRight,
    X, CheckCircle, XCircle, Play, UtensilsCrossed
} from 'lucide-react';
import {
    getStaffDashboardData,
    CURRENT_STAFF_ID,
} from '@/data/tenant/mockStaffData';
import { StaffAppointment } from '@/types/staff';
import { useTenant } from '@/providers/TenantProvider';
import { RestaurantStaffOrders } from '@/components/dashboard/modules/restaurant/RestaurantStaffOrders';

// Helper functions
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Monday = 0
};

const MONTH_NAMES = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const DAY_NAMES = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

export default function StaffAppointmentsPage() {
    const { tenant } = useTenant();
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState<number | null>(today.getDate());
    const [selectedAppointment, setSelectedAppointment] = useState<StaffAppointment | null>(null);

    // Show restaurant orders for restaurant sector
    if (tenant.sector === 'restaurant') {
        return <RestaurantStaffOrders />;
    }

    const data = getStaffDashboardData(CURRENT_STAFF_ID);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-brand-muted">Veri bulunamadı</p>
            </div>
        );
    }

    const { todayAppointments } = data;

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
        setSelectedDate(null);
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        setSelectedDate(null);
    };

    const goToToday = () => {
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
        setSelectedDate(today.getDate());
    };

    // Mock: Generate some appointments for demo
    const getAppointmentsForDay = (day: number): StaffAppointment[] => {
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            return todayAppointments;
        }
        // Random appointments for other days
        if ([5, 8, 12, 15, 18, 22, 25, 28].includes(day)) {
            return todayAppointments.slice(0, Math.floor(Math.random() * 3) + 1);
        }
        return [];
    };

    const selectedDayAppointments = selectedDate ? getAppointmentsForDay(selectedDate) : [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-500';
            case 'in-progress': return 'bg-blue-500';
            case 'upcoming': return 'bg-purple-500';
            case 'cancelled': return 'bg-red-500';
            case 'no-show': return 'bg-orange-500';
            default: return 'bg-gray-400';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed': return 'Tamamlandı';
            case 'in-progress': return 'Devam Ediyor';
            case 'upcoming': return 'Bekliyor';
            case 'cancelled': return 'İptal';
            case 'no-show': return 'Gelmedi';
            default: return status;
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-brand-text">Randevularım</h1>
                    <p className="text-sm text-brand-muted mt-1">Takvim görünümünde randevularınızı takip edin</p>
                </div>
                <button
                    onClick={goToToday}
                    className="px-4 py-2 bg-purple-500 text-white font-bold text-sm rounded-xl hover:bg-purple-600 transition-colors"
                >
                    Bugün
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-brand-surface border border-brand-border rounded-2xl p-6"
                >
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={prevMonth}
                            className="p-2 hover:bg-brand-surface2 rounded-xl transition-colors"
                        >
                            <ChevronLeft size={20} className="text-brand-text" />
                        </button>
                        <h2 className="text-xl font-black text-brand-text">
                            {MONTH_NAMES[currentMonth]} {currentYear}
                        </h2>
                        <button
                            onClick={nextMonth}
                            className="p-2 hover:bg-brand-surface2 rounded-xl transition-colors"
                        >
                            <ChevronRight size={20} className="text-brand-text" />
                        </button>
                    </div>

                    {/* Day Names */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {DAY_NAMES.map((day) => (
                            <div key={day} className="text-center py-2 text-xs font-bold text-brand-muted uppercase">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {/* Empty cells for days before the first day of month */}
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square" />
                        ))}

                        {/* Days of the month */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                            const isSelected = day === selectedDate;
                            const appointments = getAppointmentsForDay(day);
                            const hasAppointments = appointments.length > 0;

                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(day)}
                                    className={`
                                        aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all relative
                                        ${isSelected
                                            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                                            : isToday
                                                ? 'bg-purple-500/10 text-purple-500 ring-2 ring-purple-500/30'
                                                : 'hover:bg-brand-surface2 text-brand-text'
                                        }
                                    `}
                                >
                                    <span className={`text-sm font-bold ${isSelected ? 'text-white' : ''}`}>
                                        {day}
                                    </span>
                                    {hasAppointments && (
                                        <div className="flex gap-0.5">
                                            {appointments.slice(0, 3).map((apt, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : getStatusColor(apt.status)
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-brand-border">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500" />
                            <span className="text-xs text-brand-muted">Bekleyen</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span className="text-xs text-brand-muted">Devam Eden</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-xs text-brand-muted">Tamamlanan</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-xs text-brand-muted">İptal</span>
                        </div>
                    </div>
                </motion.div>

                {/* Selected Day Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden"
                >
                    <div className="p-5 border-b border-brand-border bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-brand-muted uppercase tracking-widest">
                                    {selectedDate ? `${selectedDate} ${MONTH_NAMES[currentMonth]}` : 'Tarih Seçin'}
                                </p>
                                <p className="font-black text-brand-text text-lg">
                                    {selectedDayAppointments.length} Randevu
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto">
                        {selectedDate ? (
                            selectedDayAppointments.length > 0 ? (
                                <div className="divide-y divide-brand-border">
                                    {selectedDayAppointments.map((apt) => (
                                        <button
                                            key={apt.id}
                                            onClick={() => setSelectedAppointment(apt)}
                                            className="w-full p-4 hover:bg-brand-surface2/30 transition-colors text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusColor(apt.status)}`} />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-brand-text text-sm truncate">{apt.customerName}</p>
                                                    <p className="text-xs text-brand-muted">{apt.startTime} - {apt.service}</p>
                                                </div>
                                                <span className="text-sm font-bold text-brand-text">₺{apt.price}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <Calendar size={32} className="mx-auto text-brand-muted mb-3" />
                                    <p className="font-bold text-brand-text text-sm">Randevu yok</p>
                                    <p className="text-xs text-brand-muted mt-1">Bu tarihte planlanmış randevu bulunmuyor</p>
                                </div>
                            )
                        ) : (
                            <div className="p-8 text-center">
                                <Calendar size={32} className="mx-auto text-brand-muted mb-3" />
                                <p className="font-bold text-brand-text text-sm">Tarih seçin</p>
                                <p className="text-xs text-brand-muted mt-1">Randevuları görmek için bir gün seçin</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Appointment Detail Modal */}
            <AnimatePresence>
                {selectedAppointment && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedAppointment(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-brand-surface border border-brand-border rounded-2xl p-6 w-full max-w-md"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-black text-brand-text">Randevu Detayı</h3>
                                <button
                                    onClick={() => setSelectedAppointment(null)}
                                    className="p-2 hover:bg-brand-surface2 rounded-lg transition-colors"
                                >
                                    <X size={18} className="text-brand-muted" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                        <User size={28} className="text-purple-500" />
                                    </div>
                                    <div>
                                        <p className="font-black text-brand-text text-lg">{selectedAppointment.customerName}</p>
                                        <p className="text-sm text-brand-muted flex items-center gap-2">
                                            <Phone size={12} />
                                            {selectedAppointment.customerPhone}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 p-4 bg-brand-surface2/50 rounded-xl">
                                    <div>
                                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Saat</p>
                                        <p className="font-bold text-brand-text">{selectedAppointment.startTime} - {selectedAppointment.endTime}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Süre</p>
                                        <p className="font-bold text-brand-text">{selectedAppointment.duration} dakika</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Hizmet</p>
                                        <p className="font-bold text-brand-text">{selectedAppointment.service}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Ücret</p>
                                        <p className="font-bold text-brand-text">₺{selectedAppointment.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-brand-surface2/30 rounded-xl">
                                    <span className="text-sm font-bold text-brand-muted">Durum</span>
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold text-white ${getStatusColor(selectedAppointment.status)}`}>
                                        {getStatusLabel(selectedAppointment.status)}
                                    </span>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    {selectedAppointment.status === 'upcoming' && (
                                        <>
                                            <button className="flex-1 h-11 rounded-xl bg-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors">
                                                <Play size={16} />
                                                Başlat
                                            </button>
                                            <button className="h-11 px-4 rounded-xl bg-red-500/10 text-red-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors">
                                                <XCircle size={16} />
                                            </button>
                                        </>
                                    )}
                                    {selectedAppointment.status === 'in-progress' && (
                                        <button className="flex-1 h-11 rounded-xl bg-green-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
                                            <CheckCircle size={16} />
                                            Tamamla
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
