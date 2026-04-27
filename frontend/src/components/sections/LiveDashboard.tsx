'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DUMMY_DATA } from '@/data/dummy';
import { SLOT_STATUS, SLOT_THEME } from '@/constants/theme';
import { SceneContainer } from '@/components/three/SceneContainer';
import { SlotGridScene } from '@/components/three/SlotGridScene';
import { clsx } from 'clsx';
import { Info } from 'lucide-react';

export function LiveDashboard() {
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
    const [activeStaffId, setActiveStaffId] = useState(DUMMY_DATA.staff[0].id);

    const staffSlots = DUMMY_DATA.slots.filter(s => s.staffId === activeStaffId);

    // Map slots to 3D positions for the grid
    const threeSlots = staffSlots.map((slot, i) => ({
        id: slot.id,
        status: slot.status,
        position: [
            (i % 5) * 1.2 - 2.4, // x
            -Math.floor(i / 5) * 1.2 + 0.6, // y
            0
        ] as [number, number, number]
    }));

    return (
        <section id="demo" className="py-24 px-6 md:px-12 bg-brand-surface/30">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl mb-4">Gerçek Zamanlı <span className="text-brand-accent">Yönetim</span></h2>
                    <p className="text-brand-muted text-lg max-w-2xl">
                        Personel müsaitliğini ve randevu durumlarını anlık izleyin.
                        Mavi alanlar dolu randevuları, yeşil alan seçili slotu temsil eder.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: 2D Dashboard Panel */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="glass p-6 rounded-2xl space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-lg">Personel Seçimi</h3>
                                <div className="flex gap-2">
                                    {DUMMY_DATA.staff.map(s => (
                                        <button
                                            key={s.id}
                                            onClick={() => setActiveStaffId(s.id)}
                                            className={clsx(
                                                "w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center font-bold text-xs",
                                                activeStaffId === s.id ? "border-brand-accent bg-brand-accent/10 text-brand-accent" : "border-brand-border text-brand-muted"
                                            )}
                                        >
                                            {s.avatar}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-brand-muted uppercase tracking-wider">Bugünün Slotları</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                                    {staffSlots.map(slot => (
                                        <button
                                            key={slot.id}
                                            onClick={() => slot.status === SLOT_STATUS.AVAILABLE && setSelectedSlotId(slot.id)}
                                            disabled={slot.status === SLOT_STATUS.DISABLED}
                                            className={clsx(
                                                "p-4 rounded-xl border text-sm font-medium transition-all flex justify-between items-center",
                                                selectedSlotId === slot.id
                                                    ? "bg-brand-accent/20 border-brand-accent text-brand-accent"
                                                    : slot.status === SLOT_STATUS.BOOKED
                                                        ? "bg-status-booked/10 border-status-booked/30 text-status-booked"
                                                        : "bg-brand-surface2 border-brand-border text-brand-text hover:border-brand-muted",
                                                slot.status === SLOT_STATUS.DISABLED && "opacity-30"
                                            )}
                                        >
                                            <span>{slot.time}</span>
                                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-current">
                                                {SLOT_THEME[slot.status].label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-brand-surface2/50 p-4 rounded-xl border border-brand-border flex gap-3 text-brand-muted text-xs leading-relaxed">
                                <Info className="w-4 h-4 shrink-0 text-status-booked" />
                                <p>
                                    <strong className="text-status-booked">Mavi Slotlar:</strong> Kurumsal kimliğimizde "Dolu" durumunu temsil eder. Karmaşayı önler, netlik sağlar.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: 3D Visualization */}
                    <div className="lg:col-span-7 h-[500px] glass rounded-2xl relative overflow-hidden group">
                        {/* Scene Overlays */}
                        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 bg-brand-bg/80 backdrop-blur px-3 py-1.5 rounded-full border border-brand-border text-[10px] font-bold uppercase">
                                <div className="w-2 h-2 rounded-full bg-status-booked" />
                                <span>Dolu (Booked)</span>
                            </div>
                            <div className="flex items-center gap-2 bg-brand-bg/80 backdrop-blur px-3 py-1.5 rounded-full border border-brand-border text-[10px] font-bold uppercase">
                                <div className="w-2 h-2 rounded-full bg-brand-accent" />
                                <span>Seçili / Müsait</span>
                            </div>
                        </div>

                        <div className="absolute inset-0 z-0">
                            <SceneContainer>
                                <SlotGridScene
                                    slots={threeSlots}
                                    selectedId={selectedSlotId}
                                    onSelect={(id) => {
                                        const slot = DUMMY_DATA.slots.find(s => s.id === id);
                                        if (slot?.status === SLOT_STATUS.AVAILABLE) setSelectedSlotId(id);
                                    }}
                                />
                            </SceneContainer>
                        </div>

                        <div className="absolute bottom-4 left-4 z-10 text-[10px] text-brand-muted font-mono uppercase tracking-tighter">
                            Engine: Procedural Slot Grid v1.0 // 3D Visualization
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
