import { Sector } from './sector';

export interface TenantOwner {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: string;
    avatar?: string;
}

export interface WorkingHours {
    [key: string]: { open: string; close: string; closed?: boolean };
}

export interface TenantSettings {
    phone: string;
    email: string;
    address: string;
    workingHours: WorkingHours;
    // Subscription
    plan: 'trial' | 'basic' | 'pro' | 'enterprise';
    planPrice: number;
    nextBillingDate?: string;
}

export interface Tenant {
    id: string;
    name: string;
    slug: string;
    sector: Sector;
    logo?: string;
    owner: TenantOwner;
    settings: TenantSettings;
}

export interface TenantContextType {
    tenant: Tenant;
    module: any;
    isLoading: boolean;
}
