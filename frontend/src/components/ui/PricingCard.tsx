'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { PricingPlan } from '@/data/pricing';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

interface PricingCardProps {
    plan: PricingPlan;
    period: 'monthly' | 'yearly';
}

export function PricingCard({ plan, period }: PricingCardProps) {
    const t = useTranslations('Pricing');
    const price = period === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const unit = period === 'monthly' ? '/ay' : '/yıl';

    return (
        <div
            className={`relative bg-brand-surface border rounded-[32px] p-8 md:p-10 flex flex-col gap-10 transition-all duration-500 hover:shadow-2xl group ${plan.isPopular
                ? 'border-brand-accent shadow-2xl shadow-brand-accent/5 z-10'
                : 'border-brand-border'
                }`}
        >
            {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent px-4 py-1 rounded-full border border-brand-accent shadow-lg animate-pulse">
                    <span className="text-[10px] font-black text-[#06080C] uppercase tracking-widest leading-none">
                        {t('popular')}
                    </span>
                </div>
            )}

            <div className="space-y-6">
                <div>
                    <h3 className="text-2xl font-black text-brand-text mb-2 group-hover:text-brand-accent transition-colors">
                        {t(plan.nameKey)}
                    </h3>
                    <p className="text-sm text-brand-muted font-medium leading-relaxed">
                        {t(plan.descKey)}
                    </p>
                </div>

                <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-brand-text tracking-tight">{price}</span>
                    <span className="text-base text-brand-muted font-bold tracking-tight">{unit}</span>
                </div>
            </div>

            <ul className="space-y-4 flex-1">
                {plan.features.map((featureKey, i) => (
                    <li key={i} className="flex items-start gap-4">
                        <div className={`mt-1 h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${plan.isPopular ? 'bg-brand-accent/20 text-brand-accent' : 'bg-brand-surface2 text-brand-muted'}`}>
                            <Check size={10} strokeWidth={4} />
                        </div>
                        <span className="text-[13px] font-bold text-brand-text/90 tracking-tight leading-tight">
                            {t(featureKey)}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="pt-4">
                <Button
                    variant={plan.isPopular ? 'primary' : 'outline'}
                    className={`w-full h-16 rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] transition-all ${plan.isPopular
                        ? 'bg-gradient-to-r from-brand-accent to-brand-accent2 text-brand-bg shadow-lg shadow-brand-accent/20'
                        : 'border-brand-border hover:bg-brand-surface2 text-brand-text'
                        }`}
                    onClick={() => window.location.href = plan.id === 'pro' ? '#demo' : '#contact'}
                >
                    {t(plan.ctaKey)}
                </Button>
            </div>
        </div>
    );
}
