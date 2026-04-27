'use client';

import React from 'react';
import { useTenant } from '@/providers/TenantProvider';
import { Link, usePathname } from '@/i18n/routing';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import {
    LayoutDashboard, Calendar, Settings, LogOut,
    Clock, User, HelpCircle, UtensilsCrossed, Users
} from 'lucide-react';

// Berber staff navigation
const barberNavItems = [
    { id: 'dashboard', label: 'Programım', href: '/dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Randevularım', href: '/appointments', icon: Calendar },
    { id: 'availability', label: 'Müsaitlik', href: '/availability', icon: Clock },
    { id: 'profile', label: 'Profilim', href: '/profile', icon: User },
];

// Restaurant staff navigation
const restaurantNavItems = [
    { id: 'dashboard', label: 'Masalarım', href: '/dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Siparişler', href: '/appointments', icon: UtensilsCrossed },
    { id: 'customers', label: 'Misafirler', href: '/availability', icon: Users },
    { id: 'profile', label: 'Profilim', href: '/profile', icon: User },
];

const staffBottomItems = [
    { id: 'help', label: 'Yardım', href: '/help', icon: HelpCircle },
    { id: 'settings', label: 'Ayarlar', href: '/settings', icon: Settings },
];

// Staff info based on sector
const STAFF_INFO = {
    barber: {
        name: 'Canberk H.',
        initials: 'CB',
        role: 'Berber',
        gradient: 'from-purple-500 to-pink-500',
        color: 'purple',
        stats: { appointments: '8/12', earnings: '₺1.8K', label1: 'Randevu', label2: 'Kazanç' }
    },
    restaurant: {
        name: 'Ayşe G.',
        initials: 'AG',
        role: 'Garson',
        gradient: 'from-orange-500 to-red-500',
        color: 'orange',
        stats: { appointments: '4/6', earnings: '₺420', label1: 'Masa', label2: 'Bahşiş' }
    }
};

export function StaffSidebar() {
    const { tenant } = useTenant();
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();

    const isRestaurant = tenant.sector === 'restaurant';
    const navItems = isRestaurant ? restaurantNavItems : barberNavItems;
    const staffInfo = isRestaurant ? STAFF_INFO.restaurant : STAFF_INFO.barber;

    const handleLogout = async () => {
        const id = toast.loading('Çıkış Yapılıyor...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Başarıyla çıkış yapıldı!', { id });
        router.push(`/${locale}/login`);
    };

    return (
        <aside className="w-64 border-r border-brand-border bg-brand-surface hidden lg:flex flex-col">
            {/* Logo & Staff Badge */}
            <div className="p-6 border-b border-brand-border">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${staffInfo.gradient} rounded-xl flex items-center justify-center text-white font-black shadow-lg`}>
                        {staffInfo.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="font-black text-brand-text truncate text-sm leading-tight">{staffInfo.name}</h1>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className={`px-2 py-0.5 bg-${staffInfo.color}-500/10 text-${staffInfo.color}-500 rounded text-[9px] font-bold uppercase tracking-wider`}>
                                {staffInfo.role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tenant Info */}
            <div className="px-4 py-3 border-b border-brand-border bg-brand-surface2/30">
                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">İşletme</p>
                <p className="text-sm font-bold text-brand-text truncate">{tenant.name}</p>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <p className="px-3 py-2 text-[10px] font-bold text-brand-muted uppercase tracking-widest">Menü</p>
                {navItems.map((item) => {
                    const fullHref = `/staff/${tenant.slug}${item.href}`;
                    const isActive = pathname === fullHref || pathname.endsWith(item.href);
                    const activeColor = isRestaurant ? 'bg-orange-500 shadow-orange-500/20' : 'bg-purple-500 shadow-purple-500/20';

                    return (
                        <Link
                            key={item.id}
                            href={fullHref}
                            className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all group
                                ${isActive
                                    ? `${activeColor} text-white shadow-lg`
                                    : 'text-brand-muted hover:bg-brand-surface2 hover:text-brand-text'}
                            `}
                        >
                            <item.icon
                                size={18}
                                className={isActive ? 'text-white' : 'text-brand-muted group-hover:text-brand-text'}
                            />
                            {item.label}
                        </Link>
                    );
                })}

                <div className="pt-4">
                    <p className="px-3 py-2 text-[10px] font-bold text-brand-muted uppercase tracking-widest">Diğer</p>
                    {staffBottomItems.map((item) => {
                        const fullHref = `/staff/${tenant.slug}${item.href}`;
                        const isActive = pathname === fullHref || pathname.endsWith(item.href);
                        const activeColor = isRestaurant ? 'bg-orange-500' : 'bg-purple-500';

                        return (
                            <Link
                                key={item.id}
                                href={fullHref}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all group
                                    ${isActive
                                        ? `${activeColor} text-white`
                                        : 'text-brand-muted hover:bg-brand-surface2 hover:text-brand-text'}
                                `}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Quick Stats */}
            <div className="p-4 border-t border-brand-border">
                <div className={`bg-gradient-to-br ${isRestaurant ? 'from-orange-500/10 to-red-500/10 border-orange-500/20' : 'from-purple-500/10 to-pink-500/10 border-purple-500/20'} rounded-2xl p-4 border`}>
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar size={14} className={isRestaurant ? 'text-orange-500' : 'text-purple-500'} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isRestaurant ? 'text-orange-500' : 'text-purple-500'}`}>Bugün</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="text-xl font-black text-brand-text">{staffInfo.stats.appointments}</p>
                            <p className="text-[9px] font-bold text-brand-muted uppercase">{staffInfo.stats.label1}</p>
                        </div>
                        <div>
                            <p className="text-xl font-black text-brand-text">{staffInfo.stats.earnings}</p>
                            <p className="text-[9px] font-bold text-brand-muted uppercase">{staffInfo.stats.label2}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-brand-border">
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-bold text-sm"
                >
                    <LogOut size={18} />
                    Çıkış Yap
                </button>
            </div>
        </aside>
    );
}
