'use client';

import { motion } from 'framer-motion';
import { METRICS } from '@/data/metrics';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';
import { useTranslations } from 'next-intl';

const BRANDS = [
    { name: 'ZENITH', logo: 'Z' },
    { name: 'APEX', logo: 'A' },
    { name: 'FLOW', logo: 'F' },
    { name: 'PULSE', logo: 'P' },
    { name: 'NEXUS', logo: 'N' },
    { name: 'CORE', logo: 'C' },
    { name: 'GLOW', logo: 'G' },
    { name: 'VELOCITY', logo: 'V' },
];

export function SocialProof() {
    const t = useTranslations('SocialProof');
    const isReducedMotion = useReducedMotionPref();

    // Double the brands for infinite marquee
    const marqueeBrands = [...BRANDS, ...BRANDS];

    return (
        <section className="bg-brand-bg py-16 md:py-24 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-border to-transparent opacity-30" />

            <motion.div
                initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
            >
                <div className="text-center mb-12">
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em] mb-4">{t('label')}</p>
                </div>

                {/* Infinite Marquee Container */}
                <div className="relative mb-20 md:mb-28">
                    <div className="flex overflow-hidden">
                        <motion.div
                            className="flex items-center gap-16 md:gap-24 whitespace-nowrap"
                            animate={isReducedMotion ? {} : { x: [0, -1000] }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 25,
                                    ease: "linear",
                                },
                            }}
                        >
                            {marqueeBrands.map((brand, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 group cursor-default"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-surface2 to-brand-surface border border-brand-border flex items-center justify-center text-brand-text font-black text-xl group-hover:border-brand-accent group-hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] transition-all duration-500">
                                        {brand.logo}
                                    </div>
                                    <span className="text-lg font-black tracking-tighter text-brand-muted group-hover:text-brand-text transition-colors duration-300">
                                        {brand.name}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Side Gradients for Smooth In/Out */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-bg to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-bg to-transparent z-10" />
                </div>

                {/* Premium Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="relative group p-8 rounded-[32px] bg-brand-surface/50 border border-brand-border hover:border-brand-accent/30 transition-all duration-500 h-full">
                            {/* Highlight Corner */}
                            <div className="absolute -top-px -left-px w-8 h-8 rounded-tl-[32px] border-t-2 border-l-2 border-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-surface2 border border-brand-border flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-[#06080C] transition-all duration-500">
                                        <span className="font-bold">0{num}</span>
                                    </div>
                                </div>
                                <h4 className="text-xl font-black text-brand-text leading-tight group-hover:text-brand-accent transition-colors duration-500">
                                    {t(`metrics.metric${num}_label`)}
                                </h4>
                                <p className="text-sm text-brand-muted leading-relaxed font-medium">
                                    {t(`metrics.metric${num}_desc`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
