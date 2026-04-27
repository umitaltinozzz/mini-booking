'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { User, Users, Building2, Check, Calendar, Clock, BarChart3, CheckCircle2, CreditCard, Receipt, X, Loader2 } from 'lucide-react';

type TabId = 'customer' | 'staff' | 'owner';

export function HowItWorks() {
    const t = useTranslations('HowItWorks');
    const [activeTab, setActiveTab] = useState<TabId>('staff');

    const tabs: { id: TabId; icon: React.ReactNode; label: string }[] = [
        { id: 'staff', icon: <Users size={18} />, label: t('tab_staff') },
        { id: 'owner', icon: <Building2 size={18} />, label: t('tab_owner') },
        { id: 'customer', icon: <User size={18} />, label: t('tab_customer') },
    ];

    return (
        <section id="cozumler" className="bg-brand-bg py-20 md:py-32 overflow-hidden px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Header - Centered */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                        <span className="text-brand-accent">{t('title_highlight')}</span>
                        <span className="text-brand-text"> {t('title_rest')}</span>
                    </h2>
                    <p className="text-lg md:text-xl text-brand-muted font-medium max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                {/* Tab Menu */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-brand-surface border border-brand-border rounded-2xl p-1.5 gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    relative flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300
                                    ${activeTab === tab.id
                                        ? 'text-[#06080C]'
                                        : 'text-brand-muted hover:text-brand-text'
                                    }
                                `}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabBg"
                                        className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-accent2 rounded-xl"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.icon}</span>
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Demo Content */}
                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'customer' && (
                            <motion.div
                                key="customer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CustomerDemo />
                            </motion.div>
                        )}
                        {activeTab === 'staff' && (
                            <motion.div
                                key="staff"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <StaffDemo />
                            </motion.div>
                        )}
                        {activeTab === 'owner' && (
                            <motion.div
                                key="owner"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <OwnerDemo />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

// ========== CUSTOMER DEMO ==========
type CustomerStep = 'booking' | 'payment' | 'invoice' | 'confirmed';

function CustomerDemo() {
    const t = useTranslations('HowItWorks');
    const [currentStep, setCurrentStep] = useState<CustomerStep>('booking');
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Payment state
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const serviceNames = t('customer_services').split(',');
    const servicePrices = t('customer_prices').split(',').map(Number);
    const services = serviceNames.map((name, i) => ({ name, price: servicePrices[i] }));
    const staffList = t('customer_staff').split(',');
    const times = ['09:00', '10:30', '11:00', '14:00', '15:30', '16:00'];

    const selectedService = selectedServiceIndex !== null ? services[selectedServiceIndex] : null;
    const subtotal = selectedService?.price || 0;
    const tax = Math.round(subtotal * 0.2);
    const total = subtotal + tax;

    const canBook = selectedDate && selectedService && selectedStaff && selectedTime;
    const canPay = cardNumber.replace(/\s/g, '').length === 16 && expiry.replace('/', '').length >= 4 && cvv.length === 3;

    const handleBookClick = () => {
        if (canBook) {
            setCurrentStep('payment');
        }
    };

    const handlePayment = async () => {
        if (!canPay) return;
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsProcessing(false);
        setCurrentStep('invoice');
    };

    const handleContinueToConfirm = () => {
        setCurrentStep('confirmed');
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(' ') : v;
    };

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const handleDownloadInvoice = () => {
        const invoiceHTML = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fatura - Asi Berber</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; padding: 40px; }
        .invoice { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #84cc16, #22c55e); padding: 32px; text-align: center; }
        .header h1 { color: #06080C; font-size: 28px; font-weight: 900; margin-bottom: 4px; }
        .header p { color: #06080C; opacity: 0.7; font-size: 14px; }
        .logo { width: 64px; height: 64px; background: rgba(255,255,255,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 32px; font-weight: 900; color: white; }
        .content { padding: 32px; }
        .invoice-info { display: flex; justify-content: space-between; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #e5e5e5; }
        .invoice-info div { font-size: 14px; }
        .invoice-info strong { display: block; color: #333; margin-bottom: 4px; }
        .invoice-info span { color: #666; }
        .service-row { display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #f0f0f0; }
        .service-row:last-child { border-bottom: none; }
        .service-name { font-weight: 600; color: #333; }
        .service-detail { font-size: 13px; color: #666; margin-top: 4px; }
        .service-price { font-weight: 600; color: #333; }
        .totals { background: #f9f9f9; padding: 20px; border-radius: 12px; margin-top: 24px; }
        .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; color: #666; }
        .total-row.final { font-size: 18px; font-weight: 700; color: #22c55e; padding-top: 16px; margin-top: 8px; border-top: 2px solid #e5e5e5; }
        .footer { text-align: center; padding: 24px; color: #999; font-size: 12px; border-top: 1px solid #f0f0f0; }
        .badge { display: inline-block; background: #22c55e; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 16px; }
        @media print { body { background: white; padding: 0; } .invoice { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="invoice">
        <div class="header">
            <div class="logo">A</div>
            <h1>Asi Berber</h1>
            <p>Profesyonel erkek kuaförü</p>
        </div>
        <div class="content">
            <div class="invoice-info">
                <div>
                    <strong>Fatura No</strong>
                    <span>#INV-2026-0142</span>
                </div>
                <div>
                    <strong>Tarih</strong>
                    <span>Ocak ${selectedDate}, 2026</span>
                </div>
                <div>
                    <strong>Durum</strong>
                    <span class="badge">Ödendi</span>
                </div>
            </div>
            <div class="service-row">
                <div>
                    <div class="service-name">${selectedService?.name}</div>
                    <div class="service-detail">${selectedStaff} · ${selectedTime}</div>
                </div>
                <div class="service-price">₺${subtotal}</div>
            </div>
            <div class="totals">
                <div class="total-row">
                    <span>Ara Toplam</span>
                    <span>₺${subtotal}</span>
                </div>
                <div class="total-row">
                    <span>KDV (%20)</span>
                    <span>₺${tax}</span>
                </div>
                <div class="total-row final">
                    <span>Toplam</span>
                    <span>₺${total}</span>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>Bu fatura AKRAN Randevu sistemi tarafından oluşturulmuştur.</p>
            <p style="margin-top: 8px;">Teşekkür ederiz! 💈</p>
        </div>
    </div>
</body>
</html>`;
        const blob = new Blob([invoiceHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    const resetDemo = () => {
        setCurrentStep('booking');
        setSelectedDate(null);
        setSelectedServiceIndex(null);
        setSelectedStaff(null);
        setSelectedTime(null);
        setCardNumber('');
        setExpiry('');
        setCvv('');
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <div className="bg-brand-surface border border-brand-border rounded-3xl overflow-hidden shadow-2xl">
                    {/* Business Header - Like Real Booking Page */}
                    <div className="relative h-40 bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col items-center justify-center">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: 'url("https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />

                        {/* Logo */}
                        <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-2 border-4 border-white/20 shadow-xl">
                            <span className="text-xl font-black text-white">AB</span>
                        </div>

                        {/* Business Name */}
                        <h3 className="relative z-10 text-xl font-black text-white">{t('customer_business_name')}</h3>
                        <p className="relative z-10 text-xs text-white/60 font-medium">{t('customer_business_desc')}</p>

                        {/* Rating Badge */}
                        <div className="relative z-10 flex items-center gap-1 mt-2 px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded-full">
                            <span className="text-yellow-400 text-xs">⭐</span>
                            <span className="text-xs font-bold text-white">4.9</span>
                            <span className="text-xs text-white/60">(312 yorum)</span>
                        </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center justify-center gap-2 py-4 border-b border-brand-border bg-brand-surface2/50">
                        {[
                            { icon: '👤', label: 'Personel', done: true },
                            { icon: '📅', label: 'Tarih', active: currentStep === 'booking' },
                            { icon: '🕐', label: 'Saat', active: false },
                            { icon: '✂️', label: 'Hizmet', active: false },
                            { icon: '✉️', label: 'Bilgiler', active: currentStep === 'payment' },
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${step.done ? 'bg-brand-accent/20 text-brand-accent' :
                                    step.active ? 'bg-brand-accent text-[#06080C]' :
                                        'bg-brand-surface2 text-brand-muted'
                                    }`}>
                                    {step.icon}
                                </div>
                                <span className={`text-[10px] font-medium mt-1 ${step.done || step.active ? 'text-brand-accent' : 'text-brand-muted'
                                    }`}>{step.label}</span>
                            </div>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {/* BOOKING STEP */}
                        {currentStep === 'booking' && (
                            <motion.div
                                key="booking"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="p-6 space-y-5"
                            >
                                {/* Calendar */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Calendar size={16} className="text-brand-accent" />
                                        <span className="text-sm font-bold text-brand-text">{t('customer_select_date')}</span>
                                    </div>
                                    <div className="bg-brand-surface2 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <button className="text-brand-muted hover:text-brand-text p-1">&lt;</button>
                                            <span className="text-sm font-bold text-brand-text">Ocak 2026</span>
                                            <button className="text-brand-muted hover:text-brand-text p-1">&gt;</button>
                                        </div>
                                        <div className="grid grid-cols-7 gap-1 text-center">
                                            {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, i) => (
                                                <div key={i} className="text-[10px] text-brand-muted font-medium py-1">{day}</div>
                                            ))}
                                            {/* Empty cells for days before month starts (Jan 2026 starts on Thursday) */}
                                            {[...Array(3)].map((_, i) => (
                                                <div key={`empty-${i}`} className="py-2"></div>
                                            ))}
                                            {/* Days of month */}
                                            {[...Array(31)].map((_, i) => {
                                                const day = i + 1;
                                                const isPast = day < 10;
                                                const isToday = day === 10;
                                                const isAvailable = [10, 11, 13, 14, 15, 17, 18, 20, 21, 22, 24, 25, 27, 28, 29, 31].includes(day);
                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => !isPast && isAvailable && setSelectedDate(day)}
                                                        disabled={isPast || !isAvailable}
                                                        className={`py-2 rounded-lg text-xs font-medium transition-all ${selectedDate === day
                                                            ? 'bg-brand-accent text-[#06080C] font-bold'
                                                            : isToday
                                                                ? 'bg-brand-accent/30 text-brand-accent ring-2 ring-brand-accent'
                                                                : isPast
                                                                    ? 'text-brand-muted/20 cursor-not-allowed'
                                                                    : isAvailable
                                                                        ? 'text-brand-text hover:bg-brand-accent/20'
                                                                        : 'text-brand-muted/40 cursor-not-allowed'
                                                            }`}
                                                    >
                                                        {day}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Service Selection with Prices */}
                                <AnimatePresence>
                                    {selectedDate && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Check size={16} className="text-brand-accent" />
                                                <span className="text-sm font-bold text-brand-text">{t('customer_select_service')}</span>
                                            </div>
                                            <div className="space-y-2">
                                                {services.map((service, i) => (
                                                    <button
                                                        key={service.name}
                                                        onClick={() => setSelectedServiceIndex(i)}
                                                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${selectedServiceIndex === i
                                                            ? 'bg-brand-accent text-[#06080C]'
                                                            : 'bg-brand-surface2 text-brand-text hover:bg-brand-accent/20 border border-brand-border'
                                                            }`}
                                                    >
                                                        <span className="font-medium text-sm">{service.name}</span>
                                                        <span className="font-bold text-sm">₺{service.price}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Staff Selection */}
                                <AnimatePresence>
                                    {selectedServiceIndex !== null && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                            <div className="flex items-center gap-2 mb-3">
                                                <User size={16} className="text-brand-accent" />
                                                <span className="text-sm font-bold text-brand-text">{t('customer_select_staff')}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                {staffList.map((staff, i) => (
                                                    <button
                                                        key={staff}
                                                        onClick={() => setSelectedStaff(staff)}
                                                        className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${selectedStaff === staff ? 'bg-brand-accent/10 ring-2 ring-brand-accent' : 'bg-brand-surface2 hover:bg-brand-accent/10'
                                                            }`}
                                                    >
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-purple-500' : 'bg-pink-500'
                                                            }`}>{staff[0]}</div>
                                                        <span className="text-[10px] font-medium text-brand-text">{staff}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Time Selection */}
                                <AnimatePresence>
                                    {selectedStaff && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Clock size={16} className="text-brand-accent" />
                                                <span className="text-sm font-bold text-brand-text">{t('customer_select_time')}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {times.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all ${selectedTime === time
                                                            ? 'bg-brand-accent text-[#06080C]'
                                                            : 'bg-brand-surface2 text-brand-text hover:bg-brand-accent/20 border border-brand-border'
                                                            }`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Book Button */}
                                <motion.button
                                    onClick={handleBookClick}
                                    disabled={!canBook}
                                    whileHover={canBook ? { scale: 1.02 } : {}}
                                    whileTap={canBook ? { scale: 0.98 } : {}}
                                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${canBook
                                        ? 'bg-brand-accent text-[#06080C] hover:bg-brand-accent2 shadow-lg shadow-brand-accent/30'
                                        : 'bg-brand-surface2 text-brand-muted cursor-not-allowed'
                                        }`}
                                >
                                    {canBook ? `${t('customer_book_now')} - ₺${total}` : t('customer_book_now')}
                                </motion.button>
                            </motion.div>
                        )}

                        {/* PAYMENT STEP */}
                        {currentStep === 'payment' && (
                            <motion.div
                                key="payment"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-6 space-y-4"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-brand-text flex items-center gap-2">
                                        <CreditCard size={18} className="text-brand-accent" />
                                        {t('customer_payment_title')}
                                    </h4>
                                    <button onClick={() => setCurrentStep('booking')} className="text-brand-muted hover:text-brand-text">
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-brand-surface2 rounded-xl p-3 space-y-2">
                                    <p className="text-xs text-brand-muted font-medium">{t('customer_order_summary')}</p>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-brand-text">{selectedService?.name}</span>
                                        <span className="font-bold text-brand-text">₺{selectedService?.price}</span>
                                    </div>
                                    <p className="text-xs text-brand-muted">{selectedStaff} · Ocak {selectedDate} · {selectedTime}</p>
                                </div>

                                {/* Card Number */}
                                <div>
                                    <label className="text-xs text-brand-muted mb-1 block">{t('customer_card_number')}</label>
                                    <input
                                        type="text"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                        placeholder="4242 4242 4242 4242"
                                        maxLength={19}
                                        className="w-full bg-brand-bg border border-brand-border rounded-lg px-3 py-2 text-sm font-mono text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                                    />
                                </div>

                                {/* Expiry & CVV */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-brand-muted mb-1 block">{t('customer_expiry')}</label>
                                        <input
                                            type="text"
                                            value={expiry}
                                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                            placeholder="12/28"
                                            maxLength={5}
                                            className="w-full bg-brand-bg border border-brand-border rounded-lg px-3 py-2 text-sm font-mono text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-brand-muted mb-1 block">{t('customer_cvv')}</label>
                                        <input
                                            type="password"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                            placeholder="123"
                                            maxLength={3}
                                            className="w-full bg-brand-bg border border-brand-border rounded-lg px-3 py-2 text-sm font-mono text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                                        />
                                    </div>
                                </div>

                                {/* Pay Button */}
                                <motion.button
                                    onClick={handlePayment}
                                    disabled={!canPay || isProcessing}
                                    whileHover={canPay && !isProcessing ? { scale: 1.02 } : {}}
                                    whileTap={canPay && !isProcessing ? { scale: 0.98 } : {}}
                                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${canPay && !isProcessing
                                        ? 'bg-brand-accent text-[#06080C] hover:bg-brand-accent2'
                                        : 'bg-brand-surface2 text-brand-muted cursor-not-allowed'
                                        }`}
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            {t('customer_processing')}
                                        </>
                                    ) : (
                                        `${t('customer_pay_now')} - ₺${total}`
                                    )}
                                </motion.button>
                            </motion.div>
                        )}

                        {/* INVOICE STEP */}
                        {currentStep === 'invoice' && (
                            <motion.div
                                key="invoice"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="p-6 space-y-4"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Receipt size={18} className="text-brand-accent" />
                                    <h4 className="font-bold text-brand-text">{t('customer_invoice_title')}</h4>
                                </div>

                                <div className="bg-brand-surface2 rounded-xl p-4 space-y-3">
                                    {/* Invoice Header */}
                                    <div className="flex justify-between items-start border-b border-brand-border pb-3">
                                        <div>
                                            <p className="font-bold text-brand-text">{t('customer_business_name')}</p>
                                            <p className="text-xs text-brand-muted">{t('customer_business_desc')}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-brand-muted">{t('customer_invoice_no')}</p>
                                            <p className="font-mono text-xs text-brand-text">#INV-2026-0142</p>
                                        </div>
                                    </div>

                                    {/* Service Details */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-brand-text">{selectedService?.name}</span>
                                            <span className="text-brand-text">₺{subtotal}</span>
                                        </div>
                                        <p className="text-xs text-brand-muted">{selectedStaff} · Ocak {selectedDate}, 2026 · {selectedTime}</p>
                                    </div>

                                    {/* Totals */}
                                    <div className="border-t border-brand-border pt-3 space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-brand-muted">{t('customer_subtotal')}</span>
                                            <span className="text-brand-text">₺{subtotal}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-brand-muted">{t('customer_tax')}</span>
                                            <span className="text-brand-text">₺{tax}</span>
                                        </div>
                                        <div className="flex justify-between text-base font-bold pt-2 border-t border-brand-border">
                                            <span className="text-brand-text">{t('customer_total')}</span>
                                            <span className="text-brand-accent">₺{total}</span>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={handleContinueToConfirm}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 rounded-xl font-bold text-sm bg-brand-accent text-[#06080C] hover:bg-brand-accent2"
                                >
                                    {t('customer_continue')}
                                </motion.button>
                            </motion.div>
                        )}

                        {/* CONFIRMED STEP */}
                        {currentStep === 'confirmed' && (
                            <motion.div
                                key="confirmed"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="p-8 text-center space-y-4"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                                    className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto"
                                >
                                    <CheckCircle2 size={32} className="text-[#06080C]" />
                                </motion.div>
                                <h4 className="text-xl font-bold text-brand-text">{t('customer_confirmed')}</h4>
                                <p className="text-sm text-brand-muted">{t('customer_confirmation_msg')}</p>
                                <div className="bg-brand-surface2 rounded-xl p-4 space-y-1">
                                    <p className="font-bold text-brand-text">{selectedService?.name}</p>
                                    <p className="text-sm text-brand-muted">{selectedStaff} ile</p>
                                    <p className="text-sm text-brand-accent font-medium">Ocak {selectedDate}, 2026 - {selectedTime}</p>
                                    <p className="text-lg font-bold text-brand-text mt-2">₺{total}</p>
                                </div>
                                <motion.button
                                    onClick={handleDownloadInvoice}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 rounded-xl font-bold text-sm bg-brand-accent text-[#06080C] hover:bg-brand-accent2"
                                >
                                    {t('customer_download_invoice')}
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Description below */}
                <div className="text-center mt-8">
                    <h3 className="text-xl font-bold text-brand-text mb-2">{t('customer_title')}</h3>
                    <p className="text-brand-muted">{t('customer_desc')}</p>
                </div>
            </div>
        </div>
    );
}

// ========== STAFF DEMO ==========
function StaffDemo() {
    const t = useTranslations('HowItWorks');

    return (
        <div className="flex flex-col items-center">
            {/* Staff Dashboard Preview */}
            <div className="w-full max-w-4xl">
                <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl shadow-2xl overflow-hidden">
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a2e]">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                İyi günler, Canberk! <span className="text-xl">👋</span>
                            </h3>
                            <p className="text-xs text-brand-muted">Kıdemli Berber</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-full flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                Aktif
                            </span>
                            <div className="text-right">
                                <p className="text-xl font-bold text-white">17:54</p>
                                <p className="text-[10px] text-brand-muted uppercase">Cumartesi</p>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-4 md:p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Left Column - Stats + Current + Next */}
                            <div className="lg:col-span-2 space-y-4">
                                {/* Stats Row */}
                                <div className="grid grid-cols-4 gap-3">
                                    <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-3">
                                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 w-fit mb-2">
                                            <Calendar size={16} />
                                        </div>
                                        <p className="text-[10px] text-brand-muted uppercase">Bugün</p>
                                        <p className="text-xl font-bold text-white">8/12</p>
                                        <p className="text-[10px] text-brand-muted">tamamlandı</p>
                                    </div>
                                    <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-3">
                                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 w-fit mb-2">
                                            <Clock size={16} />
                                        </div>
                                        <p className="text-[10px] text-brand-muted uppercase">Kalan</p>
                                        <p className="text-xl font-bold text-white">4</p>
                                        <p className="text-[10px] text-brand-muted">randevu</p>
                                    </div>
                                    <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-3">
                                        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 w-fit mb-2">
                                            <BarChart3 size={16} />
                                        </div>
                                        <p className="text-[10px] text-brand-muted uppercase">Kazanç</p>
                                        <p className="text-xl font-bold text-white">₺1,840</p>
                                        <p className="text-[10px] text-brand-muted">bugün</p>
                                    </div>
                                    <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-3">
                                        <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 w-fit mb-2">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <p className="text-[10px] text-brand-muted uppercase">Rating</p>
                                        <p className="text-xl font-bold text-white">4.9</p>
                                        <p className="text-[10px] text-brand-muted">342 yorum</p>
                                    </div>
                                </div>

                                {/* Current Service Card */}
                                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">ŞU AN HİZMET VERİLİYOR</span>
                                        </div>
                                        <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-lg">14:30 - 15:15</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-2xl font-bold text-white">Emre Yıldız</h4>
                                            <p className="text-sm text-white/70">Saç Kesimi + Sakal</p>
                                            <div className="flex items-center gap-3 mt-2 text-xs text-white/60">
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    45 dk
                                                </span>
                                                <span>📞 0535 666 7788</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-black text-white">₺200</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <button className="flex-1 py-2.5 bg-white/20 backdrop-blur text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/30 transition-colors">
                                            <Check size={16} />
                                            Tamamla
                                        </button>
                                        <button className="px-4 py-2.5 bg-white/10 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/20 transition-colors">
                                            📞 Ara
                                        </button>
                                    </div>
                                </div>

                                {/* Next Up */}
                                <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted flex items-center gap-2">
                                            ⚡ Sıradaki
                                        </span>
                                        <span className="text-[10px] text-brand-muted">15:30'de başlayacak</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#1a1a2e] rounded-full flex items-center justify-center">
                                            <User size={20} className="text-brand-muted" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-white">Fatih Kaya</p>
                                            <p className="text-xs text-brand-muted">Saç Kesimi • 30 dk</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-white">15:30</p>
                                            <p className="text-xs text-brand-muted">₺150</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Today's Schedule */}
                                <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-bold text-white text-sm flex items-center gap-2">
                                            <Calendar size={14} className="text-brand-accent" />
                                            Bugünün Programı
                                        </h4>
                                        <span className="text-xs text-brand-muted">09:00 - 19:00</span>
                                    </div>
                                    <div className="space-y-2">
                                        {[
                                            { time: '09:00', name: 'Ahmet Yılmaz', service: 'Saç Kesimi + Sakal', price: 200, done: true },
                                            { time: '10:00', name: 'Burak Demir', service: 'Saç Kesimi', price: 150, done: true },
                                        ].map((apt, i) => (
                                            <div key={i} className="flex items-center gap-3 p-2 bg-[#0a0a0f] rounded-lg">
                                                <span className="w-2 h-2 bg-green-500 rounded-full" />
                                                <span className="text-sm font-mono text-brand-muted">{apt.time}</span>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-white">{apt.name}</p>
                                                    <p className="text-[10px] text-brand-muted">{apt.service}</p>
                                                </div>
                                                <span className="text-sm text-gray-400">₺{apt.price}</span>
                                                <span className="text-gray-600">›</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Quick Actions + Expertise + Weekly Summary */}
                            <div className="space-y-4">
                                {/* Quick Actions */}
                                <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4">
                                    <h4 className="font-bold text-white text-sm mb-3">Hızlı İşlemler</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button className="flex flex-col items-center gap-1.5 p-3 bg-[#0a0a0f] border border-pink-500/20 rounded-xl hover:bg-pink-500/10 transition-colors">
                                            <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500">
                                                <Clock size={16} />
                                            </div>
                                            <span className="text-xs font-medium text-pink-500">Mola Al</span>
                                        </button>
                                        <button className="flex flex-col items-center gap-1.5 p-3 bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl hover:bg-[#1a1a2e] transition-colors">
                                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                                <Users size={16} />
                                            </div>
                                            <span className="text-xs font-medium text-blue-500">Not Ekle</span>
                                        </button>
                                        <button className="flex flex-col items-center gap-1.5 p-3 bg-[#0a0a0f] border border-cyan-500/20 rounded-xl hover:bg-cyan-500/10 transition-colors">
                                            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                                                <User size={16} />
                                            </div>
                                            <span className="text-xs font-medium text-cyan-500">Müşteri Ara</span>
                                        </button>
                                        <button className="flex flex-col items-center gap-1.5 p-3 bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl hover:bg-[#1a1a2e] transition-colors">
                                            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                                                <Calendar size={16} />
                                            </div>
                                            <span className="text-xs font-medium text-purple-500">Takvim</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Expertise */}
                                <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4">
                                    <h4 className="font-bold text-white text-sm mb-3">Uzmanlıklarım</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1.5 text-xs font-medium bg-[#0a0a0f] text-cyan-400 border border-cyan-500/30 rounded-full">Saç Kesimi</span>
                                        <span className="px-3 py-1.5 text-xs font-medium bg-[#0a0a0f] text-cyan-400 border border-cyan-500/30 rounded-full">Sakal Tıraşı</span>
                                        <span className="px-3 py-1.5 text-xs font-medium bg-[#0a0a0f] text-cyan-400 border border-cyan-500/30 rounded-full">Premium Bakım</span>
                                    </div>
                                </div>

                                {/* Weekly Summary */}
                                <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4">
                                    <h4 className="font-bold text-white text-sm mb-3">Bu Hafta Özeti</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-brand-muted">Randevu Hedefi</span>
                                                <span className="text-white font-bold">48/60</span>
                                            </div>
                                            <div className="h-1.5 bg-[#0a0a0f] rounded-full overflow-hidden">
                                                <div className="h-full w-[80%] bg-gradient-to-r from-brand-accent to-brand-accent2 rounded-full" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-brand-muted">Ciro Hedefi</span>
                                                <span className="text-white font-bold">₺8.4K/₺10K</span>
                                            </div>
                                            <div className="h-1.5 bg-[#0a0a0f] rounded-full overflow-hidden">
                                                <div className="h-full w-[84%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-[#1a1a2e]">
                                            <span className="text-xs text-brand-muted">Müşteri Memnuniyeti</span>
                                            <span className="text-sm font-bold text-yellow-500 flex items-center gap-1">
                                                ⭐ 4.9
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description below */}
                <div className="text-center mt-8">
                    <h3 className="text-xl font-bold text-brand-text mb-2">{t('staff_title')}</h3>
                    <p className="text-brand-muted">{t('staff_desc')}</p>
                </div>
            </div>
        </div>
    );
}

// ========== OWNER DEMO ==========
function OwnerDemo() {
    const t = useTranslations('HowItWorks');

    return (
        <div className="flex flex-col items-center">
            {/* Dashboard Preview */}
            <div className="w-full max-w-4xl">
                <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl shadow-2xl overflow-hidden">
                    {/* Browser Header */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#12121a] border-b border-[#1a1a2e]">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-lg px-4 py-1.5 text-xs text-brand-muted font-mono flex items-center gap-2">
                                <span className="text-brand-accent">🔒</span>
                                app.akranrandevu.com/dashboard
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-4 md:p-6">
                        {/* Dashboard Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                                    İyi günler, Berk! <span className="text-xl">👋</span>
                                </h3>
                                <p className="text-xs text-brand-muted">İşte bugünün özeti ve yaklaşan randevularınız.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1.5 text-xs font-medium bg-[#12121a] border border-[#1a1a2e] rounded-lg text-white flex items-center gap-1.5">
                                    <span className="text-purple-400">⊞</span> Salon
                                </span>
                                <span className="px-3 py-1.5 text-xs font-medium bg-[#12121a] border border-[#1a1a2e] rounded-lg text-white flex items-center gap-1.5">
                                    <span className="text-orange-400">☰</span> Restoran
                                </span>
                            </div>
                        </div>

                        {/* Alert Banner */}
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500">
                                <Clock size={16} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-amber-500">2 müşteri onay bekliyor</p>
                                <p className="text-xs text-amber-500/70">Randevularını onaylamak için müşterilere hatırlatma gönderin.</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-3">
                                <div className="flex items-start justify-between mb-1">
                                    <p className="text-[10px] text-brand-muted">Günlük Ciro</p>
                                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                                        <BarChart3 size={14} />
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-white">₺4,250</p>
                                <p className="text-[10px] font-medium text-emerald-500">+12% dünden</p>
                            </div>
                            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-3">
                                <div className="flex items-start justify-between mb-1">
                                    <p className="text-[10px] text-brand-muted">Bugünün Randevuları</p>
                                    <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500">
                                        <Calendar size={14} />
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-white">14</p>
                                <p className="text-[10px] text-brand-muted">3 beklemede</p>
                            </div>
                            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-3">
                                <div className="flex items-start justify-between mb-1">
                                    <p className="text-[10px] text-brand-muted">Aktif Personel</p>
                                    <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-500">
                                        <Users size={14} />
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-white">4</p>
                                <p className="text-[10px] text-brand-muted">2 meşgul</p>
                            </div>
                            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-3">
                                <div className="flex items-start justify-between mb-1">
                                    <p className="text-[10px] text-brand-muted">Doluluk Oranı</p>
                                    <div className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-500">
                                        <Clock size={14} />
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-white">%78</p>
                                <p className="text-[10px] text-brand-muted">Hedef: %85</p>
                            </div>
                        </div>

                        {/* Calendar & Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Mini Calendar */}
                            <div className="md:col-span-2 bg-[#12121a] border border-[#1a1a2e] rounded-xl p-3">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                                        <Calendar size={14} className="text-brand-accent" />
                                        Ocak 2026
                                    </h4>
                                    <span className="text-[10px] text-brand-accent font-medium">Bugün</span>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                                    {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, i) => (
                                        <div key={i} className="py-1 text-brand-muted font-medium">{day}</div>
                                    ))}
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(day => {
                                        const hasAppointments = [5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18].includes(day);
                                        const isToday = day === 9;
                                        return (
                                            <div
                                                key={day}
                                                className={`py-1.5 rounded relative ${isToday
                                                    ? 'bg-brand-accent text-[#06080C] font-bold'
                                                    : hasAppointments
                                                        ? 'text-brand-accent'
                                                        : 'text-brand-muted'
                                                    }`}
                                            >
                                                {day}
                                                {hasAppointments && !isToday && (
                                                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                                                        <span className="w-1 h-1 bg-pink-500 rounded-full" />
                                                        <span className="w-1 h-1 bg-purple-500 rounded-full" />
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-3">
                                <h4 className="font-bold text-white text-sm mb-3">Hızlı İşlemler</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="flex flex-col items-center gap-1.5 p-2.5 bg-[#0a0a0f] border border-[#1a1a2e] rounded-lg hover:bg-[#1a1a2e] transition-colors">
                                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <span className="text-[9px] font-medium text-gray-400 text-center">Randevu Oluştur</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-1.5 p-2.5 bg-[#0a0a0f] border border-[#1a1a2e] rounded-lg hover:bg-[#1a1a2e] transition-colors">
                                        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                                            <User size={14} />
                                        </div>
                                        <span className="text-[9px] font-medium text-gray-400 text-center">Müşteri Ekle</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-1.5 p-2.5 bg-[#0a0a0f] border border-[#1a1a2e] rounded-lg hover:bg-[#1a1a2e] transition-colors">
                                        <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500">
                                            <Calendar size={14} />
                                        </div>
                                        <span className="text-[9px] font-medium text-gray-400 text-center">Ödeme Al</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-1.5 p-2.5 bg-[#0a0a0f] border border-[#1a1a2e] rounded-lg hover:bg-[#1a1a2e] transition-colors">
                                        <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-500">
                                            <Users size={14} />
                                        </div>
                                        <span className="text-[9px] font-medium text-gray-400 text-center">Toplu SMS</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description below */}
                <div className="text-center mt-8">
                    <h3 className="text-xl font-bold text-brand-text mb-2">{t('owner_title')}</h3>
                    <p className="text-brand-muted">{t('owner_desc')}</p>
                </div>
            </div>
        </div>
    );
}
