export interface SecurityPrinciple {
    id: number;
    titleKey: string;
    descKey: string;
}

export const SECURITY_PRINCIPLES: SecurityPrinciple[] = [
    {
        id: 1,
        titleKey: 'principle1_title',
        descKey: 'principle1_desc',
    },
    {
        id: 2,
        titleKey: 'principle2_title',
        descKey: 'principle2_desc',
    },
    {
        id: 3,
        titleKey: 'principle3_title',
        descKey: 'principle3_desc',
    },
    {
        id: 4,
        titleKey: 'principle4_title',
        descKey: 'principle4_desc',
    },
    {
        id: 5,
        titleKey: 'principle5_title',
        descKey: 'principle5_desc',
    },
];

export const CHECKLIST_ITEMS = [
    'check_tenant',
    'check_rbac',
    'check_audit',
    'check_password',
    'check_rate_limit',
    'check_session',
    'check_backup',
    'check_access',
    'check_incident',
];
