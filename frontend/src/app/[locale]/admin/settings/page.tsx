'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings,
    Globe,
    Mail,
    Bell,
    Shield,
    Database,
    Palette,
    Save,
    Key,
    Send,
    Check,
    Loader2,
    Eye,
    EyeOff,
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

type SettingsTab = 'general' | 'email' | 'notifications' | 'security' | 'branding';

// Toast component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
    React.useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 ${type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
                }`}
        >
            {type === 'success' ? <Check size={20} /> : <Bell size={20} />}
            <span className="font-bold">{message}</span>
        </motion.div>
    );
}

// Toggle component
function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: (val: boolean) => void; disabled?: boolean }) {
    return (
        <button
            type="button"
            onClick={() => !disabled && onChange(!checked)}
            disabled={disabled}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${checked ? 'bg-red-500' : 'bg-brand-surface2'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <motion.div
                animate={{ x: checked ? 24 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
            />
        </button>
    );
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('general');
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [showApiKey, setShowApiKey] = useState(false);
    const [testingEmail, setTestingEmail] = useState(false);

    // General Settings State
    const [generalSettings, setGeneralSettings] = useState({
        platformName: 'AKRAN',
        platformUrl: 'https://akran.io',
        defaultLanguage: 'tr',
        timezone: 'Europe/Istanbul',
    });

    // Email Settings State
    const [emailSettings, setEmailSettings] = useState({
        smtpServer: 'smtp.gmail.com',
        smtpPort: '587',
        senderEmail: 'noreply@akran.io',
        apiKey: 'sk_live_xxxxxxxxxxxxx',
        encryption: 'tls',
    });

    // Notification Settings State
    const [notifications, setNotifications] = useState({
        newDemoRequest: true,
        newTenantRegistration: true,
        subscriptionExpiring: true,
        paymentFailed: true,
        systemErrors: false,
        weeklyReport: true,
        dailySummary: false,
    });

    // Security Settings State
    const [securitySettings, setSecuritySettings] = useState({
        twoFactorAuth: true,
        sessionTimeout: true,
        ipRestriction: false,
        bruteForceProtection: true,
        auditLogging: true,
        passwordPolicy: 'strong',
    });

    // Branding Settings State
    const [brandingSettings, setBrandingSettings] = useState({
        logoUrl: '/logo.svg',
        primaryColor: '#EF4444',
        secondaryColor: '#F97316',
        faviconUrl: '/favicon.ico',
        darkMode: true,
    });

    const tabs = [
        { id: 'general' as const, label: 'Genel', icon: Globe },
        { id: 'email' as const, label: 'E-Posta', icon: Mail },
        { id: 'notifications' as const, label: 'Bildirimler', icon: Bell },
        { id: 'security' as const, label: 'Güvenlik', icon: Shield },
        { id: 'branding' as const, label: 'Marka', icon: Palette },
    ];

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        setToast({ message: 'Ayarlar başarıyla kaydedildi!', type: 'success' });
    };

    const handleTestEmail = async () => {
        setTestingEmail(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setTestingEmail(false);
        setToast({ message: 'Test e-postası başarıyla gönderildi!', type: 'success' });
    };

    const handleBackupDatabase = async () => {
        setToast({ message: 'Veritabanı yedeği oluşturuluyor...', type: 'success' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        setToast({ message: 'Yedekleme tamamlandı! (backup_2026-01-09.sql)', type: 'success' });
    };

    return (
        <>
            <AdminHeader title="Ayarlar" subtitle="Platform ayarlarını yönetin" />

            <div className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-5xl mx-auto space-y-6"
                >
                    {/* Tabs */}
                    <motion.div variants={item} className="flex gap-2 p-1.5 bg-brand-surface border border-brand-border rounded-2xl overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20'
                                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface2'
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </motion.div>

                    {/* General Settings */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'general' && (
                            <motion.div
                                key="general"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
                                    <Globe size={20} className="text-brand-muted" />
                                    <h2 className="text-lg font-black text-brand-text tracking-tight">Genel Ayarlar</h2>
                                </div>

                                <div className="grid gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                                Platform Adı
                                            </label>
                                            <input
                                                type="text"
                                                value={generalSettings.platformName}
                                                onChange={(e) => setGeneralSettings(prev => ({ ...prev, platformName: e.target.value }))}
                                                className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                                Platform URL
                                            </label>
                                            <input
                                                type="url"
                                                value={generalSettings.platformUrl}
                                                onChange={(e) => setGeneralSettings(prev => ({ ...prev, platformUrl: e.target.value }))}
                                                className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                                Varsayılan Dil
                                            </label>
                                            <select
                                                value={generalSettings.defaultLanguage}
                                                onChange={(e) => setGeneralSettings(prev => ({ ...prev, defaultLanguage: e.target.value }))}
                                                className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer focus:border-red-500/50 transition-all"
                                            >
                                                <option value="tr">🇹🇷 Türkçe</option>
                                                <option value="en">🇬🇧 English</option>
                                                <option value="de">🇩🇪 Deutsch</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                                Zaman Dilimi
                                            </label>
                                            <select
                                                value={generalSettings.timezone}
                                                onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
                                                className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer focus:border-red-500/50 transition-all"
                                            >
                                                <option value="Europe/Istanbul">Europe/Istanbul (GMT+3)</option>
                                                <option value="Europe/London">Europe/London (GMT+0)</option>
                                                <option value="America/New_York">America/New_York (GMT-5)</option>
                                                <option value="UTC">UTC</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Email Settings */}
                        {activeTab === 'email' && (
                            <motion.div
                                key="email"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
                                    <Mail size={20} className="text-brand-muted" />
                                    <h2 className="text-lg font-black text-brand-text tracking-tight">E-Posta Ayarları</h2>
                                </div>

                                <div className="grid gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                                SMTP Sunucu
                                            </label>
                                            <input
                                                type="text"
                                                value={emailSettings.smtpServer}
                                                onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpServer: e.target.value }))}
                                                className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-red-500/50 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                                Port
                                            </label>
                                            <input
                                                type="text"
                                                value={emailSettings.smtpPort}
                                                onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                                                className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-red-500/50 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                                Gönderici E-posta
                                            </label>
                                            <input
                                                type="email"
                                                value={emailSettings.senderEmail}
                                                onChange={(e) => setEmailSettings(prev => ({ ...prev, senderEmail: e.target.value }))}
                                                className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-red-500/50 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                                Şifreleme
                                            </label>
                                            <select
                                                value={emailSettings.encryption}
                                                onChange={(e) => setEmailSettings(prev => ({ ...prev, encryption: e.target.value }))}
                                                className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer focus:border-red-500/50 transition-all"
                                            >
                                                <option value="tls">TLS</option>
                                                <option value="ssl">SSL</option>
                                                <option value="none">Yok</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                            API Key / Şifre
                                        </label>
                                        <div className="flex items-center h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border gap-3">
                                            <Key size={16} className="text-brand-muted" />
                                            <input
                                                type={showApiKey ? 'text' : 'password'}
                                                value={emailSettings.apiKey}
                                                onChange={(e) => setEmailSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                                                className="flex-1 bg-transparent text-brand-text font-medium outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowApiKey(!showApiKey)}
                                                className="p-1 text-brand-muted hover:text-brand-text transition-colors"
                                            >
                                                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-brand-border">
                                        <button
                                            type="button"
                                            onClick={handleTestEmail}
                                            disabled={testingEmail}
                                            className="h-11 px-6 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-brand-surface hover:border-brand-text/20 transition-all disabled:opacity-50"
                                        >
                                            {testingEmail ? (
                                                <>
                                                    <Loader2 size={14} className="animate-spin" />
                                                    Gönderiliyor...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={14} />
                                                    Test E-postası Gönder
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Notification Settings */}
                        {activeTab === 'notifications' && (
                            <motion.div
                                key="notifications"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
                                    <Bell size={20} className="text-brand-muted" />
                                    <h2 className="text-lg font-black text-brand-text tracking-tight">Bildirim Ayarları</h2>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-brand-muted mb-4">Bu bildirimleri e-posta ve platform içi olarak alacaksınız.</p>

                                    {[
                                        { key: 'newDemoRequest', label: 'Yeni demo talebi geldiğinde', description: 'Potansiyel müşterilerden gelen demo talepleri' },
                                        { key: 'newTenantRegistration', label: 'Yeni işletme kaydolduğunda', description: 'Onay verdiğiniz işletmeler aktifleştiğinde' },
                                        { key: 'subscriptionExpiring', label: 'Abonelik süresi dolmak üzereyken', description: '7 gün kala uyarı alın' },
                                        { key: 'paymentFailed', label: 'Ödeme başarısız olduğunda', description: 'Otomatik yenileme hataları' },
                                        { key: 'systemErrors', label: 'Sistem hataları oluştuğunda', description: 'Kritik sistem hataları (geliştirici modu)' },
                                        { key: 'weeklyReport', label: 'Haftalık rapor', description: 'Her pazartesi özet e-postası' },
                                        { key: 'dailySummary', label: 'Günlük özet', description: 'Her gün saat 09:00\'da' },
                                    ].map((notif) => (
                                        <div key={notif.key} className="flex items-center justify-between p-4 rounded-xl bg-brand-surface2/30 border border-brand-border hover:bg-brand-surface2/50 transition-colors group">
                                            <div>
                                                <span className="font-bold text-brand-text group-hover:text-brand-accent transition-colors">{notif.label}</span>
                                                <p className="text-xs text-brand-muted mt-0.5">{notif.description}</p>
                                            </div>
                                            <Toggle
                                                checked={notifications[notif.key as keyof typeof notifications]}
                                                onChange={(val) => setNotifications(prev => ({ ...prev, [notif.key]: val }))}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Security Settings */}
                        {activeTab === 'security' && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
                                    <Shield size={20} className="text-brand-muted" />
                                    <h2 className="text-lg font-black text-brand-text tracking-tight">Güvenlik Ayarları</h2>
                                </div>

                                <div className="space-y-1">
                                    {[
                                        { key: 'twoFactorAuth', label: '2 Faktörlü Doğrulama (2FA)', description: 'Giriş için SMS veya Authenticator kodu gerektirir' },
                                        { key: 'sessionTimeout', label: 'Oturum Zaman Aşımı (30 dk)', description: 'İşlem yapılmazsa otomatik çıkış' },
                                        { key: 'ipRestriction', label: 'IP Bazlı Kısıtlama', description: 'Sadece belirlenen IP\'lerden erişim' },
                                        { key: 'bruteForceProtection', label: 'Brute Force Koruması', description: '5 hatalı girişten sonra hesap kilitleme' },
                                        { key: 'auditLogging', label: 'Denetim Günlüğü', description: 'Tüm admin işlemleri kayıt altına alınır' },
                                    ].map((setting) => (
                                        <div key={setting.key} className="flex items-center justify-between p-4 rounded-xl bg-brand-surface2/30 border border-brand-border hover:bg-brand-surface2/50 transition-colors group">
                                            <div>
                                                <span className="font-bold text-brand-text">{setting.label}</span>
                                                <p className="text-xs text-brand-muted mt-0.5">{setting.description}</p>
                                            </div>
                                            <Toggle
                                                checked={securitySettings[setting.key as keyof typeof securitySettings] as boolean}
                                                onChange={(val) => setSecuritySettings(prev => ({ ...prev, [setting.key]: val }))}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                        Şifre Politikası
                                    </label>
                                    <select
                                        value={securitySettings.passwordPolicy}
                                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordPolicy: e.target.value }))}
                                        className="w-full md:w-64 h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer focus:border-red-500/50 transition-all"
                                    >
                                        <option value="weak">Zayıf (Min. 6 karakter)</option>
                                        <option value="medium">Orta (Min. 8 karakter, 1 rakam)</option>
                                        <option value="strong">Güçlü (Min. 12 karakter, özel karakter)</option>
                                    </select>
                                </div>

                                <div className="pt-4 border-t border-brand-border">
                                    <button
                                        type="button"
                                        onClick={handleBackupDatabase}
                                        className="h-11 px-6 rounded-xl bg-red-500/10 text-red-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Database size={14} />
                                        Veritabanı Yedekle
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Branding Settings */}
                        {activeTab === 'branding' && (
                            <motion.div
                                key="branding"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
                                    <Palette size={20} className="text-brand-muted" />
                                    <h2 className="text-lg font-black text-brand-text tracking-tight">Marka Ayarları</h2>
                                </div>

                                <div className="grid gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                                Logo URL
                                            </label>
                                            <input
                                                type="text"
                                                value={brandingSettings.logoUrl}
                                                onChange={(e) => setBrandingSettings(prev => ({ ...prev, logoUrl: e.target.value }))}
                                                className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-red-500/50 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                                Favicon URL
                                            </label>
                                            <input
                                                type="text"
                                                value={brandingSettings.faviconUrl}
                                                onChange={(e) => setBrandingSettings(prev => ({ ...prev, faviconUrl: e.target.value }))}
                                                className="w-full h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-red-500/50 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                                Ana Renk
                                            </label>
                                            <div className="flex items-center h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border gap-4">
                                                <input
                                                    type="color"
                                                    value={brandingSettings.primaryColor}
                                                    onChange={(e) => setBrandingSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                                                    className="w-10 h-8 rounded cursor-pointer border-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={brandingSettings.primaryColor}
                                                    onChange={(e) => setBrandingSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                                                    className="flex-1 bg-transparent text-brand-text font-mono font-medium outline-none uppercase"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">
                                                İkincil Renk
                                            </label>
                                            <div className="flex items-center h-12 px-4 rounded-xl bg-brand-surface2 border border-brand-border gap-4">
                                                <input
                                                    type="color"
                                                    value={brandingSettings.secondaryColor}
                                                    onChange={(e) => setBrandingSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                                                    className="w-10 h-8 rounded cursor-pointer border-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={brandingSettings.secondaryColor}
                                                    onChange={(e) => setBrandingSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                                                    className="flex-1 bg-transparent text-brand-text font-mono font-medium outline-none uppercase"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preview */}
                                    <div>
                                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-3">
                                            Önizleme
                                        </label>
                                        <div className="p-6 rounded-xl border border-brand-border bg-brand-surface2/30">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black"
                                                    style={{ background: `linear-gradient(135deg, ${brandingSettings.primaryColor}, ${brandingSettings.secondaryColor})` }}
                                                >
                                                    A
                                                </div>
                                                <div>
                                                    <p className="font-black text-brand-text">{generalSettings.platformName}</p>
                                                    <p className="text-xs text-brand-muted">{generalSettings.platformUrl}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    className="h-10 px-5 rounded-xl text-white font-bold text-xs uppercase tracking-widest"
                                                    style={{ background: `linear-gradient(135deg, ${brandingSettings.primaryColor}, ${brandingSettings.secondaryColor})` }}
                                                >
                                                    Birincil Buton
                                                </button>
                                                <button
                                                    className="h-10 px-5 rounded-xl font-bold text-xs uppercase tracking-widest border-2"
                                                    style={{ borderColor: brandingSettings.primaryColor, color: brandingSettings.primaryColor }}
                                                >
                                                    İkincil Buton
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-xl bg-brand-surface2/30 border border-brand-border">
                                        <div>
                                            <span className="font-bold text-brand-text">Karanlık Mod</span>
                                            <p className="text-xs text-brand-muted mt-0.5">Platform genelinde karanlık tema kullan</p>
                                        </div>
                                        <Toggle
                                            checked={brandingSettings.darkMode}
                                            onChange={(val) => setBrandingSettings(prev => ({ ...prev, darkMode: val }))}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Save Button */}
                    <motion.div variants={item} className="flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="h-12 px-8 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:shadow-lg hover:shadow-red-500/20 transition-all disabled:opacity-70"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Kaydediliyor...
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    Değişiklikleri Kaydet
                                </>
                            )}
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
