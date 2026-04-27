export interface Plan {
    id: string;
    name: string;
    slug: 'trial' | 'basic' | 'pro' | 'enterprise';
    price: number;
    currency: string;
    billingCycle: 'monthly' | 'yearly';
    features: string[];
    limits: {
        maxStaff: number;
        maxResources: number;
        maxAppointmentsPerMonth: number;
        maxCustomers: number;
    };
    isPopular: boolean;
    isActive: boolean;
}

export const mockPlans: Plan[] = [
    {
        id: 'plan-trial',
        name: 'Deneme',
        slug: 'trial',
        price: 0,
        currency: 'TRY',
        billingCycle: 'monthly',
        features: [
            '14 gün ücretsiz deneme',
            'Temel randevu yönetimi',
            'E-posta bildirimleri',
            'Temel raporlar',
        ],
        limits: {
            maxStaff: 2,
            maxResources: 5,
            maxAppointmentsPerMonth: 50,
            maxCustomers: 100,
        },
        isPopular: false,
        isActive: true,
    },
    {
        id: 'plan-basic',
        name: 'Başlangıç',
        slug: 'basic',
        price: 299,
        currency: 'TRY',
        billingCycle: 'monthly',
        features: [
            'Sınırsız randevu',
            '5 personel',
            'SMS bildirimleri',
            'Temel raporlar',
            'E-posta desteği',
            'Müşteri veritabanı',
        ],
        limits: {
            maxStaff: 5,
            maxResources: 10,
            maxAppointmentsPerMonth: 500,
            maxCustomers: 500,
        },
        isPopular: false,
        isActive: true,
    },
    {
        id: 'plan-pro',
        name: 'Profesyonel',
        slug: 'pro',
        price: 599,
        currency: 'TRY',
        billingCycle: 'monthly',
        features: [
            'Sınırsız randevu',
            '15 personel',
            'SMS + WhatsApp bildirimleri',
            'Gelişmiş raporlar',
            'Öncelikli destek',
            'API erişimi',
            'Özel branding',
            'Bekleme listesi',
        ],
        limits: {
            maxStaff: 15,
            maxResources: 30,
            maxAppointmentsPerMonth: 2000,
            maxCustomers: 2000,
        },
        isPopular: true,
        isActive: true,
    },
    {
        id: 'plan-enterprise',
        name: 'Kurumsal',
        slug: 'enterprise',
        price: 1299,
        currency: 'TRY',
        billingCycle: 'monthly',
        features: [
            'Sınırsız her şey',
            'Sınırsız personel',
            'Dedike hesap yöneticisi',
            'Özel entegrasyonlar',
            '7/24 destek',
            'SLA garantisi',
            'Çoklu lokasyon',
            'Gelişmiş analitik',
        ],
        limits: {
            maxStaff: 999,
            maxResources: 999,
            maxAppointmentsPerMonth: 99999,
            maxCustomers: 99999,
        },
        isPopular: false,
        isActive: true,
    },
];

export function getPlanBySlug(slug: string): Plan | undefined {
    return mockPlans.find(p => p.slug === slug);
}
