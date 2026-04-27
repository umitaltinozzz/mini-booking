'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Menu, X, ChevronRight, Sun, Moon, Languages } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import Image from 'next/image';
import { useTheme } from 'next-themes';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Navbar() {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

    const SOLUTIONS_ITEMS = [
        { label: 'Kullanım Senaryoları', desc: 'Her rol için özel deneyim', href: '#cozumler', icon: '👥' },
        { label: 'Özellikler', desc: 'Güçlü araçlar ve özellikler', href: '#ozellikler', icon: '⚡' },
        { label: 'Sektör Çözümleri', desc: 'Sektörünüze özel yapılandırma', href: '#sektorler', icon: '🏢' },
        { label: 'Başarı Hikayeleri', desc: 'Müşteri deneyimleri', href: '#hikayeler', icon: '🚀' },
        { label: 'Entegrasyonlar', desc: 'Favori araçlarınızla bağlantı', href: '#entegrasyon', icon: '🔗' },
    ];

    const NAV_LINKS = [
        { label: t('security'), href: '#guvenlik', id: 'guvenlik' },
        { label: t('pricing'), href: '#fiyat', id: 'fiyat' },
        { label: 'SSS', href: '#sss', id: 'sss' },
    ];

    const scrollY = useScrollPosition();
    const activeSection = useActiveSection(['cozumler', ...NAV_LINKS.map(link => link.id)]);
    const isReducedMotion = useReducedMotion();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useLockBodyScroll(isMenuOpen);

    const isScrolled = mounted && scrollY > 8;

    // ESC to close menu
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
                setIsSolutionsOpen(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const toggleLanguage = () => {
        const nextLocale = locale === 'tr' ? 'en' : 'tr';
        router.replace(pathname, { locale: nextLocale });
    };

    if (!mounted) return null;

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b",
                isScrolled
                    ? "bg-brand-bg/80 backdrop-blur-xl border-brand-border py-3"
                    : "bg-transparent py-5 border-transparent"
            )}
        >
            <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg p-1">
                    <div className="relative h-12 md:h-14 w-12 md:w-14">
                        <Image src="/logo/logo.png" alt="Akran Logo" fill className="object-contain" sizes="(max-width: 768px) 48px, 56px" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-brand-text">
                        Akran <span className="text-brand-accent">Randevu</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-1 bg-brand-surface2/50 border border-brand-border rounded-full px-2 py-1 backdrop-blur-md">
                    {/* Solutions Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsSolutionsOpen(true)}
                        onMouseLeave={() => setIsSolutionsOpen(false)}
                    >
                        <button
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent flex items-center gap-1",
                                isSolutionsOpen || activeSection === 'cozumler' ? "text-brand-accent" : "text-brand-muted hover:text-brand-text"
                            )}
                        >
                            {t('solutions')}
                            <ChevronRight size={14} className={cn("transition-transform", isSolutionsOpen ? "rotate-90" : "")} />
                            {activeSection === 'cozumler' && !isSolutionsOpen && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-brand-accent/10 rounded-full -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>

                        <AnimatePresence>
                            {isSolutionsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 mt-2 w-80 bg-brand-surface border border-brand-border rounded-2xl shadow-2xl overflow-hidden"
                                >
                                    <div className="p-3">
                                        {SOLUTIONS_ITEMS.map((item, idx) => (
                                            <a
                                                key={idx}
                                                href={item.href}
                                                onClick={() => setIsSolutionsOpen(false)}
                                                className="flex items-start gap-3 px-3 py-3 rounded-xl text-sm hover:bg-brand-surface2 transition-colors group"
                                            >
                                                <span className="text-xl mt-0.5">{item.icon}</span>
                                                <div>
                                                    <span className="font-semibold text-brand-text group-hover:text-brand-accent transition-colors block">{item.label}</span>
                                                    <span className="text-xs text-brand-muted">{item.desc}</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
                                activeSection === link.id ? "text-brand-accent" : "text-brand-muted hover:text-brand-text"
                            )}
                        >
                            {link.label}
                            {activeSection === link.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-brand-accent/10 rounded-full -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </a>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-text transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        aria-label="Change language"
                        className="h-10 px-3 flex items-center gap-2 rounded-xl bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-text transition-colors text-xs font-bold"
                    >
                        <Languages size={16} />
                        {locale.toUpperCase()}
                    </button>

                    <div className="w-[1px] h-6 bg-brand-border mx-1" />

                    <Link href="/login" className="px-5 py-2.5 text-sm font-semibold text-brand-text bg-brand-surface2 border border-brand-border rounded-xl hover:bg-brand-border transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
                        {t('login')}
                    </Link>
                    <Link
                        href="/demo"
                        className="px-6 py-2.5 text-sm font-bold text-[#06080C] bg-gradient-to-r from-brand-accent to-brand-accent2 rounded-xl shadow-[0_4px_20px_rgba(163,230,53,0.3)] hover:shadow-[0_8px_30px_rgba(163,230,53,0.5)] transition-all active:scale-95 flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg focus-visible:ring-brand-accent"
                    >
                        {t('demo')}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        aria-label={theme === 'dark' ? "Açık temaya geç" : "Koyu temaya geç"}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-surface2 border border-brand-border text-brand-text"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        className="w-11 h-11 flex items-center justify-center bg-brand-surface2 border border-brand-border rounded-xl text-brand-text hover:bg-brand-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-brand-bg/60 backdrop-blur-sm z-[-1] lg:hidden"
                        />
                        <motion.div
                            id="mobile-menu"
                            ref={menuRef}
                            initial={isReducedMotion ? { opacity: 0 } : { x: '100%' }}
                            animate={isReducedMotion ? { opacity: 1 } : { x: 0 }}
                            exit={isReducedMotion ? { opacity: 0 } : { x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-[280px] sm:w-[320px] bg-brand-surface border-l border-brand-border p-6 pt-24 z-[-1] lg:hidden flex flex-col gap-6 shadow-2xl"
                        >
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-2 px-2">Navigasyon</span>
                                {NAV_LINKS.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={cn(
                                            "px-4 py-3 rounded-xl text-lg font-medium transition-all flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
                                            activeSection === link.id ? "bg-brand-accent/10 text-brand-accent" : "text-brand-muted hover:text-brand-text hover:bg-brand-surface2"
                                        )}
                                    >
                                        {link.label}
                                        <ChevronRight className={cn("w-5 h-5 transition-transform group-hover:translate-x-1", activeSection === link.id ? "opacity-100" : "opacity-0")} />
                                    </a>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-2 px-2">Dil</span>
                                <button
                                    onClick={toggleLanguage}
                                    className="px-4 py-3 rounded-xl text-lg font-medium flex items-center gap-3 text-brand-text hover:bg-brand-surface2 transition-colors"
                                >
                                    <Languages size={20} className="text-brand-accent" />
                                    {locale === 'tr' ? 'English (EN)' : 'Türkçe (TR)'}
                                </button>
                            </div>

                            <div className="mt-auto flex flex-col gap-3">
                                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 text-center font-bold text-brand-text bg-brand-surface2 border border-brand-border rounded-2xl hover:bg-brand-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
                                    {t('login')}
                                </Link>
                                <Link
                                    href="/demo"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full py-4 text-center font-bold text-[#06080C] bg-gradient-to-r from-brand-accent to-brand-accent2 rounded-2xl shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                                >
                                    {t('demo')}
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
