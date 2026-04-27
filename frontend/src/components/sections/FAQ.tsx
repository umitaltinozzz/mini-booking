'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '@/data/faq';

export function FAQ() {
    const t = useTranslations('FAQ');
    const isReducedMotion = useReducedMotion();
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleItem = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section id="sss" className="bg-brand-bg py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
                        <span className="text-brand-text">Sıkça Sorulan </span>
                        <span className="text-brand-accent">Sorular</span>
                    </h2>
                    <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                        Merak edilenlere hızlı cevaplar
                    </p>
                </motion.div>

                {/* Single Row FAQ Items */}
                <motion.div
                    initial={isReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-2"
                >
                    {FAQ_ITEMS.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`bg-brand-surface border rounded-xl overflow-hidden transition-all ${openId === item.id
                                ? 'border-brand-accent/30'
                                : 'border-brand-border hover:border-brand-border/80'
                                }`}
                        >
                            <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold text-brand-accent/60 w-6">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className={`text-sm font-semibold transition-colors ${openId === item.id ? 'text-brand-accent' : 'text-brand-text'
                                        }`}>
                                        {t(item.questionKey)}
                                    </span>
                                </div>
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${openId === item.id
                                    ? 'bg-brand-accent text-[#06080C]'
                                    : 'bg-brand-surface2 text-brand-muted'
                                    }`}>
                                    {openId === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openId === item.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-4 pt-0">
                                            <div className="ml-10 pl-4 border-l-2 border-brand-accent/20">
                                                <p className="text-sm text-brand-muted leading-relaxed">
                                                    {t(item.answerKey)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
