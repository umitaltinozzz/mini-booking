'use client';

import React from 'react';
import { AdminSidebar } from './AdminSidebar';

export function AdminShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-brand-bg flex">
            <AdminSidebar />
            <main className="flex-1 flex flex-col min-w-0">
                {children}
            </main>
        </div>
    );
}
