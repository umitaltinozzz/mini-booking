'use client';

import React, { useState } from 'react';
import { useModule } from '@/providers/TenantProvider';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Calendar,
    Clock,
    User,
    Phone,
    MoreVertical,
    Check,
    X,
    ChevronLeft,
    ChevronRight,
    Filter,
    Utensils,
    Scissors,
    MapPin,
} from 'lucide-react';
import { mockRestaurantReservations } from '@/data/tenant/mockRestaurantData';
import { mockBarberAppointments } from '@/data/tenant/mockBarberData';

type AppointmentStatus = 'pending' | 'confirmed' | 'in-progress' | 'seated' | 'completed' | 'cancelled' | 'no-show';

const statusConfig: Record<AppointmentStatus, { label: string; color: string; bg: string }> = {
    pending: { label: 'Bekliyor', color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20' },
    confirmed: { label: 'Onaylandı', color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
    'in-progress': { label: 'İşlemde', color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20' },
    seated: { label: 'Masada', color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
    completed: { label: 'Tamamlandı', color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20' },
    cancelled: { label: 'İptal', color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20' },
    'no-show': { label: 'Gelmedi', color: 'text-gray-500', bg: 'bg-gray-500/10 border-gray-500/20' },
};

export default function AppointmentsPage() {
    const module = useModule();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<AppointmentStatus | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const isBarber = module.id === 'barber';

    // Unified appointment type for display
    interface DisplayAppointment {
        id: string;
        customerName: string;
        customerPhone: string;
        time: string;
        duration: string;
        status: AppointmentStatus;
        notes?: string;
        // Sector specific
        tableNumber?: number;
        guestCount?: number;
        staffName?: string;
        serviceName?: string;
        chairNumber?: number;
    }

    const appointments: DisplayAppointment[] = isBarber
        ? mockBarberAppointments.map(a => ({
            id: a.id,
            customerName: a.customerName,
            customerPhone: a.customerPhone,
            time: a.time,
            duration: a.duration,
            status: a.status as AppointmentStatus,
            notes: a.notes,
            staffName: a.staffName,
            serviceName: a.serviceName,
            chairNumber: a.chairNumber,
        }))
        : mockRestaurantReservations.map(r => ({
            id: r.id,
            customerName: r.customerName,
            customerPhone: r.customerPhone,
            time: r.time,
            duration: r.duration,
            status: r.status as AppointmentStatus,
            notes: r.notes,
            tableNumber: r.tableNumber,
            guestCount: r.guestCount,
        }));

    const filteredAppointments = appointments.filter(a =>
        a.customerName.toLowerCase().includes(search.toLowerCase()) &&
        (!filterStatus || a.status === filterStatus)
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{isBarber ? '📅' : '🗓️'}</span>
                        <h1 className="text-3xl font-black text-brand-text tracking-tighter">
                            {isBarber ? 'Randevu Yönetimi' : 'Rezervasyon Yönetimi'}
                        </h1>
                    </div>
                    <p className="text-brand-muted font-medium">
                        {isBarber ? 'Müşteri randevularını takip edin ve yönetin' : 'Masa rezervasyonlarını takip edin ve yönetin'}
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="h-11 px-6 rounded-xl bg-brand-accent text-brand-bg font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <Plus size={16} />
                    {isBarber ? 'Yeni Randevu' : 'Yeni Rezervasyon'}
                </button>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center justify-between bg-brand-surface border border-brand-border rounded-xl p-4">
                <button className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted hover:text-brand-text transition-colors">
                    <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 rounded-lg bg-brand-surface2 text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-brand-text transition-colors">
                        Bugün
                    </button>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-brand-accent" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-transparent text-lg font-black text-brand-text outline-none cursor-pointer"
                        />
                    </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted hover:text-brand-text transition-colors">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center gap-3 px-4 h-11 rounded-xl bg-brand-surface border border-brand-border flex-1 max-w-md">
                    <Search size={16} className="text-brand-muted" />
                    <input
                        type="text"
                        placeholder="Müşteri ara..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 bg-transparent text-sm font-medium text-brand-text placeholder:text-brand-muted outline-none"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilterStatus(null)}
                        className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${filterStatus === null ? 'bg-brand-accent text-brand-bg' : 'bg-brand-surface border border-brand-border text-brand-muted'
                            }`}
                    >
                        Tümü
                    </button>
                    {['pending', 'confirmed', isBarber ? 'in-progress' : 'seated', 'completed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status as AppointmentStatus)}
                            className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${filterStatus === status
                                ? statusConfig[status as AppointmentStatus].bg + ' ' + statusConfig[status as AppointmentStatus].color + ' border'
                                : 'bg-brand-surface border border-brand-border text-brand-muted'
                                }`}
                        >
                            {statusConfig[status as AppointmentStatus].label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-brand-border bg-brand-surface2/30">
                            <th className="px-6 py-4 text-left text-[10px] font-black text-brand-muted uppercase tracking-widest">Saat</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-brand-muted uppercase tracking-widest">Müşteri</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-brand-muted uppercase tracking-widest">
                                {isBarber ? 'Hizmet' : 'Detay'}
                            </th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-brand-muted uppercase tracking-widest">
                                {isBarber ? 'Personel' : 'Masa'}
                            </th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-brand-muted uppercase tracking-widest">Durum</th>
                            <th className="px-6 py-4 w-20"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {filteredAppointments.map((apt, index) => (
                                <motion.tr
                                    key={apt.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="border-b border-brand-border/50 hover:bg-brand-surface2/30 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-xl bg-brand-surface2 flex items-center justify-center">
                                                <Clock size={14} className="text-brand-accent" />
                                            </div>
                                            <div>
                                                <p className="font-black text-brand-text">{apt.time}</p>
                                                <p className="text-[10px] text-brand-muted">{apt.duration}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-brand-text">{apt.customerName}</p>
                                            <p className="text-xs text-brand-muted flex items-center gap-1">
                                                <Phone size={10} /> {apt.customerPhone}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {isBarber ? (
                                            <div className="flex items-center gap-2">
                                                <Scissors size={12} className="text-brand-muted" />
                                                <span className="font-medium text-brand-text text-sm">{apt.serviceName}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <User size={12} className="text-brand-muted" />
                                                <span className="font-medium text-brand-text text-sm">{apt.guestCount} kişi</span>
                                            </div>
                                        )}
                                        {apt.notes && (
                                            <p className="text-xs text-brand-accent mt-1">📝 {apt.notes}</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {isBarber ? (
                                            <div>
                                                <p className="font-bold text-brand-text text-sm">{apt.staffName}</p>
                                                <p className="text-[10px] text-brand-muted">Koltuk {apt.chairNumber}</p>
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-surface2 border border-brand-border">
                                                <span className="font-black text-brand-text">{apt.tableNumber}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-3 py-1 rounded-lg border text-[10px] font-bold uppercase ${statusConfig[apt.status].bg} ${statusConfig[apt.status].color}`}>
                                            {statusConfig[apt.status].label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {apt.status === 'pending' && (
                                                <>
                                                    <button className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all" title="Onayla">
                                                        <Check size={14} />
                                                    </button>
                                                    <button className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all" title="İptal">
                                                        <X size={14} />
                                                    </button>
                                                </>
                                            )}
                                            <button className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted">
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {filteredAppointments.length === 0 && (
                    <div className="py-16 text-center">
                        <Calendar size={32} className="mx-auto text-brand-muted mb-4" />
                        <p className="font-bold text-brand-muted uppercase tracking-widest text-sm">
                            {search ? 'Sonuç bulunamadı' : `Bu tarihte ${isBarber ? 'randevu' : 'rezervasyon'} yok`}
                        </p>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-brand-surface border border-brand-border rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-brand-text">{appointments.length}</p>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Toplam</p>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-amber-500">{appointments.filter(a => a.status === 'pending').length}</p>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Bekleyen</p>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-blue-500">{appointments.filter(a => a.status === 'confirmed' || a.status === 'in-progress' || a.status === 'seated').length}</p>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Aktif</p>
                </div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-green-500">{appointments.filter(a => a.status === 'completed').length}</p>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Tamamlanan</p>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-red-500">{appointments.filter(a => a.status === 'cancelled' || a.status === 'no-show').length}</p>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">İptal/Gelmedi</p>
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <NewAppointmentModal
                    sector={module.id}
                    onClose={() => setShowAddModal(false)}
                />
            )}
        </div>
    );
}

// New Appointment/Reservation Modal
function NewAppointmentModal({ sector, onClose }: { sector: string; onClose: () => void }) {
    const isBarber = sector === 'barber';
    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        // Restaurant
        tableNumber: 1,
        guestCount: 2,
        // Barber
        staffId: '',
        serviceId: '',
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating appointment:', formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-brand-text">
                        {isBarber ? 'Yeni Randevu' : 'Yeni Rezervasyon'}
                    </h3>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Customer Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                                Müşteri Adı *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.customerName}
                                onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                                className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                                Telefon *
                            </label>
                            <input
                                type="tel"
                                required
                                value={formData.customerPhone}
                                onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                                className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50"
                                placeholder="0532 XXX XX XX"
                            />
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                                Tarih *
                            </label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50 cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                                Saat *
                            </label>
                            <input
                                type="time"
                                required
                                value={formData.time}
                                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                                className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Sector Specific */}
                    {isBarber ? (
                        <>
                            <div>
                                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                                    Personel *
                                </label>
                                <select
                                    required
                                    value={formData.staffId}
                                    onChange={(e) => setFormData(prev => ({ ...prev, staffId: e.target.value }))}
                                    className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer"
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="bst1">Canberk H. (Koltuk 1)</option>
                                    <option value="bst2">Mehmet A. (Koltuk 2)</option>
                                    <option value="bst3">Deniz K. (Koltuk 3)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                                    Hizmet *
                                </label>
                                <select
                                    required
                                    value={formData.serviceId}
                                    onChange={(e) => setFormData(prev => ({ ...prev, serviceId: e.target.value }))}
                                    className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer"
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="bs1">Saç Kesimi - 30 dk - ₺150</option>
                                    <option value="bs2">Sakal Tıraşı - 20 dk - ₺80</option>
                                    <option value="bs3">Saç + Sakal - 45 dk - ₺200</option>
                                    <option value="bs4">Fade Kesim - 40 dk - ₺180</option>
                                    <option value="bs5">Premium Bakım - 75 dk - ₺350</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                                    Masa *
                                </label>
                                <select
                                    required
                                    value={formData.tableNumber}
                                    onChange={(e) => setFormData(prev => ({ ...prev, tableNumber: Number(e.target.value) }))}
                                    className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <option key={n} value={n}>Masa {n}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                                    Kişi Sayısı *
                                </label>
                                <select
                                    required
                                    value={formData.guestCount}
                                    onChange={(e) => setFormData(prev => ({ ...prev, guestCount: Number(e.target.value) }))}
                                    className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                        <option key={n} value={n}>{n} kişi</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                            Not
                        </label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                            className="w-full h-20 px-4 py-3 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50 resize-none"
                            placeholder={isBarber ? 'Örn: Yanları kısa, üstü uzun' : 'Örn: Cam kenarı tercih'}
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-11 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold text-xs uppercase tracking-widest hover:bg-brand-surface transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 h-11 rounded-xl bg-brand-accent text-brand-bg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                        >
                            Oluştur
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
