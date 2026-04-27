'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SECURITY_PRINCIPLES } from '@/data/security';
import { SecurityDashboard } from '@/components/sections/SecurityDashboard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SecurityTrust() {
    const t = useTranslations('Security');
    const isReducedMotion = useReducedMotion();

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1,
                ease: [0.16, 1, 0.3, 1] as any
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    };

    return (
        <section id="guvenlik" className="bg-brand-bg py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">
                        <span className="text-brand-accent">Güvenlik</span>
                        <span className="text-brand-text"> ve </span>
                        <span className="text-brand-text">kontrol</span>
                    </h2>
                    <p className="text-lg md:text-xl text-brand-muted font-medium">
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Principles (7 Cols) */}
                    <motion.div
                        variants={containerVariants}
                        initial={isReducedMotion ? "visible" : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="lg:col-span-7 space-y-12"
                    >
                        {SECURITY_PRINCIPLES.map((principle) => (
                            <motion.div key={principle.id} variants={itemVariants} className="space-y-4 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-6 bg-brand-accent scale-y-75 group-hover:scale-y-100 transition-transform origin-bottom" />
                                    <h3 className="text-xl font-bold text-brand-text group-hover:text-brand-accent transition-colors">
                                        {t(principle.titleKey)}
                                    </h3>
                                </div>
                                <p className="text-base text-brand-muted leading-relaxed max-w-xl font-medium pl-5 border-l border-brand-border/50">
                                    {t(principle.descKey)}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right Column: Security Dashboard (5 Cols) */}
                    <div className="lg:col-span-5">
                        <SecurityDashboard />
                    </div>

                </div>
            </div>
        </section>
    );
}
