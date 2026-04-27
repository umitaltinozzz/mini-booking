'use client';

import React from 'react';

interface MetricPillProps {
    label: string;
    value: string;
    prefix: '-' | '+';
}

export function MetricPill({ label, value, prefix }: MetricPillProps) {
    return (
        <div className="flex flex-col items-end gap-1 px-3 py-2 rounded-xl bg-brand-surface2 border border-brand-border group-hover:border-brand-accent/30 transition-colors">
            <span className="text-[10px] font-black text-brand-muted uppercase tracking-widest leading-none mb-1">{label}</span>
            <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-brand-text">
                    {prefix}{value}%
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(163,230,53,0.5)]" />
            </div>
        </div>
    );
}
