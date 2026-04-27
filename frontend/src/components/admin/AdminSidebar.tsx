'use client';

import React from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { toast } from 'sonner';
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    CreditCard,
    ScrollText,
    Settings,
    LogOut,
    ShieldCheck,
    ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { id: 'demo-requests', label: 'Demo Talepleri', href: '/admin/demo-requests', icon: MessageSquare },
    { id: 'tenants', label: 'İşletmeler', href: '/admin/tenants', icon: Users },
    { id: 'plans', label: 'Planlar', href: '/admin/plans', icon: CreditCard },
    { id: 'logs', label: 'Aktivite Logları', href: '/admin/logs', icon: ScrollText },
    { id: 'settings', label: 'Ayarlar', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    const handleLogout = () => {
        toast.success('Çıkış yapıldı!');
        router.push('/login');
    };

    return (
        <aside className="w-72 border-r border-brand-border bg-brand-surface hidden lg:flex flex-col">
            {/* Logo */}
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                        <ShieldCheck size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-black tracking-tight text-brand-text">AKRAN</h1>
                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Super Admin</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`
                                flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all group
                                ${active
                                    ? 'bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-500 border border-red-500/20'
                                    : 'text-brand-muted hover:bg-brand-surface2 hover:text-brand-text'}
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={18} className={active ? 'text-red-500' : 'text-brand-muted group-hover:text-brand-text'} />
                                {item.label}
                            </div>
                            {active && <ChevronRight size={14} className="text-red-500" />}
                        </Link>
                    );
                })}
            </nav>

            {/* User Info */}
            <div className="p-4 border-t border-brand-border">
                <div className="p-4 rounded-2xl bg-brand-surface2/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-black text-sm">
                        SA
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-brand-text truncate text-sm">Super Admin</p>
                        <p className="text-[10px] font-bold text-brand-muted truncate">admin@akran.io</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="p-2 rounded-lg hover:bg-brand-surface transition-colors text-brand-muted hover:text-red-500"
                        title="Çıkış Yap"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
