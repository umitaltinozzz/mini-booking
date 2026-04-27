'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

const FOOTER_LINKS = {
    businesses: [
        { label: 'Kuaför & Berber', href: '/brands' },
        { label: 'Restoran & Kafe', href: '/brands' },
        { label: 'Spor Salonları', href: '/brands' },
        { label: 'Güzellik Salonları', href: '/brands' },
        { label: 'Klinikler', href: '/brands' },
    ],
    company: [
        { label: 'Hakkımızda', href: '#' },
        { label: 'Kariyer', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'İletişim', href: '#' },
    ],
    support: [
        { label: 'Yardım Merkezi', href: '#' },
        { label: 'İşletme Ekle', href: '/' },
        { label: 'Uygulama İndir', href: '#' },
    ],
    legal: [
        { label: 'Gizlilik Politikası', href: '#' },
        { label: 'Kullanım Şartları', href: '#' },
        { label: 'KVKK', href: '#' },
    ]
};

const SOCIAL_LINKS = [
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
    { icon: <Youtube size={18} />, href: '#', label: 'YouTube' },
];

export function BrandsFooter() {
    return (
        <footer className="bg-brand-surface border-t border-brand-border">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <Link href="/" className="inline-block relative h-16 md:h-20 w-16 md:w-20">
                            <Image src="/logo/logo.png" alt="Akran Logo" fill className="object-contain" sizes="(max-width: 768px) 64px, 80px" />
                        </Link>
                        <p className="text-sm text-brand-muted leading-relaxed">
                            Yerel hizmetleri keşfet, randevu al.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-2 pt-2">
                            {SOCIAL_LINKS.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-9 h-9 rounded-lg bg-brand-surface2 border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-accent hover:border-brand-accent/50 transition-all"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Business Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-brand-text">İşletmeler</h4>
                        <ul className="space-y-2">
                            {FOOTER_LINKS.businesses.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="text-sm text-brand-muted hover:text-brand-accent transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-brand-text">Şirket</h4>
                        <ul className="space-y-2">
                            {FOOTER_LINKS.company.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="text-sm text-brand-muted hover:text-brand-accent transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-brand-text">Destek</h4>
                        <ul className="space-y-2">
                            {FOOTER_LINKS.support.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="text-sm text-brand-muted hover:text-brand-accent transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-brand-text">Yasal</h4>
                        <ul className="space-y-2">
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

            {/* Bottom Bar */}
            <div className="border-t border-brand-border">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-brand-muted">
                            © 2026 AKRAN. Tüm hakları saklıdır. 🇹🇷
                        </p>
                        <div className="flex items-center gap-4 text-xs text-brand-muted">
                            <span>🇹🇷 Türkçe</span>
                            <span className="opacity-50">🇬🇧 English</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
