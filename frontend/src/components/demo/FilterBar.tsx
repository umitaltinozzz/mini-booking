'use client';

import React from 'react';
import { BRANCHES, STAFF } from '@/data/demoData';

interface FilterBarProps {
    filters: {
        branchId: string;
        staffId: string;
        date: string;
    };
    setFilters: (filters: any) => void;
}

export function FilterBar({ filters, setFilters }: FilterBarProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-black text-brand-muted uppercase tracking-widest pl-1">Şube</label>
                <select
                    value={filters.branchId}
                    onChange={(e) => setFilters({ ...filters, branchId: e.target.value })}
                    className="w-full h-12 bg-brand-surface border border-brand-border rounded-xl px-4 text-sm font-bold text-brand-text appearance-none outline-none focus:border-brand-accent transition-colors"
                >
                    <option value="all">Tüm Şubeler</option>
                    {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-black text-brand-muted uppercase tracking-widest pl-1">Personel</label>
                <select
                    value={filters.staffId}
                    onChange={(e) => setFilters({ ...filters, staffId: e.target.value })}
                    className="w-full h-12 bg-brand-surface border border-brand-border rounded-xl px-4 text-sm font-bold text-brand-text appearance-none outline-none focus:border-brand-accent transition-colors"
                >
                    <option value="all">Tüm Personeller</option>
                    {STAFF.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-black text-brand-muted uppercase tracking-widest pl-1">Tarih</label>
                <input
                    type="date"
                    value={filters.date}
                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    className="w-full h-12 bg-brand-surface border border-brand-border rounded-xl px-4 text-sm font-bold text-brand-text outline-none focus:border-brand-accent transition-colors"
                />
            </div>
        </div>
    );
}
