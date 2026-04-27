'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slot, BRANCHES, STAFF, SERVICES } from '@/data/demoData';
import { statusLabel, STATUS_COLORS } from '@/constants/status';
import { X, Calendar, Clock, MapPin, User, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AppointmentDetailProps {
    slot: Slot | null;
    onClose: () => void;
    locale: string;
}

export function AppointmentDetail({ slot, onClose, locale }: AppointmentDetailProps) {
    if (!slot) return null;

    const branch = BRANCHES.find(b => b.id === slot.branchId)?.name;
    const staff = STAFF.find(s => s.id === slot.staffId)?.name;
    const service = SERVICES.find(s => s.id === slot.serviceId)?.name;

    return (
        <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className="bg-brand-surface border border-brand-border p-8 rounded-[32px] shadow-3xl w-full max-w-sm"
        >
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-brand-text">Randevu Detayı</h3>
                <button onClick={onClose} className="text-brand-muted hover:text-brand-text transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="space-y-6">
                <DetailItem icon={Calendar} label="TARİH" value={slot.date} />
                <DetailItem icon={Clock} label="SAAT" value={slot.time} />
                <DetailItem icon={MapPin} label="ŞUBE" value={branch || '-'} />
                <DetailItem icon={ShieldCheck} label="HİZMET" value={service || '-'} />
                <DetailItem icon={User} label="PERSONEL" value={staff || '-'} />

                <div className="flex justify-between items-center bg-brand-surface2 p-4 rounded-2xl border border-brand-border">
                    <span className="text-[10px] font-black text-brand-muted tracking-widest">DURUM</span>
                    <span className="text-xs font-black uppercase" style={{ color: STATUS_COLORS[slot.status] }}>
                        {statusLabel(slot.status, locale)}
                    </span>
                </div>

                <div className="pt-4 grid grid-cols-1 gap-3">
                    {slot.status === 'AVAILABLE' ? (
                        <Button className="w-full h-14 rounded-2xl bg-brand-accent text-[#06080C] font-black uppercase tracking-widest">
                            Randevu Oluştur
                        </Button>
                    ) : (
                        <Button variant="outline" className="w-full h-14 rounded-2xl border-brand-border text-brand-muted cursor-not-allowed">
                            {slot.status === 'BOOKED' ? 'Dolu Slot' : 'İşlem Yapılamaz'}
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function DetailItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-surface2 border border-brand-border flex items-center justify-center">
                <Icon size={18} className="text-brand-accent" />
            </div>
            <div>
                <p className="text-[9px] font-black text-brand-muted tracking-widest">{label}</p>
                <p className="text-sm font-bold text-brand-text">{value}</p>
            </div>
        </div>
    );
}
