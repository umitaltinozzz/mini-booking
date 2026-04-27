import { GoogleCalendarLogo, AppleCalendarLogo, OutlookLogo, ZoomLogo, GoogleMeetLogo, EmailLogo, WhatsAppLogo, WebhookLogo, ApiLogo, SMSLogo, TeamsLogo } from '@/components/ui/BrandLogos';

export type IntegrationStatus = 'NOW' | 'SOON';

export interface IntegrationItem {
    name: string;
    status: IntegrationStatus;
    icon?: React.ComponentType<{ className?: string }>;
}

export interface IntegrationGroup {
    id: number;
    titleKey: string;
    descKey: string;
    items: IntegrationItem[];
}

export const INTEGRATIONS: IntegrationGroup[] = [
    {
        id: 1,
        titleKey: 'group_notifications',
        descKey: 'group_notifications_desc',
        items: [
            { name: 'Email', status: 'NOW', icon: EmailLogo },
            { name: 'SMS', status: 'SOON', icon: SMSLogo },
            { name: 'WhatsApp', status: 'SOON', icon: WhatsAppLogo },
        ],
    },
    {
        id: 2,
        titleKey: 'group_calendar',
        descKey: 'group_calendar_desc',
        items: [
            { name: 'Google Calendar', status: 'SOON', icon: GoogleCalendarLogo },
            { name: 'Apple Calendar', status: 'SOON', icon: AppleCalendarLogo },
            { name: 'Outlook Calendar', status: 'SOON', icon: OutlookLogo },
        ],
    },
    {
        id: 3,
        titleKey: 'group_video',
        descKey: 'group_video_desc',
        items: [
            { name: 'Zoom', status: 'SOON', icon: ZoomLogo },
            { name: 'Google Meet', status: 'SOON', icon: GoogleMeetLogo },
            { name: 'Microsoft Teams', status: 'SOON', icon: TeamsLogo },
        ],
    },
    {
        id: 4,
        titleKey: 'group_api',
        descKey: 'group_api_desc',
        items: [
            { name: 'Webhook', status: 'NOW', icon: WebhookLogo },
            { name: 'REST API', status: 'NOW', icon: ApiLogo },
        ],
    },
];
