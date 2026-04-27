'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function SectorSwitcherDev() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const switchSector = (sector: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('sector', sector);
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="fixed bottom-6 right-6 p-1 bg-brand-surface border border-brand-border rounded-2xl shadow-2xl flex gap-1 z-50">
            <button
                onClick={() => switchSector('barber')}
                className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-brand-surface2 hover:bg-brand-accent hover:text-brand-bg transition-all"
            >
                Barber
            </button>
            <button
                onClick={() => switchSector('restaurant')}
                className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-brand-surface2 hover:bg-brand-accent hover:text-brand-bg transition-all"
            >
                Restoran
            </button>
        </div>
    );
}
