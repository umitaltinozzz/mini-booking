'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarberStats } from '../../shared/StatsRow';
import { BarberAppointmentsList } from '../../shared/AppointmentsList';
import { BarberQuickActions } from '../../shared/QuickActions';
import { WaitingList } from '../../shared/WaitingList';
import { Clock, User, Scissors, TrendingUp } from 'lucide-react';

interface Staff {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    isActive: boolean;
    currentClient?: string;
    currentService?: string;
    chairNumber: number;
    todayAppointments: number;
    completedAppointments: number;
    loadPercentage: number;
    nextAvailable?: string;
}

interface TimeSlot {
    time: string;
    staffId: string;
    clientName?: string;
    serviceName?: string;
    status: 'available' | 'booked' | 'in-progress' | 'completed';
}

const MOCK_STAFF: Staff[] = [
    {
        id: 's1',
        name: 'Canberk H.',
        role: 'Senior Berber',
        isActive: true,
        currentClient: 'Ali Veli',
        currentService: 'Saç + Sakal',
        chairNumber: 1,
        todayAppointments: 8,
        completedAppointments: 5,
        loadPercentage: 85,
    },
    {
        id: 's2',
        name: 'Mehmet A.',
        role: 'Berber',
        isActive: true,
        chairNumber: 2,
        todayAppointments: 6,
        completedAppointments: 3,
        loadPercentage: 60,
        nextAvailable: '15:00',
    },
    {
        id: 's3',
        name: 'Deniz K.',
        role: 'Junior Berber',
        isActive: false,
        chairNumber: 3,
        todayAppointments: 0,
        completedAppointments: 0,
        loadPercentage: 0,
    },
];

// Generate timeline slots
const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const statuses: TimeSlot['status'][] = ['available', 'booked', 'in-progress', 'completed'];

    MOCK_STAFF.forEach(staff => {
        hours.forEach(time => {
            slots.push({
                time,
                staffId: staff.id,
                status: staff.isActive ? statuses[Math.floor(Math.random() * 4)] : 'available',
                clientName: Math.random() > 0.5 ? 'Müşteri' : undefined,
                serviceName: Math.random() > 0.5 ? 'Saç Kesimi' : undefined,
            });
        });
    });

    return slots;
};

export default function BarberDashboard() {
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');
    const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);

    const activeStaffCount = MOCK_STAFF.filter(s => s.isActive).length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">💈</span>
                        <h1 className="text-3xl font-black text-brand-text tracking-tighter">Berber Dashboard</h1>
                    </div>
                    <p className="text-brand-muted font-medium">Personel ve randevu yönetim merkezi</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* View Toggle */}
                    <div className="flex bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
                        <button
                            onClick={() => setViewMode('cards')}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'cards' ? 'bg-brand-accent text-brand-bg' : 'text-brand-muted hover:text-brand-text'
                                }`}
                        >
                            Kartlar
                        </button>
                        <button
                            onClick={() => setViewMode('timeline')}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'timeline' ? 'bg-brand-accent text-brand-bg' : 'text-brand-muted hover:text-brand-text'
                                }`}
                        >
                            Zaman Çizelgesi
                        </button>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 font-bold text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        {activeStaffCount}/{MOCK_STAFF.length} Aktif
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <BarberStats />

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="xl:col-span-8 space-y-6">
                    {/* Staff Cards / Timeline View */}
                    <AnimatePresence mode="wait">
                        {viewMode === 'cards' ? (
                            <motion.div
                                key="cards"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-brand-surface border border-brand-border rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-black text-brand-text tracking-tight">Personel Durumu</h3>
                                        <p className="text-xs text-brand-muted">Anlık koltuk ve personel yoğunluğu</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {MOCK_STAFF.map((staff, index) => (
                                        <motion.button
                                            key={staff.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => setSelectedStaff(staff)}
                                            className={`p-5 rounded-2xl border text-left transition-all hover:shadow-lg ${staff.isActive
                                                ? 'bg-brand-surface2/30 border-brand-border hover:border-brand-accent/30'
                                                : 'bg-brand-surface2/10 border-brand-border/50 opacity-60'
                                                } ${selectedStaff?.id === staff.id ? 'ring-2 ring-brand-accent' : ''}`}
                                        >
                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black ${staff.isActive ? 'bg-brand-accent/10 text-brand-accent' : 'bg-brand-surface2 text-brand-muted'
                                                        }`}>
                                                        {staff.name[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-brand-text">{staff.name}</p>
                                                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">{staff.role}</p>
                                                    </div>
                                                </div>
                                                <div className={`w-2.5 h-2.5 rounded-full ${staff.isActive ? 'bg-green-500' : 'bg-brand-muted/30'}`} />
                                            </div>

                                            {/* Current Status */}
                                            {staff.isActive && staff.currentClient && (
                                                <div className="mb-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Şu An</p>
                                                    <p className="font-bold text-brand-text text-sm">{staff.currentClient}</p>
                                                    <p className="text-xs text-brand-muted">{staff.currentService}</p>
                                                </div>
                                            )}

                                            {/* Chair */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-[10px] font-black text-brand-text">
                                                    KOLTUK {staff.chairNumber}
                                                </div>
                                                {staff.nextAvailable && (
                                                    <div className="px-3 py-1.5 rounded-lg bg-green-500/10 text-[10px] font-black text-green-500">
                                                        {staff.nextAvailable} müsait
                                                    </div>
                                                )}
                                            </div>

                                            {/* Load Bar */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                                    <span className="text-brand-muted">Günlük Doluluk</span>
                                                    <span className={staff.loadPercentage > 70 ? 'text-brand-accent' : 'text-brand-muted'}>
                                                        {staff.loadPercentage}%
                                                    </span>
                                                </div>
                                                <div className="h-2 w-full bg-brand-surface2 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${staff.loadPercentage}%` }}
                                                        transition={{ duration: 1, delay: index * 0.1 }}
                                                        className={`h-full rounded-full ${staff.loadPercentage > 80 ? 'bg-brand-accent' :
                                                            staff.loadPercentage > 50 ? 'bg-blue-500' : 'bg-green-500'
                                                            }`}
                                                    />
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-border">
                                                <div className="text-center">
                                                    <p className="text-lg font-black text-brand-text">{staff.completedAppointments}</p>
                                                    <p className="text-[9px] font-bold text-brand-muted uppercase">Tamamlanan</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-lg font-black text-brand-text">{staff.todayAppointments - staff.completedAppointments}</p>
                                                    <p className="text-[9px] font-bold text-brand-muted uppercase">Kalan</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-lg font-black text-brand-text">{staff.todayAppointments}</p>
                                                    <p className="text-[9px] font-bold text-brand-muted uppercase">Toplam</p>
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="timeline"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-brand-surface border border-brand-border rounded-2xl p-6 overflow-x-auto"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-black text-brand-text tracking-tight">Zaman Çizelgesi</h3>
                                        <p className="text-xs text-brand-muted">Saatlik personel doluluk görünümü</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/30" />
                                            <span className="text-brand-muted">Müsait</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/30" />
                                            <span className="text-brand-muted">Dolu</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-3 h-3 rounded bg-brand-accent/20 border border-brand-accent/30" />
                                            <span className="text-brand-muted">İşlemde</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Grid */}
                                <div className="min-w-[800px]">
                                    {/* Hours Header */}
                                    <div className="flex mb-2">
                                        <div className="w-32 flex-shrink-0" />
                                        {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(hour => (
                                            <div key={hour} className="flex-1 text-center text-[10px] font-bold text-brand-muted uppercase">
                                                {hour}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Staff Rows */}
                                    {MOCK_STAFF.map(staff => (
                                        <div key={staff.id} className="flex items-center mb-2">
                                            <div className="w-32 flex-shrink-0 flex items-center gap-2 pr-4">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black ${staff.isActive ? 'bg-brand-accent/10 text-brand-accent' : 'bg-brand-surface2 text-brand-muted'
                                                    }`}>
                                                    {staff.name[0]}
                                                </div>
                                                <span className="text-sm font-bold text-brand-text truncate">{staff.name}</span>
                                            </div>
                                            <div className="flex-1 flex gap-1">
                                                {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map((hour, i) => {
                                                    const statuses = ['available', 'booked', 'in-progress', 'completed'];
                                                    const status = staff.isActive ? statuses[Math.floor(Math.random() * 4)] : 'available';
                                                    const colors = {
                                                        'available': 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20',
                                                        'booked': 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20',
                                                        'in-progress': 'bg-brand-accent/10 border-brand-accent/20 hover:bg-brand-accent/20',
                                                        'completed': 'bg-brand-surface2 border-brand-border/50',
                                                    };
                                                    return (
                                                        <div
                                                            key={hour}
                                                            className={`flex-1 h-10 rounded-lg border cursor-pointer transition-all ${colors[status as keyof typeof colors]}`}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Appointments List */}
                    <BarberAppointmentsList />
                </div>

                {/* Right Column */}
                <div className="xl:col-span-4 space-y-6">
                    {/* Selected Staff Detail */}
                    <AnimatePresence mode="wait">
                        {selectedStaff ? (
                            <motion.div
                                key={selectedStaff.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black ${selectedStaff.isActive ? 'bg-brand-accent/10 text-brand-accent' : 'bg-brand-surface2 text-brand-muted'
                                            }`}>
                                            {selectedStaff.name[0]}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-brand-text">{selectedStaff.name}</h3>
                                            <p className="text-xs text-brand-muted">{selectedStaff.role}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedStaff(null)} className="text-xs font-bold text-brand-muted hover:text-brand-text">
                                        ✕
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-center">
                                        <p className="text-2xl font-black text-brand-text">{selectedStaff.completedAppointments}</p>
                                        <p className="text-[10px] font-bold text-brand-muted uppercase">Tamamlanan</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-center">
                                        <p className="text-2xl font-black text-brand-text">{selectedStaff.todayAppointments}</p>
                                        <p className="text-[10px] font-bold text-brand-muted uppercase">Toplam</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <button className="h-10 rounded-xl bg-brand-accent text-brand-bg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                                        Randevu Ekle
                                    </button>
                                    <button className="h-10 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold text-xs uppercase tracking-widest hover:bg-brand-surface transition-colors">
                                        Takvimi Gör
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-48 border-2 border-dashed border-brand-border rounded-2xl flex items-center justify-center p-6"
                            >
                                <p className="text-center text-sm font-bold text-brand-muted uppercase tracking-widest">
                                    Detay görmek için<br />bir personel seçin
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Quick Actions */}
                    <BarberQuickActions onNewAppointment={() => setShowNewAppointmentModal(true)} />

                    {/* Waiting List */}
                    <WaitingList />
                </div>
            </div>

            {/* New Appointment Modal */}
            {showNewAppointmentModal && (
                <NewAppointmentModal onClose={() => setShowNewAppointmentModal(false)} />
            )}
        </div>
    );
}

// Inline New Appointment Modal
function NewAppointmentModal({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = React.useState({
        customerName: '',
        customerPhone: '',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        staffId: 'bst1',
        serviceId: 'bs1',
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
                className="w-full max-w-md bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6 shadow-2xl"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-brand-text">Yeni Randevu</h3>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Müşteri Adı *</label>
                        <input type="text" required value={formData.customerName} onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Telefon</label>
                        <input type="tel" value={formData.customerPhone} onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))} placeholder="0532 XXX XX XX" className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Tarih</label>
                            <input type="date" value={formData.date} onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Saat</label>
                            <input type="time" value={formData.time} onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Personel *</label>
                        <select value={formData.staffId} onChange={(e) => setFormData(prev => ({ ...prev, staffId: e.target.value }))} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer">
                            <option value="bst1">Canberk H. (Koltuk 1)</option>
                            <option value="bst2">Mehmet A. (Koltuk 2)</option>
                            <option value="bst3">Deniz K. (Koltuk 3)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Hizmet *</label>
                        <select value={formData.serviceId} onChange={(e) => setFormData(prev => ({ ...prev, serviceId: e.target.value }))} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer">
                            <option value="bs1">Saç Kesimi - 30 dk - ₺150</option>
                            <option value="bs2">Sakal Tıraşı - 20 dk - ₺80</option>
                            <option value="bs3">Saç + Sakal - 45 dk - ₺200</option>
                            <option value="bs5">Premium Bakım - 75 dk - ₺350</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Not</label>
                        <input type="text" value={formData.notes} onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))} placeholder="Örn: Yanları kısa, üstü uzun" className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50" />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold text-xs uppercase tracking-widest">İptal</button>
                        <button type="submit" className="flex-1 h-11 rounded-xl bg-brand-accent text-brand-bg font-bold text-xs uppercase tracking-widest">Oluştur</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
