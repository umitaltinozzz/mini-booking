'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TableStatusLegend } from './widgets/TableStatusLegend';
import { useModule } from '@/providers/TenantProvider';

type TableStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';

interface Table {
    id: string;
    number: number;
    seats: number;
    status: TableStatus;
    guestName?: string;
    time?: string;
}

const MOCK_TABLES: Table[] = Array.from({ length: 16 }, (_, i) => ({
    id: `table-${i + 1}`,
    number: i + 1,
    seats: i % 3 === 0 ? 4 : 2,
    status: (['AVAILABLE', 'OCCUPIED', 'RESERVED'] as TableStatus[])[Math.floor(Math.random() * 3)],
    guestName: Math.random() > 0.5 ? 'Ahmet Yılmaz' : undefined,
    time: '20:00',
}));

export function FloorPlanView() {
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const module = useModule();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
                <TableStatusLegend />

                <div className="p-8 bg-brand-surface2/30 border border-brand-border rounded-[32px] grid grid-cols-2 md:grid-cols-4 gap-6 min-h-[500px]">
                    {MOCK_TABLES.map((table) => (
                        <motion.button
                            key={table.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTable(table)}
                            className={`
                aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all p-4
                ${selectedTable?.id === table.id ? 'ring-4 ring-brand-accent/20 border-brand-accent' : 'border-brand-border'}
                ${table.status === 'AVAILABLE' ? 'bg-brand-surface group' : ''}
                ${table.status === 'OCCUPIED' ? 'bg-status-booked/10 border-status-booked/30' : ''}
                ${table.status === 'RESERVED' ? 'bg-status-warning/10 border-status-warning/30' : ''}
              `}
                        >
                            <span className="text-xs font-black text-brand-muted uppercase tracking-widest">{module.labels.resource}</span>
                            <span className="text-3xl font-black text-brand-text">{table.number}</span>
                            <div className="flex gap-1 mt-1">
                                {Array.from({ length: table.seats }).map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-muted/30" />
                                ))}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-4 sticky top-24">
                <AnimatePresence mode="wait">
                    {selectedTable ? (
                        <motion.div
                            key={selectedTable.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-brand-surface border border-brand-border rounded-[32px] p-8 space-y-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="text-2xl font-black tracking-tighter">Masa {selectedTable.number} Detay</h3>
                                <button
                                    onClick={() => setSelectedTable(null)}
                                    className="text-xs font-black text-brand-muted uppercase hover:text-brand-text"
                                >
                                    Kapat
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-2xl bg-brand-surface2/50 border border-brand-border">
                                    <p className="text-[10px] font-black text-brand-muted uppercase tracking-widest mb-1">Durum</p>
                                    <p className="font-bold text-brand-text">{selectedTable.status}</p>
                                </div>

                                {selectedTable.guestName && (
                                    <div className="p-4 rounded-2xl bg-brand-surface2/50 border border-brand-border">
                                        <p className="text-[10px] font-black text-brand-muted uppercase tracking-widest mb-1">{module.labels.client}</p>
                                        <p className="font-bold text-brand-text">{selectedTable.guestName}</p>
                                        <p className="text-sm font-medium text-brand-muted">{selectedTable.time}</p>
                                    </div>
                                )}
                            </div>

                            <button className="w-full h-12 rounded-xl bg-brand-accent text-brand-bg font-black uppercase tracking-widest text-xs">
                                Aksiyon Al
                            </button>
                        </motion.div>
                    ) : (
                        <div className="h-[400px] border-2 border-dashed border-brand-border rounded-[32px] flex items-center justify-center text-center p-8">
                            <p className="text-sm font-bold text-brand-muted uppercase tracking-widest">
                                Detayları görmek için bir masa seçin
                            </p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
