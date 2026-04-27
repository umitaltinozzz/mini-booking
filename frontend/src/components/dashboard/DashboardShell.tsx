'use client';

import React from 'react';
import { SidebarNav } from './SidebarNav';
import { HeaderBar } from './HeaderBar';
import { SectorSwitcherDev } from './SectorSwitcherDev';
import { MobileNav } from './MobileNav';

export function DashboardShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-brand-bg flex">
            {/* Sidebar - hidden on mobile */}
            <SidebarNav />

            {/* Mobile Navigation */}
            <MobileNav />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0">
                <HeaderBar />

                <div className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
                        {children}
                    </div>
                </div>

                {/* Floating Dev Tool */}
                <SectorSwitcherDev />
            </main>
        </div>
    );
}
