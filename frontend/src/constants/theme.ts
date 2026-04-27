export const DESIGN_TOKENS = {
    colors: {
        bg: '#06080C',
        surface: '#0D121B',
        surface2: '#111A28',
        text: '#F1F5FF',
        muted: '#A7B3C8',
        border: '#21304A',
        accent: '#A3E635',
        accent2: '#D9FF7A',
        status: {
            booked: '#3B82F6',
            booked2: '#76A9FF',
            cancelled: '#F43F5E',
            warning: '#F59E0B',
            disabled: '#334155',
        },
    },
};

export const SLOT_STATUS = {
    AVAILABLE: 'available',
    BOOKED: 'booked',
    SELECTED: 'selected',
    DISABLED: 'disabled',
    CANCELLED: 'cancelled',
} as const;

export type SlotStatus = (typeof SLOT_STATUS)[keyof typeof SLOT_STATUS];

export const SLOT_THEME: Record<SlotStatus, { color: string; surface: string; label: string; isGradient: boolean }> = {
    [SLOT_STATUS.AVAILABLE]: {
        color: DESIGN_TOKENS.colors.border,
        surface: DESIGN_TOKENS.colors.surface2,
        label: 'Boş',
        isGradient: false,
    },
    [SLOT_STATUS.BOOKED]: {
        color: DESIGN_TOKENS.colors.status.booked,
        surface: DESIGN_TOKENS.colors.status.booked,
        label: 'Dolu',
        isGradient: false,
    },
    [SLOT_STATUS.SELECTED]: {
        color: DESIGN_TOKENS.colors.accent,
        surface: DESIGN_TOKENS.colors.accent2,
        label: 'Seçili',
        isGradient: true,
    },
    [SLOT_STATUS.DISABLED]: {
        color: DESIGN_TOKENS.colors.status.disabled,
        surface: DESIGN_TOKENS.colors.surface,
        label: 'Geçmiş',
        isGradient: false,
    },
    [SLOT_STATUS.CANCELLED]: {
        color: DESIGN_TOKENS.colors.status.cancelled,
        surface: DESIGN_TOKENS.colors.status.cancelled,
        label: 'İptal',
        isGradient: false,
    },
};
