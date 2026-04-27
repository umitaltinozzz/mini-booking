'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Bell, Moon, Globe, Lock, Smartphone,
    Save, Check, ChevronRight, ToggleLeft, ToggleRight
} from 'lucide-react';

interface SettingToggleProps {
    label: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
}

function SettingToggle({ label, description, enabled, onToggle }: SettingToggleProps) {
    return (
        <div className="flex items-center justify-between p-4 hover:bg-brand-surface2/30 rounded-xl transition-colors">
            <div>
                <p className="font-bold text-brand-text">{label}</p>
                <p className="text-sm text-brand-muted">{description}</p>
            </div>
            <button onClick={onToggle} className="text-purple-500">
                {enabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-brand-muted" />}
            </button>
        </div>
    );
}

export default function StaffSettingsPage() {
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState({
        notifications: true,
        emailNotifications: true,
        smsNotifications: false,
        darkMode: true,
        language: 'tr',
    });

    const toggleSetting = (key: keyof typeof settings) => {
        if (typeof settings[key] === 'boolean') {
            setSettings(prev => ({ ...prev, [key]: !prev[key] }));
        }
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="animate-in fade-in duration-500 max-w-3xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-brand-text">Ayarlar</h1>
                    <p className="text-sm text-brand-muted mt-1">Uygulama tercihlerinizi düzenleyin</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${saved
                            ? 'bg-green-500 text-white'
                            : 'bg-purple-500 text-white hover:bg-purple-600'
                        }`}
                >
                    {saved ? <Check size={18} /> : <Save size={18} />}
                    {saved ? 'Kaydedildi!' : 'Kaydet'}
                </button>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden"
                >
                    <div className="p-5 border-b border-brand-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                                <Bell size={20} className="text-purple-500" />
                            </div>
                            <div>
                                <h3 className="font-black text-brand-text">Bildirimler</h3>
                                <p className="text-xs text-brand-muted">Bildirim tercihlerinizi yönetin</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <SettingToggle
                            label="Push Bildirimleri"
                            description="Yeni randevular ve güncellemeler için bildirim al"
                            enabled={settings.notifications}
                            onToggle={() => toggleSetting('notifications')}
                        />
                        <SettingToggle
                            label="E-posta Bildirimleri"
                            description="Günlük özet ve önemli güncellemeler"
                            enabled={settings.emailNotifications}
                            onToggle={() => toggleSetting('emailNotifications')}
                        />
                        <SettingToggle
                            label="SMS Bildirimleri"
                            description="Acil bildirimler için SMS al"
                            enabled={settings.smsNotifications}
                            onToggle={() => toggleSetting('smsNotifications')}
                        />
                    </div>
                </motion.div>

                {/* Appearance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden"
                >
                    <div className="p-5 border-b border-brand-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                <Moon size={20} className="text-blue-500" />
                            </div>
                            <div>
                                <h3 className="font-black text-brand-text">Görünüm</h3>
                                <p className="text-xs text-brand-muted">Tema ve dil ayarları</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <SettingToggle
                            label="Karanlık Mod"
                            description="Göz yormayan koyu tema"
                            enabled={settings.darkMode}
                            onToggle={() => toggleSetting('darkMode')}
                        />
                        <div className="flex items-center justify-between p-4 hover:bg-brand-surface2/30 rounded-xl transition-colors">
                            <div className="flex items-center gap-3">
                                <Globe size={20} className="text-brand-muted" />
                                <div>
                                    <p className="font-bold text-brand-text">Dil</p>
                                    <p className="text-sm text-brand-muted">Uygulama dilini seçin</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-brand-text">Türkçe</span>
                                <ChevronRight size={18} className="text-brand-muted" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Security */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden"
                >
                    <div className="p-5 border-b border-brand-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                                <Lock size={20} className="text-green-500" />
                            </div>
                            <div>
                                <h3 className="font-black text-brand-text">Güvenlik</h3>
                                <p className="text-xs text-brand-muted">Hesap güvenlik ayarları</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-brand-surface2/30 rounded-xl transition-colors text-left">
                            <div>
                                <p className="font-bold text-brand-text">Şifre Değiştir</p>
                                <p className="text-sm text-brand-muted">Hesap şifrenizi güncelleyin</p>
                            </div>
                            <ChevronRight size={18} className="text-brand-muted" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-brand-surface2/30 rounded-xl transition-colors text-left">
                            <div className="flex items-center gap-3">
                                <Smartphone size={20} className="text-brand-muted" />
                                <div>
                                    <p className="font-bold text-brand-text">Bağlı Cihazlar</p>
                                    <p className="text-sm text-brand-muted">Aktif oturumlarınızı görüntüleyin</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-brand-muted" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
