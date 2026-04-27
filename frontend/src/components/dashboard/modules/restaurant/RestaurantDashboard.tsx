'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RestaurantStats } from '../../shared/StatsRow';
import { RestaurantAppointmentsList } from '../../shared/AppointmentsList';
import { RestaurantQuickActions } from '../../shared/QuickActions';
import { WaitingList } from '../../shared/WaitingList';
import { useModule } from '@/providers/TenantProvider';

type TableStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';

interface Table {
    id: string;
    number: number;
    seats: number;
    status: TableStatus;
    guestName?: string;
    guestCount?: number;
    reservationTime?: string;
    timeSeated?: string;
}

// Generate mock tables
const generateTables = (): Table[] => {
    const statuses: TableStatus[] = ['AVAILABLE', 'OCCUPIED', 'RESERVED'];
    return Array.from({ length: 16 }, (_, i) => ({
        id: `table-${i + 1}`,
        number: i + 1,
        seats: [2, 4, 6, 2, 4, 2, 4, 6, 2, 4, 4, 2, 6, 4, 2, 4][i],
        status: statuses[Math.floor(Math.random() * 3)],
        guestName: Math.random() > 0.5 ? ['Ahmet Y.', 'Zeynep K.', 'Mehmet D.', 'Elif Ş.'][Math.floor(Math.random() * 4)] : undefined,
        guestCount: Math.floor(Math.random() * 4) + 2,
        reservationTime: Math.random() > 0.5 ? `${19 + Math.floor(Math.random() * 3)}:${Math.random() > 0.5 ? '00' : '30'}` : undefined,
        timeSeated: Math.random() > 0.7 ? '45 dk' : undefined,
    }));
};

const TABLES = generateTables();

const statusConfig = {
    AVAILABLE: { label: 'Müsait', color: 'border-green-500/30 bg-green-500/5', dot: 'bg-green-500' },
    OCCUPIED: { label: 'Dolu', color: 'border-blue-500/30 bg-blue-500/5', dot: 'bg-blue-500' },
    RESERVED: { label: 'Rezerve', color: 'border-amber-500/30 bg-amber-500/5', dot: 'bg-amber-500' },
};

export default function RestaurantDashboard() {
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [showNewReservationModal, setShowNewReservationModal] = useState(false);
    const module = useModule();

    const tableStats = {
        available: TABLES.filter(t => t.status === 'AVAILABLE').length,
        occupied: TABLES.filter(t => t.status === 'OCCUPIED').length,
        reserved: TABLES.filter(t => t.status === 'RESERVED').length,
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">🍽️</span>
                        <h1 className="text-3xl font-black text-brand-text tracking-tighter">Restoran Dashboard</h1>
                    </div>
                    <p className="text-brand-muted font-medium">Masa ve rezervasyon yönetim merkezi</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 font-bold">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        {tableStats.available} Müsait
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 font-bold">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        {tableStats.occupied} Dolu
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 font-bold">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        {tableStats.reserved} Rezerve
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <RestaurantStats />

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Left Column - Floor Plan */}
                <div className="xl:col-span-8 space-y-6">
                    {/* Floor Plan */}
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-black text-brand-text tracking-tight">İnteraktif Kat Planı</h3>
                                <p className="text-xs text-brand-muted">Masa durumlarını görmek için tıklayın</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                                {Object.entries(statusConfig).map(([key, config]) => (
                                    <div key={key} className="flex items-center gap-1.5">
                                        <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                                        <span className="text-brand-muted font-medium">{config.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {TABLES.map((table) => (
                                <motion.button
                                    key={table.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedTable(table)}
                                    className={`relative aspect-square rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-1 transition-all ${statusConfig[table.status].color
                                        } ${selectedTable?.id === table.id ? 'ring-2 ring-brand-accent ring-offset-2 ring-offset-brand-bg' : ''}`}
                                >
                                    <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Masa</span>
                                    <span className="text-3xl font-black text-brand-text">{table.number}</span>
                                    <div className="flex gap-1 mt-1">
                                        {Array.from({ length: table.seats }).map((_, i) => (
                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-muted/30" />
                                        ))}
                                    </div>
                                    {table.status !== 'AVAILABLE' && table.guestName && (
                                        <span className="absolute bottom-2 text-[9px] font-bold text-brand-muted truncate max-w-full px-2">
                                            {table.guestName}
                                        </span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Appointments List */}
                    <RestaurantAppointmentsList />
                </div>

                {/* Right Column */}
                <div className="xl:col-span-4 space-y-6">
                    {/* Selected Table Detail */}
                    <AnimatePresence mode="wait">
                        {selectedTable ? (
                            <motion.div
                                key={selectedTable.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-black text-brand-text">Masa {selectedTable.number}</h3>
                                        <p className="text-xs text-brand-muted">{selectedTable.seats} Kişilik</p>
                                    </div>
                                    <button onClick={() => setSelectedTable(null)} className="text-xs font-bold text-brand-muted hover:text-brand-text">
                                        ✕
                                    </button>
                                </div>

                                <div className={`p-4 rounded-xl ${statusConfig[selectedTable.status].color} border`}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${statusConfig[selectedTable.status].dot}`} />
                                        <span className="font-bold text-brand-text">{statusConfig[selectedTable.status].label}</span>
                                    </div>
                                </div>

                                {selectedTable.guestName && (
                                    <div className="p-4 rounded-xl bg-brand-surface2/50 border border-brand-border">
                                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Misafir</p>
                                        <p className="font-bold text-brand-text">{selectedTable.guestName}</p>
                                        {selectedTable.guestCount && (
                                            <p className="text-sm text-brand-muted">{selectedTable.guestCount} kişi</p>
                                        )}
                                    </div>
                                )}

                                {selectedTable.reservationTime && (
                                    <div className="p-4 rounded-xl bg-brand-surface2/50 border border-brand-border">
                                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Rezervasyon</p>
                                        <p className="font-bold text-brand-text">{selectedTable.reservationTime}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <button className="h-10 rounded-xl bg-brand-accent text-brand-bg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                                        {selectedTable.status === 'AVAILABLE' ? 'Rezerve Et' : 'Düzenle'}
                                    </button>
                                    <button className="h-10 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold text-xs uppercase tracking-widest hover:bg-brand-surface transition-colors">
                                        Detay
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-64 border-2 border-dashed border-brand-border rounded-2xl flex items-center justify-center p-6"
                            >
                                <p className="text-center text-sm font-bold text-brand-muted uppercase tracking-widest">
                                    Detay görmek için<br />bir masa seçin
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Quick Actions */}
                    <RestaurantQuickActions onNewReservation={() => setShowNewReservationModal(true)} />

                    {/* Waiting List */}
                    <WaitingList />
                </div>
            </div>

            {/* New Reservation Modal */}
            {showNewReservationModal && (
                <NewReservationModal onClose={() => setShowNewReservationModal(false)} />
            )}
        </div>
    );
}

// Inline New Reservation Modal
function NewReservationModal({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = React.useState({
        customerName: '',
        customerPhone: '',
        date: new Date().toISOString().split('T')[0],
        time: '19:00',
        tableNumber: 1,
        guestCount: 2,
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating reservation:', formData);
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
                    <h3 className="text-xl font-black text-brand-text">Yeni Rezervasyon</h3>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Müşteri Adı *</label>
                        <input
                            type="text"
                            required
                            value={formData.customerName}
                            onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                            className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Telefon</label>
                        <input
                            type="tel"
                            value={formData.customerPhone}
                            onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                            className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50"
                            placeholder="0532 XXX XX XX"
                        />
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
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Masa</label>
                            <select value={formData.tableNumber} onChange={(e) => setFormData(prev => ({ ...prev, tableNumber: Number(e.target.value) }))} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(n => <option key={n} value={n}>Masa {n}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Kişi</label>
                            <select value={formData.guestCount} onChange={(e) => setFormData(prev => ({ ...prev, guestCount: Number(e.target.value) }))} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n} kişi</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Not</label>
                        <input type="text" value={formData.notes} onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))} placeholder="Örn: Cam kenarı tercih" className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50" />
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
