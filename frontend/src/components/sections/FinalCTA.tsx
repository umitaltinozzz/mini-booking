'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export function FinalCTA() {
    const t = useTranslations('FinalCTA');

    return (
        <section className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-surface to-brand-bg" />

            {/* Geometric Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, var(--accent) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }} />
            </div>

            {/* Glow Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-accent/15 rounded-full blur-[180px] -z-10" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent2/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-status-booked/10 rounded-full blur-[120px] -z-10" />

            {/* Content Container */}
            <div className="relative max-w-4xl mx-auto text-center z-10 bg-brand-surface/40 backdrop-blur-xl border border-brand-border/50 rounded-3xl p-12 md:p-16 shadow-2xl shadow-brand-accent/5">
                {/* Main Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6"
                >
                    <span className="text-brand-text">{t('title').split(' ').slice(0, -1).join(' ')} </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-accent2">
                        {t('title').split(' ').slice(-1)}
                    </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {t('description')}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
                >
                    <Link href="/demo">
                        <Button
                            size="lg"
                            className="h-16 px-10 text-lg font-bold bg-brand-accent text-[#06080C] hover:bg-brand-accent2 hover:shadow-[0_0_60px_rgba(163,230,53,0.4)] transition-all duration-500 rounded-2xl group w-full sm:w-auto"
                        >
                            {t('cta_primary')}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link href="/demo">
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-16 px-10 text-lg font-bold border-2 border-brand-border text-brand-text hover:bg-brand-surface2 hover:border-brand-accent/50 rounded-2xl group w-full sm:w-auto"
                        >
                            <Play className="mr-2 w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform" />
                            {t('cta_secondary')}
                        </Button>
                    </Link>
                </motion.div>

                {/* Trust Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-sm text-brand-muted"
                >
                    <span className="inline-flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                        {t('trust_note')}
                    </span>
                </motion.p>
            </div>

            {/* Bottom Gradient Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />
        </section>
    );
}
