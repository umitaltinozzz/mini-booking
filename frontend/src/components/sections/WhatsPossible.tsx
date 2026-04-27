'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Clock, Users, Star, Building2, Utensils, Scissors, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SuccessStory {
    id: number;
    companyName: string;
    industry: string;
    tags: string[];
    logo: string;
    quote: string;
    personName: string;
    personRole: string;
    metrics: { icon: React.ReactNode; value: string; label: string }[];
    accentColor: string;
}

const SUCCESS_STORIES: SuccessStory[] = [
    {
        id: 1,
        companyName: 'Altınözü Kuaför',
        industry: 'Güzellik & Kişisel Bakım',
        tags: ['Kuaför', 'Çoklu Şube'],
        logo: '💇',
        quote: '"Eskiden 5 şubemizin randevularını takip etmek kabus gibiydi. AKRAN ile tüm personelin programını tek ekrandan görüyoruz. Müşteri şikayetleri %80 azaldı, doluluk oranımız ise rekor seviyede."',
        personName: 'Mehmet Altınöz',
        personRole: 'Kurucu & İşletme Sahibi',
        metrics: [
            { icon: <TrendingUp size={20} />, value: '%92', label: 'Doluluk Oranı' },
            { icon: <Clock size={20} />, value: '%80', label: 'Şikayet Azalması' },
            { icon: <Users size={20} />, value: '5', label: 'Şube Yönetimi' }
        ],
        accentColor: 'text-pink-500'
    },
    {
        id: 2,
        companyName: 'Lezzet Konağı',
        industry: 'Restoran & Yeme-İçme',
        tags: ['Restoran', 'Rezervasyon'],
        logo: '🍽️',
        quote: '"Hafta sonları masa kaosunu bitirdik. Müşteriler online rezervasyon yapıyor, biz de misafir karşılama kalitemize odaklanabiliyoruz. Gelmeyen müşteri (no-show) oranımız %70 düştü."',
        personName: 'Ayşe Kaya',
        personRole: 'Operasyon Müdürü',
        metrics: [
            { icon: <TrendingUp size={20} />, value: '%70', label: 'No-show Azalması' },
            { icon: <Clock size={20} />, value: '%45', label: 'Bekleme Süresi ↓' },
            { icon: <Star size={20} />, value: '4.9', label: 'Müşteri Puanı' }
        ],
        accentColor: 'text-orange-500'
    },
    {
        id: 3,
        companyName: 'Sağlık Artı Kliniği',
        industry: 'Sağlık Hizmetleri',
        tags: ['Klinik', 'Çoklu Doktor'],
        logo: '🏥',
        quote: '"12 doktorumuzun programını koordine etmek artık dakikalar sürüyor. Hastalarımız telefonla uğraşmadan randevu alabiliyor. Operasyonel verimlilik beklentilerimizin çok üzerinde."',
        personName: 'Dr. Can Yılmaz',
        personRole: 'Klinik Direktörü',
        metrics: [
            { icon: <TrendingUp size={20} />, value: '%88', label: 'Operasyonel Verimlilik' },
            { icon: <Clock size={20} />, value: '%60', label: 'Bekleme Süresi ↓' },
            { icon: <Users size={20} />, value: '12', label: 'Doktor Koordinasyonu' }
        ],
        accentColor: 'text-blue-500'
    }
];

export function WhatsPossible() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isReducedMotion = useReducedMotion();

    const nextStory = () => {
        setCurrentIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
    };

    const prevStory = () => {
        setCurrentIndex((prev) => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
    };

    const currentStory = SUCCESS_STORIES[currentIndex];

    return (
        <section id="hikayeler" className="bg-brand-bg py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-surface/30 to-transparent pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
                        <span className="text-brand-text">AKRAN ile </span>
                        <span className="text-brand-accent">Neler Mümkün?</span>
                    </h2>
                    <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                        Türkiye'nin önde gelen kurumları AKRAN ile operasyonlarını nasıl dönüştürüyor
                    </p>
                </motion.div>

                {/* Success Story Card */}
                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevStory}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 w-12 h-12 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-text hover:border-brand-accent transition-all"
                        aria-label="Önceki hikaye"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextStory}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 w-12 h-12 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-text hover:border-brand-accent transition-all"
                        aria-label="Sonraki hikaye"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStory.id}
                            initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-brand-surface border border-brand-border rounded-3xl overflow-hidden"
                        >
                            {/* Company Header */}
                            <div className="p-6 md:p-8 border-b border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-surface2 border border-brand-border flex items-center justify-center text-3xl">
                                        {currentStory.logo}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-brand-text">{currentStory.companyName}</h3>
                                        <p className="text-sm text-brand-muted">{currentStory.industry}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {currentStory.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 rounded-full text-xs font-bold bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Quote Section */}
                            <div className="p-6 md:p-8">
                                <div className="flex gap-4 mb-6">
                                    <span className="text-5xl font-serif text-brand-accent opacity-50">"</span>
                                    <blockquote className="text-lg md:text-xl text-brand-text leading-relaxed font-medium italic">
                                        {currentStory.quote.slice(1, -1)}
                                    </blockquote>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-full bg-brand-surface2 border border-brand-border flex items-center justify-center text-sm font-bold ${currentStory.accentColor}`}>
                                            {currentStory.personName.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-text">{currentStory.personName}</p>
                                            <p className="text-sm text-brand-muted">{currentStory.personRole}</p>
                                        </div>
                                    </div>
                                    <button className="text-sm font-bold text-brand-accent flex items-center gap-2 hover:gap-3 transition-all">
                                        Detaylı İncele <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Metrics Section */}
                            <div className="grid grid-cols-3 border-t border-brand-border">
                                {currentStory.metrics.map((metric, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-6 text-center ${idx < 2 ? 'border-r border-brand-border' : ''}`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center ${idx === 0 ? 'bg-blue-500/10 text-blue-500' :
                                            idx === 1 ? 'bg-emerald-500/10 text-emerald-500' :
                                                'bg-purple-500/10 text-purple-500'
                                            }`}>
                                            {metric.icon}
                                        </div>
                                        <p className={`text-2xl md:text-3xl font-black ${currentStory.accentColor} mb-1`}>
                                            {metric.value}
                                        </p>
                                        <p className="text-xs text-brand-muted font-medium">{metric.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {SUCCESS_STORIES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`transition-all duration-300 rounded-full ${idx === currentIndex
                                    ? 'w-8 h-2 bg-brand-accent'
                                    : 'w-2 h-2 bg-brand-border hover:bg-brand-muted'
                                    }`}
                                aria-label={`Hikaye ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-sm text-brand-muted mb-4">
                        Türkiye'nin lider kurumları AKRAN'a güveniyor
                    </p>
                    <button className="px-8 py-4 rounded-2xl bg-brand-accent text-[#06080C] font-bold hover:bg-brand-accent2 transition-all flex items-center gap-2 mx-auto group">
                        Tüm Başarı Hikayelerini Gör
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
