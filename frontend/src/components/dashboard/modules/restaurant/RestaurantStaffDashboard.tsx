'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Clock, CreditCard, CheckCircle, AlertCircle,
    Coffee, UtensilsCrossed, Bell, ChefHat, TrendingUp,
    Star, MessageSquare, Timer, Zap, X, Check
} from 'lucide-react';

// Table status types
type TableStatus = 'available' | 'ordering' | 'eating' | 'bill-requested' | 'cleaning';

interface TableOrder {
    id: string;
    tableNumber: number;
    guestCount: number;
    status: TableStatus;
    startTime: string;
    items: { name: string; quantity: number; status: 'pending' | 'preparing' | 'ready' | 'served' }[];
    total: number;
}

// Mock Data
const MOCK_TABLES: { number: number; status: TableStatus; order?: TableOrder }[] = [
    { number: 5, status: 'available' },
    {
        number: 6, status: 'ordering', order: {
            id: 'order-1',
            tableNumber: 6,
            guestCount: 4,
            status: 'ordering',
            startTime: '19:30',
            items: [
                { name: 'Margherita Pizza', quantity: 2, status: 'preparing' },
                { name: 'Pasta Carbonara', quantity: 1, status: 'preparing' },
                { name: 'Tiramisu', quantity: 2, status: 'pending' },
            ],
            total: 420,
        }
    },
    {
        number: 7, status: 'eating', order: {
            id: 'order-2',
            tableNumber: 7,
            guestCount: 2,
            status: 'eating',
            startTime: '18:45',
            items: [
                { name: 'Köfte', quantity: 2, status: 'served' },
                { name: 'Pilav', quantity: 2, status: 'served' },
                { name: 'Ayran', quantity: 2, status: 'served' },
            ],
            total: 245,
        }
    },
    { number: 8, status: 'available' },
    {
        number: 9, status: 'bill-requested', order: {
            id: 'order-3',
            tableNumber: 9,
            guestCount: 6,
            status: 'bill-requested',
            startTime: '17:30',
            items: [
                { name: 'Karışık Izgara', quantity: 2, status: 'served' },
                { name: 'Lahmacun', quantity: 4, status: 'served' },
                { name: 'İçecekler', quantity: 6, status: 'served' },
            ],
            total: 680,
        }
    },
    { number: 10, status: 'cleaning' },
];

const STAFF_INFO = {
    name: 'Ayşe',
    title: 'Kıdemli Garson',
    section: 'Bahçe',
    assignedTables: [5, 6, 7, 8, 9, 10],
    todayTips: 420,
    todayServed: 18,
    rating: 4.9,
};

export function RestaurantStaffDashboard() {
    const [selectedTable, setSelectedTable] = useState<typeof MOCK_TABLES[0] | null>(null);
    const [tables, setTables] = useState(MOCK_TABLES);

    const getStatusConfig = (status: TableStatus) => {
        switch (status) {
            case 'available':
                return { color: 'bg-gray-500', label: 'Boş', icon: Check, bgLight: 'bg-gray-500/10', border: 'border-gray-500/30' };
            case 'ordering':
                return { color: 'bg-blue-500', label: 'Sipariş Alınıyor', icon: UtensilsCrossed, bgLight: 'bg-blue-500/10', border: 'border-blue-500/30' };
            case 'eating':
                return { color: 'bg-green-500', label: 'Yemekte', icon: Coffee, bgLight: 'bg-green-500/10', border: 'border-green-500/30' };
            case 'bill-requested':
                return { color: 'bg-orange-500', label: 'Hesap İstedi', icon: CreditCard, bgLight: 'bg-orange-500/10', border: 'border-orange-500/30', pulse: true };
            case 'cleaning':
                return { color: 'bg-purple-500', label: 'Temizleniyor', icon: Timer, bgLight: 'bg-purple-500/10', border: 'border-purple-500/30' };
        }
    };

    const getItemStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'text-gray-500';
            case 'preparing': return 'text-orange-500';
            case 'ready': return 'text-blue-500';
            case 'served': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };

    const handleCloseTable = (tableNumber: number) => {
        setTables(prev => prev.map(t =>
            t.number === tableNumber
                ? { number: t.number, status: 'cleaning' as TableStatus }
                : t
        ));
        setSelectedTable(null);
    };

    const billRequestedCount = tables.filter(t => t.status === 'bill-requested').length;

    return (
        <div className="animate-in fade-in duration-500">
            {/* Alert Banner for Bill Requests */}
            {billRequestedCount > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl flex items-center gap-4"
                >
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center animate-pulse">
                        <CreditCard size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="font-black text-orange-500">
                            {billRequestedCount} masa hesap bekliyor!
                        </p>
                        <p className="text-sm text-brand-muted">
                            Masa {tables.filter(t => t.status === 'bill-requested').map(t => t.number).join(', ')}
                        </p>
                    </div>
                    <Bell size={24} className="text-orange-500 animate-bounce" />
                </motion.div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                    icon={Users}
                    label="Aktif Masa"
                    value={tables.filter(t => t.status !== 'available' && t.status !== 'cleaning').length.toString()}
                    subtext={`/ ${STAFF_INFO.assignedTables.length} masa`}
                    color="from-blue-500 to-indigo-600"
                />
                <StatCard
                    icon={UtensilsCrossed}
                    label="Bugün Servis"
                    value={STAFF_INFO.todayServed.toString()}
                    subtext="misafir"
                    color="from-green-500 to-emerald-600"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Bahşiş"
                    value={`₺${STAFF_INFO.todayTips}`}
                    subtext="bugün"
                    color="from-purple-500 to-pink-600"
                />
                <StatCard
                    icon={Star}
                    label="Rating"
                    value={STAFF_INFO.rating.toString()}
                    subtext="puan"
                    color="from-yellow-500 to-orange-500"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Tables Grid */}
                <div className="lg:col-span-2">
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-black text-brand-text flex items-center gap-2">
                                <UtensilsCrossed size={18} className="text-orange-500" />
                                {STAFF_INFO.section} Bölümü
                            </h3>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-brand-muted">Yemekte</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                    <span className="text-brand-muted">Hesap</span>
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {tables.map((table, index) => {
                                const config = getStatusConfig(table.status);
                                const Icon = config.icon;

                                return (
                                    <motion.button
                                        key={table.number}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => table.order && setSelectedTable(table)}
                                        disabled={!table.order}
                                        className={`
                                            relative p-4 rounded-xl border-2 transition-all
                                            ${config.bgLight} ${config.border}
                                            ${table.order ? 'hover:scale-105 cursor-pointer' : 'opacity-60 cursor-default'}
                                            ${config.pulse ? 'ring-2 ring-orange-500/50 ring-offset-2 ring-offset-brand-bg' : ''}
                                        `}
                                    >
                                        {config.pulse && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-ping" />
                                        )}
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-2xl font-black text-brand-text">
                                                {table.number}
                                            </span>
                                            <Icon size={18} className={`${config.color.replace('bg-', 'text-')}`} />
                                        </div>
                                        <p className={`text-xs font-bold ${config.color.replace('bg-', 'text-')}`}>
                                            {config.label}
                                        </p>
                                        {table.order && (
                                            <div className="mt-2 pt-2 border-t border-brand-border/50">
                                                <div className="flex items-center justify-between text-[10px] text-brand-muted">
                                                    <span>{table.order.guestCount} kişi</span>
                                                    <span className="font-bold text-brand-text">₺{table.order.total}</span>
                                                </div>
                                            </div>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4">
                    {/* Quick Actions */}
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-5">
                        <h3 className="font-black text-brand-text mb-4 text-sm">Hızlı İşlemler</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                                <UtensilsCrossed size={20} className="text-blue-500" />
                                <span className="text-xs font-bold text-blue-600">Sipariş Al</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-colors">
                                <ChefHat size={20} className="text-orange-500" />
                                <span className="text-xs font-bold text-orange-600">Mutfak</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                                <CreditCard size={20} className="text-green-500" />
                                <span className="text-xs font-bold text-green-600">Hesap Kes</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                                <MessageSquare size={20} className="text-purple-500" />
                                <span className="text-xs font-bold text-purple-600">Not Ekle</span>
                            </button>
                        </div>
                    </div>

                    {/* Kitchen Orders */}
                    <div className="bg-brand-surface border border-brand-border rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <ChefHat size={16} className="text-orange-500" />
                            <h3 className="font-black text-brand-text text-sm">Mutfak Durumu</h3>
                        </div>
                        <div className="space-y-2">
                            {tables
                                .filter(t => t.order?.items.some(i => i.status === 'preparing' || i.status === 'ready'))
                                .map(table => (
                                    <div
                                        key={table.number}
                                        className="p-3 bg-brand-surface2/50 rounded-xl border border-brand-border"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold text-brand-text">Masa {table.number}</span>
                                            <span className="text-xs text-brand-muted">{table.order?.startTime}</span>
                                        </div>
                                        <div className="space-y-1">
                                            {table.order?.items
                                                .filter(i => i.status !== 'served')
                                                .map((item, idx) => (
                                                    <div key={idx} className="flex items-center justify-between text-xs">
                                                        <span className="text-brand-muted">
                                                            {item.quantity}x {item.name}
                                                        </span>
                                                        <span className={`font-bold ${getItemStatusColor(item.status)}`}>
                                                            {item.status === 'preparing' ? 'Hazırlanıyor' :
                                                                item.status === 'ready' ? 'Hazır!' :
                                                                    item.status === 'pending' ? 'Bekliyor' : ''}
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            {!tables.some(t => t.order?.items.some(i => i.status === 'preparing' || i.status === 'ready')) && (
                                <p className="text-center text-sm text-brand-muted py-4">
                                    Mutfakta bekleyen yok 🎉
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Detail Modal */}
            <AnimatePresence>
                {selectedTable && selectedTable.order && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedTable(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-brand-surface border border-brand-border rounded-2xl p-6 w-full max-w-md"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-black text-xl">
                                        {selectedTable.number}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-brand-text">Masa {selectedTable.number}</h3>
                                        <p className="text-xs text-brand-muted">{selectedTable.order.guestCount} Misafir • {selectedTable.order.startTime}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedTable(null)}
                                    className="p-2 rounded-lg hover:bg-brand-surface2 transition-colors"
                                >
                                    <X size={20} className="text-brand-muted" />
                                </button>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-2 mb-6">
                                <p className="text-xs font-bold text-brand-muted uppercase tracking-widest">Sipariş</p>
                                {selectedTable.order.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-3 bg-brand-surface2/50 rounded-xl"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-lg bg-brand-surface flex items-center justify-center text-xs font-bold text-brand-text">
                                                {item.quantity}
                                            </span>
                                            <span className="text-sm font-medium text-brand-text">{item.name}</span>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${item.status === 'served'
                                            ? 'bg-green-500/10 text-green-500'
                                            : item.status === 'ready'
                                                ? 'bg-blue-500/10 text-blue-500'
                                                : item.status === 'preparing'
                                                    ? 'bg-orange-500/10 text-orange-500'
                                                    : 'bg-gray-500/10 text-gray-500'
                                            }`}>
                                            {item.status === 'served' ? 'Servis Edildi' :
                                                item.status === 'ready' ? 'Hazır' :
                                                    item.status === 'preparing' ? 'Hazırlanıyor' : 'Bekliyor'}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="p-4 bg-brand-surface2/50 rounded-xl mb-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-brand-muted">Toplam Tutar</span>
                                    <span className="text-2xl font-black text-brand-text">₺{selectedTable.order.total}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                {selectedTable.status === 'bill-requested' ? (
                                    <button
                                        onClick={() => handleCloseTable(selectedTable.number)}
                                        className="flex-1 h-12 rounded-xl bg-green-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                                    >
                                        <CheckCircle size={18} />
                                        Hesap Kapat
                                    </button>
                                ) : (
                                    <>
                                        <button className="flex-1 h-12 rounded-xl bg-orange-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors">
                                            <UtensilsCrossed size={18} />
                                            Sipariş Ekle
                                        </button>
                                        <button className="h-12 px-6 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold flex items-center justify-center gap-2 hover:bg-brand-surface transition-colors">
                                            <CreditCard size={18} />
                                            Hesap
                                        </button>
                                    </>
                                )}
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
