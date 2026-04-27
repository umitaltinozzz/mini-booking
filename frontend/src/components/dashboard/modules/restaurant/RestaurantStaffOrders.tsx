'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UtensilsCrossed, Clock, Users, CreditCard, ChefHat,
    Check, X, AlertCircle, Coffee
} from 'lucide-react';

type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served';

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    status: OrderStatus;
    price: number;
}

interface Order {
    id: string;
    tableNumber: number;
    items: OrderItem[];
    totalAmount: number;
    createdAt: string;
    status: 'active' | 'completed';
}

const MOCK_ORDERS: Order[] = [
    {
        id: 'ord-1',
        tableNumber: 6,
        items: [
            { id: 'i1', name: 'Margherita Pizza', quantity: 2, status: 'preparing', price: 180 },
            { id: 'i2', name: 'Pasta Carbonara', quantity: 1, status: 'ready', price: 140 },
            { id: 'i3', name: 'Tiramisu', quantity: 2, status: 'pending', price: 100 },
        ],
        totalAmount: 420,
        createdAt: '19:30',
        status: 'active',
    },
    {
        id: 'ord-2',
        tableNumber: 7,
        items: [
            { id: 'i4', name: 'Köfte', quantity: 2, status: 'served', price: 120 },
            { id: 'i5', name: 'Pilav', quantity: 2, status: 'served', price: 60 },
            { id: 'i6', name: 'Ayran', quantity: 2, status: 'served', price: 30 },
        ],
        totalAmount: 245,
        createdAt: '18:45',
        status: 'active',
    },
    {
        id: 'ord-3',
        tableNumber: 9,
        items: [
            { id: 'i7', name: 'Karışık Izgara', quantity: 2, status: 'served', price: 340 },
            { id: 'i8', name: 'Lahmacun', quantity: 4, status: 'served', price: 200 },
            { id: 'i9', name: 'İçecekler', quantity: 6, status: 'served', price: 140 },
        ],
        totalAmount: 680,
        createdAt: '17:30',
        status: 'active',
    },
];

export function RestaurantStaffOrders() {
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const getStatusConfig = (status: OrderStatus) => {
        switch (status) {
            case 'pending':
                return { color: 'text-gray-500', bg: 'bg-gray-500/10', label: 'Bekliyor' };
            case 'preparing':
                return { color: 'text-orange-500', bg: 'bg-orange-500/10', label: 'Hazırlanıyor' };
            case 'ready':
                return { color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Hazır!' };
            case 'served':
                return { color: 'text-green-500', bg: 'bg-green-500/10', label: 'Servis Edildi' };
        }
    };

    const pendingItems = orders.flatMap(o => o.items.filter(i => i.status === 'ready'));
    const preparingCount = orders.flatMap(o => o.items.filter(i => i.status === 'preparing')).length;

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-brand-text">Siparişler</h1>
                    <p className="text-sm text-brand-muted mt-1">Aktif masa siparişlerini takip edin</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                        <ChefHat size={18} className="text-orange-500" />
                        <span className="text-sm font-bold text-orange-500">{preparingCount} Hazırlanıyor</span>
                    </div>
                    {pendingItems.length > 0 && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-xl animate-pulse">
                            <AlertCircle size={18} className="text-blue-500" />
                            <span className="text-sm font-bold text-blue-500">{pendingItems.length} Hazır!</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Orders Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map((order, index) => (
                    <motion.button
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedOrder(order)}
                        className="bg-brand-surface border border-brand-border rounded-2xl p-5 text-left hover:border-orange-500/50 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-black text-lg">
                                    {order.tableNumber}
                                </div>
                                <div>
                                    <p className="font-black text-brand-text">Masa {order.tableNumber}</p>
                                    <p className="text-xs text-brand-muted">{order.createdAt}'de açıldı</p>
                                </div>
                            </div>
                            <span className="text-lg font-black text-brand-text">₺{order.totalAmount}</span>
                        </div>

                        <div className="space-y-2">
                            {order.items.map(item => {
                                const config = getStatusConfig(item.status);
                                return (
                                    <div
                                        key={item.id}
                                        className={`flex items-center justify-between p-2 rounded-lg ${config.bg}`}
                                    >
                                        <span className="text-sm text-brand-text">
                                            {item.quantity}x {item.name}
                                        </span>
                                        <span className={`text-xs font-bold ${config.color}`}>
                                            {config.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Order Detail Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedOrder(null)}
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
                                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-black text-xl">
                                        {selectedOrder.tableNumber}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-brand-text text-lg">Masa {selectedOrder.tableNumber}</h3>
                                        <p className="text-xs text-brand-muted">{selectedOrder.createdAt}'de açıldı</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-2 hover:bg-brand-surface2 rounded-lg transition-colors"
                                >
                                    <X size={20} className="text-brand-muted" />
                                </button>
                            </div>

                            <div className="space-y-2 mb-6">
                                {selectedOrder.items.map(item => {
                                    const config = getStatusConfig(item.status);
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-3 bg-brand-surface2/50 rounded-xl"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-lg bg-brand-surface flex items-center justify-center text-sm font-bold text-brand-text">
                                                    {item.quantity}
                                                </span>
                                                <div>
                                                    <p className="font-bold text-brand-text">{item.name}</p>
                                                    <p className="text-xs text-brand-muted">₺{item.price}</p>
                                                </div>
                                            </div>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-lg ${config.bg} ${config.color}`}>
                                                {config.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="p-4 bg-brand-surface2/50 rounded-xl mb-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-brand-muted">Toplam Tutar</span>
                                    <span className="text-2xl font-black text-brand-text">₺{selectedOrder.totalAmount}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 h-12 rounded-xl bg-orange-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors">
                                    <UtensilsCrossed size={18} />
                                    Sipariş Ekle
                                </button>
                                <button className="h-12 px-6 rounded-xl bg-green-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
                                    <CreditCard size={18} />
                                    Hesap
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
