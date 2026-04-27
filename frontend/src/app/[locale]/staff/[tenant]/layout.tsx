'use client';

import React, { use } from 'react';
import { StaffSidebar } from '@/components/dashboard/StaffSidebar';
import { StaffHeader } from '@/components/dashboard/StaffHeader';
import { TenantProvider } from '@/providers/TenantProvider';

interface StaffLayoutProps {
    children: React.ReactNode;
    params: Promise<{ tenant: string; locale: string }>;
}

// Staff info based on tenant
const STAFF_BY_TENANT: Record<string, { name: string; title: string; isOnBreak: boolean }> = {
    'asil-berber': { name: 'Canberk', title: 'Kıdemli Berber', isOnBreak: false },
    'mamma-mia': { name: 'Ayşe', title: 'Kıdemli Garson', isOnBreak: false },
    'test-tenant': { name: 'Test', title: 'Test Çalışan', isOnBreak: false },
};

export default function StaffLayout({ children, params }: StaffLayoutProps) {
    const { tenant } = use(params);
    const staffInfo = STAFF_BY_TENANT[tenant] || { name: 'Personel', title: 'Çalışan', isOnBreak: false };

    return (
        <TenantProvider tenantSlug={tenant}>
            <div className="flex h-screen bg-brand-bg overflow-hidden">
                <StaffSidebar />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <StaffHeader
                        staffName={staffInfo.name}
                        staffTitle={staffInfo.title}
                        isOnBreak={staffInfo.isOnBreak}
                    />
                    <div className="flex-1 p-6 overflow-auto">
                        {children}
                    </div>
                </main>
            </div>
        </TenantProvider>
    );
}
