'use client';

import React from 'react';
import { ChecklistItem } from './ChecklistItem';
import { useTranslations } from 'next-intl';
import { CHECKLIST_ITEMS } from '@/data/security';

export function ChecklistCard() {
    const t = useTranslations('Security');

    return (
        <div className="bg-brand-surface border border-brand-border rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            {/* Decorative Gradient Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-brand-accent/10 transition-colors" />

            <div className="relative z-10 space-y-8">
                <h3 className="text-xl font-black text-brand-text flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-brand-accent" />
                    {t('checklist_title')}
                </h3>

                <div className="grid grid-cols-1 gap-y-4">
                    {CHECKLIST_ITEMS.map((itemKey) => (
                        <ChecklistItem key={itemKey} label={t(itemKey)} />
                    ))}
                </div>

                <div className="pt-4 opacity-40">
                    <div className="h-[1px] w-full bg-brand-border" />
                    <div className="mt-4 flex justify-between text-[10px] font-mono tracking-widest text-brand-muted">
                        <span>SEC_PROTO_v4</span>
                        <span>LOCKED</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
