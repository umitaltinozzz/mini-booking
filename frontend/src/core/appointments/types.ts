export interface Appointment {
    id: string;
    tenantId: string;
    customerId: string;
    resourceId: string;
    startTime: string;
    endTime: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
    metadata?: Record<string, any>;
}
