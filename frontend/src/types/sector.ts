import React from 'react';

export type Sector = 'restaurant' | 'barber';

export interface NavItem {
    id: string;
    label: string;
    href: string;
    icon: string;
    permission?: string;
}

export interface IndustryModule {
    id: Sector;
    displayName: string;
    nav: NavItem[];
    Dashboard: React.ComponentType;
    labels: Record<string, string>;
    policies: {
        waitingListPolicy: 'table-based' | 'staff-based';
        appointmentMetadataSchemaId?: string;
    };
    appointmentsConfig?: {
        columns: string[];
    };
}
