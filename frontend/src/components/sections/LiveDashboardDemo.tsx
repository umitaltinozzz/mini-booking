'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { DEMO_SLOTS, Branch, Staff, Service, Slot, STAFF } from '@/data/demoData';
import { DashboardPanel } from '@/components/demo/DashboardPanel';
import { AppointmentDetail } from '@/components/demo/AppointmentDetail';
import { SceneContainer } from '@/components/three/SceneContainer';
import { SlotScene } from '@/components/three/SlotScene';
import { AnimatePresence, motion } from 'framer-motion';
import { statusLabel } from '@/constants/status';

export function LiveDashboardDemo() {
    const t = useTranslations('Features'); // Reusing some strings or define new ones if needed
    const locale = useLocale();

    const [filters, setFilters] = useState({
        date: new Date().toISOString().split('T')[0],
        branchId: 'all',
        staffId: 'all',
    });

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const visibleSlots = useMemo(() => {
        return DEMO_SLOTS.filter(s => {
            const matchBranch = filters.branchId === 'all' || s.branchId === filters.branchId;
            const matchStaff = filters.staffId === 'all' || s.staffId === filters.staffId;
            const matchDate = s.date === filters.date;
            return matchBranch && matchStaff && matchDate;
        });
    }, [filters]);

    const selectedSlot = useMemo(() =>
        visibleSlots.find(s => s.id === selectedId) || null
        , [selectedId, visibleSlots]);

    const hoveredSlot = useMemo(() =>
        visibleSlots.find(s => s.id === hoveredId) || null
        , [hoveredId, visibleSlots]);

    return (
        <section className="bg-brand-bg py-24 md:py-32 px-6 md:px-12 relative">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-brand-text mb-6 tracking-tighter">
                        Canlı demo
                    </h2>
                    <p className="text-lg md:text-xl text-brand-muted font-medium mb-4">
                        Filtrele, slot seç, detayları gör. Aynı state hem paneli hem 3D grid’i besler.
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface2 border border-brand-border text-[9px] font-bold tracking-[0.1em] text-brand-muted uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-status-booked animate-pulse" />
                        Demo verisi. Gerçek entegrasyonlar kurulumda açılır.
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left Column: 2D Dashboard (5 Cols) */}
                    <div className="lg:col-span-5 relative z-10">
                        <DashboardPanel
                            filters={filters}
                            setFilters={setFilters}
                            visibleSlots={visibleSlots}
                            selectedId={selectedId}
                            onSelect={setSelectedId}
                            locale={locale}
                        />
                    </div>

                    {/* Right Column: 3D Grid (7 Cols) */}
                    <div className="lg:col-span-7 relative h-[500px] md:h-[700px]">
                        <div className="absolute inset-0 bg-brand-surface/40 backdrop-blur-3xl border border-brand-border rounded-[48px] overflow-hidden shadow-2xl">
                            <SceneContainer
                                dpr={[1, 1.5]}
                                fallback={<div className="w-full h-full flex items-center justify-center text-brand-muted font-mono text-[10px] uppercase tracking-widest">Sahne Yükleniyor...</div>}
                            >
                                <SlotScene
                                    slots={visibleSlots}
                                    selectedId={selectedId}
                                    hoveredId={hoveredId}
                                    onHover={setHoveredId}
                                    onSelect={setSelectedId}
                                />
                            </SceneContainer>

                            {/* HTML Tooltip Overlay */}
                            <AnimatePresence>
                                {hoveredSlot && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                        className="absolute bottom-32 right-8 pointer-events-none z-50 bg-brand-bg/90 backdrop-blur-xl p-4 rounded-2xl border border-brand-accent/30 shadow-2xl min-w-[180px]"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[9px] font-black text-brand-muted uppercase">{hoveredSlot.time}</span>
                                            <span className={`text-[9px] font-black uppercase`} style={{ color: hoveredSlot.status === 'BOOKED' ? '#3B82F6' : '#A3E635' }}>
                                                {statusLabel(hoveredSlot.status, locale)}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-brand-text truncate">
                                            {STAFF.find(s => s.id === hoveredSlot.staffId)?.name}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* HUD Elements */}
                            <div className="absolute top-8 right-8 flex flex-col items-end gap-1 opacity-40">
                                <span className="text-[10px] font-mono text-brand-muted">GRID_RENDERER v1.0</span>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-3 bg-brand-accent/40" />)}
                                </div>
                            </div>
                        </div>

                        {/* Float Appointment Detail Panel */}
                        <AnimatePresence>
                            {selectedId && (
                                <div className="absolute -top-12 -right-12 z-50 hidden xl:block pointer-events-auto">
                                    <AppointmentDetail
                                        slot={selectedSlot}
                                        onClose={() => setSelectedId(null)}
                                        locale={locale}
                                    />
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

                {/* Mobile Detail Panel Overlay */}
                <AnimatePresence>
                    {selectedId && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 lg:hidden">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm"
                            />
                            <AppointmentDetail
                                slot={selectedSlot}
                                onClose={() => setSelectedId(null)}
                                locale={locale}
                            />
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
