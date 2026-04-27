import React from 'react';

// Google Calendar Logo (Local)
export const GoogleCalendarLogo = ({ className }: { className?: string }) => (
    <img
        src="/integrations/google-calendar.png"
        alt="Google Calendar"
        className={className}
    />
);

// Apple Calendar Logo (Local)
export const AppleCalendarLogo = ({ className }: { className?: string }) => (
    <img
        src="/integrations/apple-calendar.png"
        alt="Apple Calendar"
        className={className}
    />
);

// Microsoft Outlook Logo (Local)
export const OutlookLogo = ({ className }: { className?: string }) => (
    <img
        src="/integrations/outlook.png"
        alt="Outlook"
        className={className}
    />
);

// Zoom Logo (Local)
export const ZoomLogo = ({ className }: { className?: string }) => (
    <img
        src="/integrations/zoom.png"
        alt="Zoom"
        className={className}
    />
);

// Google Meet Logo (Local)
export const GoogleMeetLogo = ({ className }: { className?: string }) => (
    <img
        src="/integrations/google-meet.png"
        alt="Google Meet"
        className={className}
    />
);

// Email Logo (Local)
export const EmailLogo = ({ className }: { className?: string }) => (
    <img
        src="/integrations/email.png"
        alt="Email"
        className={className}
    />
);

// SMS Logo (SVG - şeffaf)
export const SMSLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 11.5C21.0039 12.8199 20.6357 14.1147 19.9359 15.2464C19.2361 16.3781 18.2317 17.2952 17.0315 17.8995C15.8313 18.5039 14.4819 18.7719 13.131 18.6747C11.7801 18.5776 10.4802 18.1191 9.375 17.35L3 19L4.65 12.625C3.88088 11.5198 3.42237 10.2199 3.32522 8.86899C3.22806 7.51808 3.49612 6.16872 4.10051 4.96853C4.7049 3.76834 5.62198 2.76395 6.75369 2.06411C7.8854 1.36427 9.18013 0.9961 10.5 1H10.513C13.295 1.013 15.96 2.126 17.925 4.093C19.89 6.06 20.999 8.729 21 11.5Z" fill="#22D3EE" />
        <text x="7" y="14" fill="white" fontSize="6" fontWeight="bold">SMS</text>
    </svg>
);

// WhatsApp Logo (Local)
export const WhatsAppLogo = ({ className }: { className?: string }) => (
    <img
        src="/integrations/whatsapp.png"
        alt="WhatsApp"
        className={className}
    />
);

// Webhook Logo (SVG - şeffaf)
export const WebhookLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="18" r="3" fill="#4B5563" stroke="#4B5563" strokeWidth="2" />
        <circle cx="12" cy="5" r="3" fill="#EC4899" stroke="#EC4899" strokeWidth="2" />
        <circle cx="19" cy="18" r="3" fill="#4B5563" stroke="#4B5563" strokeWidth="2" />
        <path d="M12 8v4M8 16l4-4M16 16l-4-4" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

// REST API Logo (SVG - şeffaf)
export const ApiLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#3B82F6" />
        <path d="M2 17l10 5 10-5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Slack Logo (Local)
export const SlackLogo = ({ className }: { className?: string }) => (
    <img
        src="/integrations/slack.png"
        alt="Slack"
        className={className}
    />
);

// Microsoft Teams Logo (Local)
export const TeamsLogo = ({ className }: { className?: string }) => (
    <img
        src="/integrations/teams.png"
        alt="Microsoft Teams"
        className={className}
    />
);
