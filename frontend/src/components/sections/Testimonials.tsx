'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Utensils, Scissors, Stethoscope, Building2, Dumbbell, GraduationCap, ChevronRight, Check, Clock, Users, TrendingUp, Calendar } from 'lucide-react';

interface UseCase {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    benefits: string[];
    metrics: { label: string; value: string; change: string }[];
    color: string;
    bgColor: string;
}

const USE_CASES: UseCase[] = [
    {
        id: 'restaurant',
        icon: <Utensils size={24} />,
        title: 'Restoran & Kafe',
        description: 'Masa rezervasyonları, özel etkinlik planlaması ve kapasite yönetimi için.',
        benefits: [
            'Masa doluluk oranını optimize et',
            'Özel gün rezervasyonlarını önceden planla',
            'Bekleme listesini otomatik yönet',
            'SMS/WhatsApp hatırlatıcıları gönder'
        ],
        metrics: [
            { label: 'Doluluk Artışı', value: '+42%', change: 'avg.' },
            { label: 'No-show Azalması', value: '-65%', change: 'avg.' }
        ],
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10'
    },
    {
        id: 'salon',
        icon: <Scissors size={24} />,
        title: 'Kuaför & Güzellik Salonu',
        description: 'Personel bazlı randevu, hizmet süreleri ve müşteri tercihleri yönetimi.',
        benefits: [
            'Her personelin takvimini ayrı yönet',
            'Hizmet kombinasyonlarını destekle',
            'Müşteri geçmişini takip et',
            'Artan randevu kapasitesi'
        ],
        metrics: [
            { label: 'Verimlilik', value: '+38%', change: 'avg.' },
            { label: 'İptal Oranı', value: '-45%', change: 'avg.' }
        ],
        color: 'text-pink-500',
        bgColor: 'bg-pink-500/10'
    },
    {
        id: 'clinic',
        icon: <Stethoscope size={24} />,
        title: 'Klinik & Sağlık Merkezi',
        description: 'Doktor programları, hasta randevuları ve muayene odası optimizasyonu.',
        benefits: [
            'Doktor müsaitliğini anlık güncelle',
            'Hasta bekleme süresini azalt',
            'Acil randevu slotları ayır',
            'KVKK uyumlu veri yönetimi'
        ],
        metrics: [
            { label: 'Bekleme Süresi', value: '-55%', change: 'avg.' },
            { label: 'Hasta Memnuniyeti', value: '+4.8', change: '/5' }
        ],
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10'
    },
    {
        id: 'corporate',
        icon: <Building2 size={24} />,
        title: 'Kurumsal & Danışmanlık',
        description: 'Toplantı odası rezervasyonu, müşteri görüşmeleri ve kaynak planlaması.',
        benefits: [
            'Toplantı odası çakışmalarını engelle',
            'Video konferans entegrasyonu',
            'Ekip takvimlerini senkronize et',
            'Müşteri CRM entegrasyonu'
        ],
        metrics: [
            { label: 'Toplantı Verimliliği', value: '+60%', change: 'avg.' },
            { label: 'Kaynak Kullanımı', value: '+35%', change: 'avg.' }
        ],
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10'
    },
    {
        id: 'fitness',
        icon: <Dumbbell size={24} />,
        title: 'Spor Salonu & Stüdyo',
        description: 'Grup dersleri, personal trainer randevuları ve ekipman rezervasyonu.',
        benefits: [
            'Sınıf kapasitelerini kontrol et',
            'Trainer programlarını yönet',
            'Üyelik bazlı erişim kontrolü',
            'Bekleme listesi otomasyonu'
        ],
        metrics: [
            { label: 'Sınıf Doluluk', value: '+52%', change: 'avg.' },
            { label: 'Üye Tutma', value: '+28%', change: 'avg.' }
        ],
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10'
    },
    {
        id: 'education',
        icon: <GraduationCap size={24} />,
        title: 'Eğitim & Kurs Merkezi',
        description: 'Ders programları, öğretmen randevuları ve sınıf yönetimi.',
        benefits: [
            'Ders programını otomatik oluştur',
            'Öğretmen izinlerini yönet',
            'Veli görüşme randevuları',
            'Online ders entegrasyonu'
        ],
        metrics: [
            { label: 'Program Verimliliği', value: '+45%', change: 'avg.' },
            { label: 'Devamsızlık', value: '-40%', change: 'avg.' }
        ],
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10'
    }
];

export function Testimonials() {
    const t = useTranslations('Testimonials');
    const isReducedMotion = useReducedMotion();
    const [selectedCase, setSelectedCase] = useState<UseCase>(USE_CASES[0]);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <section id="sektorler" className="bg-brand-bg py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #A3E635 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={isReducedMotion ? "visible" : "hidden"}
                    whileInView="visible"
                    variants={containerVariants}
                    viewport={{ once: true }}
                    className="max-w-4xl mb-12 md:mb-16"
                >
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-brand-text/20 to-brand-text/5 bg-brand-text/10 stroke-brand-text/20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                            HER SEKTÖRE
                        </span>
                        <span className="block text-brand-accent">
                            ÖZEL ÇÖZÜM
                        </span>
                    </h2>
                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-brand-muted font-medium max-w-2xl border-l-4 border-brand-accent pl-6">
                        AKRAN, farklı sektörlerin benzersiz ihtiyaçlarına uyum sağlar. İşletmenizin türüne göre optimize edilmiş randevu deneyimi.
                    </motion.p>
                </motion.div>

                {/* Use Cases Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* Left: Sector Tabs */}
                    <div className="lg:col-span-1 space-y-2">
                        {USE_CASES.map((useCase) => (
                            <motion.button
                                key={useCase.id}
                                onClick={() => setSelectedCase(useCase)}
                                className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 group ${selectedCase.id === useCase.id
                                    ? 'bg-brand-surface2 border-brand-accent shadow-lg'
                                    : 'bg-brand-surface border-brand-border hover:bg-brand-surface2 hover:border-brand-accent/50'
                                    }`}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${useCase.bgColor} ${useCase.color}`}>
                                        {useCase.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-bold ${selectedCase.id === useCase.id ? 'text-brand-text' : 'text-brand-muted group-hover:text-brand-text'}`}>
                                            {useCase.title}
                                        </p>
                                    </div>
                                    <ChevronRight
                                        size={20}
                                        className={`transition-all ${selectedCase.id === useCase.id
                                            ? 'text-brand-accent translate-x-1'
                                            : 'text-brand-muted opacity-0 group-hover:opacity-100'
                                            }`}
                                    />
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Right: Selected Use Case Details */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCase.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-brand-surface border border-brand-border rounded-3xl p-6 md:p-8 h-full"
                            >
                                {/* Header */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className={`p-4 rounded-2xl ${selectedCase.bgColor} ${selectedCase.color}`}>
                                        {selectedCase.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-brand-text mb-2">{selectedCase.title}</h3>
                                        <p className="text-brand-muted">{selectedCase.description}</p>
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-4">
                                        Öne Çıkan Özellikler
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedCase.benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex items-center gap-3 bg-brand-surface2/50 rounded-xl p-3 border border-brand-border/50">
                                                <div className={`p-1.5 rounded-lg ${selectedCase.bgColor}`}>
                                                    <Check size={14} className={selectedCase.color} />
                                                </div>
                                                <span className="text-sm font-medium text-brand-text">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Metrics */}
                                <div>
                                    <h4 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-4">
                                        Ortalama Sonuçlar
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {selectedCase.metrics.map((metric, idx) => (
                                            <div key={idx} className="bg-brand-bg border border-brand-border rounded-xl p-4 text-center">
                                                <p className={`text-3xl font-black ${selectedCase.color} mb-1`}>{metric.value}</p>
                                                <p className="text-xs text-brand-muted">{metric.label}</p>
                                                <p className="text-[10px] text-brand-muted/60 mt-1">{metric.change}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-8 pt-6 border-t border-brand-border">
                                    <button className={`w-full py-4 rounded-2xl font-bold text-[#06080C] bg-brand-accent hover:bg-brand-accent2 transition-all flex items-center justify-center gap-2 group`}>
                                        {selectedCase.title} için Demo Al
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </section>
    );
}
