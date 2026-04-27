export type SlotStatus = 'AVAILABLE' | 'BOOKED';

export interface HeroSlot {
    id: string;
    branch: string;
    service: string;
    staff: string;
    time: string;
    status: SlotStatus;
}

export const HERO_SLOTS: HeroSlot[] = [
    { id: '1', branch: 'Etiler Salon', service: 'Saç Kesimi', staff: 'Ahmet Y.', time: '09:00', status: 'BOOKED' },
    { id: '2', branch: 'Etiler Salon', service: 'Sakal Tıraşı', staff: 'Mehmet K.', time: '10:00', status: 'AVAILABLE' },
    { id: '3', branch: 'Etiler Salon', service: 'Saç Bakımı', staff: 'Ahmet Y.', time: '11:00', status: 'AVAILABLE' },
    { id: '4', branch: 'Etiler Salon', service: 'Cilt Bakımı', staff: 'Canan T.', time: '12:00', status: 'BOOKED' },
    { id: '5', branch: 'Nişantaşı', service: 'Manikür', staff: 'Selin B.', time: '13:00', status: 'AVAILABLE' },
    { id: '6', branch: 'Nişantaşı', service: 'Pedikür', staff: 'Selin B.', time: '14:00', status: 'AVAILABLE' },
    { id: '7', branch: 'Merkez', service: 'Vip Kesim', staff: 'Deniz G.', time: '15:00', status: 'BOOKED' },
    { id: '8', branch: 'Merkez', service: 'Saç Kesimi', staff: 'Deniz G.', time: '16:00', status: 'AVAILABLE' },
    { id: '9', branch: 'Etiler Salon', service: 'Sakal Tıraşı', staff: 'Mehmet K.', time: '17:00', status: 'AVAILABLE' },
    { id: '10', branch: 'Nişantaşı', service: 'Nail Art', staff: 'Selin B.', time: '18:00', status: 'AVAILABLE' },
    { id: '11', branch: 'Etiler Salon', service: 'Saç Kesimi', staff: 'Ahmet Y.', time: '19:00', status: 'BOOKED' },
    { id: '12', branch: 'Merkez', service: 'Vip Kesim', staff: 'Deniz G.', time: '20:00', status: 'AVAILABLE' },
];
