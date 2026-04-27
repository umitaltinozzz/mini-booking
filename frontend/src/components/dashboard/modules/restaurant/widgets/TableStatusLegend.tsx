import React from 'react';

export function TableStatusLegend() {
    const statuses = [
        { label: 'Müsait', color: 'bg-brand-surface border-brand-border' },
        { label: 'Dolu / Seçili', color: 'bg-status-booked/20 border-status-booked' },
        { label: 'Rezervasyonlu', color: 'bg-status-warning/20 border-status-warning' },
    ];

    return (
        <div className="flex flex-wrap gap-6">
            {statuses.map(s => (
                <div key={s.label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-md border ${s.color}`} />
                    <span className="text-[10px] font-black text-brand-muted uppercase tracking-widest">{s.label}</span>
                </div>
            ))}
        </div>
    );
}
