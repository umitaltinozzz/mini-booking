'use client';

import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

interface AdminHeaderProps {
    title: string;
    subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
    return (
        <header className="h-20 border-b border-brand-border bg-brand-surface/80 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Left: Title */}
            <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 rounded-xl bg-brand-surface2 text-brand-muted hover:text-brand-text">
                    <Menu size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-black tracking-tight text-brand-text">{title}</h1>
                    {subtitle && (
                        <p className="text-xs font-medium text-brand-muted">{subtitle}</p>
                    )}
                </div>
            </div>

            {/* Right: Search & Actions */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="hidden md:flex items-center gap-3 px-4 h-10 rounded-xl bg-brand-surface2 border border-brand-border w-64">
                    <Search size={16} className="text-brand-muted" />
                    <input
                        type="text"
                        placeholder="Ara..."
                        className="flex-1 bg-transparent text-sm font-medium text-brand-text placeholder:text-brand-muted outline-none"
                    />
                    <kbd className="text-[10px] font-bold text-brand-muted bg-brand-surface px-1.5 py-0.5 rounded border border-brand-border">⌘K</kbd>
                </div>

                {/* Notifications */}
                <button className="relative p-2.5 rounded-xl bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-text/20 transition-all">
                    <Bell size={18} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                        3
                    </span>
                </button>

                {/* Current Time */}
                <div className="hidden lg:block text-right">
                    <p className="text-xs font-bold text-brand-muted">Türkiye (GMT+3)</p>
                    <p className="text-sm font-black text-brand-text">
                        {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>
        </header>
    );
}
