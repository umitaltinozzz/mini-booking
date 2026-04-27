'use client';

import React, { useState } from 'react';
import { useTenant } from '@/providers/TenantProvider';
import { motion } from 'framer-motion';
import {
    Building2, User, Shield, Bell, Clock, CreditCard,
    Camera, Upload, Check, ChevronRight, Zap, Star
} from 'lucide-react';

type SettingsTab = 'business' | 'profile' | 'security' | 'notifications' | 'hours' | 'billing';

const tabs: { id: SettingsTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'business', label: 'İşletme Bilgileri', icon: Building2 },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Güvenlik', icon: Shield },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'hours', label: 'Çalışma Saatleri', icon: Clock },
    { id: 'billing', label: 'Abonelik & Ödeme', icon: CreditCard },
];

const dayLabels: Record<string, string> = {
    monday: 'Pazartesi',
    tuesday: 'Salı',
    wednesday: 'Çarşamba',
    thursday: 'Perşembe',
    friday: 'Cuma',
    saturday: 'Cumartesi',
    sunday: 'Pazar',
};

export default function SettingsPage() {
    const { tenant } = useTenant();
    const [activeTab, setActiveTab] = useState<SettingsTab>('business');
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="min-h-screen animate-in fade-in duration-500">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-brand-text tracking-tight">Ayarlar</h1>
                <p className="text-brand-muted font-medium mt-1">İşletme ve hesap ayarlarınızı yönetin</p>
            </div>

            <div className="flex gap-8">
                {/* Sidebar Tabs */}
                <div className="w-64 flex-shrink-0">
                    <nav className="space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-bold text-sm transition-all ${activeTab === tab.id
                                    ? 'bg-brand-accent text-brand-bg'
                                    : 'text-brand-muted hover:bg-brand-surface hover:text-brand-text'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 max-w-3xl">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'business' && <BusinessSettings tenant={tenant} onSave={() => showToast('İşletme bilgileri kaydedildi')} />}
                        {activeTab === 'profile' && <ProfileSettings tenant={tenant} onSave={() => showToast('Profil güncellendi')} />}
                        {activeTab === 'security' && <SecuritySettings onSave={() => showToast('Güvenlik ayarları güncellendi')} />}
                        {activeTab === 'notifications' && <NotificationSettings onSave={() => showToast('Bildirim tercihleri kaydedildi')} />}
                        {activeTab === 'hours' && <WorkingHoursSettings tenant={tenant} onSave={() => showToast('Çalışma saatleri güncellendi')} />}
                        {activeTab === 'billing' && <BillingSettings tenant={tenant} />}
                    </motion.div>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow-xl flex items-center gap-2"
                >
                    <Check size={18} />
                    {toast}
                </motion.div>
            )}
        </div>
    );
}

// Business Settings Tab
function BusinessSettings({ tenant, onSave }: { tenant: any; onSave: () => void }) {
    return (
        <div className="space-y-6">
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                <h2 className="text-lg font-black text-brand-text mb-4">İşletme Bilgileri</h2>
                <p className="text-sm text-brand-muted mb-6">İşletmenizin temel bilgilerini güncelleyin</p>

                {/* Logo */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-brand-border">
                    <div className="w-20 h-20 rounded-2xl bg-brand-accent/10 border-2 border-dashed border-brand-accent/30 flex items-center justify-center">
                        <span className="text-2xl font-black text-brand-accent">{tenant.name[0]}</span>
                    </div>
                    <div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-surface2 border border-brand-border text-sm font-bold text-brand-text hover:bg-brand-surface transition-colors">
                            <Upload size={16} />
                            Logo Yükle
                        </button>
                        <p className="text-[10px] text-brand-muted mt-2">PNG, JPG max 2MB</p>
                    </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">İşletme Adı</label>
                        <input type="text" defaultValue={tenant.name} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">E-posta</label>
                        <input type="email" defaultValue={tenant.settings.email} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Telefon</label>
                        <input type="tel" defaultValue={tenant.settings.phone} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Adres</label>
                        <input type="text" defaultValue={tenant.settings.address} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50" />
                    </div>
                </div>

                <button onClick={onSave} className="mt-6 h-11 px-6 rounded-xl bg-brand-accent text-brand-bg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                    Değişiklikleri Kaydet
                </button>
            </div>
        </div>
    );
}

// Profile Settings Tab
function ProfileSettings({ tenant, onSave }: { tenant: any; onSave: () => void }) {
    return (
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <h2 className="text-lg font-black text-brand-text mb-4">Profil Bilgileri</h2>
            <p className="text-sm text-brand-muted mb-6">Kişisel bilgilerinizi güncelleyin</p>

            {/* Avatar */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-brand-border">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-accent2 flex items-center justify-center">
                    <span className="text-2xl font-black text-brand-bg">{tenant.owner.firstName[0]}{tenant.owner.lastName[0]}</span>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-surface2 border border-brand-border text-sm font-bold text-brand-text hover:bg-brand-surface transition-colors">
                    <Camera size={16} />
                    Fotoğraf Değiştir
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Ad</label>
                    <input type="text" defaultValue={tenant.owner.firstName} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50" />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Soyad</label>
                    <input type="text" defaultValue={tenant.owner.lastName} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50" />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">E-posta</label>
                    <input type="email" defaultValue={tenant.owner.email} className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50" />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Rol</label>
                    <input type="text" defaultValue={tenant.owner.role} disabled className="w-full h-11 px-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-muted font-medium outline-none cursor-not-allowed" />
                </div>
            </div>

            <button onClick={onSave} className="mt-6 h-11 px-6 rounded-xl bg-brand-accent text-brand-bg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                Kaydet
            </button>
        </div>
    );
}

// Security Settings Tab
function SecuritySettings({ onSave }: { onSave: () => void }) {
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div className="space-y-6">
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                <h2 className="text-lg font-black text-brand-text mb-4">Güvenlik</h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-4 border-b border-brand-border">
                        <div>
                            <p className="font-bold text-brand-text">Şifre Değiştir</p>
                            <p className="text-sm text-brand-muted">Son değişiklik: 3 ay önce</p>
                        </div>
                        <button className="px-4 py-2 rounded-xl bg-brand-surface2 border border-brand-border text-sm font-bold text-brand-text hover:bg-brand-surface transition-colors">
                            Değiştir
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-4">
                        <div>
                            <p className="font-bold text-brand-text">İki Faktörlü Doğrulama</p>
                            <p className="text-sm text-brand-muted">Hesabınızı daha güvenli hale getirin</p>
                        </div>
                        <button
                            onClick={() => setTwoFactor(!twoFactor)}
                            className={`w-12 h-6 rounded-full transition-colors ${twoFactor ? 'bg-brand-accent' : 'bg-brand-surface2 border border-brand-border'}`}
                        >
                            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                    </div>
                </div>

                <button onClick={onSave} className="mt-6 h-11 px-6 rounded-xl bg-brand-accent text-brand-bg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                    Kaydet
                </button>
            </div>
        </div>
    );
}

// Notification Settings Tab
function NotificationSettings({ onSave }: { onSave: () => void }) {
    const [notifications, setNotifications] = useState({
        newAppointment: true,
        reminder: true,
        cancellation: true,
        customerMessages: false,
        weeklyReport: true,
        marketing: false,
    });

    const toggles = [
        { key: 'newAppointment', label: 'Yeni Randevu', desc: 'Yeni randevu oluşturulduğunda bildirim al' },
        { key: 'reminder', label: 'Randevu Hatırlatma', desc: 'Randevudan 1 saat önce hatırlatma' },
        { key: 'cancellation', label: 'İptal Bildirimi', desc: 'Randevu iptal edildiğinde bildirim al' },
        { key: 'customerMessages', label: 'Müşteri Mesajları', desc: 'Müşterilerden gelen mesajlar' },
        { key: 'weeklyReport', label: 'Haftalık Rapor', desc: 'Her hafta performans özeti' },
        { key: 'marketing', label: 'Pazarlama E-postaları', desc: 'Yenilikler ve ipuçları' },
    ];

    return (
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <h2 className="text-lg font-black text-brand-text mb-4">Bildirim Tercihleri</h2>
            <p className="text-sm text-brand-muted mb-6">Hangi bildirimleri almak istediğinizi seçin</p>

            <div className="space-y-4">
                {toggles.map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-brand-border last:border-0">
                        <div>
                            <p className="font-bold text-brand-text">{item.label}</p>
                            <p className="text-sm text-brand-muted">{item.desc}</p>
                        </div>
                        <button
                            onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                            className={`w-12 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-brand-accent' : 'bg-brand-surface2 border border-brand-border'}`}
                        >
                            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                    </div>
                ))}
            </div>

            <button onClick={onSave} className="mt-6 h-11 px-6 rounded-xl bg-brand-accent text-brand-bg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                Tercihleri Kaydet
            </button>
        </div>
    );
}

// Working Hours Settings Tab
function WorkingHoursSettings({ tenant, onSave }: { tenant: any; onSave: () => void }) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return (
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <h2 className="text-lg font-black text-brand-text mb-4">Çalışma Saatleri</h2>
            <p className="text-sm text-brand-muted mb-6">İşletmenizin açık olduğu saatleri belirleyin</p>

            <div className="space-y-3">
                {days.map((day) => {
                    const hours = tenant.settings.workingHours[day];
                    return (
                        <div key={day} className="flex items-center gap-4 py-3 border-b border-brand-border last:border-0">
                            <span className="w-28 font-bold text-brand-text">{dayLabels[day]}</span>
                            {hours?.closed ? (
                                <span className="text-red-500 font-bold text-sm">Kapalı</span>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <input type="time" defaultValue={hours?.open} className="h-9 px-3 rounded-lg bg-brand-surface2 border border-brand-border text-brand-text text-sm font-medium outline-none" />
                                    <span className="text-brand-muted">-</span>
                                    <input type="time" defaultValue={hours?.close} className="h-9 px-3 rounded-lg bg-brand-surface2 border border-brand-border text-brand-text text-sm font-medium outline-none" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button onClick={onSave} className="mt-6 h-11 px-6 rounded-xl bg-brand-accent text-brand-bg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                Saatleri Kaydet
            </button>
        </div>
    );
}

// Billing Settings Tab
function BillingSettings({ tenant }: { tenant: any }) {
    const planColors: Record<string, string> = {
        trial: 'from-gray-500 to-gray-600',
        basic: 'from-blue-500 to-blue-600',
        pro: 'from-purple-500 to-pink-500',
        enterprise: 'from-amber-500 to-orange-500',
    };

    const planNames: Record<string, string> = {
        trial: 'Deneme',
        basic: 'Basic',
        pro: 'Pro',
        enterprise: 'Enterprise',
    };

    return (
        <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                <h2 className="text-lg font-black text-brand-text mb-4">Mevcut Plan</h2>

                <div className={`bg-gradient-to-br ${planColors[tenant.settings.plan]} rounded-2xl p-6 text-white`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Zap size={20} />
                                <span className="font-black text-xl">{planNames[tenant.settings.plan]} Plan</span>
                            </div>
                            <p className="text-white/80">₺{tenant.settings.planPrice}/ay</p>
                        </div>
                        <Star size={24} />
                    </div>
                    <p className="mt-4 text-sm text-white/80">Sınırsız randevu, 5 personel, raporlama</p>
                </div>

                <button className="mt-4 w-full h-11 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold text-xs uppercase tracking-widest hover:bg-brand-surface transition-colors flex items-center justify-center gap-2">
                    Planı Yükselt
                    <ChevronRight size={14} />
                </button>
            </div>

            {/* Payment Method */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                <h2 className="text-lg font-black text-brand-text mb-4">Ödeme Yöntemi</h2>

                <div className="flex items-center justify-between p-4 bg-brand-surface2 rounded-xl border border-brand-border">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                        <div>
                            <p className="font-bold text-brand-text">•••• •••• •••• 4242</p>
                            <p className="text-sm text-brand-muted">Son kullanma: 12/25</p>
                        </div>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">Varsayılan</span>
                </div>

                <button className="mt-4 text-brand-accent font-bold text-sm hover:underline">+ Yeni Kart Ekle</button>
            </div>

            {/* Invoice History */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                <h2 className="text-lg font-black text-brand-text mb-4">Fatura Geçmişi</h2>

                <div className="space-y-3">
                    {['1 Ocak 2026', '1 Aralık 2025', '1 Kasım 2025'].map((date, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-brand-surface2 rounded-xl">
                            <div>
                                <p className="font-bold text-brand-text">{date}</p>
                                <p className="text-sm text-brand-muted">₺{tenant.settings.planPrice}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="px-2 py-1 rounded-lg bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">Ödendi</span>
                                <button className="text-brand-accent font-bold text-sm hover:underline">İndir</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
