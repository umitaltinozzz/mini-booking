'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    Lock,
    Fingerprint,
    Clock,
    Ban,
    FileText,
    Globe,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Activity,
    LogIn,
    KeyRound,
    ShieldAlert,
    UserX,
    type LucideIcon
} from 'lucide-react';

interface SecurityToggle {
    id: string;
    label: string;
    description: string;
    icon: LucideIcon;
    defaultOn: boolean;
}

interface ActivityLog {
    id: number;
    type: 'success' | 'warning' | 'error';
    message: string;
    time: string;
    icon: LucideIcon;
    detail?: string;
}

const SECURITY_TOGGLES: SecurityToggle[] = [
    { id: '2fa', label: '2FA Doğrulama', description: 'İki faktörlü kimlik', icon: Fingerprint, defaultOn: true },
    { id: 'session', label: 'Oturum Kontrolü', description: '30 dk zaman aşımı', icon: Clock, defaultOn: true },
    { id: 'brute', label: 'Brute Force', description: '5 deneme kilitleme', icon: Ban, defaultOn: true },
    { id: 'audit', label: 'Audit Log', description: 'İşlem kayıtları', icon: FileText, defaultOn: true },
    { id: 'ip', label: 'IP Kısıtlama', description: 'Coğrafi engelleme', icon: Globe, defaultOn: false },
];

const LOG_TEMPLATES: Omit<ActivityLog, 'id' | 'time'>[] = [
    { type: 'success', message: 'Başarılı giriş', icon: LogIn, detail: 'admin@akran.io' },
    { type: 'success', message: '2FA doğrulandı', icon: CheckCircle2, detail: 'SMS kodu' },
    { type: 'warning', message: 'Şüpheli IP tespit', icon: AlertTriangle, detail: '185.xxx.xxx.12' },
    { type: 'error', message: 'Hatalı giriş denemesi', icon: XCircle, detail: '3. deneme' },
    { type: 'success', message: 'Şifre güncellendi', icon: KeyRound, detail: 'user@akran.io' },
    { type: 'warning', message: 'Oturum süresi doldu', icon: Clock, detail: '30 dk aşıldı' },
    { type: 'error', message: 'IP engellendi', icon: ShieldAlert, detail: 'Brute force' },
    { type: 'success', message: 'Yeni cihaz onaylandı', icon: CheckCircle2, detail: 'iPhone 15' },
    { type: 'warning', message: 'Farklı lokasyon', icon: Globe, detail: 'İstanbul → Ankara' },
    { type: 'error', message: 'Hesap kilitlendi', icon: UserX, detail: '5 hatalı deneme' },
];

// Toggle Component
function Toggle({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 ${checked ? 'bg-brand-accent' : 'bg-brand-surface2'
                }`}
        >
            <motion.div
                animate={{ x: checked ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
            />
        </button>
    );
}

// Circular Progress Component
function SecurityScore({ score }: { score: number }) {
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-brand-surface2"
                />
                <motion.circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ strokeDasharray: circumference }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className="text-2xl font-black text-brand-accent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                >
                    {score}%
                </motion.span>
                <span className="text-[10px] text-brand-muted font-bold uppercase tracking-wider">Güvenlik</span>
            </div>
        </div>
    );
}

export function SecurityDashboard() {
    const [toggleStates, setToggleStates] = useState<Record<string, boolean>>(() =>
        SECURITY_TOGGLES.reduce((acc, toggle) => ({ ...acc, [toggle.id]: toggle.defaultOn }), {})
    );
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [newLogIndicator, setNewLogIndicator] = useState(false);
    const logIdRef = React.useRef(Date.now());

    // Calculate security score based on active toggles
    const activeToggles = Object.values(toggleStates).filter(Boolean).length;
    const securityScore = Math.round((activeToggles / SECURITY_TOGGLES.length) * 100);

    // Generate time string
    const getTimeString = (secondsAgo: number) => {
        if (secondsAgo < 60) return 'Az önce';
        if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} dk önce`;
        return `${Math.floor(secondsAgo / 3600)} saat önce`;
    };

    // Add a new log
    const addLog = useCallback(() => {
        const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
        logIdRef.current += 1;
        const newLog: ActivityLog = {
            ...template,
            id: logIdRef.current,
            time: 'Az önce',
        };

        setLogs(prev => [newLog, ...prev].slice(0, 6)); // Keep max 6 logs
        setNewLogIndicator(true);
        setTimeout(() => setNewLogIndicator(false), 1000);
    }, []);

    // Initial logs + periodic updates
    useEffect(() => {
        // Add initial logs with delays
        const baseId = logIdRef.current;
        const initialLogs: ActivityLog[] = [
            { id: baseId + 1, type: 'success', message: 'Başarılı giriş', time: '2 dk önce', icon: LogIn, detail: 'admin@akran.io' },
            { id: baseId + 2, type: 'warning', message: 'Şüpheli IP tespit', time: '15 dk önce', icon: AlertTriangle, detail: '185.xxx.xxx.12' },
            { id: baseId + 3, type: 'error', message: '3 hatalı deneme', time: '1 saat önce', icon: XCircle, detail: 'user@test.com' },
        ];

        logIdRef.current = baseId + 3;

        initialLogs.forEach((log, index) => {
            setTimeout(() => {
                setLogs(prev => {
                    // Prevent duplicate keys
                    if (prev.some(l => l.id === log.id)) return prev;
                    return [...prev, log];
                });
            }, 500 + index * 300);
        });

        // Add new logs periodically
        const interval = setInterval(() => {
            addLog();
        }, 4000);

        return () => clearInterval(interval);
    }, [addLog]);

    const handleToggleChange = (id: string, value: boolean) => {
        setToggleStates(prev => ({ ...prev, [id]: value }));

        // Add a log when toggle changes
        const toggle = SECURITY_TOGGLES.find(t => t.id === id);
        if (toggle) {
            logIdRef.current += 1;
            const newLog: ActivityLog = {
                id: logIdRef.current,
                type: value ? 'success' : 'warning',
                message: value ? `${toggle.label} aktif` : `${toggle.label} devre dışı`,
                time: 'Az önce',
                icon: value ? CheckCircle2 : AlertTriangle,
                detail: 'Ayar değişikliği',
            };
            setLogs(prev => [newLog, ...prev].slice(0, 6));
            setNewLogIndicator(true);
            setTimeout(() => setNewLogIndicator(false), 1000);
        }
    };

    const getLogStyles = (type: 'success' | 'warning' | 'error') => {
        switch (type) {
            case 'success': return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
            case 'warning': return { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
            case 'error': return { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
        }
    };

    return (
        <div className="bg-brand-surface border border-brand-border rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
            {/* Decorative Gradient */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/10 blur-[80px] rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 blur-[60px] rounded-full -ml-16 -mb-16" />

            <div className="relative z-10 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent/20 to-cyan-500/20 flex items-center justify-center">
                            <ShieldCheck size={20} className="text-brand-accent" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-brand-text">Güvenlik Paneli</h3>
                            <p className="text-[10px] text-brand-muted">Canlı durum</p>
                        </div>
                    </div>
                    <SecurityScore score={securityScore} />
                </div>

                {/* Security Toggles */}
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-3">
                        Güvenlik Kontrolleri
                    </p>
                    {SECURITY_TOGGLES.map((toggle, index) => (
                        <motion.div
                            key={toggle.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${toggleStates[toggle.id]
                                ? 'bg-brand-accent/5 border border-brand-accent/20'
                                : 'bg-brand-surface2/30 border border-brand-border/50 hover:bg-brand-surface2/50'
                                }`}
                            onClick={() => handleToggleChange(toggle.id, !toggleStates[toggle.id])}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${toggleStates[toggle.id]
                                    ? 'bg-brand-accent/20 text-brand-accent'
                                    : 'bg-brand-surface2 text-brand-muted'
                                    }`}>
                                    <toggle.icon size={14} />
                                </div>
                                <div>
                                    <p className={`text-xs font-bold transition-colors ${toggleStates[toggle.id] ? 'text-brand-text' : 'text-brand-muted'
                                        }`}>
                                        {toggle.label}
                                    </p>
                                    <p className="text-[10px] text-brand-muted">{toggle.description}</p>
                                </div>
                            </div>
                            <Toggle
                                checked={toggleStates[toggle.id]}
                                onChange={(val) => handleToggleChange(toggle.id, val)}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Activity Logs - Interactive */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest flex items-center gap-2">
                            <Activity size={10} />
                            Canlı Aktiviteler
                        </p>
                        <motion.span
                            className={`w-2 h-2 rounded-full ${newLogIndicator ? 'bg-cyan-400' : 'bg-brand-accent'}`}
                            animate={{
                                scale: newLogIndicator ? [1, 1.5, 1] : 1,
                                opacity: [1, 0.5, 1]
                            }}
                            transition={{
                                duration: newLogIndicator ? 0.3 : 2,
                                repeat: newLogIndicator ? 0 : Infinity,
                                ease: 'easeInOut'
                            }}
                        />
                    </div>
                    <div className="space-y-1.5 max-h-[180px] overflow-y-auto no-scrollbar">
                        <AnimatePresence mode="popLayout">
                            {logs.map((log) => {
                                const styles = getLogStyles(log.type);

                                return (
                                    <motion.div
                                        key={log.id}
                                        layout
                                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        className={`flex items-center gap-3 p-2.5 rounded-xl ${styles.bg} border ${styles.border} hover:scale-[1.02] transition-transform cursor-pointer group`}
                                    >
                                        <div className={`w-6 h-6 rounded-lg ${styles.bg} flex items-center justify-center`}>
                                            <log.icon size={12} className={styles.color} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-brand-text truncate">{log.message}</p>
                                            {log.detail && (
                                                <p className="text-[10px] text-brand-muted truncate">{log.detail}</p>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-brand-muted whitespace-nowrap">{log.time}</span>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
