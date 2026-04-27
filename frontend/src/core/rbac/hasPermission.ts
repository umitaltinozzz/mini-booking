import { Permission, ROLE_PERMISSIONS } from './permissions';

export function hasPermission(role: string, permission: Permission): boolean {
    const permissions = ROLE_PERMISSIONS[role] || [];
    return permissions.includes(permission);
}
