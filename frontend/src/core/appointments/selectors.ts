import { Appointment } from './types';

export const selectUpcomingAppointments = (appointments: Appointment[]) => {
    return appointments.filter(a => new Date(a.startTime) > new Date()).sort((a, b) => a.startTime.localeCompare(b.startTime));
};

export const selectAppointmentsByResource = (appointments: Appointment[], resourceId: string) => {
    return appointments.filter(a => a.resourceId === resourceId);
};
