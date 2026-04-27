'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { INTEGRATIONS } from '@/data/integrations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MessageSquarePlus, Calendar, Video, Bell, Code } from 'lucide-react';

const TABS = [
    { id: 1, icon: Calendar, labelKey: 'group_calendar' },
    { id: 2, icon: Video, labelKey: 'group_video' },
    { id: 3, icon: Bell, labelKey: 'group_notifications' },
    { id: 4, icon: Code, labelKey: 'group_api' },
];

export function Integrations() {
    const t = useTranslations('Integrations');
    const isReducedMotion = useReducedMotion();
    const [activeTab, setActiveTab] = useState(1);

    const activeGroup = INTEGRATIONS.find(g => g.id === activeTab);

    return (
        <section id="entegrasyon" className="bg-brand-bg py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-border to-transparent opacity-20" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-4xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-brand-text mb-6 tracking-tighter">
                        <span className="text-brand-text">Favori Araçlarınızla </span>
                        <span className="text-brand-accent">Tam Entegre</span>
                    </h2>
                    <p className="text-lg md:text-xl text-brand-muted font-medium">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Tab Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex items-center bg-brand-surface border border-brand-border rounded-2xl p-1.5 gap-1">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                                        isActive
                                            ? 'text-[#06080C]'
                                            : 'text-brand-muted hover:text-brand-text'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-tab-bg"
                                            className="absolute inset-0 bg-brand-accent rounded-xl"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <Icon className={`relative z-10 w-4 h-4 ${isActive ? 'text-[#06080C]' : ''}`} />
                                    <span className="relative z-10 hidden sm:inline">{t(tab.labelKey)}</span>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Content Area */}
                <motion.div
                    initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="bg-brand-surface/40 backdrop-blur-xl border border-brand-border/50 rounded-3xl p-8 md:p-12">
                        <AnimatePresence mode="wait">
                            {activeGroup && (
                                <motion.div
                                    key={activeGroup.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Group Description */}
                                    <p className="text-center text-brand-muted mb-8 max-w-xl mx-auto">
                                        {t(activeGroup.descKey)}
                                    </p>

                                    {/* Integration Items */}
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {activeGroup.items.map((item, idx) => (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                                className="flex items-center gap-4 bg-brand-surface border border-brand-border px-6 py-4 rounded-2xl hover:border-brand-accent/40 hover:bg-brand-surface2 transition-all duration-300 group"
                                            >
                                                {item.icon && (
                                                    <item.icon className="w-8 h-8 flex-shrink-0 text-brand-muted group-hover:text-brand-accent transition-colors" />
                                                )}
                                                <div className="flex flex-col">
                                                    <span className="text-base font-bold text-brand-text">{item.name}</span>
                                                    <span className={`text-xs font-bold uppercase tracking-wider ${
                                                        item.status === 'NOW' 
                                                            ? 'text-brand-accent' 
                                                            : 'text-brand-muted'
                                                    }`}>
                                                        {item.status === 'NOW' ? t('status_now') : t('status_soon')}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 flex flex-col items-center gap-4"
                >
                    <a
                        href="mailto:destek@akran.com?subject=Entegrasyon İsteği"
                        className="relative group inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-[#06080C] transition-all duration-200 bg-brand-accent rounded-xl hover:bg-brand-accent2 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-accent/20"
                    >
                        <MessageSquarePlus className="mr-2 w-5 h-5" />
                        {t('cta')}
                        <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/30 transition-all" />
                    </a>
                    <p className="text-xs font-bold text-brand-muted uppercase tracking-widest">
                        {t('footer_note')}
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
