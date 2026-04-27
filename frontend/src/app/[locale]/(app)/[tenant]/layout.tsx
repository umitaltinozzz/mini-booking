import React from 'react';
import { TenantProvider } from '@/providers/TenantProvider';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default async function TenantLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ tenant: string; locale: string }>;
}) {
    const { tenant } = await params;

    return (
        <TenantProvider tenantSlug={tenant}>
            <DashboardShell>
                {children}
            </DashboardShell>
        </TenantProvider>
    );
}
