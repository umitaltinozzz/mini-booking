'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, TrendingUp, ChevronRight, CheckCircle2, AlertCircle, Users } from 'lucide-react';

interface DaySlot {
    id: number;
    time: string;
    customer: string;
    service: string;
    staff: string;
    status: 'confirmed' | 'pending' | 'completed';
}

interface DayData {
    day: string;
    dayNum: number;
    isToday: boolean;
    slots: DaySlot[];
}

const WEEK_DATA: DayData[] = [
    {
        day: 'Pzt', dayNum: 6, isToday: false, slots: [
            { id: 1, time: '09:00', customer: 'Ayşe Y.', service: 'Saç Kesimi', staff: 'Mehmet', status: 'completed' },
            { id: 2, time: '11:30', customer: 'Can T.', service: 'Sakal Tıraşı', staff: 'Ali', status: 'completed' },
        ]
    },
    {
        day: 'Sal', dayNum: 7, isToday: false, slots: [
            { id: 3, time: '10:00', customer: 'Elif K.', service: 'Manikür', staff: 'Zeynep', status: 'completed' },
            { id: 4, time: '14:00', customer: 'Mert A.', service: 'Saç Boyama', staff: 'Mehmet', status: 'completed' },
            { id: 5, time: '16:30', customer: 'Deniz S.', service: 'Kesim + Fön', staff: 'Ali', status: 'completed' },
        ]
    },
    {
        day: 'Çar', dayNum: 8, isToday: false, slots: [
            { id: 6, time: '09:30', customer: 'Selin B.', service: 'Cilt Bakımı', staff: 'Zeynep', status: 'completed' },
        ]
    },
    {
        day: 'Per', dayNum: 9, isToday: true, slots: [
            { id: 7, time: '09:00', customer: 'Burak M.', service: 'Saç Kesimi', staff: 'Mehmet', status: 'confirmed' },
            { id: 8, time: '10:30', customer: 'Aslı D.', service: 'Fön', staff: 'Ali', status: 'pending' },
            { id: 9, time: '13:00', customer: 'Kerem Y.', service: 'Sakal Düzeltme', staff: 'Mehmet', status: 'confirmed' },
            { id: 10, time: '15:00', customer: 'Nil H.', service: 'Manikür + Pedikür', staff: 'Zeynep', status: 'pending' },
        ]
    },
    {
        day: 'Cum', dayNum: 10, isToday: false, slots: [
            { id: 11, time: '10:00', customer: 'Ege T.', service: 'Saç Kesimi', staff: 'Ali', status: 'confirmed' },
            { id: 12, time: '11:30', customer: 'Defne A.', service: 'Keratin Bakım', staff: 'Mehmet', status: 'confirmed' },
            { id: 13, time: '14:00', customer: 'Yusuf K.', service: 'Tıraş', staff: 'Ali', status: 'pending' },
        ]
    },
    {
        day: 'Cmt', dayNum: 11, isToday: false, slots: [
            { id: 14, time: '10:00', customer: 'İrem S.', service: 'Komple Bakım', staff: 'Zeynep', status: 'confirmed' },
            { id: 15, time: '12:00', customer: 'Arda B.', service: 'Saç + Sakal', staff: 'Mehmet', status: 'confirmed' },
            { id: 16, time: '14:30', customer: 'Ceren M.', service: 'Fön', staff: 'Ali', status: 'confirmed' },
            { id: 17, time: '16:00', customer: 'Ozan D.', service: 'Kesim', staff: 'Mehmet', status: 'pending' },
        ]
    },
    { day: 'Paz', dayNum: 12, isToday: false, slots: [] },
];

export function InteractiveDashboard() {
    const [selectedDay, setSelectedDay] = useState<DayData>(WEEK_DATA.find(d => d.isToday) || WEEK_DATA[3]);
    const [hoveredSlot, setHoveredSlot] = useState<DaySlot | null>(null);

    const totalSlots = WEEK_DATA.reduce((acc, day) => acc + day.slots.length, 0);
    const confirmedSlots = WEEK_DATA.reduce((acc, day) => acc + day.slots.filter(s => s.status === 'confirmed').length, 0);
    const pendingSlots = WEEK_DATA.reduce((acc, day) => acc + day.slots.filter(s => s.status === 'pending').length, 0);

    return (
        <div className="bg-brand-surface border border-brand-border rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Decorative Gradient */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/5 blur-[80px] rounded-full -mr-20 -mt-20" />

            <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                            <Calendar size={20} className="text-brand-accent" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-brand-text">Ocak 2026</h3>
                            <p className="text-xs text-brand-muted">Bu hafta</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                        <span className="text-xs text-brand-muted font-medium">Canlı</span>
                    </div>
                </div>

                {/* Week Days */}
                <div className="grid grid-cols-7 gap-1">
                    {WEEK_DATA.map((day) => (
                        <button
                            key={day.dayNum}
                            onClick={() => setSelectedDay(day)}
                            className={`p-2 rounded-xl text-center transition-all ${selectedDay.dayNum === day.dayNum
                                    ? 'bg-brand-accent text-[#06080C]'
                                    : day.isToday
                                        ? 'bg-brand-accent/20 text-brand-accent'
                                        : 'bg-brand-surface2 text-brand-muted hover:bg-brand-accent/10'
                                }`}
                        >
                            <p className="text-[10px] font-bold">{day.day}</p>
                            <p className="text-sm font-black">{day.dayNum}</p>
                            {day.slots.length > 0 && (
                                <div className="flex justify-center gap-0.5 mt-1">
                                    {day.slots.slice(0, 3).map((_, i) => (
                                        <div key={i} className={`w-1 h-1 rounded-full ${selectedDay.dayNum === day.dayNum ? 'bg-[#06080C]/40' : 'bg-brand-accent/60'
                                            }`} />
                                    ))}
                                    {day.slots.length > 3 && (
                                        <span className={`text-[8px] ${selectedDay.dayNum === day.dayNum ? 'text-[#06080C]/60' : 'text-brand-accent/60'
                                            }`}>+{day.slots.length - 3}</span>
                                    )}
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-brand-surface2/50 rounded-xl p-3 text-center border border-brand-border/50">
                        <p className="text-lg font-black text-brand-accent">{totalSlots}</p>
                        <p className="text-[10px] text-brand-muted">Bu Hafta</p>
                    </div>
                    <div className="bg-brand-surface2/50 rounded-xl p-3 text-center border border-brand-border/50">
                        <p className="text-lg font-black text-emerald-500">{confirmedSlots}</p>
                        <p className="text-[10px] text-brand-muted">Onaylı</p>
                    </div>
                    <div className="bg-brand-surface2/50 rounded-xl p-3 text-center border border-brand-border/50">
                        <p className="text-lg font-black text-amber-500">{pendingSlots}</p>
                        <p className="text-[10px] text-brand-muted">Bekleyen</p>
                    </div>
                </div>

                {/* Day's Appointments */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                            {selectedDay.day} {selectedDay.dayNum} Ocak
                        </p>
                        <p className="text-xs text-brand-muted">{selectedDay.slots.length} randevu</p>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedDay.dayNum}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-2 max-h-[180px] overflow-y-auto no-scrollbar"
                        >
                            {selectedDay.slots.length === 0 ? (
                                <div className="py-8 text-center text-brand-muted text-sm">
                                    Bu gün için randevu yok
                                </div>
                            ) : (
                                selectedDay.slots.map((slot) => (
                                    <motion.div
                                        key={slot.id}
                                        onHoverStart={() => setHoveredSlot(slot)}
                                        onHoverEnd={() => setHoveredSlot(null)}
                                        className={`p-3 rounded-xl border transition-all cursor-pointer ${hoveredSlot?.id === slot.id
                                                ? 'bg-brand-accent/10 border-brand-accent'
                                                : 'bg-brand-surface2/30 border-brand-border/50 hover:border-brand-accent/50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col items-center">
                                                    <Clock size={12} className="text-brand-muted mb-0.5" />
                                                    <span className="text-xs font-bold text-brand-text">{slot.time}</span>
                                                </div>
                                                <div className="w-[1px] h-8 bg-brand-border" />
                                                <div>
                                                    <p className="text-sm font-bold text-brand-text">{slot.customer}</p>
                                                    <p className="text-xs text-brand-muted">{slot.service}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${slot.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' :
                                                        slot.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                                                            'bg-brand-muted/10 text-brand-muted'
                                                    }`}>
                                                    {slot.status === 'confirmed' ? 'Onaylı' : slot.status === 'pending' ? 'Bekliyor' : 'Tamamlandı'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Hover Details */}
                                        <AnimatePresence>
                                            {hoveredSlot?.id === slot.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-2 pt-2 border-t border-brand-border/30"
                                                >
                                                    <div className="flex items-center gap-2 text-xs text-brand-muted">
                                                        <User size={12} className="text-brand-accent" />
                                                        <span>Personel: <strong className="text-brand-text">{slot.staff}</strong></span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* CTA */}
                <button className="w-full py-3 rounded-xl bg-brand-accent text-[#06080C] font-bold text-sm hover:bg-brand-accent2 transition-all flex items-center justify-center gap-2 group">
                    Dashboard'u Keşfet
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
