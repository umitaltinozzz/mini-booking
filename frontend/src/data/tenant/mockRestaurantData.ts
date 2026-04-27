// Restaurant-specific mock data

export interface Table {
    id: string;
    number: number;
    seats: number;
    status: 'available' | 'occupied' | 'reserved';
    section: 'inside' | 'outside' | 'vip';
    assignedWaiter?: string;
}

export interface RestaurantReservation {
    id: string;
    customerName: string;
    customerPhone: string;
    tableNumber: number;
    guestCount: number;
    date: string;
    time: string;
    duration: string;
    status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no-show';
    notes?: string;
    createdAt: string;
}

export interface RestaurantWaitlistEntry {
    id: string;
    customerName: string;
    customerPhone: string;
    guestCount: number;
    preferredSection?: 'inside' | 'outside' | 'vip' | 'any';
    notes?: string;
    estimatedWait: string;
    addedAt: string;
    priority: 'normal' | 'high' | 'vip';
}

export interface RestaurantStaff {
    id: string;
    name: string;
    role: 'waiter' | 'host' | 'manager' | 'chef';
    assignedSection: string;
    phone: string;
    isActive: boolean;
    shift: string;
    avatar?: string;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    isAvailable: boolean;
    preparationTime: string;
}

// Mock Tables
export const mockTables: Table[] = [
    { id: 't1', number: 1, seats: 2, status: 'available', section: 'inside' },
    { id: 't2', number: 2, seats: 4, status: 'occupied', section: 'inside', assignedWaiter: 'Ahmet' },
    { id: 't3', number: 3, seats: 4, status: 'reserved', section: 'inside' },
    { id: 't4', number: 4, seats: 6, status: 'available', section: 'inside' },
    { id: 't5', number: 5, seats: 2, status: 'occupied', section: 'outside', assignedWaiter: 'Mehmet' },
    { id: 't6', number: 6, seats: 4, status: 'available', section: 'outside' },
    { id: 't7', number: 7, seats: 8, status: 'reserved', section: 'vip' },
    { id: 't8', number: 8, seats: 4, status: 'available', section: 'vip' },
];

// Mock Reservations
export const mockRestaurantReservations: RestaurantReservation[] = [
    {
        id: 'rr1',
        customerName: 'Zeynep Yıldırım',
        customerPhone: '0532 123 45 67',
        tableNumber: 3,
        guestCount: 4,
        date: '2026-01-09',
        time: '19:00',
        duration: '2 saat',
        status: 'confirmed',
        notes: 'Cam kenarı tercih',
        createdAt: '2026-01-08T14:00:00Z'
    },
    {
        id: 'rr2',
        customerName: 'Mehmet Aksoy',
        customerPhone: '0533 234 56 78',
        tableNumber: 7,
        guestCount: 8,
        date: '2026-01-09',
        time: '20:00',
        duration: '3 saat',
        status: 'confirmed',
        notes: 'Doğum günü kutlaması, pasta getirilecek',
        createdAt: '2026-01-07T10:00:00Z'
    },
    {
        id: 'rr3',
        customerName: 'Ayşe Kara',
        customerPhone: '0534 345 67 89',
        tableNumber: 2,
        guestCount: 2,
        date: '2026-01-09',
        time: '18:30',
        duration: '1.5 saat',
        status: 'seated',
        createdAt: '2026-01-09T12:00:00Z'
    },
    {
        id: 'rr4',
        customerName: 'Ali Veli',
        customerPhone: '0535 456 78 90',
        tableNumber: 5,
        guestCount: 2,
        date: '2026-01-09',
        time: '19:30',
        duration: '1.5 saat',
        status: 'pending',
        createdAt: '2026-01-09T15:00:00Z'
    },
];

// Mock Waitlist - Restaurant Specific
export const mockRestaurantWaitlist: RestaurantWaitlistEntry[] = [
    {
        id: 'rw1',
        customerName: 'Deniz Yılmaz',
        customerPhone: '0536 567 89 01',
        guestCount: 4,
        preferredSection: 'outside',
        notes: 'Bebek arabası için yer lazım',
        estimatedWait: '20 dk',
        addedAt: '2026-01-09T18:45:00Z',
        priority: 'normal'
    },
    {
        id: 'rw2',
        customerName: 'Cem Karaca',
        customerPhone: '0537 678 90 12',
        guestCount: 6,
        preferredSection: 'vip',
        notes: 'İş yemeği, sessiz ortam tercih',
        estimatedWait: '30 dk',
        addedAt: '2026-01-09T18:50:00Z',
        priority: 'vip'
    },
    {
        id: 'rw3',
        customerName: 'Selin Ak',
        customerPhone: '0538 789 01 23',
        guestCount: 2,
        preferredSection: 'any',
        notes: 'Cam kenarı olursa güzel olur',
        estimatedWait: '10 dk',
        addedAt: '2026-01-09T19:00:00Z',
        priority: 'normal'
    },
];

// Mock Staff
export const mockRestaurantStaff: RestaurantStaff[] = [
    { id: 'rs1', name: 'Ahmet Yılmaz', role: 'waiter', assignedSection: 'İç Salon', phone: '0532 111 22 33', isActive: true, shift: '10:00 - 22:00' },
    { id: 'rs2', name: 'Mehmet Demir', role: 'waiter', assignedSection: 'Bahçe', phone: '0533 222 33 44', isActive: true, shift: '12:00 - 23:00' },
    { id: 'rs3', name: 'Fatma Kaya', role: 'host', assignedSection: 'Giriş', phone: '0534 333 44 55', isActive: true, shift: '11:00 - 23:00' },
    { id: 'rs4', name: 'Zeynep Şen', role: 'waiter', assignedSection: 'VIP', phone: '0535 444 55 66', isActive: false, shift: '17:00 - 02:00' },
    { id: 'rs5', name: 'Hakan Öz', role: 'manager', assignedSection: 'Genel', phone: '0536 555 66 77', isActive: true, shift: '10:00 - 23:00' },
];

// Mock Menu Categories
export const mockMenuCategories = [
    { id: 'mc1', name: 'Başlangıçlar', itemCount: 12 },
    { id: 'mc2', name: 'Ana Yemekler', itemCount: 18 },
    { id: 'mc3', name: 'Salatalar', itemCount: 8 },
    { id: 'mc4', name: 'Tatlılar', itemCount: 10 },
    { id: 'mc5', name: 'İçecekler', itemCount: 15 },
];

// Mock Menu Items (sample)
export const mockMenuItems: MenuItem[] = [
    { id: 'mi1', name: 'Mercimek Çorbası', description: 'Geleneksel Türk mercimek çorbası', price: 85, category: 'Başlangıçlar', isAvailable: true, preparationTime: '5 dk' },
    { id: 'mi2', name: 'Karışık Meze Tabağı', description: '8 çeşit soğuk meze', price: 220, category: 'Başlangıçlar', isAvailable: true, preparationTime: '10 dk' },
    { id: 'mi3', name: 'Kuzu Pirzola', description: 'Izgara kuzu pirzola, sebze garnitür', price: 450, category: 'Ana Yemekler', isAvailable: true, preparationTime: '25 dk' },
    { id: 'mi4', name: 'Levrek Buğulama', description: 'Taze levrek, limonlu sos', price: 380, category: 'Ana Yemekler', isAvailable: false, preparationTime: '20 dk' },
    { id: 'mi5', name: 'Künefe', description: 'Geleneksel Antep künefesi, kaymak', price: 150, category: 'Tatlılar', isAvailable: true, preparationTime: '15 dk' },
];

// Helper functions
export const getTablesBySection = (section: Table['section']) =>
    mockTables.filter(t => t.section === section);

export const getAvailableTables = () =>
    mockTables.filter(t => t.status === 'available');

export const getRestaurantStats = () => ({
    totalTables: mockTables.length,
    availableTables: mockTables.filter(t => t.status === 'available').length,
    occupiedTables: mockTables.filter(t => t.status === 'occupied').length,
    reservedTables: mockTables.filter(t => t.status === 'reserved').length,
    todayReservations: mockRestaurantReservations.length,
    waitlistCount: mockRestaurantWaitlist.length,
    activeStaff: mockRestaurantStaff.filter(s => s.isActive).length,
});
