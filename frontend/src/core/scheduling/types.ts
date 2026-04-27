export interface Slot {
    id: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    resourceId: string; // Chair ID or Table ID
}

export interface BookingRequest {
    startTime: string;
    duration: number;
    resourceId: string;
    customerId: string;
}
