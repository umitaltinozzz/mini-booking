'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import {
    Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight,
    User, Phone, Mail, MessageSquare, Scissors, Star, CreditCard,
    X, FileText, Download, Receipt, Loader2
} from 'lucide-react';
import { getTenantBySlug } from '@/data/mockTenants';
import RestaurantBookingPage from '@/components/booking/RestaurantBooking';

// Step types - personel ve ödeme adımları eklendi
type Step = 'date' | 'time' | 'service' | 'staff' | 'complete' | 'payment' | 'invoice' | 'confirmed';

const MONTH_NAMES = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const DAY_NAMES = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

const TIME_SLOTS = [
    { category: 'Sabah', times: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'] },
    { category: 'Öğleden Sonra', times: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'] },
    { category: 'Akşam', times: ['17:00', '17:30', '18:00', '18:30', '19:00'] },
];

// Dolu saatler (personel bazlı)
const BUSY_SLOTS: Record<string, string[]> = {
    '1': ['09:30', '10:00', '14:00', '14:30', '17:00'], // Canberk
    '2': ['10:30', '11:00', '15:00', '16:00'], // Mehmet
    '3': ['09:00', '12:00', '13:00', '18:00'], // Deniz
    '4': ['11:30', '13:30', '15:30', '17:30'], // Ali
};

const SERVICES = [
    { id: '1', name: 'Saç Kesimi', duration: 30, price: 150, icon: '✂️' },
    { id: '2', name: 'Sakal Tıraşı', duration: 20, price: 80, icon: '🪒' },
    { id: '3', name: 'Saç + Sakal', duration: 45, price: 200, icon: '💈' },
    { id: '4', name: 'Cilt Bakımı', duration: 40, price: 180, icon: '✨' },
    { id: '5', name: 'Saç Boyama', duration: 60, price: 300, icon: '🎨' },
];

const STAFF = [
    { id: '1', name: 'Canberk Hıdıroğlu', initials: 'CH', rating: 4.9, reviews: 128, specialty: 'Saç Uzmanı', available: true },
    { id: '2', name: 'Mehmet Akın', initials: 'MA', rating: 4.7, reviews: 95, specialty: 'Sakal Uzmanı', available: true },
    { id: '3', name: 'Deniz Kaya', initials: 'DK', rating: 4.5, reviews: 67, specialty: 'Cilt Bakımı', available: false },
    { id: '4', name: 'Ali Yılmaz', initials: 'AY', rating: 4.8, reviews: 112, specialty: 'Saç & Sakal', available: true },
];

// Helper functions
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
};

interface BookingData {
    date: Date | null;
    time: string | null;
    service: typeof SERVICES[0] | null;
    staff: typeof STAFF[0] | null;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    note: string;
}

// Card number formatter
const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
};

// Expiry formatter
const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
        return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
};

// Main wrapper component - routes based on tenant type
export default function BookingPage({ params }: { params: Promise<{ tenant: string }> }) {
    const { tenant: tenantSlug } = React.use(params);
    const tenant = getTenantBySlug(tenantSlug);

    // If restaurant, show restaurant booking page
    if (tenant?.sector === 'restaurant') {
        return <RestaurantBookingPage />;
    }

    // Otherwise show barber booking (default)
    return <BarberBookingContent />;
}

// Barber booking content component (original code)
function BarberBookingContent() {
    const [currentStep, setCurrentStep] = useState<Step>('staff');
    const [booking, setBooking] = useState<BookingData>({
        date: null,
        time: null,
        service: null,
        staff: null,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        note: '',
    });

    // Payment states
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
        { id: 'staff', label: 'Personel', icon: <User size={18} /> },
        { id: 'date', label: 'Tarih', icon: <Calendar size={18} /> },
        { id: 'time', label: 'Saat', icon: <Clock size={18} /> },
        { id: 'service', label: 'Hizmet', icon: <Scissors size={18} /> },
        { id: 'complete', label: 'Bilgiler', icon: <Mail size={18} /> },
    ];

    const stepOrder: Step[] = ['staff', 'date', 'time', 'service', 'complete'];
    const currentStepIndex = stepOrder.indexOf(currentStep);

    const getStepValue = (step: Step) => {
        switch (step) {
            case 'staff':
                return booking.staff?.name.split(' ')[0];
            case 'date':
                return booking.date
                    ? `${booking.date.getDate()} ${MONTH_NAMES[booking.date.getMonth()].slice(0, 3)}`
                    : null;
            case 'time':
                return booking.time;
            case 'service':
                return booking.service?.name;
            default:
                return null;
        }
    };

    const goToStep = (step: Step) => {
        const targetIndex = stepOrder.indexOf(step);
        if (targetIndex <= currentStepIndex && targetIndex >= 0) {
            setCurrentStep(step);
        }
    };

    const nextStep = () => {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < stepOrder.length) {
            setCurrentStep(stepOrder[nextIndex]);
        }
    };

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const selectDate = (day: number) => {
        const date = new Date(currentYear, currentMonth, day);
        setBooking({ ...booking, date });
        nextStep();
    };

    const selectTime = (time: string) => {
        setBooking({ ...booking, time });
        nextStep();
    };

    const selectService = (service: typeof SERVICES[0]) => {
        setBooking({ ...booking, service });
        nextStep();
    };

    const selectStaff = (staff: typeof STAFF[0]) => {
        setBooking({ ...booking, staff });
        nextStep();
    };

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

    const isDateAvailable = (day: number) => {
        const date = new Date(currentYear, currentMonth, day);
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0) return false;
        if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return false;
        return true;
    };

    // Payment handlers
    const handleProceedToPayment = () => {
        setCurrentStep('payment');
    };

    const canPay = cardNumber.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvv.length === 3;

    const handlePayment = async () => {
        setIsProcessing(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setCurrentStep('invoice');
    };

    const handleContinueToConfirm = () => {
        setCurrentStep('confirmed');
    };

    // Invoice download
    const handleDownloadInvoice = () => {
        const invoiceDate = new Date().toLocaleDateString('tr-TR');
        const invoiceNo = `INV-${Date.now().toString().slice(-8)}`;
        const subtotal = booking.service?.price || 0;
        const tax = subtotal * 0.20;
        const total = subtotal + tax;

        const invoiceHTML = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Fatura - ${invoiceNo}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; padding: 40px; }
        .invoice { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981, #14b8a6); color: white; padding: 32px; text-align: center; }
        .header h1 { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
        .header p { opacity: 0.9; font-size: 14px; }
        .content { padding: 32px; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #e2e8f0; }
        .info-box h3 { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 8px; }
        .info-box p { font-size: 14px; color: #1e293b; font-weight: 600; }
        .table { width: 100%; margin: 24px 0; }
        .table th { text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; padding: 12px 0; border-bottom: 2px solid #e2e8f0; }
        .table td { padding: 16px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; }
        .table .amount { text-align: right; font-weight: 700; }
        .totals { margin-top: 24px; padding-top: 24px; border-top: 2px solid #e2e8f0; }
        .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
        .total-row.final { font-size: 20px; font-weight: 800; color: #10b981; margin-top: 12px; padding-top: 12px; border-top: 2px dashed #e2e8f0; }
        .footer { background: #f8fafc; padding: 24px 32px; text-align: center; }
        .footer p { font-size: 12px; color: #64748b; }
        .footer .brand { font-weight: 800; color: #10b981; }
        .badge { display: inline-block; background: #dcfce7; color: #16a34a; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-top: 16px; }
    </style>
</head>
<body>
    <div class="invoice">
        <div class="header">
            <h1>Asil Berber</h1>
            <p>Online Randevu Faturası</p>
        </div>
        <div class="content">
            <div class="info-row">
                <div class="info-box">
                    <h3>Fatura No</h3>
                    <p>${invoiceNo}</p>
                </div>
                <div class="info-box">
                    <h3>Tarih</h3>
                    <p>${invoiceDate}</p>
                </div>
                <div class="info-box">
                    <h3>Durum</h3>
                    <p style="color: #16a34a;">✓ Ödendi</p>
                </div>
            </div>
            
            <div class="info-row">
                <div class="info-box">
                    <h3>Müşteri</h3>
                    <p>${booking.firstName} ${booking.lastName}</p>
                    <p style="font-weight: 400; color: #64748b;">${booking.email}</p>
                    <p style="font-weight: 400; color: #64748b;">${booking.phone}</p>
                </div>
                <div class="info-box" style="text-align: right;">
                    <h3>Randevu</h3>
                    <p>${booking.date?.getDate()} ${MONTH_NAMES[booking.date?.getMonth() || 0]} ${booking.date?.getFullYear()}</p>
                    <p style="font-weight: 400; color: #64748b;">Saat: ${booking.time}</p>
                    <p style="font-weight: 400; color: #64748b;">Personel: ${booking.staff?.name}</p>
                </div>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th>Hizmet</th>
                        <th>Süre</th>
                        <th class="amount">Tutar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${booking.service?.name}</td>
                        <td>${booking.service?.duration} dk</td>
                        <td class="amount">₺${subtotal.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="totals">
                <div class="total-row">
                    <span>Ara Toplam</span>
                    <span>₺${subtotal.toFixed(2)}</span>
                </div>
                <div class="total-row">
                    <span>KDV (%20)</span>
                    <span>₺${tax.toFixed(2)}</span>
                </div>
                <div class="total-row final">
                    <span>Toplam</span>
                    <span>₺${total.toFixed(2)}</span>
                </div>
            </div>
            
            <div style="text-align: center;">
                <span class="badge">✓ Ödeme Tamamlandı</span>
            </div>
        </div>
        <div class="footer">
            <p>Bu fatura <span class="brand">AKRAN</span> randevu sistemi tarafından oluşturulmuştur.</p>
            <p style="margin-top: 8px;">Asil Berber | Kadıköy, İstanbul | Tel: 0216 XXX XX XX</p>
        </div>
    </div>
</body>
</html>`;

        const blob = new Blob([invoiceHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    // Check if form is valid for payment
    const isFormValid = booking.firstName && booking.lastName && booking.phone && booking.email;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
            {/* Header with Hero Background */}
            <header className="relative overflow-hidden">
                {/* Hero Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/barber-hero.jpg"
                        alt="Barber shop"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-50" />
                </div>

                <div className="relative py-12 px-4">
                    <div className="max-w-lg mx-auto text-center">
                        <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl border border-white/30 mb-4">
                            AB
                        </div>
                        <h1 className="text-2xl font-black text-white drop-shadow-lg">Asil Berber</h1>
                        <p className="text-sm text-white/80 mt-1">Online Randevu</p>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <Star size={14} className="text-yellow-400" fill="currentColor" />
                                <span className="text-xs font-bold text-white">4.9</span>
                                <span className="text-xs text-white/70">(312 yorum)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stepper - only show for main steps */}
            {!['payment', 'invoice', 'confirmed'].includes(currentStep) && (
                <div className="bg-white border-b border-slate-200 py-4">
                    <div className="max-w-lg mx-auto px-4">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => {
                                const isCompleted = stepOrder.indexOf(step.id) < currentStepIndex;
                                const isCurrent = step.id === currentStep;
                                const value = getStepValue(step.id);

                                return (
                                    <button
                                        key={step.id}
                                        onClick={() => goToStep(step.id)}
                                        className={`flex-1 flex flex-col items-center gap-1 py-2 transition-all ${index !== steps.length - 1 ? 'border-r border-slate-200' : ''
                                            }`}
                                        disabled={stepOrder.indexOf(step.id) > currentStepIndex}
                                    >
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isCurrent
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                            : isCompleted
                                                ? 'bg-emerald-100 text-emerald-600'
                                                : 'bg-slate-100 text-slate-400'
                                            }`}>
                                            {step.icon}
                                        </div>
                                        <span className={`text-[10px] font-bold ${isCurrent ? 'text-emerald-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                                            }`}>
                                            {step.label}
                                        </span>
                                        {value && (
                                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full truncate max-w-[60px]">
                                                {value}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <main className="flex-1 py-6">
                <div className="max-w-lg mx-auto px-4">
                    <AnimatePresence mode="wait">
                        {/* Date Selection */}
                        {currentStep === 'date' && (
                            <motion.div
                                key="date"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
                            >
                                <h2 className="text-lg font-black text-slate-800 text-center mb-2">
                                    📅 Randevu Tarihi Seçin
                                </h2>
                                <p className="text-xs text-slate-500 text-center mb-6">
                                    {booking.staff?.name} için tarih seçin
                                </p>

                                {/* Month Navigation */}
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        onClick={prevMonth}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <ChevronLeft size={20} className="text-slate-600" />
                                    </button>
                                    <h3 className="font-bold text-slate-800">
                                        {MONTH_NAMES[currentMonth]} {currentYear}
                                    </h3>
                                    <button
                                        onClick={nextMonth}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <ChevronRight size={20} className="text-slate-600" />
                                    </button>
                                </div>

                                {/* Day Names */}
                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {DAY_NAMES.map((day) => (
                                        <div key={day} className="text-center py-2 text-xs font-bold text-slate-400">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                                        <div key={`empty-${i}`} className="aspect-square" />
                                    ))}
                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1;
                                        const isAvailable = isDateAvailable(day);
                                        const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

                                        return (
                                            <button
                                                key={day}
                                                onClick={() => isAvailable && selectDate(day)}
                                                disabled={!isAvailable}
                                                className={`aspect-square rounded-full flex items-center justify-center text-sm font-bold transition-all ${isAvailable
                                                    ? isToday
                                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                                        : 'text-slate-700 hover:bg-emerald-100 hover:text-emerald-700'
                                                    : 'text-slate-300 cursor-not-allowed'
                                                    }`}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Waitlist Section */}
                                <div className="mt-6 text-center">
                                    <p className="text-xs text-slate-400 mb-2">
                                        İstediğiniz tarihlerde müsaitlik yok mu?
                                    </p>
                                    <Link
                                        href="/waitlist"
                                        className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                                    >
                                        Bekleme Listesine Katılın
                                    </Link>
                                </div>

                                <button
                                    onClick={() => setCurrentStep('staff')}
                                    className="mt-6 w-full py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
                                >
                                    ← Geri Dön
                                </button>
                            </motion.div>
                        )}

                        {/* Time Selection */}
                        {currentStep === 'time' && (
                            <motion.div
                                key="time"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
                            >
                                <h2 className="text-lg font-black text-slate-800 text-center mb-2">
                                    🕐 Randevu Saati Seçin
                                </h2>
                                <p className="text-xs text-slate-500 text-center mb-6">
                                    {booking.staff?.name} için müsait saatler
                                </p>

                                <div className="space-y-6">
                                    {TIME_SLOTS.map((slot) => {
                                        const busyTimes = booking.staff ? BUSY_SLOTS[booking.staff.id] || [] : [];
                                        return (
                                            <div key={slot.category}>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                                                    {slot.category}
                                                </p>
                                                <div className="grid grid-cols-4 gap-2">
                                                    {slot.times.map((time) => {
                                                        const isBusy = busyTimes.includes(time);
                                                        return (
                                                            <button
                                                                key={time}
                                                                onClick={() => !isBusy && selectTime(time)}
                                                                disabled={isBusy}
                                                                className={`py-3 rounded-xl border text-sm font-bold transition-all ${isBusy
                                                                    ? 'bg-red-50 border-red-200 text-red-400 cursor-not-allowed line-through'
                                                                    : 'border-slate-200 text-slate-700 hover:bg-emerald-500 hover:text-white hover:border-emerald-500'
                                                                    }`}
                                                            >
                                                                {time}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Legend */}
                                <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-slate-100 border border-slate-200" />
                                        <span className="text-xs text-slate-500">Müsait</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-red-50 border border-red-200" />
                                        <span className="text-xs text-slate-500">Dolu</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setCurrentStep('date')}
                                    className="mt-4 w-full py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
                                >
                                    ← Geri Dön
                                </button>
                            </motion.div>
                        )}

                        {/* Service Selection */}
                        {currentStep === 'service' && (
                            <motion.div
                                key="service"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
                            >
                                <h2 className="text-lg font-black text-slate-800 text-center mb-6">
                                    ✂️ Hizmet Seçin
                                </h2>

                                <div className="space-y-3">
                                    {SERVICES.map((service) => (
                                        <button
                                            key={service.id}
                                            onClick={() => selectService(service)}
                                            className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
                                        >
                                            <span className="text-2xl">{service.icon}</span>
                                            <div className="flex-1 text-left">
                                                <p className="font-bold text-slate-800 group-hover:text-emerald-700">{service.name}</p>
                                                <p className="text-xs text-slate-500">{service.duration} dakika</p>
                                            </div>
                                            <span className="font-black text-emerald-600">₺{service.price}</span>
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentStep('time')}
                                    className="mt-6 w-full py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
                                >
                                    ← Geri Dön
                                </button>
                            </motion.div>
                        )}

                        {/* Staff Selection - İLK ADIM */}
                        {currentStep === 'staff' && (
                            <motion.div
                                key="staff"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
                            >
                                <h2 className="text-lg font-black text-slate-800 text-center mb-2">
                                    👤 Personel Seçin
                                </h2>
                                <p className="text-xs text-slate-500 text-center mb-6">
                                    Randevunuz için bir uzman seçin
                                </p>

                                <div className="space-y-3">
                                    {STAFF.map((staff) => (
                                        <button
                                            key={staff.id}
                                            onClick={() => staff.available && selectStaff(staff)}
                                            disabled={!staff.available}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${staff.available
                                                ? 'border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 group'
                                                : 'border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed'
                                                }`}
                                        >
                                            {/* Avatar */}
                                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${staff.available
                                                ? 'bg-gradient-to-br from-emerald-400 to-teal-500'
                                                : 'bg-slate-300'
                                                }`}>
                                                {staff.initials}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 text-left">
                                                <div className="flex items-center gap-2">
                                                    <p className={`font-bold ${staff.available ? 'text-slate-800 group-hover:text-emerald-700' : 'text-slate-500'}`}>
                                                        {staff.name}
                                                    </p>
                                                    {!staff.available && (
                                                        <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                                                            Bugün Dolu
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500">{staff.specialty}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Star size={12} className="text-yellow-500" fill="currentColor" />
                                                    <span className="text-xs font-bold text-slate-700">{staff.rating}</span>
                                                    <span className="text-xs text-slate-400">({staff.reviews} yorum)</span>
                                                </div>
                                            </div>

                                            {/* Availability indicator */}
                                            {staff.available && (
                                                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Complete Form */}
                        {currentStep === 'complete' && (
                            <motion.div
                                key="complete"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                    <h2 className="text-lg font-black text-slate-800 text-center mb-6">
                                        📝 Bilgilerinizi Girin
                                    </h2>

                                    {/* Summary */}
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Calendar size={16} className="text-emerald-600" />
                                            <span className="text-sm font-bold text-emerald-700">Randevu Özeti</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500">📅</span>
                                                <span className="font-medium text-slate-800">
                                                    {booking.date?.getDate()} {MONTH_NAMES[booking.date?.getMonth() || 0]}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500">🕐</span>
                                                <span className="font-medium text-slate-800">{booking.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500">✂️</span>
                                                <span className="font-medium text-slate-800">{booking.service?.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500">👤</span>
                                                <span className="font-medium text-slate-800">{booking.staff?.name.split(' ')[0]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Adınız *</label>
                                                <input
                                                    type="text"
                                                    value={booking.firstName}
                                                    onChange={(e) => setBooking({ ...booking, firstName: e.target.value })}
                                                    className="w-full h-12 px-4 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                                    placeholder="Adınız"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Soyadınız *</label>
                                                <input
                                                    type="text"
                                                    value={booking.lastName}
                                                    onChange={(e) => setBooking({ ...booking, lastName: e.target.value })}
                                                    className="w-full h-12 px-4 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                                    placeholder="Soyadınız"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Telefon *</label>
                                            <input
                                                type="tel"
                                                value={booking.phone}
                                                onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                                                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                                placeholder="0532 XXX XX XX"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">E-posta *</label>
                                            <input
                                                type="email"
                                                value={booking.email}
                                                onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                                                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                                placeholder="ornek@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Not (Opsiyonel)</label>
                                            <textarea
                                                value={booking.note}
                                                onChange={(e) => setBooking({ ...booking, note: e.target.value })}
                                                rows={3}
                                                className="w-full p-4 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                                                placeholder="Eklemek istediğiniz bir not var mı?"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Price & Submit */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-slate-600">Toplam Tutar</span>
                                        <span className="text-2xl font-black text-emerald-600">₺{booking.service?.price || 0}</span>
                                    </div>
                                    <button
                                        onClick={handleProceedToPayment}
                                        disabled={!isFormValid}
                                        className={`w-full h-14 font-black rounded-xl transition-all flex items-center justify-center gap-2 ${isFormValid
                                            ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <CreditCard size={20} />
                                        Ödemeye Geç
                                    </button>
                                    {!isFormValid && (
                                        <p className="text-xs text-red-500 text-center mt-2">
                                            Lütfen tüm zorunlu alanları doldurun
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={() => setCurrentStep('service')}
                                    className="w-full py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
                                >
                                    ← Geri Dön
                                </button>
                            </motion.div>
                        )}

                        {/* Payment Screen */}
                        {currentStep === 'payment' && (
                            <motion.div
                                key="payment"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <CreditCard size={24} />
                                            <h2 className="text-lg font-black">Ödeme</h2>
                                        </div>
                                        <button
                                            onClick={() => setCurrentStep('complete')}
                                            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                                        <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">Sipariş Özeti</p>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold">{booking.service?.name}</p>
                                                <p className="text-sm text-white/70">
                                                    {booking.staff?.name} • {booking.date?.getDate()} {MONTH_NAMES[booking.date?.getMonth() || 0]} • {booking.time}
                                                </p>
                                            </div>
                                            <p className="text-xl font-black">₺{booking.service?.price}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Form */}
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                            Kart Numarası
                                        </label>
                                        <input
                                            type="text"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                            maxLength={19}
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 text-slate-800 text-lg font-mono tracking-wider focus:outline-none focus:border-emerald-500 transition-colors"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                                Son Kullanma
                                            </label>
                                            <input
                                                type="text"
                                                value={expiry}
                                                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                                maxLength={5}
                                                placeholder="AA/YY"
                                                className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 text-slate-800 text-lg font-mono text-center focus:outline-none focus:border-emerald-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                                CVV
                                            </label>
                                            <input
                                                type="password"
                                                value={cvv}
                                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                                maxLength={3}
                                                placeholder="•••"
                                                className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 text-slate-800 text-lg font-mono text-center focus:outline-none focus:border-emerald-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePayment}
                                        disabled={!canPay || isProcessing}
                                        className={`w-full h-14 rounded-xl font-black text-white flex items-center justify-center gap-2 transition-all ${canPay && !isProcessing
                                            ? 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/30'
                                            : 'bg-slate-300 cursor-not-allowed'
                                            }`}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                İşleniyor...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard size={20} />
                                                ₺{booking.service?.price} Öde
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-slate-400 text-center">
                                        🔒 256-bit SSL ile güvenli ödeme
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Invoice Screen */}
                        {currentStep === 'invoice' && (
                            <motion.div
                                key="invoice"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white text-center">
                                    <Receipt size={48} className="mx-auto mb-3" />
                                    <h2 className="text-xl font-black">Fatura</h2>
                                </div>

                                <div className="p-6">
                                    {/* Business Info */}
                                    <div className="text-center pb-4 border-b border-slate-200 mb-4">
                                        <h3 className="font-black text-slate-800">Asil Berber</h3>
                                        <p className="text-xs text-slate-500">Kadıköy, İstanbul</p>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Hizmet</span>
                                            <span className="font-bold text-slate-800">{booking.service?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Personel</span>
                                            <span className="font-bold text-slate-800">{booking.staff?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Tarih</span>
                                            <span className="font-bold text-slate-800">
                                                {booking.date?.getDate()} {MONTH_NAMES[booking.date?.getMonth() || 0]} {booking.date?.getFullYear()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Saat</span>
                                            <span className="font-bold text-slate-800">{booking.time}</span>
                                        </div>
                                    </div>

                                    {/* Totals */}
                                    <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Ara Toplam</span>
                                            <span className="text-slate-800">₺{booking.service?.price.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">KDV (%20)</span>
                                            <span className="text-slate-800">₺{((booking.service?.price || 0) * 0.2).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-dashed border-slate-200">
                                            <span className="font-black text-slate-800">Toplam</span>
                                            <span className="font-black text-emerald-600 text-xl">
                                                ₺{((booking.service?.price || 0) * 1.2).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Continue Button */}
                                    <button
                                        onClick={handleContinueToConfirm}
                                        className="w-full h-14 mt-6 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30"
                                    >
                                        Devam Et
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Confirmed Screen */}
                        {currentStep === 'confirmed' && (
                            <motion.div
                                key="confirmed"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-center"
                            >
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-white">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', delay: 0.2 }}
                                        className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-4"
                                    >
                                        <CheckCircle size={48} className="text-emerald-500" />
                                    </motion.div>
                                    <h2 className="text-2xl font-black mb-2">Randevunuz Onaylandı!</h2>
                                    <p className="text-white/80">Onay bilgileri e-posta adresinize gönderildi</p>
                                </div>

                                <div className="p-6">
                                    {/* Booking Details */}
                                    <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-slate-500">Tarih</p>
                                                <p className="font-bold text-slate-800">
                                                    {booking.date?.getDate()} {MONTH_NAMES[booking.date?.getMonth() || 0]} {booking.date?.getFullYear()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-slate-500">Saat</p>
                                                <p className="font-bold text-slate-800">{booking.time}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-500">Hizmet</p>
                                                <p className="font-bold text-slate-800">{booking.service?.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-500">Personel</p>
                                                <p className="font-bold text-slate-800">{booking.staff?.name.split(' ')[0]}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Download Invoice */}
                                    <button
                                        onClick={handleDownloadInvoice}
                                        className="w-full h-14 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                                    >
                                        <Download size={20} />
                                        Faturayı İndir
                                    </button>

                                    <p className="text-xs text-slate-400 mt-4">
                                        Randevunuzu iptal etmek veya değiştirmek için bize ulaşın
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-4 text-center">
                <p className="text-xs text-slate-400">
                    Powered by <span className="font-bold text-emerald-600">AKRAN</span>
                </p>
            </footer>
        </div>
    );
}
