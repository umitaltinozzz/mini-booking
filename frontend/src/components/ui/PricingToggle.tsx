'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface PricingToggleProps {
    period: 'monthly' | 'yearly';
    onChange: (period: 'monthly' | 'yearly') => void;
}

export function PricingToggle({ period, onChange }: PricingToggleProps) {
    const t = useTranslations('Pricing');

    return (
        <div className="flex flex-col items-center gap-4 mb-16">
            <div className="bg-brand-surface2 border border-brand-border p-1.5 rounded-2xl flex relative">
                <button
                    onClick={() => onChange('monthly')}
                    aria-pressed={period === 'monthly'}
                    className={`relative z-10 px-8 py-3 text-sm font-black transition-colors rounded-xl ${period === 'monthly' ? 'text-brand-bg shadow-sm' : 'text-brand-muted hover:text-brand-text'
                        }`}
                >
                    {t('monthly')}
                </button>
                <button
                    onClick={() => onChange('yearly')}
                    aria-pressed={period === 'yearly'}
                    className={`relative z-10 px-8 py-3 text-sm font-black transition-colors rounded-xl ${period === 'yearly' ? 'text-brand-bg shadow-sm' : 'text-brand-muted hover:text-brand-text'
                        }`}
                >
                    {t('yearly')}
                </button>

                {/* Magic Slider */}
                <div
                    className="absolute inset-y-1.5 bg-brand-accent transition-all duration-300 ease-[0.16,1,0.3,1] rounded-xl"
                    style={{
                        left: period === 'monthly' ? '6px' : '50%',
                        width: 'calc(50% - 6px)',
                    }}
                />
            </div>

            {period === 'yearly' && (
                <div className="bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full animate-in fade-in zoom-in duration-300">
                    <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">
                        {t('save')}
                    </span>
                </div>
            )}
        </div>
    );
}
