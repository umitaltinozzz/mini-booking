'use client';

import React from 'react';
import { IntegrationGroup } from '@/data/integrations';
import { useTranslations } from 'next-intl';
import { StatusPill } from './StatusPill';

interface IntegrationCardProps {
    group: IntegrationGroup;
}

export function IntegrationCard({ group }: IntegrationCardProps) {
    const t = useTranslations('Integrations');

    return (
        <div className="relative overflow-hidden bg-brand-surface/50 backdrop-blur-sm border border-brand-border/50 rounded-[32px] p-8 flex flex-col gap-8 transition-all duration-500 group hover:border-brand-accent/30 hover:shadow-2xl hover:shadow-brand-accent/5">
            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 space-y-4">
                <h3 className="text-xl md:text-2xl font-black text-brand-text group-hover:text-brand-accent transition-colors">
                    {t(group.titleKey)}
                </h3>
                <p className="text-sm text-brand-muted font-medium leading-relaxed">
                    {t(group.descKey)}
                </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-3 mt-auto">
                {group.items.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 bg-brand-surface border border-brand-border px-4 py-3 rounded-2xl group/item hover:border-brand-accent/40 hover:bg-brand-surface2 transition-all duration-300"
                    >
                        {item.icon && (
                            <div className="w-6 h-6 flex-shrink-0 rounded-md overflow-hidden">
                                <item.icon className="w-full h-full object-contain" />
                            </div>
                        )}
                        <span className="text-sm font-bold text-brand-text/90">{item.name}</span>
                        <StatusPill status={item.status} />
                    </div>
                ))}
            </div>
        </div>
    );
}
