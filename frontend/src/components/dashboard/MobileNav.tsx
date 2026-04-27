'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useModule, useTenant } from '@/providers/TenantProvider';
import { Link, usePathname } from '@/i18n/routing';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const { tenant } = useTenant();
    const module = useModule();
    const pathname = usePathname();

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-brand-accent text-brand-bg rounded-2xl shadow-lg shadow-brand-accent/30 flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Menüyü Aç"
            >
                <Menu size={24} />
            </button>

            {/* Mobile Slide-out Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Sidebar */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-brand-surface border-r border-brand-border z-50 flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-5 border-b border-brand-border flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center text-brand-bg shadow-lg shadow-brand-accent/20">
                                        <Icons.Layers size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h1 className="font-black text-brand-text truncate text-sm leading-tight">{tenant.name}</h1>
                                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mt-0.5">{module.displayName}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-brand-surface2 rounded-xl transition-colors"
                                    aria-label="Menüyü Kapat"
                                >
                                    <X size={20} className="text-brand-muted" />
                                </button>
                            </div>

                            {/* Navigation */}
                            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                                {module.nav.map((item, index) => {
                                    const IconComponent = (Icons as any)[item.icon] as LucideIcon;
                                    const fullHref = `/${tenant.slug}${item.href}`;
                                    const isActive = pathname === fullHref || pathname.endsWith(item.href);

                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={fullHref}
                                                className={`
                                                    flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all group
                                                    ${isActive
                                                        ? 'bg-brand-accent text-brand-bg shadow-lg shadow-brand-accent/20'
                                                        : 'text-brand-muted hover:bg-brand-surface2 hover:text-brand-text'}
                                                `}
                                            >
                                                {IconComponent && (
                                                    <IconComponent
                                                        size={20}
                                                        className={isActive ? 'text-brand-bg' : 'text-brand-muted group-hover:text-brand-text'}
                                                    />
                                                )}
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            {/* Bottom Section - Quick Stats */}
                            <div className="p-4 border-t border-brand-border">
                                <div className="bg-gradient-to-br from-brand-accent/10 to-brand-accent2/10 rounded-2xl p-4 border border-brand-accent/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icons.Zap size={14} className="text-brand-accent" />
                                        <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">Bugün</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-xl font-black text-brand-text">14</p>
                                            <p className="text-[9px] font-bold text-brand-muted uppercase">Randevu</p>
                                        </div>
                                        <div>
                                            <p className="text-xl font-black text-brand-text">₺2.4K</p>
                                            <p className="text-[9px] font-bold text-brand-muted uppercase">Ciro</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
