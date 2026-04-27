import { StaffMember, StaffAppointment, StaffSchedule, StaffDashboardData } from '@/types/staff';

// ============= BERBER STAFF DATA =============

export const MOCK_BARBER_STAFF: StaffMember[] = [
    {
        id: 'staff-1',
        tenantId: 't-1',
        firstName: 'Canberk',
        lastName: 'Hoca',
        email: 'canberk@asilberber.com',
        phone: '0532 111 2233',
        role: 'staff',
        title: 'Kıdemli Berber',
        sector: 'barber',
        isActive: true,
        isOnBreak: false,
        chairId: 'chair-1',
        specialties: ['Saç Kesimi', 'Sakal Tıraşı', 'Premium Bakım'],
        todayAppointments: 12,
        todayCompleted: 8,
        todayEarnings: 1840,
        rating: 4.9,
        totalReviews: 342,
    },
    {
        id: 'staff-2',
        tenantId: 't-1',
        firstName: 'Mehmet',
        lastName: 'Usta',
        email: 'mehmet@asilberber.com',
        role: 'staff',
        title: 'Berber',
        sector: 'barber',
        isActive: true,
        isOnBreak: true,
        breakStartTime: '14:00',
        chairId: 'chair-2',
        specialties: ['Saç Kesimi', 'Fade Kesim'],
        todayAppointments: 10,
        todayCompleted: 6,
        todayEarnings: 1240,
        rating: 4.8,
        totalReviews: 215,
    },
    {
        id: 'staff-3',
        tenantId: 't-1',
        firstName: 'Deniz',
        lastName: 'Kalfa',
        email: 'deniz@asilberber.com',
        role: 'staff',
        title: 'Çırak',
        sector: 'barber',
        isActive: true,
        isOnBreak: false,
        chairId: 'chair-3',
        specialties: ['Saç Kesimi'],
        todayAppointments: 8,
        todayCompleted: 5,
        todayEarnings: 720,
        rating: 4.6,
        totalReviews: 89,
    },
];

export const MOCK_BARBER_APPOINTMENTS: StaffAppointment[] = [
    // Canberk's appointments
    {
        id: 'apt-1',
        staffId: 'staff-1',
        customerId: 'cust-1',
        customerName: 'Ahmet Yılmaz',
        customerPhone: '0532 333 4455',
        customerNote: 'Yanları kısa, üstü uzun tercih eder',
        startTime: '09:00',
        endTime: '09:45',
        duration: 45,
        service: 'Saç Kesimi + Sakal',
        price: 200,
        status: 'completed',
    },
    {
        id: 'apt-2',
        staffId: 'staff-1',
        customerId: 'cust-2',
        customerName: 'Burak Demir',
        customerPhone: '0533 444 5566',
        startTime: '10:00',
        endTime: '10:30',
        duration: 30,
        service: 'Saç Kesimi',
        price: 150,
        status: 'completed',
    },
    {
        id: 'apt-3',
        staffId: 'staff-1',
        customerId: 'cust-3',
        customerName: 'Can Özkan',
        customerPhone: '0534 555 6677',
        customerNote: 'Premium müşteri, çay ikram et',
        startTime: '11:00',
        endTime: '12:15',
        duration: 75,
        service: 'Premium Bakım',
        price: 350,
        status: 'completed',
    },
    {
        id: 'apt-4',
        staffId: 'staff-1',
        customerId: 'cust-4',
        customerName: 'Emre Yıldız',
        customerPhone: '0535 666 7788',
        startTime: '14:30',
        endTime: '15:15',
        duration: 45,
        service: 'Saç Kesimi + Sakal',
        price: 200,
        status: 'in-progress',
    },
    {
        id: 'apt-5',
        staffId: 'staff-1',
        customerId: 'cust-5',
        customerName: 'Fatih Kaya',
        customerPhone: '0536 777 8899',
        startTime: '15:30',
        endTime: '16:00',
        duration: 30,
        service: 'Saç Kesimi',
        price: 150,
        status: 'upcoming',
    },
    {
        id: 'apt-6',
        staffId: 'staff-1',
        customerId: 'cust-6',
        customerName: 'Gökhan Şahin',
        customerPhone: '0537 888 9900',
        customerNote: 'İlk kez geliyor',
        startTime: '16:30',
        endTime: '17:45',
        duration: 75,
        service: 'Premium Bakım',
        price: 350,
        status: 'upcoming',
    },
    {
        id: 'apt-7',
        staffId: 'staff-1',
        customerId: 'cust-7',
        customerName: 'Hakan Tekin',
        customerPhone: '0538 999 0011',
        startTime: '18:00',
        endTime: '18:30',
        duration: 30,
        service: 'Sakal Tıraşı',
        price: 100,
        status: 'upcoming',
    },
];

export const MOCK_BARBER_SCHEDULE: StaffSchedule = {
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '19:00',
    isOff: false,
};

// Current logged in staff (for demo)
export const CURRENT_STAFF_ID = 'staff-1';

export function getStaffById(id: string): StaffMember | undefined {
    return MOCK_BARBER_STAFF.find(s => s.id === id);
}

export function getStaffAppointments(staffId: string): StaffAppointment[] {
    return MOCK_BARBER_APPOINTMENTS.filter(a => a.staffId === staffId);
}

export function getCurrentAppointment(staffId: string): StaffAppointment | undefined {
    return MOCK_BARBER_APPOINTMENTS.find(a => a.staffId === staffId && a.status === 'in-progress');
}

export function getNextAppointment(staffId: string): StaffAppointment | undefined {
    return MOCK_BARBER_APPOINTMENTS.find(a => a.staffId === staffId && a.status === 'upcoming');
}

export function getStaffDashboardData(staffId: string): StaffDashboardData | null {
    const staff = getStaffById(staffId);
    if (!staff) return null;

    return {
        staff,
        todayAppointments: getStaffAppointments(staffId),
        currentAppointment: getCurrentAppointment(staffId) || null,
        nextAppointment: getNextAppointment(staffId) || null,
        schedule: MOCK_BARBER_SCHEDULE,
    };
}

// ============= RESTAURANT STAFF DATA =============

export const MOCK_RESTAURANT_STAFF: StaffMember[] = [
    {
        id: 'waiter-1',
        tenantId: 't-2',
        firstName: 'Ayşe',
        lastName: 'Garson',
        email: 'ayse@mammamia.com',
        role: 'staff',
        title: 'Kıdemli Garson',
        sector: 'restaurant',
        isActive: true,
        isOnBreak: false,
        assignedSection: 'Bahçe',
        assignedTables: [5, 6, 7, 8, 9, 10],
        todayAppointments: 24,
        todayCompleted: 18,
        todayEarnings: 420, // Tips
        rating: 4.9,
        totalReviews: 156,
    },
];

export const MOCK_TABLE_ORDERS = [
    {
        id: 'order-1',
        tableNumber: 6,
        staffId: 'waiter-1',
        guestCount: 4,
        status: 'ordering' as const,
        startTime: '19:30',
        items: [
            { name: 'Margherita Pizza', quantity: 2, status: 'preparing' },
            { name: 'Pasta Carbonara', quantity: 1, status: 'preparing' },
            { name: 'Tiramisu', quantity: 2, status: 'pending' },
        ],
        total: 0,
    },
    {
        id: 'order-2',
        tableNumber: 7,
        staffId: 'waiter-1',
        guestCount: 2,
        status: 'eating' as const,
        startTime: '18:45',
        items: [
            { name: 'Köfte', quantity: 2, status: 'served' },
            { name: 'Pilav', quantity: 2, status: 'served' },
            { name: 'Ayran', quantity: 2, status: 'served' },
        ],
        total: 245,
    },
    {
        id: 'order-3',
        tableNumber: 9,
        staffId: 'waiter-1',
        guestCount: 6,
        status: 'bill-requested' as const,
        startTime: '17:30',
        items: [
            { name: 'Karışık Izgara', quantity: 2, status: 'served' },
            { name: 'Lahmacun', quantity: 4, status: 'served' },
            { name: 'İçecekler', quantity: 6, status: 'served' },
        ],
        total: 680,
    },
];

export function getRestaurantStaffData(staffId: string) {
    const staff = MOCK_RESTAURANT_STAFF.find(s => s.id === staffId);
    if (!staff) return null;

    return {
        staff,
        tables: staff.assignedTables?.map(num => ({
            number: num,
            status: MOCK_TABLE_ORDERS.find(o => o.tableNumber === num)?.status || 'available',
            order: MOCK_TABLE_ORDERS.find(o => o.tableNumber === num),
        })) || [],
        activeOrders: MOCK_TABLE_ORDERS.filter(o => o.staffId === staffId),
    };
}
