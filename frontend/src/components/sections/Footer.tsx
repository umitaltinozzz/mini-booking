'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube, ArrowUpRight, ChevronRight, Send, Clock, Shield, Zap } from 'lucide-react';

const FOOTER_LINKS = {
    product: [
        { label: 'Özellikler', href: '#ozellikler' },
        { label: 'Fiyatlandırma', href: '#fiyat' },
        { label: 'Entegrasyonlar', href: '#entegrasyonlar' },
        { label: 'Güvenlik', href: '#guvenlik' },
        { label: 'API Dokümantasyonu', href: '#api', soon: true },
    ],
    solutions: [
        { label: 'Kuaför & Güzellik', href: '#solutions' },
        { label: 'Restoran & Kafe', href: '#solutions' },
        { label: 'Klinik & Sağlık', href: '#solutions' },
        { label: 'Kurumsal', href: '#solutions' },
        { label: 'Spor & Fitness', href: '#solutions' },
    ],
    company: [
        { label: 'Hakkımızda', href: '#' },
        { label: 'Kariyer', href: '#', soon: true },
        { label: 'Blog', href: '#', soon: true },
        { label: 'İletişim', href: '#contact' },
        { label: 'Basın Kiti', href: '#' },
    ],
    legal: [
        { label: 'KVKK Politikası', href: '/kvkk' },
        { label: 'Kullanım Şartları', href: '/terms' },
        { label: 'Çerez Politikası', href: '/cookies' },
        { label: 'Gizlilik Sözleşmesi', href: '/privacy' },
        { label: 'Güvenlik Bildirimi', href: '/security' },
    ]
};

const SOCIAL_LINKS = [
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
    { icon: <Youtube size={18} />, href: '#', label: 'YouTube' },
];

const STATS = [
    { value: '2.5K+', label: 'Aktif İşletme' },
    { value: '150K+', label: 'Aylık Randevu' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9', label: 'Kullanıcı Puanı' },
];

export function Footer() {
    return (
        <footer className="bg-brand-surface relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />

            {/* Stats Bar */}
            <div className="border-b border-brand-border relative z-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <p className="text-2xl md:text-3xl font-black text-brand-accent">{stat.value}</p>
                                <p className="text-xs text-brand-muted font-medium mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-12 md:gap-8">

                    {/* Brand Column */}
                    <div className="col-span-2 space-y-6">
                        <Link href="/" className="inline-block mb-2 relative h-16 md:h-20 w-16 md:w-20">
                            <Image src="/logo/logo.png" alt="Akran Logo" fill className="object-contain" sizes="(max-width: 768px) 64px, 80px" />
                        </Link>
                        <p className="text-brand-muted font-medium max-w-xs leading-relaxed">
                            Türkiye'nin en gelişmiş randevu yönetim platformu. Multi-tenant mimari, RBAC yetkilendirme ve kurumsal güvenlik standartları.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a href="mailto:destek@akran.com" className="flex items-center gap-3 text-sm text-brand-muted hover:text-brand-accent transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-brand-surface2 flex items-center justify-center group-hover:bg-brand-accent/10 transition-colors">
                                    <Mail size={14} className="text-brand-accent" />
                                </div>
                                destek@akran.com
                            </a>
                            <a href="tel:+902121234567" className="flex items-center gap-3 text-sm text-brand-muted hover:text-brand-accent transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-brand-surface2 flex items-center justify-center group-hover:bg-brand-accent/10 transition-colors">
                                    <Phone size={14} className="text-brand-accent" />
                                </div>
                                +90 212 123 45 67
                            </a>
                            <div className="flex items-center gap-3 text-sm text-brand-muted">
                                <div className="w-8 h-8 rounded-lg bg-brand-surface2 flex items-center justify-center">
                                    <MapPin size={14} className="text-brand-accent" />
                                </div>
                                İstanbul, Türkiye
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 pt-2">
                            {SOCIAL_LINKS.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-xl bg-brand-surface2 border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-accent hover:border-brand-accent/50 hover:bg-brand-accent/5 transition-all"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-black text-brand-text uppercase tracking-widest">Ürün</h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.product.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="text-sm text-brand-muted hover:text-brand-accent transition-colors flex items-center gap-2 group">
                                        {link.label}
                                        {link.soon && (
                                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent font-bold">YAKINDA</span>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Solutions Links */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-black text-brand-text uppercase tracking-widest">Çözümler</h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.solutions.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="text-sm text-brand-muted hover:text-brand-accent transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-black text-brand-text uppercase tracking-widest">Şirket</h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.company.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="text-sm text-brand-muted hover:text-brand-accent transition-colors flex items-center gap-2">
                                        {link.label}
                                        {link.soon && (
                                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent font-bold">YAKINDA</span>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-black text-brand-text uppercase tracking-widest">Yasal</h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.legal.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="text-sm text-brand-muted hover:text-brand-accent transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Newsletter Section */}
            <div className="border-t border-brand-border relative z-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-brand-text mb-2 tracking-tight">
                                Güncellemelerden haberdar ol
                            </h3>
                            <p className="text-sm text-brand-muted font-medium">
                                Yeni özellikler, sektör içgörüleri ve özel tekliflerden ilk sen haberdar ol.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                                <input
                                    type="email"
                                    placeholder="E-posta adresiniz"
                                    className="w-full h-12 pl-11 pr-4 bg-brand-bg border border-brand-border rounded-xl text-brand-text text-sm placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
                                />
                            </div>
                            <button className="h-12 px-6 bg-brand-accent text-[#06080C] font-bold rounded-xl hover:bg-brand-accent2 transition-all flex items-center justify-center gap-2 group whitespace-nowrap text-sm">
                                <Send size={16} />
                                Abone Ol
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-brand-border relative z-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex items-center gap-2 text-brand-muted">
                            <Shield size={20} className="text-brand-accent" />
                            <span className="text-sm font-medium">KVKK Uyumlu</span>
                        </div>
                        <div className="flex items-center gap-2 text-brand-muted">
                            <Zap size={20} className="text-brand-accent" />
                            <span className="text-sm font-medium">%99.9 Uptime SLA</span>
                        </div>
                        <div className="flex items-center gap-2 text-brand-muted">
                            <Clock size={20} className="text-brand-accent" />
                            <span className="text-sm font-medium">7/24 Teknik Destek</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-brand-border relative z-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-brand-muted text-center md:text-left">
                            © 2026 AKRAN Appointment Network. Tüm hakları saklıdır. Türkiye'de 🇹🇷 tasarlandı ve geliştirildi.
                        </p>
                        <div className="flex items-center gap-6">
                            <button className="text-xs font-bold text-brand-muted hover:text-brand-accent transition-colors flex items-center gap-1">
                                <span className="w-4 h-4 rounded-full bg-brand-accent/20 flex items-center justify-center text-[10px]">🇹🇷</span>
                                Türkçe
                            </button>
                            <button className="text-xs font-bold text-brand-muted hover:text-brand-accent transition-colors flex items-center gap-1">
                                <span className="w-4 h-4 rounded-full bg-brand-surface2 flex items-center justify-center text-[10px]">🇬🇧</span>
                                English
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
