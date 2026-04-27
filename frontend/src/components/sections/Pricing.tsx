'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Sparkles, Building2 } from 'lucide-react';
import { PRICING_PLANS } from '@/data/pricing';

export function Pricing() {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'zap': return <Zap size={24} />;
            case 'sparkles': return <Sparkles size={24} />;
            case 'building': return <Building2 size={24} />;
            default: return <Zap size={24} />;
        }
    };

    return (
        <section id="fiyat" className="bg-brand-bg py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[140px] -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
                        <span className="text-brand-text">Şeffaf ve Esnek </span>
                        <span className="text-brand-accent">Fiyatlandırma</span>
                    </h2>
                    <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                        14 gün ücretsiz deneyin. İhtiyacınıza göre ölçeklendirin.
                    </p>
                </motion.div>

                {/* Billing Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex justify-center mb-12"
                >
                    <div className="relative inline-flex items-center bg-brand-surface border border-brand-border rounded-full p-1.5">
                        <button
                            onClick={() => setBillingPeriod('monthly')}
                            className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${billingPeriod === 'monthly'
                                ? 'text-[#06080C]'
                                : 'text-brand-muted hover:text-brand-text'
                                }`}
                        >
                            {billingPeriod === 'monthly' && (
                                <motion.div
                                    layoutId="billing-pill"
                                    className="absolute inset-0 bg-brand-accent rounded-full -z-10"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            Aylık
                        </button>
                        <button
                            onClick={() => setBillingPeriod('yearly')}
                            className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${billingPeriod === 'yearly'
                                ? 'text-[#06080C]'
                                : 'text-brand-muted hover:text-brand-text'
                                }`}
                        >
                            {billingPeriod === 'yearly' && (
                                <motion.div
                                    layoutId="billing-pill"
                                    className="absolute inset-0 bg-brand-accent rounded-full -z-10"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            Yıllık
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${billingPeriod === 'yearly'
                                ? 'bg-[#06080C]/20 text-[#06080C]'
                                : 'bg-brand-accent/10 text-brand-accent'
                                }`}>
                                %20 Tasarruf
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 items-stretch">
                    {PRICING_PLANS.map((plan, idx) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * idx }}
                            className={`relative rounded-3xl p-6 md:p-8 flex flex-col ${plan.isPopular
                                ? 'bg-gradient-to-b from-brand-accent/20 to-brand-surface border-2 border-brand-accent/30 shadow-2xl shadow-brand-accent/10 md:-mt-4 md:mb-4'
                                : 'bg-brand-surface border border-brand-border'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.isPopular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="px-4 py-1.5 bg-brand-accent text-[#06080C] text-xs font-bold rounded-full">
                                        En Popüler
                                    </span>
                                </div>
                            )}

                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${plan.isPopular
                                ? 'bg-brand-accent/20 text-brand-accent'
                                : plan.id === 'enterprise'
                                    ? 'bg-brand-surface2 text-brand-muted'
                                    : 'bg-brand-accent/10 text-brand-accent'
                                }`}>
                                {getIcon(plan.icon)}
                            </div>

                            {/* Plan Name */}
                            <h3 className={`text-xl font-bold mb-2 ${plan.isPopular ? 'text-brand-accent' : 'text-brand-text'
                                }`}>
                                {plan.id === 'starter' ? 'Starter' : plan.id === 'pro' ? 'Professional' : 'Enterprise'}
                            </h3>

                            {/* Price */}
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className={`text-4xl font-black ${plan.isPopular ? 'text-brand-accent' : 'text-brand-text'
                                    }`}>
                                    {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                                </span>
                                {plan.id !== 'enterprise' && (
                                    <span className="text-sm text-brand-muted font-medium">
                                        /{billingPeriod === 'monthly' ? 'ay' : 'yıl'}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-brand-muted mb-6">
                                {plan.id === 'starter'
                                    ? 'Küçük ekipler için ideal başlangıç paketi'
                                    : plan.id === 'pro'
                                        ? 'Büyüyen ekipler için tam özellikli paket'
                                        : 'Kurumsal ihtiyaçlar için özelleştirilmiş çözüm'
                                }
                            </p>

                            {/* Features */}
                            <ul className="space-y-3 flex-1 mb-8">
                                {plan.id === 'starter' && (
                                    <>
                                        <FeatureItem text="3 personele kadar" highlighted={plan.isPopular} />
                                        <FeatureItem text="1 şube" highlighted={plan.isPopular} />
                                        <FeatureItem text="Aylık 500 randevu" highlighted={plan.isPopular} />
                                        <FeatureItem text="SMS hatırlatma" highlighted={plan.isPopular} />
                                        <FeatureItem text="Temel raporlama" highlighted={plan.isPopular} />
                                    </>
                                )}
                                {plan.id === 'pro' && (
                                    <>
                                        <FeatureItem text="15 personele kadar" highlighted={plan.isPopular} />
                                        <FeatureItem text="3 şubeye kadar" highlighted={plan.isPopular} />
                                        <FeatureItem text="Sınırsız randevu" highlighted={plan.isPopular} />
                                        <FeatureItem text="WhatsApp entegrasyonu" highlighted={plan.isPopular} />
                                        <FeatureItem text="Gelişmiş raporlar" highlighted={plan.isPopular} />
                                        <FeatureItem text="Öncelikli destek" highlighted={plan.isPopular} />
                                    </>
                                )}
                                {plan.id === 'enterprise' && (
                                    <>
                                        <FeatureItem text="Sınırsız personel" highlighted={plan.isPopular} />
                                        <FeatureItem text="Sınırsız şube" highlighted={plan.isPopular} />
                                        <FeatureItem text="API erişimi" highlighted={plan.isPopular} />
                                        <FeatureItem text="Özel entegrasyonlar" highlighted={plan.isPopular} />
                                        <FeatureItem text="SLA garantisi" highlighted={plan.isPopular} />
                                        <FeatureItem text="Dedicated hesap yöneticisi" highlighted={plan.isPopular} />
                                    </>
                                )}
                            </ul>

                            {/* CTA Button */}
                            <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${plan.isPopular
                                ? 'bg-transparent border-2 border-brand-accent/50 text-brand-accent hover:bg-brand-accent/10'
                                : plan.id === 'enterprise'
                                    ? 'bg-gradient-to-r from-brand-accent to-brand-accent2 text-[#06080C] hover:opacity-90'
                                    : 'bg-brand-accent text-[#06080C] hover:bg-brand-accent2'
                                }`}>
                                {plan.id === 'enterprise' ? 'İletişime Geç' : 'Ücretsiz Dene'}
                            </button>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

function FeatureItem({ text, highlighted }: { text: string; highlighted?: boolean }) {
    return (
        <li className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${highlighted ? 'bg-brand-accent/20 text-brand-accent' : 'bg-brand-surface2 text-brand-muted'
                }`}>
                <Check size={12} strokeWidth={3} />
            </div>
            <span className="text-sm text-brand-text/80">{text}</span>
        </li>
    );
}
