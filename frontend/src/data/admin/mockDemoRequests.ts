export type DemoRequestStatus = 'pending' | 'contacted' | 'approved' | 'rejected';

export interface DemoRequest {
    id: string;
    businessName: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    sector: 'restaurant' | 'barber' | 'clinic' | 'salon' | 'other';
    notes: string;
    status: DemoRequestStatus;
    createdAt: string;
    reviewedAt?: string;
}

export const mockDemoRequests: DemoRequest[] = [
    {
        id: 'dr-001',
        businessName: 'Lezzet Durağı Restaurant',
        contactName: 'Ahmet Yılmaz',
        contactEmail: 'ahmet@lezzetduragi.com',
        contactPhone: '+90 532 123 4567',
        sector: 'restaurant',
        notes: '45 kişilik restoran, öncelikle rezervasyon sistemi istiyoruz. Mevcut sistemimiz çok eski.',
        status: 'pending',
        createdAt: '2026-01-08T14:30:00Z',
    },
    {
        id: 'dr-002',
        businessName: 'Gentleman Barber Shop',
        contactName: 'Canberk Hızlı',
        contactEmail: 'info@gentlemanbarber.com',
        contactPhone: '+90 533 987 6543',
        sector: 'barber',
        notes: '3 personelli berber dükkanı, online randevu almak istiyoruz.',
        status: 'contacted',
        createdAt: '2026-01-07T10:15:00Z',
        reviewedAt: '2026-01-07T16:00:00Z',
    },
    {
        id: 'dr-003',
        businessName: 'Saray Kebap',
        contactName: 'Mustafa Demir',
        contactEmail: 'mustafa@saraykebap.com',
        contactPhone: '+90 534 555 1234',
        sector: 'restaurant',
        notes: '80 kişilik restoran, 2 kat. Kat planı özelliği çok ilgimizi çekti.',
        status: 'approved',
        createdAt: '2026-01-05T09:00:00Z',
        reviewedAt: '2026-01-06T11:30:00Z',
    },
    {
        id: 'dr-004',
        businessName: 'Style Masters',
        contactName: 'Deniz Kara',
        contactEmail: 'deniz@stylemasters.com',
        contactPhone: '+90 535 444 7890',
        sector: 'salon',
        notes: 'Kuaför salonu, 6 personel. Hem saç hem cilt bakımı yapıyoruz.',
        status: 'rejected',
        createdAt: '2026-01-04T16:45:00Z',
        reviewedAt: '2026-01-05T10:00:00Z',
    },
    {
        id: 'dr-005',
        businessName: 'Vitamin Cafe',
        contactName: 'Elif Şen',
        contactEmail: 'elif@vitamincafe.com',
        contactPhone: '+90 536 222 3333',
        sector: 'restaurant',
        notes: 'Brunch konsepti cafe, 30 kişilik. Hafta sonu yoğunluğunu yönetmek istiyoruz.',
        status: 'pending',
        createdAt: '2026-01-08T18:00:00Z',
    },
];

export function getDemoRequestsByStatus(status: DemoRequestStatus): DemoRequest[] {
    return mockDemoRequests.filter(dr => dr.status === status);
}

export function getDemoRequestStats() {
    return {
        total: mockDemoRequests.length,
        pending: mockDemoRequests.filter(dr => dr.status === 'pending').length,
        contacted: mockDemoRequests.filter(dr => dr.status === 'contacted').length,
        approved: mockDemoRequests.filter(dr => dr.status === 'approved').length,
        rejected: mockDemoRequests.filter(dr => dr.status === 'rejected').length,
    };
}
