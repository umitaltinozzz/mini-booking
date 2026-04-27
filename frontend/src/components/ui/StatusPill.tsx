'use client';

import React from 'react';
import { IntegrationStatus } from '@/data/integrations';
import { useTranslations } from 'next-intl';

interface StatusPillProps {
    status: IntegrationStatus;
}

export function StatusPill({ status }: StatusPillProps) {
    const t = useTranslations('Integrations');

    if (status === 'NOW') {
        return (
            <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-accent"></span>
                </span>
                <span className="text-[10px] font-black text-brand-accent uppercase tracking-tighter">
                    {t('status_now')}
                </span>
            </div>
        );
    }

    return (
        <div className="px-2 py-0.5 rounded-full border border-dashed border-brand-border bg-brand-bg">
            <span className="text-[9px] font-bold text-brand-muted uppercase tracking-tighter">
                {t('status_soon')}
            </span>
        </div>
    );
}
