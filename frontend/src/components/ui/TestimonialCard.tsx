'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Testimonial } from '@/data/testimonials';
import { MetricPill } from './MetricPill';

interface TestimonialCardProps {
    testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
    const t = useTranslations('Testimonials');

    return (
        <div className="bg-brand-surface border border-brand-border rounded-[20px] p-8 md:p-10 flex flex-col gap-8 transition-all duration-500 hover:border-brand-accent/50 hover:shadow-2xl hover:shadow-brand-accent/5 group relative h-full">
            <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-brand-text">{testimonial.name}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/30" />
                    </div>
                    <p className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em]">
                        {t(testimonial.roleKey)}
                    </p>
                </div>
                <MetricPill
                    label={t(testimonial.metricLabelKey)}
                    value={testimonial.metricValue}
                    prefix={testimonial.metricPrefix}
                />
            </div>

            <div className="relative flex-1">
                <span className="absolute -top-6 -left-2 text-6xl font-serif text-brand-accent/10 pointer-events-none">“</span>
                <p className="text-sm md:text-base font-medium text-brand-text/90 leading-relaxed italic pr-4 relative z-10">
                    {t(testimonial.contentKey)}
                </p>
            </div>
        </div>
    );
}
