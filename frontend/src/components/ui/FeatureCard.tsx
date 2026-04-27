'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Feature } from '@/data/features';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import * as MiniUIs from '@/components/ui/mini/FeatureUIs';

interface FeatureCardProps {
    feature: Feature;
    index: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
    const t = useTranslations('Features');
    const isReducedMotion = useReducedMotion();

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'circOut' }
        },
    };

    const renderMiniUI = () => {
        switch (feature.miniType) {
            case 'multi-tenant': return <MiniUIs.MiniTenantTable />;
            case 'rbac': return <MiniUIs.MiniRBACList />;
            case 'slot-gen': return <MiniUIs.MiniSlotGrid />;
            case 'conflict': return <MiniUIs.MiniLockPreview />;
            case 'time-off': return <MiniUIs.MiniTimeOffRow />;
            case 'notification': return <MiniUIs.MiniNotificationToggles />;
            case 'audit': return <MiniUIs.MiniAuditLog />;
            case 'reporting': return <MiniUIs.MiniKPIBars />;
            default: return null;
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial={isReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative h-full flex flex-col"
        >
            {/* Animated Gradient Border */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-accent/20 via-cyan-500/20 to-purple-500/20 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-accent via-cyan-500 to-purple-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x bg-[length:200%_auto]" style={{ padding: '2px' }}>
                <div className="absolute inset-0 bg-brand-surface rounded-sm" />
            </div>
            
            {/* Card Content */}
            <div className="relative bg-brand-surface border-2 border-brand-border/50 group-hover:border-transparent h-full flex flex-col transition-colors duration-300 z-10">
                {/* Header / Top Bar */}
                <div className="flex items-center justify-between p-6 border-b-2 border-brand-border/30 group-hover:border-brand-accent/30 transition-colors duration-200 bg-gradient-to-r from-brand-surface2 to-brand-surface">
                    <span className="font-mono text-4xl font-black bg-gradient-to-br from-brand-accent via-cyan-400 to-brand-accent bg-clip-text text-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                        {String(index).padStart(2, '0')}
                    </span>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-brand-accent/30 group-hover:bg-brand-accent group-hover:shadow-lg group-hover:shadow-brand-accent/50 transition-all duration-300" />
                        <div className="w-3 h-3 rounded-full bg-cyan-500/20 group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300" />
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-8 flex-1 flex flex-col gap-8">
                    <div className="space-y-4">
                        <h3 className="font-mono text-xl font-bold text-brand-text uppercase tracking-wider group-hover:text-brand-accent transition-colors duration-300 drop-shadow-[0_0_10px_rgba(34,197,94,0)] group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                            {t(feature.titleKey)}
                        </h3>
                        <div className="space-y-4">
                            <p className="text-brand-text/90 font-bold leading-relaxed border-l-2 border-gradient-to-b from-brand-accent to-cyan-400 pl-4 relative">
                                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-accent to-cyan-400 rounded-full" />
                                <span className="pl-4">{t(feature.benefitKey)}</span>
                            </p>
                            <p className="text-sm font-mono text-brand-muted leading-relaxed opacity-60 group-hover:opacity-80 transition-opacity">
                                {t(feature.howKey)}
                            </p>
                        </div>
                    </div>

                    {/* Technical/UI Preview */}
                    <div className="mt-auto pt-6 border-t border-brand-border/20 border-dashed">
                        <div className="opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                            {renderMiniUI()}
                        </div>
                    </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-brand-accent/20 to-cyan-500/20 group-hover:from-brand-accent group-hover:to-cyan-400 transition-all duration-300 rounded-tl-lg" />
            </div>
        </motion.div>
    );
}
