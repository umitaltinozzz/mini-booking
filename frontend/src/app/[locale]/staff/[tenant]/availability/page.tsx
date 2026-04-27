'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Trash2, Save, Check } from 'lucide-react';
import { CURRENT_STAFF_ID, getStaffById } from '@/data/tenant/mockStaffData';
import { useTenant } from '@/providers/TenantProvider';
import { RestaurantStaffGuests } from '@/components/dashboard/modules/restaurant/RestaurantStaffGuests';

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

interface TimeSlot {
    start: string;
    end: string;
}

interface DaySchedule {
    enabled: boolean;
    slots: TimeSlot[];
}

const defaultSchedule: Record<string, DaySchedule> = {
    'Pazartesi': { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
    'Salı': { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
    'Çarşamba': { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
    'Perşembe': { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
    'Cuma': { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
    'Cumartesi': { enabled: true, slots: [{ start: '10:00', end: '16:00' }] },
    'Pazar': { enabled: false, slots: [] },
};

export default function StaffAvailabilityPage() {
    const { tenant } = useTenant();
    const [schedule, setSchedule] = useState(defaultSchedule);
    const [saved, setSaved] = useState(false);
    const staff = getStaffById(CURRENT_STAFF_ID);

    // Show restaurant guests for restaurant sector
    if (tenant.sector === 'restaurant') {
        return <RestaurantStaffGuests />;
    }

    const toggleDay = (day: string) => {
        setSchedule(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                enabled: !prev[day].enabled,
                slots: !prev[day].enabled ? [{ start: '09:00', end: '18:00' }] : []
            }
        }));
    };

    const updateSlot = (day: string, index: number, field: 'start' | 'end', value: string) => {
        setSchedule(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                slots: prev[day].slots.map((slot, i) =>
                    i === index ? { ...slot, [field]: value } : slot
                )
            }
        }));
    };

    const addSlot = (day: string) => {
        setSchedule(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                slots: [...prev[day].slots, { start: '12:00', end: '18:00' }]
            }
        }));
    };

    const removeSlot = (day: string, index: number) => {
        setSchedule(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                slots: prev[day].slots.filter((_, i) => i !== index)
            }
        }));
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-brand-text">Müsaitlik Ayarları</h1>
                    <p className="text-sm text-brand-muted mt-1">Haftalık çalışma saatlerinizi düzenleyin</p>
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

            {/* Schedule Grid */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
                {DAYS.map((day, index) => (
                    <motion.div
                        key={day}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-5 ${index !== DAYS.length - 1 ? 'border-b border-brand-border' : ''}`}
                    >
                        <div className="flex items-start gap-4">
                            {/* Day Toggle */}
                            <button
                                onClick={() => toggleDay(day)}
                                className={`w-28 flex-shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all ${schedule[day].enabled
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-brand-surface2 text-brand-muted'
                                    }`}
                            >
                                {day}
                            </button>

                            {/* Time Slots */}
                            <div className="flex-1">
                                {schedule[day].enabled ? (
                                    <div className="space-y-3">
                                        {schedule[day].slots.map((slot, slotIndex) => (
                                            <div key={slotIndex} className="flex items-center gap-3">
                                                <div className="flex items-center gap-2 p-2 bg-brand-surface2/50 rounded-xl">
                                                    <Clock size={16} className="text-brand-muted" />
                                                    <input
                                                        type="time"
                                                        value={slot.start}
                                                        onChange={(e) => updateSlot(day, slotIndex, 'start', e.target.value)}
                                                        className="bg-transparent text-brand-text font-bold focus:outline-none"
                                                    />
                                                    <span className="text-brand-muted">-</span>
                                                    <input
                                                        type="time"
                                                        value={slot.end}
                                                        onChange={(e) => updateSlot(day, slotIndex, 'end', e.target.value)}
                                                        className="bg-transparent text-brand-text font-bold focus:outline-none"
                                                    />
                                                </div>
                                                {schedule[day].slots.length > 1 && (
                                                    <button
                                                        onClick={() => removeSlot(day, slotIndex)}
                                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => addSlot(day)}
                                            className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-purple-500 hover:bg-purple-500/10 rounded-lg transition-colors"
                                        >
                                            <Plus size={16} />
                                            Mola Ekle
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-brand-muted text-sm py-2">Kapalı</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Info Card */}
            <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <p className="text-sm text-purple-600 font-bold">
                    💡 İpucu: Gün içinde mola vermek için "Mola Ekle" butonunu kullanabilirsiniz.
                </p>
            </div>
        </div>
    );
}
