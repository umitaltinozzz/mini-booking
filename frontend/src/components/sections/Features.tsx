'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FEATURES } from '@/data/features';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Features() {
    const t = useTranslations('Features');
    const isReducedMotion = useReducedMotion();

    return (
        <section id="ozellikler" className="bg-brand-bg py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
            {/* Brutal Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* Header */}
                <div className="mb-20 md:mb-32">
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                        <span className="block text-brand-text">
                            DAHA AZ EFOR
                        </span>
                        <span className="block text-brand-accent drop-shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                            DAHA ÇOK İŞ
                        </span>
                    </h2>
                    <div className="h-1 w-full bg-brand-accent mt-8 rounded-full shadow-lg shadow-brand-accent/30" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((feature, index) => (
                        <FeatureCard key={feature.id} feature={feature} index={index + 1} />
                    ))}
                </div>

            </div>
        </section>
    );
}
