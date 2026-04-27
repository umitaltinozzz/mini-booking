'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight,
    User, Phone, Mail, MessageSquare, Star, Users,
    MapPin, CreditCard, AlertCircle, X, Info, Loader2, ClipboardList
} from 'lucide-react';
import {
    RESTAURANT_INFO,
    TABLE_SECTIONS,
    TABLES,
    GUEST_COUNTS,
    RESTAURANT_TIME_SLOTS,
    SPECIAL_REQUESTS
} from '@/data/mockRestaurant';

type Step = 'guests' | 'date' | 'time' | 'section' | 'info' | 'payment' | 'confirmed' | 'waitlist';

const MONTH_NAMES = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const DAY_NAMES = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
};

// Provizyon ücreti (kişi başı)
const PROVISION_PER_PERSON = 50;

// Akşam yemeği saatleri DOLU (bekleme listesi için)
const DINNER_BUSY_TIMES = ['19:00', '19:30', '20:00', '20:30', '21:00'];

interface ReservationData {
    guests: number;
    date: Date | null;
    time: string | null;
    section: string | null;
    tableId: string | null;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    specialRequest: string;
    note: string;
}

// Kart numarası formatlayıcı
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

// Son kullanma tarihi formatlayıcı
const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
        return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
};

export default function RestaurantBookingPage() {
    const [currentStep, setCurrentStep] = useState<Step>('guests');
    const [reservation, setReservation] = useState<ReservationData>({
        guests: 2,
        date: null,
        time: null,
        section: null,
        tableId: null,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        specialRequest: '',
        note: '',
    });
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Ödeme state'leri
    const [showProvisionPopup, setShowProvisionPopup] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const provisionAmount = reservation.guests * PROVISION_PER_PERSON;

    const updateReservation = (updates: Partial<ReservationData>) => {
        setReservation(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => {
        const stepOrder: Step[] = ['guests', 'date', 'time', 'section', 'info', 'payment', 'confirmed'];
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex < stepOrder.length - 1) {
            setCurrentStep(stepOrder[currentIndex + 1]);
        }
    };

    const prevStep = () => {
        const stepOrder: Step[] = ['guests', 'date', 'time', 'section', 'info', 'payment', 'confirmed'];
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(stepOrder[currentIndex - 1]);
        }
    };

    const handleGoToPayment = () => {
        setShowProvisionPopup(true);
    };

    const handleConfirmProvision = () => {
        setShowProvisionPopup(false);
        setCurrentStep('payment');
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setCurrentStep('confirmed');
    };

    const handleJoinWaitlist = () => {
        setCurrentStep('waitlist');
    };

    const downloadInvoice = () => {
        const invoiceNo = 'MM-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        const invoiceDate = new Date().toLocaleDateString('tr-TR');
        const reservationDate = reservation.date?.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        const sectionName = TABLE_SECTIONS.find(s => s.id === reservation.section)?.name || '';

        const invoiceHTML = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fatura - ${invoiceNo}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0a0a0a; color: #fff; padding: 40px; }
        .invoice { max-width: 600px; margin: 0 auto; background: #111; border-radius: 24px; padding: 40px; border: 1px solid #222; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid #333; }
        .logo { font-size: 28px; font-weight: 900; background: linear-gradient(135deg, #ef4444, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .invoice-info { text-align: right; }
        .invoice-no { font-size: 14px; color: #888; }
        .invoice-date { font-size: 12px; color: #666; margin-top: 4px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #222; }
        .detail-label { color: #888; }
        .detail-value { font-weight: 600; }
        .total-section { background: linear-gradient(135deg, #ef4444, #f97316); border-radius: 16px; padding: 20px; margin-top: 30px; }
        .total-row { display: flex; justify-content: space-between; font-size: 18px; font-weight: 900; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; text-align: center; }
        .footer p { font-size: 12px; color: #666; }
        .print-btn { display: block; width: 100%; margin-top: 30px; padding: 16px; background: #222; border: none; border-radius: 12px; color: #fff; font-weight: 700; cursor: pointer; font-size: 14px; }
        .print-btn:hover { background: #333; }
        @media print { .print-btn { display: none; } body { background: #fff; } .invoice { background: #fff; border: 1px solid #ddd; } .detail-row { border-color: #eee; } .footer { border-color: #eee; } .logo { color: #ef4444; background: none; -webkit-text-fill-color: #ef4444; } .section-title, .detail-label, .invoice-no, .footer p { color: #666; } .detail-value, .invoice-date { color: #000; } }
    </style>
</head>
<body>
    <div class="invoice">
        <div class="header">
            <div class="logo">${RESTAURANT_INFO.name}</div>
            <div class="invoice-info">
                <div class="invoice-no">Fatura No: ${invoiceNo}</div>
                <div class="invoice-date">${invoiceDate}</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Müşteri Bilgileri</div>
            <div class="detail-row">
                <span class="detail-label">Ad Soyad</span>
                <span class="detail-value">${reservation.firstName} ${reservation.lastName}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Telefon</span>
                <span class="detail-value">${reservation.phone}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">E-posta</span>
                <span class="detail-value">${reservation.email || '-'}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Rezervasyon Detayları</div>
            <div class="detail-row">
                <span class="detail-label">Tarih</span>
                <span class="detail-value">${reservationDate}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Saat</span>
                <span class="detail-value">${reservation.time}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Kişi Sayısı</span>
                <span class="detail-value">${reservation.guests} Kişi</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Bölüm</span>
                <span class="detail-value">${sectionName}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Ödeme Bilgileri</div>
            <div class="detail-row">
                <span class="detail-label">Kişi Başı Provizyon</span>
                <span class="detail-value">${PROVISION_PER_PERSON} ₺</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Kişi Sayısı</span>
                <span class="detail-value">x ${reservation.guests}</span>
            </div>
        </div>

        <div class="total-section">
            <div class="total-row">
                <span>Toplam Ödenen</span>
                <span>${provisionAmount} ₺</span>
            </div>
        </div>

        <div class="footer">
            <p>Bu provizyon tutarı hesabınızdan düşülecektir.</p>
            <p style="margin-top: 8px;">24 saat önceden iptal halinde tam iade yapılır.</p>
            <p style="margin-top: 16px; color: #888;">${RESTAURANT_INFO.name} • ${RESTAURANT_INFO.address}</p>
        </div>

        <button class="print-btn" onclick="window.print()">🖨️ Yazdır / PDF Kaydet</button>
    </div>
</body>
</html>
        `;

        const newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.document.write(invoiceHTML);
            newWindow.document.close();
        }
    };

    const getAvailableTables = () => {
        return TABLES.filter(t =>
            t.sectionId === reservation.section &&
            t.available &&
            t.capacity >= reservation.guests
        );
    };

    const isTimeSlotBusy = (time: string) => {
        // Akşam yemeği saatleri dolu
        return DINNER_BUSY_TIMES.includes(time);
    };

    // Stepper
    const steps = [
        { id: 'guests', label: 'Kişi', icon: Users },
        { id: 'date', label: 'Tarih', icon: Calendar },
        { id: 'time', label: 'Saat', icon: Clock },
        { id: 'section', label: 'Bölüm', icon: MapPin },
        { id: 'info', label: 'Bilgiler', icon: User },
        { id: 'payment', label: 'Ödeme', icon: CreditCard },
    ];

    return (
        <main className="min-h-screen bg-brand-bg">
            {/* Provision Info Popup */}
            <AnimatePresence>
                {showProvisionPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowProvisionPopup(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-brand-surface border border-brand-border rounded-3xl p-6 max-w-md w-full shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                                        <Info className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <h3 className="text-lg font-black text-brand-text">Provizyon Bilgisi</h3>
                                </div>
                                <button
                                    onClick={() => setShowProvisionPopup(false)}
                                    className="p-2 rounded-xl hover:bg-brand-surface2 text-brand-muted"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
                                    <p className="text-sm text-brand-text">
                                        Rezervasyonunuzu garantilemek için{' '}
                                        <span className="font-black text-amber-500">
                                            {provisionAmount} ₺
                                        </span>{' '}
                                        provizyon ücreti alınacaktır.
                                    </p>
                                </div>

                                <div className="space-y-2 text-sm text-brand-muted">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Provizyon, hesabınızdan düşülecektir.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Gelmemeniz durumunda iade yapılmaz.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-amber-400 font-medium">
                                            24 saat önceden iptal ederseniz tam iade yapılır.
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setShowProvisionPopup(false)}
                                        className="flex-1 h-12 rounded-xl bg-brand-surface2 text-brand-muted font-bold"
                                    >
                                        Vazgeç
                                    </button>
                                    <button
                                        onClick={handleConfirmProvision}
                                        className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-black"
                                    >
                                        Kabul Et
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Restaurant Header */}
            <div
                className="relative h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${RESTAURANT_INFO.image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                                MM
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-white">{RESTAURANT_INFO.name}</h1>
                                <p className="text-sm text-white/70">{RESTAURANT_INFO.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/80">
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                {RESTAURANT_INFO.rating} ({RESTAURANT_INFO.reviews})
                            </span>
                            <span>{RESTAURANT_INFO.priceRange}</span>
                            <span>{RESTAURANT_INFO.openHours}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-6">
                {/* Progress Steps */}
                {!['confirmed', 'waitlist'].includes(currentStep) && (
                    <div className="flex items-center justify-between mb-8 px-2 overflow-x-auto">
                        {steps.map((step, index) => {
                            const StepIcon = step.icon;
                            return (
                                <React.Fragment key={step.id}>
                                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${currentStep === step.id
                                                ? 'bg-red-500 text-white scale-110'
                                                : steps.findIndex(s => s.id === currentStep) > index
                                                    ? 'bg-red-500/20 text-red-500'
                                                    : 'bg-brand-surface2 text-brand-muted'
                                                }`}
                                        >
                                            {steps.findIndex(s => s.id === currentStep) > index ? (
                                                <CheckCircle className="w-5 h-5" />
                                            ) : (
                                                <StepIcon className="w-5 h-5" />
                                            )}
                                        </div>
                                        <span className={`text-[10px] font-bold ${steps.findIndex(s => s.id === currentStep) >= index
                                            ? 'text-red-500'
                                            : 'text-brand-muted'
                                            }`}>
                                            {step.label}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-2 rounded-full min-w-[20px] ${steps.findIndex(s => s.id === currentStep) > index
                                            ? 'bg-red-500'
                                            : 'bg-brand-border'
                                            }`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                )}

                {/* Content */}
                <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 shadow-xl">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Guest Count */}
                        {currentStep === 'guests' && (
                            <motion.div
                                key="guests"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-black text-brand-text">Kaç kişilik rezervasyon?</h2>
                                    <p className="text-sm text-brand-muted mt-1">Misafir sayısını seçin</p>
                                </div>

                                <div className="grid grid-cols-5 gap-3">
                                    {GUEST_COUNTS.map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => updateReservation({ guests: count })}
                                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${reservation.guests === count
                                                ? 'border-red-500 bg-red-500/10 text-red-500'
                                                : 'border-brand-border bg-brand-surface2 text-brand-muted hover:border-red-500/50'
                                                }`}
                                        >
                                            <Users className="w-5 h-5" />
                                            <span className="text-lg font-black">{count}</span>
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={nextStep}
                                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                                >
                                    Devam
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </motion.div>
                        )}

                        {/* Step 2: Date Selection */}
                        {currentStep === 'date' && (
                            <motion.div
                                key="date"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="text-center mb-4">
                                    <h2 className="text-xl font-black text-brand-text">Tarih Seçin</h2>
                                    <p className="text-sm text-brand-muted mt-1">{reservation.guests} kişi için</p>
                                </div>

                                {/* Month Navigation */}
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        onClick={() => {
                                            if (currentMonth === 0) {
                                                setCurrentMonth(11);
                                                setCurrentYear(currentYear - 1);
                                            } else {
                                                setCurrentMonth(currentMonth - 1);
                                            }
                                        }}
                                        className="p-2 rounded-xl hover:bg-brand-surface2 text-brand-muted hover:text-brand-text transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <span className="font-black text-brand-text">
                                        {MONTH_NAMES[currentMonth]} {currentYear}
                                    </span>
                                    <button
                                        onClick={() => {
                                            if (currentMonth === 11) {
                                                setCurrentMonth(0);
                                                setCurrentYear(currentYear + 1);
                                            } else {
                                                setCurrentMonth(currentMonth + 1);
                                            }
                                        }}
                                        className="p-2 rounded-xl hover:bg-brand-surface2 text-brand-muted hover:text-brand-text transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {DAY_NAMES.map(day => (
                                        <div key={day} className="text-center text-xs font-bold text-brand-muted py-2">
                                            {day}
                                        </div>
                                    ))}
                                    {Array.from({ length: getFirstDayOfMonth(currentYear, currentMonth) }).map((_, i) => (
                                        <div key={`empty-${i}`} />
                                    ))}
                                    {Array.from({ length: getDaysInMonth(currentYear, currentMonth) }).map((_, i) => {
                                        const day = i + 1;
                                        const date = new Date(currentYear, currentMonth, day);
                                        const isPast = date < today;
                                        const isSelected = reservation.date?.toDateString() === date.toDateString();
                                        const isToday = date.toDateString() === today.toDateString();

                                        return (
                                            <button
                                                key={day}
                                                onClick={() => !isPast && updateReservation({ date })}
                                                disabled={isPast}
                                                className={`p-3 rounded-xl text-sm font-bold transition-all ${isSelected
                                                    ? 'bg-red-500 text-white'
                                                    : isToday
                                                        ? 'bg-red-500/20 text-red-500 ring-2 ring-red-500'
                                                        : isPast
                                                            ? 'text-brand-muted/30 cursor-not-allowed'
                                                            : 'text-brand-text hover:bg-brand-surface2'
                                                    }`}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={prevStep}
                                        className="flex-1 h-12 rounded-xl bg-brand-surface2 text-brand-muted font-bold flex items-center justify-center gap-2 hover:bg-brand-surface hover:text-brand-text transition-all"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Geri
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        disabled={!reservation.date}
                                        className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-black flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Devam
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Time Selection */}
                        {currentStep === 'time' && (
                            <motion.div
                                key="time"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-4">
                                    <h2 className="text-xl font-black text-brand-text">Saat Seçin</h2>
                                    <p className="text-sm text-brand-muted mt-1">
                                        {reservation.date?.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </p>
                                </div>

                                {RESTAURANT_TIME_SLOTS.map((category) => (
                                    <div key={category.category}>
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-sm font-bold text-brand-muted uppercase tracking-wider">
                                                {category.category}
                                            </h3>
                                            {category.category === 'Akşam Yemeği' && (
                                                <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    Yoğun saatler
                                                </span>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            {category.times.map((time) => {
                                                const isBusy = isTimeSlotBusy(time);
                                                const isSelected = reservation.time === time;
                                                return (
                                                    <button
                                                        key={time}
                                                        onClick={() => {
                                                            if (isBusy) {
                                                                updateReservation({ time });
                                                            } else {
                                                                updateReservation({ time });
                                                            }
                                                        }}
                                                        className={`p-3 rounded-xl text-sm font-bold transition-all relative ${isSelected
                                                            ? 'bg-red-500 text-white'
                                                            : isBusy
                                                                ? 'bg-amber-500/20 text-amber-500 border-2 border-amber-500/50'
                                                                : 'bg-brand-surface2 text-brand-text hover:bg-red-500/20 hover:text-red-500'
                                                            }`}
                                                    >
                                                        {time}
                                                        {isBusy && !isSelected && (
                                                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                                                                <ClipboardList className="w-2.5 h-2.5 text-white" />
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}

                                {reservation.time && isTimeSlotBusy(reservation.time) && (
                                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
                                        <p className="text-sm text-amber-400 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            Bu saat şu an dolu. Bekleme listesine katılabilirsiniz.
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <button onClick={prevStep} className="flex-1 h-12 rounded-xl bg-brand-surface2 text-brand-muted font-bold flex items-center justify-center gap-2">
                                        <ChevronLeft className="w-4 h-4" /> Geri
                                    </button>
                                    {reservation.time && isTimeSlotBusy(reservation.time) ? (
                                        <button
                                            onClick={handleJoinWaitlist}
                                            className="flex-1 h-12 rounded-xl bg-amber-500 text-white font-black flex items-center justify-center gap-2"
                                        >
                                            Bekleme Listesi <ClipboardList className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={nextStep}
                                            disabled={!reservation.time}
                                            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-black flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            Devam <ChevronRight className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Section/Table Selection */}
                        {currentStep === 'section' && (
                            <motion.div
                                key="section"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-4">
                                    <h2 className="text-xl font-black text-brand-text">Bölüm Seçin</h2>
                                    <p className="text-sm text-brand-muted mt-1">Nerede oturmak istersiniz?</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {TABLE_SECTIONS.map((section) => {
                                        const availableCount = TABLES.filter(
                                            t => t.sectionId === section.id && t.available && t.capacity >= reservation.guests
                                        ).length;
                                        const isSelected = reservation.section === section.id;

                                        return (
                                            <button
                                                key={section.id}
                                                onClick={() => updateReservation({ section: section.id, tableId: null })}
                                                disabled={availableCount === 0}
                                                className={`p-4 rounded-2xl border-2 transition-all text-left ${isSelected
                                                    ? 'border-red-500 bg-red-500/10'
                                                    : availableCount === 0
                                                        ? 'border-brand-border/50 bg-brand-surface2/50 opacity-50 cursor-not-allowed'
                                                        : 'border-brand-border bg-brand-surface2 hover:border-red-500/50'
                                                    }`}
                                            >
                                                <span className="text-2xl">{section.icon}</span>
                                                <h3 className={`font-bold mt-2 ${isSelected ? 'text-red-500' : 'text-brand-text'}`}>
                                                    {section.name}
                                                </h3>
                                                <p className="text-xs text-brand-muted">{section.description}</p>
                                                <p className={`text-xs mt-1 ${availableCount > 0 ? 'text-green-500' : 'text-red-400'}`}>
                                                    {availableCount > 0 ? `${availableCount} masa müsait` : 'Dolu'}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Available Tables */}
                                {reservation.section && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-bold text-brand-muted uppercase tracking-wider mb-3">
                                            Müsait Masalar
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {getAvailableTables().map((table) => (
                                                <button
                                                    key={table.id}
                                                    onClick={() => updateReservation({ tableId: table.id })}
                                                    className={`p-3 rounded-xl border-2 transition-all text-left ${reservation.tableId === table.id
                                                        ? 'border-red-500 bg-red-500/10'
                                                        : 'border-brand-border bg-brand-surface2 hover:border-red-500/50'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className={`font-bold ${reservation.tableId === table.id ? 'text-red-500' : 'text-brand-text'}`}>
                                                            {table.name}
                                                        </span>
                                                        <span className="text-xs text-brand-muted">{table.capacity} kişilik</span>
                                                    </div>
                                                    <p className="text-xs text-brand-muted mt-1">{table.position}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <button onClick={prevStep} className="flex-1 h-12 rounded-xl bg-brand-surface2 text-brand-muted font-bold flex items-center justify-center gap-2">
                                        <ChevronLeft className="w-4 h-4" /> Geri
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        disabled={!reservation.section}
                                        className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-black flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        Devam <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 5: Contact Info */}
                        {currentStep === 'info' && (
                            <motion.div
                                key="info"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="text-center mb-4">
                                    <h2 className="text-xl font-black text-brand-text">İletişim Bilgileri</h2>
                                    <p className="text-sm text-brand-muted mt-1">Rezervasyonu kimin adına yapıyorsunuz?</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-brand-muted mb-1">Ad</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                                            <input
                                                type="text"
                                                value={reservation.firstName}
                                                onChange={(e) => updateReservation({ firstName: e.target.value })}
                                                className="w-full h-12 pl-10 pr-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                placeholder="Adınız"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-brand-muted mb-1">Soyad</label>
                                        <input
                                            type="text"
                                            value={reservation.lastName}
                                            onChange={(e) => updateReservation({ lastName: e.target.value })}
                                            className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            placeholder="Soyadınız"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-brand-muted mb-1">Telefon</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                                        <input
                                            type="tel"
                                            value={reservation.phone}
                                            onChange={(e) => updateReservation({ phone: e.target.value })}
                                            className="w-full h-12 pl-10 pr-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            placeholder="05xx xxx xx xx"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-brand-muted mb-1">E-posta</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                                        <input
                                            type="email"
                                            value={reservation.email}
                                            onChange={(e) => updateReservation({ email: e.target.value })}
                                            className="w-full h-12 pl-10 pr-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            placeholder="ornek@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-brand-muted mb-2">Özel İstek (Opsiyonel)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {SPECIAL_REQUESTS.map((request) => (
                                            <button
                                                key={request}
                                                onClick={() => updateReservation({
                                                    specialRequest: reservation.specialRequest === request ? '' : request
                                                })}
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${reservation.specialRequest === request
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-brand-surface2 text-brand-muted hover:bg-red-500/20 hover:text-red-500'
                                                    }`}
                                            >
                                                {request}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-brand-muted mb-1">Not (Opsiyonel)</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-brand-muted" />
                                        <textarea
                                            value={reservation.note}
                                            onChange={(e) => updateReservation({ note: e.target.value })}
                                            className="w-full min-h-[80px] pl-10 pr-4 py-3 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                                            placeholder="Örn: Bebek sandalyesi, alerjiler..."
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button onClick={prevStep} className="flex-1 h-12 rounded-xl bg-brand-surface2 text-brand-muted font-bold flex items-center justify-center gap-2">
                                        <ChevronLeft className="w-4 h-4" /> Geri
                                    </button>
                                    <button
                                        onClick={handleGoToPayment}
                                        disabled={!reservation.firstName || !reservation.phone}
                                        className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-black flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        Ödemeye Geç
                                        <CreditCard className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 6: Payment */}
                        {currentStep === 'payment' && (
                            <motion.div
                                key="payment"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="text-center mb-4">
                                    <h2 className="text-xl font-black text-brand-text">Provizyon Ödemesi</h2>
                                    <p className="text-sm text-brand-muted mt-1">Rezervasyonu garantilemek için</p>
                                </div>

                                {/* Summary */}
                                <div className="bg-brand-surface2 rounded-2xl p-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-brand-muted">Kişi sayısı</span>
                                        <span className="text-brand-text font-bold">{reservation.guests} kişi</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-brand-muted">Kişi başı provizyon</span>
                                        <span className="text-brand-text font-bold">{PROVISION_PER_PERSON} ₺</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-brand-border">
                                        <span className="font-black text-brand-text">Toplam</span>
                                        <span className="font-black text-red-500 text-lg">{provisionAmount} ₺</span>
                                    </div>
                                </div>

                                {/* Card Form */}
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-bold text-brand-muted mb-1">Kart Numarası</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                                            <input
                                                type="text"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                maxLength={19}
                                                className="w-full h-12 pl-10 pr-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                                                placeholder="1234 5678 9012 3456"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-brand-muted mb-1">Son Kullanma</label>
                                            <input
                                                type="text"
                                                value={expiry}
                                                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                                maxLength={5}
                                                className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-brand-muted mb-1">CVV</label>
                                            <input
                                                type="text"
                                                value={cvv}
                                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                                maxLength={3}
                                                className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                                                placeholder="123"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button onClick={prevStep} className="flex-1 h-12 rounded-xl bg-brand-surface2 text-brand-muted font-bold flex items-center justify-center gap-2">
                                        <ChevronLeft className="w-4 h-4" /> Geri
                                    </button>
                                    <button
                                        onClick={handlePayment}
                                        disabled={isProcessing || cardNumber.length < 19 || expiry.length < 5 || cvv.length < 3}
                                        className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-black flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                İşleniyor...
                                            </>
                                        ) : (
                                            <>
                                                {provisionAmount} ₺ Öde
                                                <CheckCircle className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Confirmed */}
                        {currentStep === 'confirmed' && (
                            <motion.div
                                key="confirmed"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-2xl font-black text-brand-text mb-2">Rezervasyon Onaylandı!</h2>
                                <p className="text-brand-muted mb-6">Onay SMS'i ve e-posta gönderildi.</p>

                                <div className="bg-brand-surface2 rounded-2xl p-6 text-left space-y-3 mb-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-brand-muted">Restoran</span>
                                        <span className="font-bold text-brand-text">{RESTAURANT_INFO.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-brand-muted">Tarih</span>
                                        <span className="font-bold text-brand-text">
                                            {reservation.date?.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-brand-muted">Saat</span>
                                        <span className="font-bold text-brand-text">{reservation.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-brand-muted">Kişi Sayısı</span>
                                        <span className="font-bold text-brand-text">{reservation.guests} kişi</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-brand-muted">Bölüm</span>
                                        <span className="font-bold text-brand-text">
                                            {TABLE_SECTIONS.find(s => s.id === reservation.section)?.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-brand-muted">Provizyon</span>
                                        <span className="font-bold text-green-500">{provisionAmount} ₺ ödendi</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                                        <span className="text-brand-muted">Rezervasyon No</span>
                                        <span className="font-black text-red-500">MM-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                                    </div>
                                </div>

                                {/* Download Invoice Button */}
                                <button
                                    onClick={downloadInvoice}
                                    className="w-full h-12 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold flex items-center justify-center gap-2 hover:bg-brand-accent/10 hover:border-brand-accent hover:text-brand-accent transition-all mb-4"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Fatura İndir (PDF)
                                </button>

                                <p className="text-xs text-brand-muted">
                                    🍽️ Afiyet olsun! Sizi {RESTAURANT_INFO.name}'da görmekten mutluluk duyacağız.
                                </p>
                            </motion.div>
                        )}

                        {/* Waitlist */}
                        {currentStep === 'waitlist' && (
                            <motion.div
                                key="waitlist"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <ClipboardList className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-2xl font-black text-brand-text mb-2">Bekleme Listesine Eklendi!</h2>
                                <p className="text-brand-muted mb-6">Yer açıldığında size haber vereceğiz.</p>

                                <div className="bg-brand-surface2 rounded-2xl p-6 text-left space-y-3 mb-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-brand-muted">Tarih</span>
                                        <span className="font-bold text-brand-text">
                                            {reservation.date?.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-brand-muted">İstenen Saat</span>
                                        <span className="font-bold text-brand-text">{reservation.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-brand-muted">Kişi Sayısı</span>
                                        <span className="font-bold text-brand-text">{reservation.guests} kişi</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                                        <span className="text-brand-muted">Sıra Numarası</span>
                                        <span className="font-black text-amber-500">#{Math.floor(Math.random() * 5) + 1}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-brand-muted mb-4">
                                    📞 Yer açıldığında SMS ile bilgilendirileceksiniz.
                                </p>

                                <button
                                    onClick={() => setCurrentStep('guests')}
                                    className="px-6 py-3 bg-brand-surface2 rounded-xl text-brand-muted font-bold hover:bg-brand-surface hover:text-brand-text transition-all"
                                >
                                    Başka Saat Dene
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
