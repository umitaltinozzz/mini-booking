'use client';

import React from 'react';
import { useModule, useTenant } from '@/providers/TenantProvider';
import { Link, usePathname } from '@/i18n/routing';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export function SidebarNav() {
    const { tenant } = useTenant();
    const module = useModule();
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-brand-border bg-brand-surface hidden lg:flex flex-col">
            {/* Logo & Tenant Name */}
            <div className="p-6 border-b border-brand-border">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center text-brand-bg shadow-lg shadow-brand-accent/20">
                        <Icons.Layers size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="font-black text-brand-text truncate text-sm leading-tight">{tenant.name}</h1>
                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mt-0.5">{module.displayName}</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {module.nav.map((item) => {
                    const IconComponent = (Icons as any)[item.icon] as LucideIcon;
                    // Build full href with tenant slug
                    const fullHref = `/${tenant.slug}${item.href}`;
                    const isActive = pathname === fullHref || pathname.endsWith(item.href);

                    return (
                        <Link
                            key={item.id}
                            href={fullHref}
                            className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all group
                                ${isActive
                                    ? 'bg-brand-accent text-brand-bg shadow-lg shadow-brand-accent/20'
                                    : 'text-brand-muted hover:bg-brand-surface2 hover:text-brand-text'}
                            `}
                        >
                            {IconComponent && (
                                <IconComponent
                                    size={18}
                                    className={isActive ? 'text-brand-bg' : 'text-brand-muted group-hover:text-brand-text'}
                                />
                            )}
                            {item.label}
                        </Link>
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
        </aside>
    );
}
