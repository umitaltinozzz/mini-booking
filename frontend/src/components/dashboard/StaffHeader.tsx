'use client';

import React from 'react';
import { Bell, Search, ChevronDown, Coffee } from 'lucide-react';

interface StaffHeaderProps {
    staffName: string;
    staffTitle: string;
    isOnBreak?: boolean;
}

export function StaffHeader({ staffName, staffTitle, isOnBreak = false }: StaffHeaderProps) {
    // Get greeting based on time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Günaydın';
        if (hour < 18) return 'İyi günler';
        return 'İyi akşamlar';
    };

    return (
        <header className="h-16 border-b border-brand-border bg-brand-surface/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-20">
            {/* Left - Greeting */}
            <div>
                <h1 className="text-lg font-black text-brand-text">
                    {getGreeting()}, {staffName}! 👋
                </h1>
                <p className="text-xs text-brand-muted font-medium">{staffTitle}</p>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                {/* Break Status */}
                {isOnBreak ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                        <Coffee size={14} className="text-orange-500" />
                        <span className="text-xs font-bold text-orange-500">Molada</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-green-500">Aktif</span>
                    </div>
                )}

                {/* Notifications */}
                <button className="relative p-2 rounded-xl text-brand-muted hover:text-brand-text hover:bg-brand-surface2 transition-all">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-brand-surface" />
                </button>

                <div className="h-8 w-px bg-brand-border" />

                {/* Current Time */}
                <div className="text-right">
                    <p className="text-lg font-black text-brand-text">
                        {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest">
                        {new Date().toLocaleDateString('tr-TR', { weekday: 'long' })}
                    </p>
                </div>
            </div>
        </header>
    );
}
