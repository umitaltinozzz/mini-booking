'use client';

import { useState, useEffect } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import Image from 'next/image';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';

export function BrandsNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { theme, setTheme } = useTheme();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        const nextLocale = locale === 'tr' ? 'en' : 'tr';
        router.replace(pathname, { locale: nextLocale });
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (!mounted) return null;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
            ? 'bg-brand-bg/70 backdrop-blur-xl border-brand-border shadow-lg shadow-brand-accent/5'
            : 'bg-brand-bg/50 backdrop-blur-md border-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group relative h-14 md:h-16 w-14 md:w-16">
                    <Image src="/logo/logo.png" alt="Akran Logo" fill className="object-contain" sizes="(max-width: 768px) 56px, 64px" />
                </Link>

                {/* Right Side - Desktop */}
                <div className="hidden md:flex items-center gap-2">
                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface2 transition-all"
                        title={locale === 'tr' ? 'English' : 'Türkçe'}
                        aria-label="Change language"
                    >
                        <Languages className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase">{locale}</span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface2 transition-all"
                        title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-4 h-4" />
                        ) : (
                            <Moon className="w-4 h-4" />
                        )}
                    </button>

                    <div className="w-px h-6 bg-brand-border mx-2" />

                    <Link
                        href="/login"
                        className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors px-4 py-2"
                    >
                        Giriş Yap
                    </Link>
                    <Link
                        href="/"
                        className="text-sm font-bold bg-brand-accent text-[#06080C] px-5 py-2.5 rounded-xl hover:bg-brand-accent2 transition-colors shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:shadow-[0_0_30px_rgba(163,230,53,0.4)]"
                    >
                        İşletme Ekle
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-brand-surface2 transition-colors"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? (
                        <X className="w-5 h-5 text-brand-text" />
                    ) : (
                        <Menu className="w-5 h-5 text-brand-text" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-brand-bg/95 backdrop-blur-xl border-t border-brand-border">
                    <div className="px-6 py-4 space-y-3">
                        {/* Theme & Language Row */}
                        <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface2 transition-all"
                                aria-label="Change language"
                            >
                                <Languages className="w-4 h-4" />
                                <span className="text-sm">{locale === 'tr' ? 'English' : 'Türkçe'}</span>
                            </button>
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface2 transition-all"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <>
                                        <Sun className="w-4 h-4" />
                                        <span className="text-sm">Light</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon className="w-4 h-4" />
                                        <span className="text-sm">Dark</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <Link
                            href="/login"
                            className="block text-sm font-medium text-brand-muted hover:text-brand-text py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Giriş Yap
                        </Link>
                        <Link
                            href="/"
                            className="block text-sm font-bold bg-brand-accent text-[#06080C] px-4 py-2.5 rounded-xl text-center shadow-[0_0_20px_rgba(163,230,53,0.2)]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            İşletme Ekle
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
