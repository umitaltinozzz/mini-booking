import { Sector } from './sector';

export type UserRole = 'owner' | 'admin' | 'staff';

export interface StaffMember {
    id: string;
    tenantId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: UserRole;
    title: string; // "Berber", "Garson", "Kıdemli Berber"
    avatar?: string;
    sector: Sector;

    // Work info
    isActive: boolean;
    isOnBreak: boolean;
    breakStartTime?: string;

    // For barber
    chairId?: string;
    specialties?: string[]; // ["Saç Kesimi", "Sakal Tıraşı"]

    // For restaurant
    assignedSection?: string; // "Bahçe", "İç Mekan", "VIP"
    assignedTables?: number[];

    // Stats
    todayAppointments: number;
    todayCompleted: number;
    todayEarnings: number;
    rating: number;
    totalReviews: number;
}

export interface StaffAppointment {
    id: string;
    staffId: string;
    customerId: string;
    customerName: string;
    customerPhone: string;
    customerNote?: string;

    // Time
    startTime: string;
    endTime: string;
    duration: number; // minutes

    // Service
    service: string;
    price: number;

    // Status
    status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';

    // For restaurant
    tableNumber?: number;
    guestCount?: number;
}

export interface StaffSchedule {
    date: string;
    startTime: string;
    endTime: string;
    isOff: boolean;
}

export interface StaffDashboardData {
    staff: StaffMember;
    todayAppointments: StaffAppointment[];
    currentAppointment: StaffAppointment | null;
    nextAppointment: StaffAppointment | null;
    schedule: StaffSchedule;
}
