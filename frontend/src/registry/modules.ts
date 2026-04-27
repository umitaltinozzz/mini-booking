import { IndustryModule, Sector } from '../types/sector';
import BarberDashboard from '../components/dashboard/modules/barber/BarberDashboard';
import RestaurantDashboard from '../components/dashboard/modules/restaurant/RestaurantDashboard';

const modules: Record<Sector, IndustryModule> = {
    barber: {
        id: 'barber',
        displayName: 'Berber & Salon',
        Dashboard: BarberDashboard,
        nav: [
            { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
            { id: 'appointments', label: 'Randevular', href: '/appointments', icon: 'Calendar' },
            { id: 'customers', label: 'Müşteriler', href: '/customers', icon: 'UserCircle' },
            { id: 'staff', label: 'Personel', href: '/staff', icon: 'Users' },
            { id: 'services', label: 'Hizmetler', href: '/services', icon: 'Scissors' },
            { id: 'reports', label: 'Raporlar', href: '/reports', icon: 'BarChart3' },
            { id: 'settings', label: 'Ayarlar', href: '/settings', icon: 'Settings' },
        ],
        labels: {
            client: 'Müşteri',
            resource: 'Koltuk / Berber',
            booking: 'Randevu',
        },
        policies: {
            waitingListPolicy: 'staff-based',
        },
        appointmentsConfig: {
            columns: ['Time', 'Customer', 'Barber', 'Service', 'Status'],
        },
    },
    restaurant: {
        id: 'restaurant',
        displayName: 'Restoran & Cafe',
        Dashboard: RestaurantDashboard,
        nav: [
            { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
            { id: 'reservations', label: 'Rezervasyonlar', href: '/appointments', icon: 'ClipboardList' },
            { id: 'customers', label: 'Misafirler', href: '/customers', icon: 'UserCircle' },
            { id: 'staff', label: 'Garsonlar', href: '/staff', icon: 'Users' },
            { id: 'services', label: 'Menü', href: '/services', icon: 'UtensilsCrossed' },
            { id: 'reports', label: 'Raporlar', href: '/reports', icon: 'BarChart3' },
            { id: 'settings', label: 'Ayarlar', href: '/settings', icon: 'Settings' },
        ],
        labels: {
            client: 'Misafir',
            resource: 'Masa',
            booking: 'Rezervasyon',
        },
        policies: {
            waitingListPolicy: 'table-based',
        },
        appointmentsConfig: {
            columns: ['Time', 'Guest', 'Table', 'Covers', 'Status'],
        },
    },
};

export function getModule(sector: Sector): IndustryModule {
    return modules[sector] || modules.barber;
}
