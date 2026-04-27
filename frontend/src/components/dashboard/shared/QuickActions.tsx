'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Users, Settings, BarChart3, Scissors, Armchair, UtensilsCrossed, Grid3X3 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTenant } from '@/providers/TenantProvider';

interface QuickAction {
    label: string;
    description: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    href?: string;
    onClick?: () => void;
}

// Restaurant Quick Actions
export function RestaurantQuickActions({ onNewReservation }: { onNewReservation?: () => void }) {
    const { tenant } = useTenant();

    const actions: QuickAction[] = [
        { label: 'Yeni Rezervasyon', description: 'Manuel rezervasyon oluştur', icon: Plus, color: 'from-green-500 to-emerald-500', onClick: onNewReservation },
        { label: 'Masa Düzeni', description: 'Kat planını düzenle', icon: Grid3X3, color: 'from-blue-500 to-cyan-500', href: `/${tenant.slug}/services` },
        { label: 'Menü Yönetimi', description: 'Menü ve fiyatları güncelle', icon: UtensilsCrossed, color: 'from-purple-500 to-pink-500', href: `/${tenant.slug}/services` },
        { label: 'Raporlar', description: 'Doluluk ve gelir analizi', icon: BarChart3, color: 'from-orange-500 to-amber-500', href: `/${tenant.slug}/appointments` },
    ];

    return (
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <h3 className="text-lg font-black text-brand-text tracking-tight mb-4">Hızlı İşlemler</h3>
            <div className="grid grid-cols-2 gap-3">
                {actions.map((action, index) => {
                    const content = (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-4 rounded-xl bg-brand-surface2/30 border border-brand-border hover:bg-brand-surface2 hover:border-brand-text/10 transition-all text-left group cursor-pointer"
                        >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                                <action.icon size={18} className="text-white" />
                            </div>
                            <p className="font-bold text-brand-text text-sm">{action.label}</p>
                            <p className="text-[10px] text-brand-muted mt-0.5">{action.description}</p>
                        </motion.div>
                    );

                    if (action.href) {
                        return (
                            <Link key={action.label} href={action.href}>
                                {content}
                            </Link>
                        );
                    }

                    return (
                        <button key={action.label} onClick={action.onClick} className="w-full">
                            {content}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// Barber Quick Actions
export function BarberQuickActions({ onNewAppointment }: { onNewAppointment?: () => void }) {
    const { tenant } = useTenant();

    const actions: QuickAction[] = [
        { label: 'Yeni Randevu', description: 'Manuel randevu oluştur', icon: Plus, color: 'from-green-500 to-emerald-500', onClick: onNewAppointment },
        { label: 'Personel Takvimi', description: 'Vardiya ve izinler', icon: Calendar, color: 'from-blue-500 to-cyan-500', href: `/${tenant.slug}/staff` },
        { label: 'Hizmetler', description: 'Hizmet ve fiyat yönetimi', icon: Scissors, color: 'from-purple-500 to-pink-500', href: `/${tenant.slug}/services` },
        { label: 'Koltuk Ayarları', description: 'Koltuk atamalarını düzenle', icon: Armchair, color: 'from-orange-500 to-amber-500', href: `/${tenant.slug}/staff` },
    ];

    return (
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <h3 className="text-lg font-black text-brand-text tracking-tight mb-4">Hızlı İşlemler</h3>
            <div className="grid grid-cols-2 gap-3">
                {actions.map((action, index) => {
                    const content = (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-4 rounded-xl bg-brand-surface2/30 border border-brand-border hover:bg-brand-surface2 hover:border-brand-text/10 transition-all text-left group cursor-pointer"
                        >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                                <action.icon size={18} className="text-white" />
                            </div>
                            <p className="font-bold text-brand-text text-sm">{action.label}</p>
                            <p className="text-[10px] text-brand-muted mt-0.5">{action.description}</p>
                        </motion.div>
                    );

                    if (action.href) {
                        return (
                            <Link key={action.label} href={action.href}>
                                {content}
                            </Link>
                        );
                    }

                    return (
                        <button key={action.label} onClick={action.onClick} className="w-full">
                            {content}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
