'use client';

import React from 'react';
import { useModule } from '@/providers/TenantProvider';
import { generateSlots } from '@/core/scheduling/slotEngine';
import { Calendar, Clock, MoreHorizontal } from 'lucide-react';

export function AppointmentManager() {
    const module = useModule();
    const slots = generateSlots('2025-12-19', { startHour: 9, endHour: 18, slotDuration: 30, resourceId: 'res-1' });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black tracking-tighter text-brand-text">
                    {module.labels.booking} Yönetimi
                </h2>
                <div className="flex gap-2">
                    <button className="h-10 px-4 rounded-xl border border-brand-border bg-brand-surface font-bold text-xs flex items-center gap-2">
                        <Calendar size={14} /> Bugün
                    </button>
                    <button className="h-10 px-4 rounded-xl bg-brand-accent text-brand-bg font-black uppercase tracking-widest text-[10px]">
                        YENİ {module.labels.booking.toUpperCase()}
                    </button>
                </div>
            </div>

            <div className="bg-brand-surface border border-brand-border rounded-[32px] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-brand-surface2/50 border-b border-brand-border">
                            {module.appointmentsConfig?.columns.map(col => (
                                <th key={col} className="px-6 py-4 text-[10px] font-black text-brand-muted uppercase tracking-widest">{col}</th>
                            ))}
                            <th className="px-6 py-4 w-10"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {slots.slice(0, 8).map((slot) => (
                            <tr key={slot.id} className="border-b border-brand-border/50 hover:bg-brand-accent/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 font-bold text-brand-text">
                                        <Clock size={14} className="text-brand-accent" />
                                        {new Date(slot.startTime).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-brand-text">
                                    {slot.isAvailable ? '-' : 'John Doe'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full bg-brand-surface2 text-[10px] font-black text-brand-muted uppercase tracking-widest">
                                        {slot.resourceId}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {slot.isAvailable ? (
                                        <span className="text-brand-accent text-xs font-bold uppercase tracking-widest">MÜSAİT</span>
                                    ) : (
                                        <span className="text-brand-muted text-xs font-bold">Standard Paket</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`w-2 h-2 rounded-full ${slot.isAvailable ? 'bg-brand-muted/20' : 'bg-status-booked'}`} />
                                </td>
                                <td className="px-6 py-4">
                                    <button className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
