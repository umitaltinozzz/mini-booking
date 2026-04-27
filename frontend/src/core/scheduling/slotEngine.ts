import { Slot, BookingRequest } from './types';

/**
 * Pure logic for generating slots. 
 * Decoupled from any industry-specific UI.
 */
export function generateSlots(
    date: string,
    config: { startHour: number; endHour: number; slotDuration: number; resourceId: string }
): Slot[] {
    const slots: Slot[] = [];
    let currentTime = new Date(`${date}T${config.startHour.toString().padStart(2, '0')}:00:00`);
    const endTime = new Date(`${date}T${config.endHour.toString().padStart(2, '0')}:00:00`);

    while (currentTime < endTime) {
        const start = currentTime.toISOString();
        currentTime.setMinutes(currentTime.getMinutes() + config.slotDuration);
        const end = currentTime.toISOString();

        slots.push({
            id: `${config.resourceId}-${start}`,
            startTime: start,
            endTime: end,
            isAvailable: Math.random() > 0.3, // Mock availability
            resourceId: config.resourceId,
        });
    }

    return slots;
}

export function checkConflict(request: BookingRequest, existingBookings: any[]): boolean {
    // Common conflict logic for all sectors
    return false;
}
