'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTenant } from '@/providers/TenantProvider';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import { Bell, Search, ChevronDown, User, Settings, LogOut, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function HeaderBar() {
    const { tenant } = useTenant();
    const router = useRouter();
    const locale = useLocale();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Get greeting based on time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Günaydın';
        if (hour < 18) return 'İyi günler';
        return 'İyi akşamlar';
    };

    const handleLogout = async () => {
        setIsDropdownOpen(false);
        const id = toast.loading('Çıkış yapılıyor...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Başarıyla çıkış yapıldı!', { id });
        router.push('/tr/login');
    };

    return (
        <header className="h-16 border-b border-brand-border bg-brand-surface/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-20">
            {/* Search */}
            <div className="flex items-center gap-3 bg-brand-surface2/50 border border-brand-border px-4 py-2 rounded-xl group focus-within:ring-2 focus-within:ring-brand-accent/20 focus-within:border-brand-accent/30 transition-all">
                <Search size={16} className="text-brand-muted group-focus-within:text-brand-accent" />
                <input
                    type="text"
                    placeholder="Müşteri, randevu veya hizmet ara..."
                    className="bg-transparent border-none outline-none text-sm font-medium text-brand-text placeholder:text-brand-muted/50 w-64"
                />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 rounded-xl text-brand-muted hover:text-brand-text hover:bg-brand-surface2 transition-all">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-brand-surface" />
                </button>

                <div className="h-8 w-px bg-brand-border" />

                {/* User Profile with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-brand-surface2 transition-all group"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-brand-text leading-tight">
                                {getGreeting()}, {tenant.owner.firstName} 👋
                            </p>
                            <p className="text-[10px] font-bold text-brand-muted mt-0.5">
                                {tenant.owner.role}
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-accent2 flex items-center justify-center shadow-lg shadow-brand-accent/20 text-brand-bg font-black">
                            {tenant.owner.firstName[0]}{tenant.owner.lastName[0]}
                        </div>
                        <ChevronDown 
                            size={14} 
                            className={`text-brand-muted group-hover:text-brand-text transition-all hidden md:block ${isDropdownOpen ? 'rotate-180' : ''}`} 
                        />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-full mt-2 w-64 bg-brand-surface border border-brand-border rounded-2xl shadow-2xl shadow-black/20 overflow-hidden z-50"
                            >
                                {/* User Info */}
                                <div className="p-4 border-b border-brand-border bg-brand-surface2/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-accent to-brand-accent2 flex items-center justify-center text-brand-bg font-black text-lg">
                                            {tenant.owner.firstName[0]}{tenant.owner.lastName[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-text">
                                                {tenant.owner.firstName} {tenant.owner.lastName}
                                            </p>
                                            <p className="text-xs text-brand-muted">{tenant.owner.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Info */}
                                <div className="p-2 border-b border-brand-border">
                                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-brand-accent/10">
                                        <Building2 size={16} className="text-brand-accent" />
                                        <div>
                                            <p className="text-sm font-bold text-brand-text">{tenant.name}</p>
                                            <p className="text-[10px] text-brand-muted uppercase tracking-wider">{tenant.sector}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="p-2">
                                    <button 
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            router.push(`/${locale}/${tenant.slug}/settings`);
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-surface2 transition-colors text-left group"
                                    >
                                        <User size={16} className="text-brand-muted group-hover:text-brand-accent" />
                                        <span className="text-sm font-medium text-brand-text">Profilim</span>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            router.push(`/${locale}/${tenant.slug}/settings`);
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-surface2 transition-colors text-left group"
                                    >
                                        <Settings size={16} className="text-brand-muted group-hover:text-brand-accent" />
                                        <span className="text-sm font-medium text-brand-text">Ayarlar</span>
                                    </button>
                                </div>

                                {/* Logout */}
                                <div className="p-2 border-t border-brand-border">
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 transition-colors text-left group"
                                    >
                                        <LogOut size={16} className="text-red-500" />
                                        <span className="text-sm font-medium text-red-500">Çıkış Yap</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
