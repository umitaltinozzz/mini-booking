'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tenant, TenantContextType } from '../types/tenant';
import { IndustryModule } from '../types/sector';
import { getModule } from '../registry/modules';
import { MOCK_TENANTS } from '../data/mockTenants';
import { useSearchParams } from 'next/navigation';

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({
    children,
    tenantSlug
}: {
    children: React.ReactNode;
    tenantSlug: string
}) {
    const searchParams = useSearchParams();
    const [state, setState] = useState<{
        tenant: Tenant;
        module: IndustryModule;
    } | null>(null);

    useEffect(() => {
        // 1. Find tenant by slug
        let tenant = MOCK_TENANTS.find(t => t.slug === tenantSlug);

        if (!tenant) {
            // Fallback for demo
            tenant = MOCK_TENANTS[0];
        }

        // 2. Allow dev override via ?sector=...
        const sectorOverride = searchParams.get('sector') as any;
        const finalSector = sectorOverride || tenant.sector;

        // 3. Load associated module
        const module = getModule(finalSector);

        setState({
            tenant: { ...tenant, sector: finalSector },
            module,
        });
    }, [tenantSlug, searchParams]);

    if (!state) return <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-muted font-black animate-pulse">LOADING DASHBOARD...</div>;

    return (
        <TenantContext.Provider value={{ ...state, isLoading: false }}>
            {children}
        </TenantContext.Provider>
    );
}

export function useTenant() {
    const context = useContext(TenantContext);
    if (!context) throw new Error('useTenant must be used within a TenantProvider');
    return context;
}

export function useModule() {
    const { module } = useTenant();
    return module as IndustryModule;
}
