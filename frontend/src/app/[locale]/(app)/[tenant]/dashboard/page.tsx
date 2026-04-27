'use client';

import React from 'react';
import { useModule } from '@/providers/TenantProvider';
import { WaitingList } from '@/components/dashboard/shared/WaitingList';

export default function DashboardPage() {
    const module = useModule();
    const DashboardComponent = module.Dashboard;

    return (
        <div className="space-y-12">
            {/* Sector Specific Dashboard Entry */}
            <DashboardComponent />

            {/* Shared Components always visible here */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                <div className="xl:col-span-12">
                    <WaitingList />
                </div>
            </div>
        </div>
    );
}
