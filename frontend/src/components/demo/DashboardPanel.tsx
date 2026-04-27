'use client';

import React from 'react';
import { FilterBar } from './FilterBar';
import { KpiRow } from './KpiRow';
import { UpcomingList } from './UpcomingList';
import { Slot } from '@/data/demoData';

interface DashboardPanelProps {
    filters: any;
    setFilters: (f: any) => void;
    visibleSlots: Slot[];
    selectedId: string | null;
    onSelect: (id: string | null) => void;
    locale: string;
}

export function DashboardPanel({
    filters,
    setFilters,
    visibleSlots,
    selectedId,
    onSelect,
    locale
}: DashboardPanelProps) {
    return (
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar pr-2">
            <FilterBar filters={filters} setFilters={setFilters} />
            <KpiRow slots={visibleSlots} />
            <UpcomingList
                slots={visibleSlots}
                selectedId={selectedId}
                onSelect={onSelect}
                locale={locale}
            />

            <div className="mt-12 pt-8 border-t border-brand-border">
                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.3em]">
                    Sistem Bilgisi
                </p>
                <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-medium">
                        <span className="text-brand-muted">Müsaitlik Motoru</span>
                        <span className="text-brand-accent">AKTİF</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-medium">
                        <span className="text-brand-muted">Çakışma Kontrolü</span>
                        <span className="text-brand-status-booked">DRS_v4_ACTIVE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
