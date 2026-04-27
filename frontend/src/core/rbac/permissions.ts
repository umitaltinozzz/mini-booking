export type Permission =
    | 'VIEW_DASHBOARD'
    | 'MANAGE_APPOINTMENTS'
    | 'MANAGE_STAFF'
    | 'VIEW_REPORTS';

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
    admin: ['VIEW_DASHBOARD', 'MANAGE_APPOINTMENTS', 'MANAGE_STAFF', 'VIEW_REPORTS'],
    staff: ['VIEW_DASHBOARD', 'MANAGE_APPOINTMENTS'],
};
