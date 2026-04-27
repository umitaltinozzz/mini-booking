// Barber-specific mock data

export interface Chair {
    id: string;
    number: number;
    assignedStaff?: string;
    status: 'available' | 'in-use' | 'maintenance';
}

export interface BarberService {
    id: string;
    name: string;
    description: string;
    duration: number; // minutes
    price: number;
    category: 'hair' | 'beard' | 'combo' | 'premium';
    isActive: boolean;
}

export interface BarberAppointment {
    id: string;
    customerName: string;
    customerPhone: string;
    staffId: string;
    staffName: string;
    serviceId: string;
    serviceName: string;
    chairNumber: number;
    date: string;
    time: string;
    duration: string;
    status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
    notes?: string;
    createdAt: string;
}

export interface BarberWaitlistEntry {
    id: string;
    customerName: string;
    customerPhone: string;
    preferredStaff?: string;
    serviceName: string;
    estimatedDuration: string;
    notes?: string;
    estimatedWait: string;
    addedAt: string;
    priority: 'normal' | 'high' | 'vip';
}

export interface BarberStaff {
    id: string;
    name: string;
    role: 'senior' | 'barber' | 'junior' | 'trainee';
    specialties: string[];
    chairNumber: number;
    phone: string;
    isActive: boolean;
    workingHours: string;
    avatar?: string;
    rating: number;
    completedToday: number;
    todayAppointments: number;
}

// Mock Chairs
export const mockChairs: Chair[] = [
    { id: 'c1', number: 1, assignedStaff: 'Canberk H.', status: 'in-use' },
    { id: 'c2', number: 2, assignedStaff: 'Mehmet A.', status: 'available' },
    { id: 'c3', number: 3, assignedStaff: 'Deniz K.', status: 'available' },
    { id: 'c4', number: 4, status: 'maintenance' },
];

// Mock Services
export const mockBarberServices: BarberService[] = [
    { id: 'bs1', name: 'Saç Kesimi', description: 'Klasik erkek saç kesimi', duration: 30, price: 150, category: 'hair', isActive: true },
    { id: 'bs2', name: 'Sakal Tıraşı', description: 'Düzeltme ve şekillendirme', duration: 20, price: 80, category: 'beard', isActive: true },
    { id: 'bs3', name: 'Saç + Sakal', description: 'Komple bakım paketi', duration: 45, price: 200, category: 'combo', isActive: true },
    { id: 'bs4', name: 'Fade Kesim', description: 'Modern fade kesim tarzı', duration: 40, price: 180, category: 'hair', isActive: true },
    { id: 'bs5', name: 'Premium Bakım', description: 'Saç + Sakal + Yüz maskesi + Masaj', duration: 75, price: 350, category: 'premium', isActive: true },
    { id: 'bs6', name: 'Çocuk Kesimi', description: '12 yaş altı', duration: 20, price: 100, category: 'hair', isActive: true },
    { id: 'bs7', name: 'Damat Paketi', description: 'Özel gün bakımı', duration: 90, price: 500, category: 'premium', isActive: true },
];

// Mock Staff
export const mockBarberStaff: BarberStaff[] = [
    {
        id: 'bst1',
        name: 'Canberk H.',
        role: 'senior',
        specialties: ['Fade Kesim', 'Premium Bakım'],
        chairNumber: 1,
        phone: '0532 111 22 33',
        isActive: true,
        workingHours: '09:00 - 20:00',
        rating: 4.9,
        completedToday: 8,
        todayAppointments: 12
    },
    {
        id: 'bst2',
        name: 'Mehmet A.',
        role: 'barber',
        specialties: ['Saç Kesimi', 'Sakal Tıraşı'],
        chairNumber: 2,
        phone: '0533 222 33 44',
        isActive: true,
        workingHours: '10:00 - 21:00',
        rating: 4.7,
        completedToday: 6,
        todayAppointments: 10
    },
    {
        id: 'bst3',
        name: 'Deniz K.',
        role: 'junior',
        specialties: ['Saç Kesimi', 'Çocuk Kesimi'],
        chairNumber: 3,
        phone: '0534 333 44 55',
        isActive: false,
        workingHours: '12:00 - 20:00',
        rating: 4.5,
        completedToday: 0,
        todayAppointments: 0
    },
];

// Mock Appointments
export const mockBarberAppointments: BarberAppointment[] = [
    {
        id: 'ba1',
        customerName: 'Ali Kara',
        customerPhone: '0535 111 22 33',
        staffId: 'bst1',
        staffName: 'Canberk H.',
        serviceId: 'bs3',
        serviceName: 'Saç + Sakal',
        chairNumber: 1,
        date: '2026-01-09',
        time: '14:00',
        duration: '45 dk',
        status: 'in-progress',
        createdAt: '2026-01-08T10:00:00Z'
    },
    {
        id: 'ba2',
        customerName: 'Kemal Sunal',
        customerPhone: '0536 222 33 44',
        staffId: 'bst2',
        staffName: 'Mehmet A.',
        serviceId: 'bs1',
        serviceName: 'Saç Kesimi',
        chairNumber: 2,
        date: '2026-01-09',
        time: '14:30',
        duration: '30 dk',
        status: 'confirmed',
        createdAt: '2026-01-09T09:00:00Z'
    },
    {
        id: 'ba3',
        customerName: 'Hakan Ural',
        customerPhone: '0537 333 44 55',
        staffId: 'bst1',
        staffName: 'Canberk H.',
        serviceId: 'bs5',
        serviceName: 'Premium Bakım',
        chairNumber: 1,
        date: '2026-01-09',
        time: '15:00',
        duration: '75 dk',
        status: 'confirmed',
        notes: 'Düğün öncesi bakım',
        createdAt: '2026-01-07T15:00:00Z'
    },
    {
        id: 'ba4',
        customerName: 'Murat Can',
        customerPhone: '0538 444 55 66',
        staffId: 'bst2',
        staffName: 'Mehmet A.',
        serviceId: 'bs3',
        serviceName: 'Saç + Sakal',
        chairNumber: 2,
        date: '2026-01-09',
        time: '15:30',
        duration: '45 dk',
        status: 'pending',
        createdAt: '2026-01-09T12:00:00Z'
    },
];

// Mock Waitlist - Barber Specific
export const mockBarberWaitlist: BarberWaitlistEntry[] = [
    {
        id: 'bw1',
        customerName: 'Serkan Yıldız',
        customerPhone: '0539 555 66 77',
        preferredStaff: 'Canberk H.',
        serviceName: 'Fade Kesim',
        estimatedDuration: '40 dk',
        notes: 'Yanları kısa, üstü uzun',
        estimatedWait: '30 dk',
        addedAt: '2026-01-09T14:30:00Z',
        priority: 'normal'
    },
    {
        id: 'bw2',
        customerName: 'Emre Belözoğlu',
        customerPhone: '0540 666 77 88',
        serviceName: 'Sakal Tıraşı',
        estimatedDuration: '20 dk',
        notes: 'Acil, toplantıya yetişecek',
        estimatedWait: '15 dk',
        addedAt: '2026-01-09T14:35:00Z',
        priority: 'high'
    },
    {
        id: 'bw3',
        customerName: 'Burak Yılmaz',
        customerPhone: '0541 777 88 99',
        preferredStaff: 'Mehmet A.',
        serviceName: 'Premium Bakım',
        estimatedDuration: '75 dk',
        notes: 'VIP müşteri',
        estimatedWait: '45 dk',
        addedAt: '2026-01-09T14:40:00Z',
        priority: 'vip'
    },
];

// Helper functions
export const getStaffByChair = (chairNumber: number) =>
    mockBarberStaff.find(s => s.chairNumber === chairNumber);

export const getActiveStaff = () =>
    mockBarberStaff.filter(s => s.isActive);

export const getServicesByCategory = (category: BarberService['category']) =>
    mockBarberServices.filter(s => s.category === category);

export const getBarberStats = () => ({
    totalChairs: mockChairs.length,
    availableChairs: mockChairs.filter(c => c.status === 'available').length,
    activeStaff: mockBarberStaff.filter(s => s.isActive).length,
    totalStaff: mockBarberStaff.length,
    todayAppointments: mockBarberAppointments.length,
    completedToday: mockBarberAppointments.filter(a => a.status === 'completed').length,
    waitlistCount: mockBarberWaitlist.length,
    totalServices: mockBarberServices.length,
});
