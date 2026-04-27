'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, MapPin, MoreVertical, Check, X, Phone } from 'lucide-react';

interface Appointment {
    id: string;
    customerName: string;
    customerPhone?: string;
    time: string;
    duration: string;
    status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
}

interface RestaurantAppointment extends Appointment {
    tableNumber: number;
    guestCount: number;
    notes?: string;
}

interface BarberAppointment extends Appointment {
    staffName: string;
    staffAvatar?: string;
    serviceName: string;
    chairNumber: number;
}

// Restaurant Appointments - Masa Bazlı
export function RestaurantAppointmentsList() {
    const appointments: RestaurantAppointment[] = [
        { id: '1', customerName: 'Ahmet Yılmaz', customerPhone: '0532 xxx xx xx', time: '19:00', duration: '2 saat', tableNumber: 5, guestCount: 4, status: 'upcoming', notes: 'Cam kenarı tercih' },
        { id: '2', customerName: 'Zeynep Kaya', time: '19:30', duration: '1.5 saat', tableNumber: 3, guestCount: 2, status: 'upcoming' },
        { id: '3', customerName: 'Mehmet Demir', time: '20:00', duration: '2 saat', tableNumber: 8, guestCount: 6, status: 'upcoming', notes: 'Doğum günü' },
        { id: '4', customerName: 'Elif Şen', time: '18:00', duration: '1.5 saat', tableNumber: 2, guestCount: 2, status: 'in-progress' },
        { id: '5', customerName: 'Can Yücel', time: '17:00', duration: '1 saat', tableNumber: 1, guestCount: 3, status: 'completed' },
    ];

    const statusConfig = {
        'upcoming': { label: 'Bekliyor', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
        'in-progress': { label: 'Masada', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
        'completed': { label: 'Tamamlandı', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
        'cancelled': { label: 'İptal', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    };

    return (
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-black text-brand-text tracking-tight">Bugünkü Rezervasyonlar</h3>
                    <p className="text-xs text-brand-muted">Masa bazlı rezervasyon listesi</p>
                </div>
                <button className="text-xs font-bold text-brand-muted hover:text-brand-text uppercase tracking-widest">
                    Tümünü Gör →
                </button>
            </div>

            <div className="space-y-3">
                {appointments.map((apt, index) => (
                    <motion.div
                        key={apt.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-xl border transition-all hover:bg-brand-surface2/50 ${apt.status === 'in-progress' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-brand-surface2/30 border-brand-border'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Table Badge */}
                                <div className="w-14 h-14 rounded-xl bg-brand-surface border border-brand-border flex flex-col items-center justify-center">
                                    <span className="text-[10px] font-bold text-brand-muted uppercase">Masa</span>
                                    <span className="text-xl font-black text-brand-text">{apt.tableNumber}</span>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-brand-text">{apt.customerName}</p>
                                        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${statusConfig[apt.status].color}`}>
                                            {statusConfig[apt.status].label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-brand-muted">
                                        <span className="flex items-center gap-1">
                                            <Clock size={10} />
                                            {apt.time} • {apt.duration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <User size={10} />
                                            {apt.guestCount} kişi
                                        </span>
                                    </div>
                                    {apt.notes && (
                                        <p className="text-xs text-brand-accent mt-1">📝 {apt.notes}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {apt.customerPhone && (
                                    <button className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted hover:text-brand-text transition-colors">
                                        <Phone size={16} />
                                    </button>
                                )}
                                <button className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted hover:text-brand-text transition-colors">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Barber Appointments - Personel Bazlı
export function BarberAppointmentsList() {
    const appointments: BarberAppointment[] = [
        { id: '1', customerName: 'Ali Veli', time: '14:00', duration: '45 dk', staffName: 'Canberk H.', serviceName: 'Saç + Sakal', chairNumber: 1, status: 'in-progress' },
        { id: '2', customerName: 'Kemal Sunal', time: '14:45', duration: '30 dk', staffName: 'Mehmet A.', serviceName: 'Saç Kesimi', chairNumber: 3, status: 'upcoming' },
        { id: '3', customerName: 'Hakan Ural', time: '15:00', duration: '1 saat', staffName: 'Canberk H.', serviceName: 'Premium Bakım', chairNumber: 1, status: 'upcoming' },
        { id: '4', customerName: 'Murat Can', time: '15:30', duration: '45 dk', staffName: 'Mehmet A.', serviceName: 'Saç + Sakal', chairNumber: 3, status: 'upcoming' },
        { id: '5', customerName: 'Serkan Yıldız', time: '13:00', duration: '30 dk', staffName: 'Canberk H.', serviceName: 'Sakal Tıraşı', chairNumber: 2, status: 'completed' },
    ];

    const statusConfig = {
        'upcoming': { label: 'Bekliyor', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
        'in-progress': { label: 'İşlemde', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
        'completed': { label: 'Tamamlandı', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
        'cancelled': { label: 'İptal', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    };

    // Group by staff
    const grouped = appointments.reduce((acc, apt) => {
        if (!acc[apt.staffName]) acc[apt.staffName] = [];
        acc[apt.staffName].push(apt);
        return acc;
    }, {} as Record<string, BarberAppointment[]>);

    return (
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-black text-brand-text tracking-tight">Bugünkü Randevular</h3>
                    <p className="text-xs text-brand-muted">Personel bazlı randevu listesi</p>
                </div>
                <button className="text-xs font-bold text-brand-muted hover:text-brand-text uppercase tracking-widest">
                    Tümünü Gör →
                </button>
            </div>

            <div className="space-y-6">
                {Object.entries(grouped).map(([staffName, staffApts]) => (
                    <div key={staffName}>
                        {/* Staff Header */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-sm font-black text-brand-accent">
                                {staffName[0]}
                            </div>
                            <div>
                                <p className="font-bold text-brand-text text-sm">{staffName}</p>
                                <p className="text-[10px] text-brand-muted">Koltuk {staffApts[0]?.chairNumber}</p>
                            </div>
                            <div className="ml-auto text-xs text-brand-muted">
                                {staffApts.length} randevu
                            </div>
                        </div>

                        {/* Staff Appointments */}
                        <div className="space-y-2 pl-11">
                            {staffApts.map((apt, index) => (
                                <motion.div
                                    key={apt.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    className={`p-3 rounded-xl border transition-all hover:bg-brand-surface2/50 ${apt.status === 'in-progress' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-brand-surface2/30 border-brand-border'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="text-center min-w-[50px]">
                                                <p className="text-sm font-black text-brand-text">{apt.time}</p>
                                                <p className="text-[10px] text-brand-muted">{apt.duration}</p>
                                            </div>
                                            <div className="w-px h-8 bg-brand-border" />
                                            <div>
                                                <p className="font-bold text-brand-text text-sm">{apt.customerName}</p>
                                                <p className="text-xs text-brand-muted">{apt.serviceName}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${statusConfig[apt.status].color}`}>
                                                {statusConfig[apt.status].label}
                                            </span>
                                            {apt.status === 'upcoming' && (
                                                <div className="flex gap-1">
                                                    <button className="p-1.5 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all">
                                                        <Check size={12} />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
