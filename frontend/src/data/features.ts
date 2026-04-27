export type FeatureMiniType =
    | 'multi-tenant'
    | 'rbac'
    | 'slot-gen'
    | 'conflict'
    | 'time-off'
    | 'notification'
    | 'audit'
    | 'reporting'
    | 'ai-assistant';

export interface Feature {
    id: number;
    titleKey: string;
    benefitKey: string;
    howKey: string;
    miniType: FeatureMiniType;
}

export const FEATURES: Feature[] = [
    {
        id: 1,
        titleKey: 'feat1_title',
        benefitKey: 'feat1_benefit',
        howKey: 'feat1_how',
        miniType: 'multi-tenant',
    },
    {
        id: 2,
        titleKey: 'feat2_title',
        benefitKey: 'feat2_benefit',
        howKey: 'feat2_how',
        miniType: 'rbac',
    },
    {
        id: 3,
        titleKey: 'feat3_title',
        benefitKey: 'feat3_benefit',
        howKey: 'feat3_how',
        miniType: 'slot-gen',
    },
    {
        id: 4,
        titleKey: 'feat4_title',
        benefitKey: 'feat4_benefit',
        howKey: 'feat4_how',
        miniType: 'conflict',
    },
    {
        id: 5,
        titleKey: 'feat5_title',
        benefitKey: 'feat5_benefit',
        howKey: 'feat5_how',
        miniType: 'time-off',
    },
    {
        id: 6,
        titleKey: 'feat6_title',
        benefitKey: 'feat6_benefit',
        howKey: 'feat6_how',
        miniType: 'notification',
    },
    {
        id: 7,
        titleKey: 'feat7_title',
        benefitKey: 'feat7_benefit',
        howKey: 'feat7_how',
        miniType: 'audit',
    },
    {
        id: 8,
        titleKey: 'feat8_title',
        benefitKey: 'feat8_benefit',
        howKey: 'feat8_how',
        miniType: 'reporting',
    },
    {
        id: 9,
        titleKey: 'feat9_title',
        benefitKey: 'feat9_benefit',
        howKey: 'feat9_how',
        miniType: 'ai-assistant',
    },
];
