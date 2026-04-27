export type TenantSector = 'restaurant' | 'barber' | 'clinic' | 'salon';
export type SubscriptionPlan = 'trial' | 'basic' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'trial';

export interface Tenant {
    id: string;
    name: string;
    slug: string;
    sector: TenantSector;
    email: string;
    phone: string;
    address: string;
    logoUrl?: string;
    subscription: {
        plan: SubscriptionPlan;
        status: SubscriptionStatus;
        startDate: string;
        endDate: string;
    };
    stats: {
        totalAppointments: number;
        totalCustomers: number;
        totalStaff: number;
        totalResources: number;
    };
    createdAt: string;
    isActive: boolean;
}

export const mockTenants: Tenant[] = [
    {
        id: 'tenant-001',
        name: 'Saray Kebap',
        slug: 'saray-kebap',
        sector: 'restaurant',
        email: 'mustafa@saraykebap.com',
        phone: '+90 534 555 1234',
        address: 'Kadıköy, İstanbul',
        subscription: {
            plan: 'pro',
            status: 'active',
            startDate: '2026-01-06',
            endDate: '2027-01-06',
        },
        stats: {
            totalAppointments: 342,
            totalCustomers: 189,
            totalStaff: 8,
            totalResources: 20,
        },
        createdAt: '2026-01-06T12:00:00Z',
        isActive: true,
    },
    {
        id: 'tenant-002',
        name: 'Gentleman Barber',
        slug: 'gentleman-barber',
        sector: 'barber',
        email: 'info@gentlemanbarber.com',
        phone: '+90 533 987 6543',
        address: 'Beşiktaş, İstanbul',
        subscription: {
            plan: 'basic',
            status: 'active',
            startDate: '2025-12-01',
            endDate: '2026-06-01',
        },
        stats: {
            totalAppointments: 856,
            totalCustomers: 312,
            totalStaff: 3,
            totalResources: 4,
        },
        createdAt: '2025-12-01T10:00:00Z',
        isActive: true,
    },
    {
        id: 'tenant-003',
        name: 'Akdeniz Balık',
        slug: 'akdeniz-balik',
        sector: 'restaurant',
        email: 'iletisim@akdenizbalik.com',
        phone: '+90 537 111 2222',
        address: 'Sarıyer, İstanbul',
        subscription: {
            plan: 'enterprise',
            status: 'active',
            startDate: '2025-10-15',
            endDate: '2026-10-15',
        },
        stats: {
            totalAppointments: 1247,
            totalCustomers: 534,
            totalStaff: 15,
            totalResources: 35,
        },
        createdAt: '2025-10-15T09:00:00Z',
        isActive: true,
    },
    {
        id: 'tenant-004',
        name: 'Classic Cuts',
        slug: 'classic-cuts',
        sector: 'barber',
        email: 'hello@classiccuts.com',
        phone: '+90 538 333 4444',
        address: 'Şişli, İstanbul',
        subscription: {
            plan: 'trial',
            status: 'trial',
            startDate: '2026-01-01',
            endDate: '2026-01-15',
        },
        stats: {
            totalAppointments: 23,
            totalCustomers: 18,
            totalStaff: 2,
            totalResources: 2,
        },
        createdAt: '2026-01-01T14:00:00Z',
        isActive: true,
    },
    {
        id: 'tenant-005',
        name: 'Vitamin Cafe',
        slug: 'vitamin-cafe',
        sector: 'restaurant',
        email: 'elif@vitamincafe.com',
        phone: '+90 536 222 3333',
        address: 'Nişantaşı, İstanbul',
        subscription: {
            plan: 'basic',
            status: 'expired',
            startDate: '2025-06-01',
            endDate: '2025-12-01',
        },
        stats: {
            totalAppointments: 567,
            totalCustomers: 234,
            totalStaff: 4,
            totalResources: 12,
        },
        createdAt: '2025-06-01T11:00:00Z',
        isActive: false,
    },
];

export function getTenantStats() {
    const active = mockTenants.filter(t => t.isActive).length;
    const byPlan = {
        trial: mockTenants.filter(t => t.subscription.plan === 'trial').length,
        basic: mockTenants.filter(t => t.subscription.plan === 'basic').length,
        pro: mockTenants.filter(t => t.subscription.plan === 'pro').length,
        enterprise: mockTenants.filter(t => t.subscription.plan === 'enterprise').length,
    };
    const bySector = {
        restaurant: mockTenants.filter(t => t.sector === 'restaurant').length,
        barber: mockTenants.filter(t => t.sector === 'barber').length,
    };
    const totalRevenue = mockTenants.reduce((acc, t) => {
        const planPrices = { trial: 0, basic: 299, pro: 599, enterprise: 1299 };
        return acc + (t.isActive ? planPrices[t.subscription.plan] : 0);
    }, 0);

    return { total: mockTenants.length, active, byPlan, bySector, totalRevenue };
}
