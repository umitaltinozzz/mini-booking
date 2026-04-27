'use client';

import React from 'react';
import { useModule } from '@/providers/TenantProvider';
import { User, Bell, Trash2, Plus, Clock, Users, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRestaurantWaitlist } from '@/data/tenant/mockRestaurantData';
import { mockBarberWaitlist } from '@/data/tenant/mockBarberData';

interface WaitlistEntry {
    id: string;
    name: string;
    note: string;
    detail: string;
    time: string;
    priority: 'normal' | 'high' | 'vip';
}

export function WaitingList() {
    const module = useModule();
    const [showAddModal, setShowAddModal] = React.useState(false);

    // Sektöre göre uygun bekleme listesi verisi
    const waitlist: WaitlistEntry[] = React.useMemo(() => {
        if (module.id === 'restaurant') {
            return mockRestaurantWaitlist.map(entry => ({
                id: entry.id,
                name: entry.customerName,
                note: entry.notes || '',
                detail: `${entry.guestCount} kişi${entry.preferredSection !== 'any' ? `, ${entry.preferredSection === 'outside' ? 'Bahçe' : entry.preferredSection === 'vip' ? 'VIP' : 'İç salon'} tercih` : ''}`,
                time: entry.estimatedWait,
                priority: entry.priority
            }));
        } else {
            return mockBarberWaitlist.map(entry => ({
                id: entry.id,
                name: entry.customerName,
                note: entry.notes || '',
                detail: `${entry.serviceName}${entry.preferredStaff ? ` • ${entry.preferredStaff}` : ''} • ${entry.estimatedDuration}`,
                time: entry.estimatedWait,
                priority: entry.priority
            }));
        }
    }, [module.id]);

    const priorityStyles = {
        normal: 'border-brand-border',
        high: 'border-amber-500/30 bg-amber-500/5',
        vip: 'border-purple-500/30 bg-purple-500/5'
    };

    const priorityBadge = {
        normal: null,
        high: <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500/20 text-amber-500">Acil</span>,
        vip: <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-purple-500/20 text-purple-500">VIP</span>
    };

    return (
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-black tracking-tight text-brand-text">Bekleme Listesi</h2>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mt-0.5 flex items-center gap-1">
                        {module.id === 'restaurant' ? (
                            <><Users size={10} /> Masa Bazlı</>
                        ) : (
                            <><Scissors size={10} /> Hizmet Bazlı</>
                        )}
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="h-8 px-4 rounded-lg bg-brand-accent text-brand-bg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                    <Plus size={12} />
                    Ekle
                </button>
            </div>

            <div className="space-y-2">
                <AnimatePresence>
                    {waitlist.map((entry, index) => (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-4 rounded-xl border flex items-center justify-between group hover:bg-brand-surface2/30 transition-colors ${priorityStyles[entry.priority]}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${entry.priority === 'vip' ? 'bg-purple-500/10 text-purple-500' :
                                    entry.priority === 'high' ? 'bg-amber-500/10 text-amber-500' :
                                        'bg-brand-surface2 text-brand-muted'
                                    }`}>
                                    <User size={16} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-brand-text text-sm">{entry.name}</h4>
                                        {priorityBadge[entry.priority]}
                                    </div>
                                    <p className="text-xs text-brand-muted mt-0.5">{entry.detail}</p>
                                    {entry.note && (
                                        <p className="text-xs text-brand-accent mt-0.5">💬 {entry.note}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-xs font-bold text-brand-text">
                                        <Clock size={10} className="text-brand-muted" />
                                        ~{entry.time}
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button title="Bildirim Gönder" className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent hover:bg-brand-accent hover:text-brand-bg transition-all">
                                        <Bell size={12} />
                                    </button>
                                    <button title="Sil" className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {waitlist.length === 0 && (
                    <div className="py-8 text-center text-brand-muted font-bold text-xs uppercase tracking-widest border-2 border-dashed border-brand-border rounded-xl">
                        Sıra bekleyen kimse yok
                    </div>
                )}
            </div>

            {/* Add Modal Trigger - actual modal would be implemented separately */}
            {showAddModal && (
                <AddToWaitlistModal
                    sector={module.id}
                    onClose={() => setShowAddModal(false)}
                />
            )}
        </div>
    );
}

// Inline Add Modal for simplicity
function AddToWaitlistModal({ sector, onClose }: { sector: string; onClose: () => void }) {
    const [formData, setFormData] = React.useState({
        customerName: '',
        customerPhone: '',
        guestCount: 2,
        preferredSection: 'any',
        serviceName: '',
        preferredStaff: '',
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Adding to waitlist:', formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6 shadow-2xl"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-brand-text">Bekleme Listesine Ekle</h3>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-brand-surface2 text-brand-muted">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                            Müşteri Adı *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.customerName}
                            onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                            className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50"
                            placeholder="Müşteri adı"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                            Telefon
                        </label>
                        <input
                            type="tel"
                            value={formData.customerPhone}
                            onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                            className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50"
                            placeholder="0532 XXX XX XX"
                        />
                    </div>

                    {sector === 'restaurant' ? (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                                        Kişi Sayısı
                                    </label>
                                    <select
                                        value={formData.guestCount}
                                        onChange={(e) => setFormData(prev => ({ ...prev, guestCount: Number(e.target.value) }))}
                                        className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                            <option key={n} value={n}>{n} kişi</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                                        Bölüm Tercihi
                                    </label>
                                    <select
                                        value={formData.preferredSection}
                                        onChange={(e) => setFormData(prev => ({ ...prev, preferredSection: e.target.value }))}
                                        className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer"
                                    >
                                        <option value="any">Fark Etmez</option>
                                        <option value="inside">İç Salon</option>
                                        <option value="outside">Bahçe</option>
                                        <option value="vip">VIP</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                                    Hizmet
                                </label>
                                <select
                                    value={formData.serviceName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, serviceName: e.target.value }))}
                                    className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer"
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="Saç Kesimi">Saç Kesimi (30 dk)</option>
                                    <option value="Sakal Tıraşı">Sakal Tıraşı (20 dk)</option>
                                    <option value="Saç + Sakal">Saç + Sakal (45 dk)</option>
                                    <option value="Fade Kesim">Fade Kesim (40 dk)</option>
                                    <option value="Premium Bakım">Premium Bakım (75 dk)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                                    Tercih Edilen Personel
                                </label>
                                <select
                                    value={formData.preferredStaff}
                                    onChange={(e) => setFormData(prev => ({ ...prev, preferredStaff: e.target.value }))}
                                    className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none cursor-pointer"
                                >
                                    <option value="">Fark Etmez</option>
                                    <option value="Canberk H.">Canberk H.</option>
                                    <option value="Mehmet A.">Mehmet A.</option>
                                    <option value="Deniz K.">Deniz K.</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
                            Not
                        </label>
                        <input
                            type="text"
                            value={formData.notes}
                            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                            className="w-full h-11 px-4 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-medium outline-none focus:border-brand-accent/50"
                            placeholder={sector === 'restaurant' ? 'Örn: Bebek sandalyesi lazım' : 'Örn: Yanları kısa istiyorum'}
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-11 rounded-xl bg-brand-surface2 border border-brand-border text-brand-text font-bold text-xs uppercase tracking-widest hover:bg-brand-surface transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 h-11 rounded-xl bg-brand-accent text-brand-bg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                        >
                            Ekle
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
