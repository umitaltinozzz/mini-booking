'use client';

import React from 'react';

export function MiniTenantTable() {
    const rows = [
        { tenant: 'Salon A', scope: 'OK' },
        { tenant: 'Clinic B', scope: 'OK' },
    ];

    return (
        <div className="w-full bg-brand-bg rounded-xl border border-brand-border p-2 space-y-2 overflow-hidden">
            <div className="flex justify-between border-b border-brand-border pb-1">
                <span className="text-[7px] font-bold text-brand-muted uppercase">Tenant</span>
                <span className="text-[7px] font-bold text-brand-muted uppercase">Scope</span>
            </div>
            {rows.map((row, i) => (
                <div key={i} className="flex justify-between items-center bg-brand-surface2/50 p-1 rounded">
                    <span className="text-[8px] font-medium text-brand-text">{row.tenant}</span>
                    <span className="text-[8px] font-bold text-brand-accent">{row.scope}</span>
                </div>
            ))}
        </div>
    );
}

export function MiniRBACList() {
    const items = [
        { role: 'Owner', access: true },
        { role: 'Staff', access: true },
        { role: 'Guest', access: false },
    ];

    return (
        <div className="w-full bg-brand-bg rounded-xl border border-brand-border p-3 space-y-2 overflow-hidden">
            {items.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-brand-text tracking-tight">{item.role}</span>
                    <div className={`w-3 h-3 rounded-full flex items-center justify-center ${item.access ? 'bg-brand-accent/20 text-brand-accent' : 'bg-brand-muted/20 text-brand-muted'}`}>
                        <span className="text-[8px]">{item.access ? '✓' : '×'}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function MiniSlotGrid() {
    return (
        <div className="w-full bg-brand-bg rounded-xl border border-brand-border p-2 space-y-2 overflow-hidden">
            <div className="grid grid-cols-4 gap-1">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className={`h-4 rounded border transition-colors ${i % 3 === 0 ? 'border-brand-accent/40 bg-brand-accent/10' : 'border-brand-border bg-brand-surface2'}`} />
                ))}
            </div>
            <div className="h-1.5 w-full bg-brand-accent/10 rounded-full" />
        </div>
    );
}

export function MiniLockPreview() {
    return (
        <div className="w-full bg-brand-bg rounded-xl border border-brand-border p-3 space-y-3 overflow-hidden relative">
            <div className="flex items-center justify-between">
                <div className="px-2 py-0.5 rounded-full bg-brand-status-booked/10 text-brand-status-booked text-[8px] font-black border border-brand-status-booked/20">
                    LOCKED
                </div>
                <span className="text-[8px] text-brand-status-booked font-bold">409 ERR</span>
            </div>
            <div className="h-2 w-full bg-brand-surface2 rounded" />
            <div className="h-2 w-2/3 bg-brand-surface2 rounded opacity-50" />
        </div>
    );
}

export function MiniTimeOffRow() {
    return (
        <div className="w-full bg-brand-bg rounded-xl border border-brand-border p-3 space-y-2 overflow-hidden">
            <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`flex-1 h-8 rounded border flex flex-col items-center justify-center ${i === 2 || i === 3 ? 'bg-brand-status-booked/5 border-brand-status-booked/20' : 'bg-brand-surface2 border-brand-border'}`}>
                        <div className="h-1 w-2 bg-brand-muted/20 rounded mb-1" />
                        {(i === 2 || i === 3) && <span className="text-[6px] font-black text-brand-status-booked">OFF</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function MiniNotificationToggles() {
    return (
        <div className="w-full bg-brand-bg rounded-xl border border-brand-border p-3 space-y-3 overflow-hidden">
            {['Email', 'SMS', 'WhatsApp'].map((ch) => (
                <div key={ch} className="flex items-center justify-between">
                    <span className="text-[8px] font-bold text-brand-muted uppercase">{ch}</span>
                    <div className="w-6 h-3 rounded-full bg-brand-accent/20 relative">
                        <div className="absolute right-0.5 top-0.5 w-2 h-2 rounded-full bg-brand-accent" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function MiniAuditLog() {
    return (
        <div className="w-full bg-brand-bg rounded-xl border border-brand-border p-2 space-y-2 overflow-hidden font-mono">
            <div className="text-[7px] text-brand-muted border-b border-brand-border pb-1">LAST ACTIONS: </div>
            <div className="space-y-1">
                <div className="flex justify-between text-[7px]">
                    <span className="text-brand-accent">12:04</span>
                    <span className="text-brand-text">RULE_UPDATED</span>
                </div>
                <div className="flex justify-between text-[7px]">
                    <span className="text-brand-accent">11:58</span>
                    <span className="text-brand-text">SLOT_GEN_OK</span>
                </div>
                <div className="flex justify-between text-[7px]">
                    <span className="text-brand-accent">11:20</span>
                    <span className="text-brand-text">USER_LG__IN</span>
                </div>
            </div>
        </div>
    );
}

export function MiniKPIBars() {
    return (
        <div className="w-full bg-brand-bg rounded-xl border border-brand-border p-3 space-y-4 overflow-hidden">
            <div className="flex gap-2">
                <div className="flex-1 bg-brand-surface2 rounded-lg p-1.5 border border-brand-border">
                    <div className="h-1 w-4 bg-brand-accent mb-1" />
                    <div className="h-2 w-full bg-brand-text/5 rounded" />
                </div>
                <div className="flex-1 bg-brand-surface2 rounded-lg p-1.5 border border-brand-border">
                    <div className="h-1 w-4 bg-brand-status-booked mb-1" />
                    <div className="h-2 w-full bg-brand-text/5 rounded" />
                </div>
            </div>
            <div className="flex items-end gap-1 h-12">
                {[4, 7, 3, 9, 5, 8, 6].map((h, i) => (
                    <div key={i} className="flex-1 bg-brand-accent/20 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                ))}
            </div>
        </div>
    );
}

export function MiniAIPrompt() {
    return (
        <div className="w-full bg-brand-bg rounded-xl border border-brand-border p-3 space-y-3 overflow-hidden font-mono">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <div className="space-y-2">
                <div className="flex gap-2 text-[8px] text-brand-muted">
                    <span className="text-brand-accent">{'>'}</span>
                    <span>optimize schedule</span>
                </div>
                <div className="flex gap-2 text-[8px] text-brand-text">
                    <span className="text-brand-accent">{'<'}</span>
                    <span>Analyzing booking patterns...</span>
                </div>
                <div className="flex gap-2 text-[8px] text-brand-text">
                    <span className="text-brand-accent">{'<'}</span>
                    <span className="text-brand-accent">Suggested:</span>
                    <span>Add 15m buffer on Tuesdays.</span>
                </div>
            </div>
            <div className="h-1 w-2 bg-brand-accent animate-pulse" />
        </div>
    );
}
