import { SLOT_STATUS, SlotStatus } from "@/constants/theme";

export interface Branch {
    id: string;
    name: string;
    location: string;
}

export interface Staff {
    id: string;
    name: string;
    role: string;
    avatar: string;
}

export interface Service {
    id: string;
    name: string;
    duration: number;
    price: number;
}

export interface Slot {
    id: string;
    time: string;
    status: SlotStatus;
    staffId: string;
}

export const DUMMY_DATA = {
    branches: [
        { id: 'b1', name: 'Nispetiye Şube', location: 'Etiler, İstanbul' },
        { id: 'b2', name: 'Bağdat Caddesi', location: 'Erenköy, İstanbul' },
    ],
    staff: [
        { id: 's1', name: 'Can Tekin', role: 'Kıdemli Berber', avatar: 'CT' },
        { id: 's2', name: 'Melis Aydın', role: 'Nail Art Specialist', avatar: 'MA' },
        { id: 's3', name: 'Deniz Kaya', role: 'Master Hair Stylist', avatar: 'DK' },
    ],
    services: [
        { id: 'v1', name: 'Saç Kesim & Stil', duration: 45, price: 850 },
        { id: 'v2', name: 'Premium Sakal Tıraşı', duration: 30, price: 400 },
        { id: 'v3', name: 'Nail Art (Full Set)', duration: 60, price: 1200 },
    ],
    slots: [
        { id: '1', time: '09:00', status: SLOT_STATUS.BOOKED, staffId: 's1' },
        { id: '2', time: '10:00', status: SLOT_STATUS.AVAILABLE, staffId: 's1' },
        { id: '3', time: '11:00', status: SLOT_STATUS.AVAILABLE, staffId: 's1' },
        { id: '4', time: '12:00', status: SLOT_STATUS.DISABLED, staffId: 's1' },
        { id: '5', time: '13:00', status: SLOT_STATUS.AVAILABLE, staffId: 's1' },
        { id: '6', time: '14:00', status: SLOT_STATUS.BOOKED, staffId: 's1' },
        { id: '7', time: '09:00', status: SLOT_STATUS.AVAILABLE, staffId: 's2' },
        { id: '8', time: '10:00', status: SLOT_STATUS.BOOKED, staffId: 's2' },
        { id: '9', time: '11:00', status: SLOT_STATUS.AVAILABLE, staffId: 's2' },
        { id: '10', time: '12:00', status: SLOT_STATUS.AVAILABLE, staffId: 's2' },
    ],
};
