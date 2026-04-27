import { Zap, Sparkles, Building2 } from 'lucide-react';

export interface PricingPlan {
    id: string;
    nameKey: string;
    descKey: string;
    monthlyPrice: string;
    yearlyPrice: string;
    features: string[];
    ctaKey: string;
    isPopular?: boolean;
    icon: 'zap' | 'sparkles' | 'building';
}

export const PRICING_PLANS: PricingPlan[] = [
    {
        id: 'starter',
        nameKey: 'starter_name',
        descKey: 'starter_desc',
        monthlyPrice: '₺299',
        yearlyPrice: '₺2.990',
        features: [
            'starter_f1',
            'starter_f2',
            'starter_f3',
            'starter_f4',
            'starter_f5',
        ],
        ctaKey: 'starter_cta',
        icon: 'zap',
    },
    {
        id: 'pro',
        nameKey: 'pro_name',
        descKey: 'pro_desc',
        monthlyPrice: '₺699',
        yearlyPrice: '₺6.990',
        features: [
            'pro_f1',
            'pro_f2',
            'pro_f3',
            'pro_f4',
            'pro_f5',
            'pro_f6',
        ],
        ctaKey: 'pro_cta',
        isPopular: true,
        icon: 'sparkles',
    },
    {
        id: 'enterprise',
        nameKey: 'enterprise_name',
        descKey: 'enterprise_desc',
        monthlyPrice: 'Özel',
        yearlyPrice: 'Özel',
        features: [
            'enterprise_f1',
            'enterprise_f2',
            'enterprise_f3',
            'enterprise_f4',
            'enterprise_f5',
            'enterprise_f6',
        ],
        ctaKey: 'enterprise_cta',
        icon: 'building',
    },
];
