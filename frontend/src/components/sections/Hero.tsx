'use client';

import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';
import { ChevronRight, ArrowRight, Calendar, Users, TrendingUp, Clock, Bell, Plus, MessageSquare, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function Hero() {
    const t = useTranslations('Hero');
    const isReducedMotion = useReducedMotionPref();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as any
            }
        },
    };

    return (
        <section
            id="urun"
            className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-start overflow-hidden px-6 md:px-12 bg-brand-bg"
        >
            {/* Dynamic Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[150px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-brand-status-booked/10 rounded-full blur-[150px] -z-10" />

            {/* Centered Hero Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-5xl mx-auto text-center space-y-8 z-10"
            >
                {/* Badge */}
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-surface2 border border-brand-border text-[10px] font-bold tracking-[0.2em] text-brand-accent uppercase">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                    </span>
                    {t('badge')}
                </motion.div>

                {/* Main Headline */}
                <motion.div variants={itemVariants} className="space-y-2">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-brand-text">
                        <span className="text-brand-accent">{t('akran.a')[0]}</span>{t('akran.a').slice(1)}.{' '}
                        <span className="text-brand-accent">{t('akran.k')[0]}</span>{t('akran.k').slice(1)}.
                    </h1>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-brand-text">
                        <span className="text-brand-accent">{t('akran.r')[0]}</span>{t('akran.r').slice(1)}.{' '}
                        <span className="text-brand-accent">{t('akran.an')[0]}</span>{t('akran.an').slice(1)}.
                    </h1>
                    {t('akran.desc') && (
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-accent2">
                            {t('akran.desc')}.
                        </h1>
                    )}
                </motion.div>

                {/* Description */}
                <motion.p variants={itemVariants} className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed font-medium">
                    {t('description')}
                </motion.p>

                {/* Trust Indicators */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 text-sm text-brand-muted">
                    <div className="flex items-center gap-2">
                        <span className="text-brand-accent font-bold">Müşteri Memnuniyeti</span>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                        </div>
                        <span className="font-bold text-brand-text">4.9</span>
                    </div>
                    <div className="w-[1px] h-4 bg-brand-border hidden sm:block" />
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-brand-text">500+</span>
                        <span>Güvenilen İşletme</span>
                    </div>
                </motion.div>

                {/* CTAs */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <Button size="lg" className="h-14 px-8 text-base font-bold bg-brand-accent text-[#06080C] hover:bg-brand-accent2 hover:shadow-[0_0_40px_rgba(163,230,53,0.5)] transition-all duration-500 rounded-xl group">
                        {t('cta_primary')}
                        <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <a href="/tr/brands">
                        <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold border-brand-border text-brand-text hover:bg-brand-surface2 rounded-xl">
                            {t('cta_secondary')}
                        </Button>
                    </a>
                </motion.div>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
                initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="w-full max-w-6xl mx-auto mt-16 z-10"
            >
                {/* Browser Window Frame */}
                <div className="bg-brand-surface border border-brand-border rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
                    {/* Browser Header */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-brand-surface2 border-b border-brand-border">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="bg-brand-bg/50 border border-brand-border rounded-lg px-4 py-1.5 text-xs text-brand-muted font-mono flex items-center gap-2">
                                <span className="text-brand-accent">🔒</span>
                                app.akranrandevu.com/dashboard
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-4 md:p-6 bg-gradient-to-br from-brand-bg to-brand-surface">
                        {/* Dashboard Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-brand-text flex items-center gap-2">
                                    İyi günler, Berk! <span className="text-2xl">👋</span>
                                </h3>
                                <p className="text-xs text-brand-muted">İşte bugünün özeti ve yaklaşan randevularınız.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 text-xs font-medium bg-brand-surface2 border border-brand-border rounded-lg text-brand-text">⊞ Salon</button>
                                <button className="px-3 py-1.5 text-xs font-medium bg-brand-surface2 border border-brand-border rounded-lg text-brand-text">☰ Restoran</button>
                            </div>
                        </div>

                        {/* Alert Banner */}
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-6 flex items-center gap-3">
                            <Bell size={16} className="text-amber-500" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-brand-text">2 müşteri onay bekliyor</p>
                                <p className="text-xs text-brand-muted">Randevularını onaylamak için müşterilere hatırlatma gönderin.</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                            <StatCard icon={<TrendingUp size={18} />} label="Günlük Ciro" value="₺4,250" change="+12%" positive iconBg="bg-emerald-500/10" iconColor="text-emerald-500" />
                            <StatCard icon={<Calendar size={18} />} label="Bugünün Randevuları" value="14" subtext="3 beklemede" iconBg="bg-purple-500/10" iconColor="text-purple-500" />
                            <StatCard icon={<Users size={18} />} label="Aktif Personel" value="4" subtext="2 meşgul" iconBg="bg-pink-500/10" iconColor="text-pink-500" />
                            <StatCard icon={<Clock size={18} />} label="Doluluk Oranı" value="%78" subtext="Hedef: %85" iconBg="bg-yellow-500/10" iconColor="text-yellow-500" />
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Calendar Preview */}
                            <div className="lg:col-span-2 bg-brand-surface border border-brand-border rounded-xl p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-bold text-brand-text flex items-center gap-2">
                                        <Calendar size={16} className="text-brand-accent" />
                                        Ocak 2026
                                    </h4>
                                    <button className="text-xs text-brand-accent font-medium">Bugün</button>
                                </div>
                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                    {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
                                        <div key={day} className="py-2 text-brand-muted font-medium">{day}</div>
                                    ))}
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                                        const hasAppointments = [5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18].includes(day);
                                        const isToday = day === 9;
                                        return (
                                            <div
                                                key={day}
                                                className={`py-2 rounded-lg relative ${isToday
                                                    ? 'bg-brand-accent text-[#06080C] font-bold'
                                                    : hasAppointments
                                                        ? 'bg-brand-surface2 text-brand-text'
                                                        : 'text-brand-muted hover:bg-brand-surface2'
                                                    }`}
                                            >
                                                {day}
                                                {hasAppointments && !isToday && (
                                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                                                        <div className="w-1 h-1 rounded-full bg-brand-accent" />
                                                        <div className="w-1 h-1 rounded-full bg-pink-500" />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-brand-surface border border-brand-border rounded-xl p-4">
                                <h4 className="font-bold text-brand-text mb-4">Hızlı İşlemler</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <QuickAction icon={<Plus size={18} />} label="Randevu Oluştur" color="bg-emerald-500/10 text-emerald-500" />
                                    <QuickAction icon={<Users size={18} />} label="Müşteri Ekle" color="bg-blue-500/10 text-blue-500" />
                                    <QuickAction icon={<Calendar size={18} />} label="Ödeme Al" color="bg-purple-500/10 text-purple-500" />
                                    <QuickAction icon={<MessageSquare size={18} />} label="Toplu SMS" color="bg-pink-500/10 text-pink-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reflection Effect */}
                <div className="h-20 bg-gradient-to-b from-brand-surface/20 to-transparent rounded-b-3xl -mt-1 blur-sm opacity-30" />
            </motion.div>

            {/* Trust Banner with Logo Marquee */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-16 w-full max-w-6xl mx-auto"
            >
                <h2 className="text-lg md:text-xl font-bold text-brand-muted text-center mb-8">
                    Türkiye'nin <span className="text-brand-accent font-black">Önde Gelen Kurumları</span> Tarafından Tercih Ediliyor
                </h2>

                {/* Logo Marquee */}
                <div className="relative overflow-hidden py-8">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Logos */}
                    <div className="flex animate-marquee">
                        {/* First set */}
                        {[...Array(8)].map((_, i) => (
                            <div key={`logo-1-${i}`} className="flex-shrink-0 mx-8 flex items-center justify-center relative w-16 h-16">
                                <Image
                                    src="/logos/partner-1.png"
                                    alt="Partner Logo"
                                    fill
                                    className="object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                                    sizes="64px"
                                />
                            </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {[...Array(8)].map((_, i) => (
                            <div key={`logo-2-${i}`} className="flex-shrink-0 mx-8 flex items-center justify-center relative w-16 h-16">
                                <Image
                                    src="/logos/partner-1.png"
                                    alt="Partner Logo"
                                    fill
                                    className="object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                                    sizes="64px"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function StatCard({ icon, label, value, change, subtext, positive, iconBg, iconColor }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    change?: string;
    subtext?: string;
    positive?: boolean;
    iconBg: string;
    iconColor: string;
}) {
    return (
        <div className="bg-brand-surface border border-brand-border rounded-xl p-3 md:p-4">
            <div className="flex items-start justify-between mb-2">
                <p className="text-xs text-brand-muted">{label}</p>
                <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
                    {icon}
                </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-brand-text">{value}</p>
            {change && (
                <p className={`text-xs font-medium ${positive ? 'text-emerald-500' : 'text-red-500'}`}>
                    {change} dünden
                </p>
            )}
            {subtext && <p className="text-xs text-brand-muted">{subtext}</p>}
        </div>
    );
}

function QuickAction({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
    return (
        <button className="flex flex-col items-center gap-2 p-3 bg-brand-surface2/50 hover:bg-brand-surface2 border border-brand-border rounded-xl transition-colors group">
            <div className={`p-2 rounded-lg ${color}`}>
                {icon}
            </div>
            <span className="text-xs font-medium text-brand-muted group-hover:text-brand-text text-center leading-tight">{label}</span>
        </button>
    );
}
