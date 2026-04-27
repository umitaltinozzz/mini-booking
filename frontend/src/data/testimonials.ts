export interface Testimonial {
    id: number;
    roleKey: string;
    name: string;
    contentKey: string;
    metricLabelKey: string;
    metricValue: string;
    metricPrefix: '-' | '+';
}

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        roleKey: 'test1_role',
        name: 'A.',
        contentKey: 'test1_content',
        metricLabelKey: 'test1_metric_label',
        metricValue: '40',
        metricPrefix: '-',
    },
    {
        id: 2,
        roleKey: 'test2_role',
        name: 'M.',
        contentKey: 'test2_content',
        metricLabelKey: 'test2_metric_label',
        metricValue: '25',
        metricPrefix: '-',
    },
    {
        id: 3,
        roleKey: 'test3_role',
        name: 'S.',
        contentKey: 'test3_content',
        metricLabelKey: 'test3_metric_label',
        metricValue: '35',
        metricPrefix: '+',
    },
];
