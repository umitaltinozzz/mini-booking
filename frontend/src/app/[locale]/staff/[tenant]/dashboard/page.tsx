'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, User, Phone, Coffee, CheckCircle, XCircle,
    ChevronRight, Star, MessageSquare, Calendar,
    TrendingUp, Play, Timer, AlertCircle, Zap
} from 'lucide-react';
import {
    getStaffDashboardData,
    CURRENT_STAFF_ID,
} from '@/data/tenant/mockStaffData';
import { StaffAppointment } from '@/types/staff';
import { useTenant } from '@/providers/TenantProvider';
import { RestaurantStaffDashboard } from '@/components/dashboard/modules/restaurant/RestaurantStaffDashboard';

export default function StaffDashboardPage() {
    const { tenant } = useTenant();
    const [selectedAppointment, setSelectedAppointment] = useState<StaffAppointment | null>(null);

    // Show restaurant dashboard for restaurant sector
    if (tenant.sector === 'restaurant') {
        return <RestaurantStaffDashboard />;
    }

    const data = getStaffDashboardData(CURRENT_STAFF_ID);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-brand-muted">Staff data not found</p>
            </div>
        );
    }

    const { staff, todayAppointments, currentAppointment, nextAppointment, schedule } = data;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-500';
            case 'in-progress': return 'bg-blue-500';
            case 'upcoming': return 'bg-gray-400';
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
            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                    icon={Calendar}
                    label="Bugün"
                    value={`${staff.todayCompleted}/${staff.todayAppointments}`}
                    subtext="tamamlandı"
                    color="from-purple-500 to-pink-600"
                />
                <StatCard
                    icon={Timer}
                    label="Kalan"
                    value={(staff.todayAppointments - staff.todayCompleted).toString()}
                    subtext="randevu"
                    color="from-blue-500 to-indigo-600"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Kazanç"
                    value={`₺${staff.todayEarnings.toLocaleString()}`}
                    subtext="bugün"
                    color="from-green-500 to-emerald-600"
                />
                <StatCard
                    icon={Star}
                    label="Rating"
                    value={staff.rating.toString()}
                    subtext={`${staff.totalReviews} yorum`}
                    color="from-yellow-500 to-orange-500"
                />
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Left Side - Main Content */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Current Appointment - Hero Card */}
                    {currentAppointment ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden"
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
                            </div>

                            <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                                        <span className="text-sm font-bold uppercase tracking-widest opacity-80">Şu An Hizmet Veriliyor</span>
                                    </div>
                                    <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold backdrop-blur-sm">
                                        {currentAppointment.startTime} - {currentAppointment.endTime}
                                    </div>
                                </div>

                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-3xl font-black">{currentAppointment.customerName}</h2>
                                        <p className="text-white/80 mt-1 text-lg">{currentAppointment.service}</p>
                                        <div className="flex items-center gap-4 mt-3 text-white/60 text-sm">
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {currentAppointment.duration} dk
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Phone size={14} />
                                                {currentAppointment.customerPhone}
                                            </span>
                                        </div>
                                        {currentAppointment.customerNote && (
                                            <p className="text-white/60 text-sm mt-3 flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                                                <MessageSquare size={14} />
                                                {currentAppointment.customerNote}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-4xl font-black">₺{currentAppointment.price}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button className="flex-1 h-12 rounded-xl bg-white text-purple-600 font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors shadow-lg">
                                        <CheckCircle size={18} />
                                        Tamamla
                                    </button>
                                    <button className="h-12 px-6 rounded-xl bg-white/20 backdrop-blur-sm text-white font-bold flex items-center justify-center gap-2 hover:bg-white/30 transition-colors">
                                        <Phone size={18} />
                                        Ara
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 text-center">
                            <div className="w-16 h-16 mx-auto bg-brand-surface2 rounded-full flex items-center justify-center mb-4">
                                <Coffee size={24} className="text-brand-muted" />
                            </div>
                            <p className="font-bold text-brand-text">Şu an aktif randevu yok</p>
                            <p className="text-sm text-brand-muted mt-1">Mola almak için uygun bir zaman!</p>
                        </div>
                    )}

                    {/* Next Appointment */}
                    {nextAppointment && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-brand-surface border border-brand-border rounded-2xl p-5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Zap size={16} className="text-purple-500" />
                                <span className="text-xs font-bold text-brand-muted uppercase tracking-widest">Sıradaki</span>
                                <span className="ml-auto text-xs text-brand-muted">
                                    {nextAppointment.startTime}'de başlayacak
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                        <User size={24} className="text-purple-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-brand-text text-lg">{nextAppointment.customerName}</p>
                                        <p className="text-sm text-brand-muted">{nextAppointment.service} • {nextAppointment.duration} dk</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-brand-text text-xl">{nextAppointment.startTime}</p>
                                    <p className="text-sm text-brand-muted">₺{nextAppointment.price}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Today's Full Schedule */}
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-black text-brand-text flex items-center gap-2">
                                <Calendar size={18} className="text-purple-500" />
                                Bugünün Programı
                            </h3>
                            <span className="text-xs font-bold text-brand-muted px-2 py-1 bg-brand-surface2 rounded-lg">
                                {schedule.startTime} - {schedule.endTime}
                            </span>
                        </div>

                        <div className="space-y-2">
                            {todayAppointments.map((apt, index) => (
                                <motion.button
                                    key={apt.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedAppointment(apt)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${apt.status === 'in-progress'
                                        ? 'bg-purple-500/10 border-purple-500/30 ring-2 ring-purple-500/20'
                                        : apt.status === 'completed'
                                            ? 'bg-brand-surface2/30 border-brand-border opacity-50'
                                            : 'bg-brand-surface2/30 border-brand-border hover:bg-brand-surface2/50 hover:border-purple-500/30'
                                        }`}
                                >
                                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getStatusColor(apt.status)}`} />
                                    <span className="w-16 text-sm font-bold text-brand-text">{apt.startTime}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-brand-text truncate">{apt.customerName}</p>
                                        <p className="text-xs text-brand-muted truncate">{apt.service}</p>
                                    </div>
                                    <span className="text-sm font-bold text-brand-text">₺{apt.price}</span>
                                    <ChevronRight size={16} className="text-brand-muted" />
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Quick Actions */}
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-5">
                        <h3 className="font-black text-brand-text mb-4">Hızlı İşlemler</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-colors">
                                <Coffee size={20} className="text-orange-500" />
                                <span className="text-xs font-bold text-orange-600">Mola Al</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                                <MessageSquare size={20} className="text-blue-500" />
                                <span className="text-xs font-bold text-blue-600">Not Ekle</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                                <Phone size={20} className="text-green-500" />
                                <span className="text-xs font-bold text-green-600">Müşteri Ara</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                                <Calendar size={20} className="text-purple-500" />
                                <span className="text-xs font-bold text-purple-600">Takvim</span>
                            </button>
                        </div>
                    </div>

                    {/* My Specialties */}
                    {staff.specialties && (
                        <div className="bg-brand-surface border border-brand-border rounded-2xl p-5">
                            <h3 className="font-black text-brand-text mb-3 text-sm">Uzmanlıklarım</h3>
                            <div className="flex flex-wrap gap-2">
                                {staff.specialties.map((spec) => (
                                    <span key={spec} className="px-3 py-1.5 bg-purple-500/10 text-purple-600 rounded-lg text-xs font-bold">
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Weekly Summary */}
                    <div className="bg-gradient-to-br from-brand-surface to-brand-surface2/50 border border-brand-border rounded-2xl p-5">
                        <h3 className="font-black text-brand-text mb-4 text-sm">Bu Hafta Özeti</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-brand-muted">Randevu Hedefi</span>
                                    <span className="text-xs font-bold text-brand-text">48/60</span>
                                </div>
                                <div className="h-2 bg-brand-surface2 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '80%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-brand-muted">Ciro Hedefi</span>
                                    <span className="text-xs font-bold text-brand-text">₺8.4K/₺10K</span>
                                </div>
                                <div className="h-2 bg-brand-surface2 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: '84%' }} />
                                </div>
                            </div>
                            <div className="pt-2 border-t border-brand-border">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-brand-muted">Müşteri Memnuniyeti</span>
                                    <div className="flex items-center gap-1">
                                        <Star size={12} className="text-yellow-500" fill="currentColor" />
                                        <span className="text-sm font-bold text-brand-text">{staff.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold text-white ${getStatusColor(selectedAppointment.status)}`}>
                                    {getStatusLabel(selectedAppointment.status)}
                                </span>
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

                                {selectedAppointment.customerNote && (
                                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertCircle size={14} className="text-yellow-500" />
                                            <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest">Müşteri Notu</span>
                                        </div>
                                        <p className="text-sm text-brand-text">{selectedAppointment.customerNote}</p>
                                    </div>
                                )}

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
                                    <button
                                        onClick={() => setSelectedAppointment(null)}
                                        className="h-11 px-6 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold text-sm hover:bg-brand-surface transition-colors"
                                    >
                                        Kapat
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, subtext, color }: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string;
    subtext: string;
    color: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-surface border border-brand-border rounded-2xl p-4"
        >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg mb-3`}>
                <Icon size={18} className="text-white" />
            </div>
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">{label}</p>
            <p className="text-xl font-black text-brand-text">{value}</p>
            <p className="text-xs text-brand-muted">{subtext}</p>
        </motion.div>
    );
}
