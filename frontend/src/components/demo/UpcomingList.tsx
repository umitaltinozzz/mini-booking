'use client';

import React from 'react';
import { Slot, STAFF } from '@/data/demoData';
import { statusLabel } from '@/constants/status';

interface UpcomingListProps {
    slots: Slot[];
    selectedId: string | null;
    onSelect: (id: string | null) => void;
    locale: string;
}

export function UpcomingList({ slots, selectedId, onSelect, locale }: UpcomingListProps) {
    const upcoming = slots
        .filter(s => s.status === 'BOOKED')
        .slice(0, 5);

    return (
        <div className="space-y-4">
            <h3 className="text-xs font-black text-brand-muted uppercase tracking-[0.2em] px-1">Yaklaşan 5 Randevu</h3>
            <div className="space-y-2">
                {upcoming.map((slot) => {
                    const staffName = STAFF.find(s => s.id === slot.staffId)?.name || 'Bilinmiyor';
                    const isSelected = selectedId === slot.id;

                    return (
                        <button
                            key={slot.id}
                            onClick={() => onSelect(slot.id)}
                            className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all group ${isSelected
                                    ? 'bg-brand-accent/5 border-brand-accent shadow-lg shadow-brand-accent/5'
                                    : 'bg-brand-surface border-brand-border hover:border-brand-accent/30'
                                }`}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-brand-text group-hover:text-brand-accent transition-colors">
                                    {slot.customerName || 'İsimsiz Müşteri'}
                                </span>
                                <span className="text-[10px] text-brand-muted font-bold uppercase">
                                    {slot.time} - {staffName}
                                </span>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-brand-status-booked/10 text-[9px] font-black text-brand-status-booked border border-brand-status-booked/20">
                                {statusLabel(slot.status, locale)}
                            </div>
                        </button>
                    );
                })}
                {upcoming.length === 0 && (
                    <div className="py-8 text-center border-2 border-dashed border-brand-border rounded-2xl text-brand-muted text-xs font-medium uppercase tracking-widest">
                        Kayıtlı randevu bulunamadı
                    </div>
                )}
            </div>
        </div>
    );
}
