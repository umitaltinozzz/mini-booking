export type LogType = 'info' | 'success' | 'warning' | 'error';
export type LogCategory = 'auth' | 'tenant' | 'subscription' | 'demo' | 'system';

export interface ActivityLog {
    id: string;
    type: LogType;
    category: LogCategory;
    message: string;
    details?: string;
    userId?: string;
    userName?: string;
    tenantId?: string;
    tenantName?: string;
    ipAddress?: string;
    createdAt: string;
}

export const mockActivityLogs: ActivityLog[] = [
    {
        id: 'log-001',
        type: 'success',
        category: 'tenant',
        message: 'Yeni işletme oluşturuldu',
        details: 'Saray Kebap işletmesi Pro plan ile sisteme eklendi.',
        userName: 'Super Admin',
        tenantName: 'Saray Kebap',
        ipAddress: '192.168.1.100',
        createdAt: '2026-01-08T15:30:00Z',
    },
    {
        id: 'log-002',
        type: 'info',
        category: 'demo',
        message: 'Yeni demo talebi geldi',
        details: 'Lezzet Durağı Restaurant demo talebi oluşturdu.',
        createdAt: '2026-01-08T14:30:00Z',
    },
    {
        id: 'log-003',
        type: 'warning',
        category: 'subscription',
        message: 'Abonelik süresi dolmak üzere',
        details: 'Classic Cuts deneme süresi 7 gün içinde sona erecek.',
        tenantName: 'Classic Cuts',
        createdAt: '2026-01-08T10:00:00Z',
    },
    {
        id: 'log-004',
        type: 'success',
        category: 'auth',
        message: 'Admin girişi başarılı',
        userName: 'Super Admin',
        ipAddress: '192.168.1.100',
        createdAt: '2026-01-08T09:15:00Z',
    },
    {
        id: 'log-005',
        type: 'error',
        category: 'subscription',
        message: 'Ödeme başarısız',
        details: 'Vitamin Cafe otomatik yenileme ödemesi reddedildi.',
        tenantName: 'Vitamin Cafe',
        createdAt: '2026-01-07T23:00:00Z',
    },
    {
        id: 'log-006',
        type: 'info',
        category: 'demo',
        message: 'Demo talebi güncellendi',
        details: 'Style Masters talebi "reddedildi" olarak işaretlendi.',
        userName: 'Super Admin',
        createdAt: '2026-01-05T10:00:00Z',
    },
    {
        id: 'log-007',
        type: 'success',
        category: 'tenant',
        message: 'İşletme aktifleştirildi',
        details: 'Gentleman Barber hesabı başarıyla aktifleştirildi.',
        userName: 'Super Admin',
        tenantName: 'Gentleman Barber',
        createdAt: '2025-12-01T10:30:00Z',
    },
    {
        id: 'log-008',
        type: 'info',
        category: 'system',
        message: 'Sistem bakımı tamamlandı',
        details: 'Veritabanı optimizasyonu ve yedekleme işlemi başarıyla tamamlandı.',
        createdAt: '2026-01-06T03:00:00Z',
    },
    {
        id: 'log-009',
        type: 'warning',
        category: 'system',
        message: 'Yüksek sunucu yükü',
        details: 'Sunucu CPU kullanımı %85 üzerine çıktı.',
        createdAt: '2026-01-07T19:45:00Z',
    },
    {
        id: 'log-010',
        type: 'success',
        category: 'subscription',
        message: 'Plan yükseltildi',
        details: 'Akdeniz Balık, Pro plandan Enterprise plana geçiş yaptı.',
        tenantName: 'Akdeniz Balık',
        createdAt: '2026-01-04T14:20:00Z',
    },
];

export function getLogsByCategory(category: LogCategory): ActivityLog[] {
    return mockActivityLogs.filter(log => log.category === category);
}

export function getLogsByType(type: LogType): ActivityLog[] {
    return mockActivityLogs.filter(log => log.type === type);
}

export function getRecentLogs(count: number = 5): ActivityLog[] {
    return mockActivityLogs.slice(0, count);
}
