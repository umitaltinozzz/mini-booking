'use client';

import React from 'react';

export function ChairLoadWidget() {
    const loads = [
        { label: '09:00', value: 20 },
        { label: '11:00', value: 65 },
        { label: '13:00', value: 90 },
        { label: '15:00', value: 80 },
        { label: '17:00', value: 45 },
        { label: '19:00', value: 30 },
    ];

    return (
        <div className="bg-brand-surface border border-brand-border rounded-[32px] p-8 space-y-8">
            <div>
                <h3 className="text-xl font-black tracking-tighter text-brand-text">Yoğunluk Tahmini</h3>
                <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mt-1">Saatlik Beklenti</p>
            </div>

            <div className="flex items-end justify-between h-40 gap-2">
                {loads.map((item) => (
                    <div key={item.label} className="flex-1 flex flex-col items-center gap-3 group">
                        <div className="relative w-full flex flex-col justify-end h-full bg-brand-surface2/50 rounded-xl overflow-hidden">
                            <div
                                className="w-full bg-brand-accent/30 group-hover:bg-brand-accent/50 transition-all"
                                style={{ height: `${item.value}%` }}
                            />
                        </div>
                        <span className="text-[10px] font-black text-brand-muted tracking-widest">{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="p-4 rounded-2xl bg-brand-accent/5 border border-brand-accent/10">
                <p className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-1">Akıllı Öneri</p>
                <p className="text-xs font-medium text-brand-text leading-relaxed">
                    13:00 - 16:00 arası için ek personel desteği gerekebilir.
                </p>
            </div>
        </div>
    );
}
