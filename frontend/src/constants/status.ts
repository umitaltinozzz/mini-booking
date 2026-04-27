export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'CANCELLED' | 'PAST';

export const STATUS_COLORS = {
    AVAILABLE: '#111A28', // neutral surface2-like
    BOOKED: '#3B82F6',    // non-negotiable blue
    CANCELLED: '#F43F5E', // red
    PAST: '#334155',      // muted
    SELECTED: '#A3E635',  // accent green
};

export const statusLabel = (status: SlotStatus, locale: string = 'tr') => {
    const labels: Record<SlotStatus, { tr: string; en: string }> = {
        AVAILABLE: { tr: 'MÜSAİT', en: 'AVAILABLE' },
        BOOKED: { tr: 'DOLU', en: 'BOOKED' },
        CANCELLED: { tr: 'İPTAL', en: 'CANCELLED' },
        PAST: { tr: 'GEÇMİŞ', en: 'PAST' },
    };
    return labels[status][locale as 'tr' | 'en'] || labels[status]['en'];
};
