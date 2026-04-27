'use client';

import React from 'react';
import { Slot } from '@/data/demoData';

interface KpiRowProps {
    slots: Slot[];
}

export function KpiRow({ slots }: KpiRowProps) {
    const totalSlots = slots.length;
    const bookedSlots = slots.filter(s => s.status === 'BOOKED').length;
    const occupancy = totalSlots > 0 ? Math.round((bookedSlots / totalSlots) * 100) : 0;
    const cancelled = slots.filter(s => s.status === 'CANCELLED').length;

    const kpis = [
        { label: 'Bugün Randevu', value: bookedSlots, unit: 'adet', color: 'text-brand-accent' },
        { label: 'Doluluk Oranı', value: occupancy, unit: '%', color: 'text-brand-status-booked' },
        { label: 'İptal Edilen', value: cancelled, unit: 'adet', color: 'text-brand-status-cancelled' },
        { label: 'Ort. Süre', value: '45', unit: 'dk', color: 'text-brand-text' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {kpis.map((kpi, i) => (
                <div key={i} className="bg-brand-surface2 border border-brand-border p-5 rounded-2xl flex flex-col gap-2 group hover:border-brand-accent/30 transition-all">
                    <span className="text-[10px] font-black text-brand-muted uppercase tracking-wider">{kpi.label}</span>
                    <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</span>
                        <span className="text-xs text-brand-muted font-bold">{kpi.unit}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
