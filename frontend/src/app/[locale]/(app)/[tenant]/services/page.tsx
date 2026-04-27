'use client';

import React, { useState } from 'react';
import { useModule } from '@/providers/TenantProvider';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Clock,
    DollarSign,
    MoreVertical,
    Utensils,
    Scissors,
    Tag,
    Check,
    X,
} from 'lucide-react';
import { mockBarberServices } from '@/data/tenant/mockBarberData';
import { mockMenuItems, mockMenuCategories } from '@/data/tenant/mockRestaurantData';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function ServicesPage() {
    const module = useModule();
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const isBarber = module.id === 'barber';

    // Filter services based on search
    const filteredBarberServices = mockBarberServices.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredMenuItems = mockMenuItems.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) &&
        (!selectedCategory || m.category === selectedCategory)
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{isBarber ? '✂️' : '🍽️'}</span>
                        <h1 className="text-3xl font-black text-brand-text tracking-tighter">
                            {isBarber ? 'Hizmet Yönetimi' : 'Menü Yönetimi'}
                        </h1>
                    </div>
                    <p className="text-brand-muted font-medium">
                        {isBarber ? 'Sunduğunuz hizmetleri ve fiyatları yönetin' : 'Menü kategorileri ve yemekleri düzenleyin'}
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="h-11 px-6 rounded-xl bg-brand-accent text-brand-bg font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <Plus size={16} />
                    {isBarber ? 'Yeni Hizmet' : 'Yeni Ürün'}
                </button>
            </div>

            {/* Search & Filters */}
            <motion.div variants={item} className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center gap-3 px-4 h-11 rounded-xl bg-brand-surface border border-brand-border flex-1 max-w-md">
                    <Search size={16} className="text-brand-muted" />
                    <input
                        type="text"
                        placeholder={isBarber ? 'Hizmet ara...' : 'Ürün ara...'}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 bg-transparent text-sm font-medium text-brand-text placeholder:text-brand-muted outline-none"
                    />
                </div>

                {!isBarber && (
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${!selectedCategory ? 'bg-brand-accent text-brand-bg' : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text'
                                }`}
                        >
                            Tümü
                        </button>
                        {mockMenuCategories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${selectedCategory === cat.name ? 'bg-brand-accent text-brand-bg' : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Services/Menu Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {isBarber ? (
                    // Barber Services
                    filteredBarberServices.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={item}
                            className={`bg-brand-surface border rounded-2xl p-5 transition-all hover:shadow-lg group ${service.isActive ? 'border-brand-border' : 'border-brand-border/50 opacity-60'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.category === 'premium' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                                    service.category === 'combo' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                                        service.category === 'beard' ? 'bg-gradient-to-br from-amber-500 to-orange-500' :
                                            'bg-gradient-to-br from-green-500 to-emerald-500'
                                    }`}>
                                    <Scissors size={20} className="text-white" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${service.isActive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                        {service.isActive ? 'Aktif' : 'Pasif'}
                                    </span>
                                    <button className="p-1.5 rounded-lg hover:bg-brand-surface2 text-brand-muted opacity-0 group-hover:opacity-100 transition-all">
                                        <MoreVertical size={14} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-black text-brand-text text-lg">{service.name}</h3>
                            <p className="text-xs text-brand-muted mt-1">{service.description}</p>

                            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-brand-border">
                                <div className="flex items-center gap-1.5 text-sm">
                                    <Clock size={12} className="text-brand-muted" />
                                    <span className="font-bold text-brand-text">{service.duration} dk</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm">
                                    <DollarSign size={12} className="text-brand-muted" />
                                    <span className="font-bold text-brand-text">₺{service.price}</span>
                                </div>
                                <span className="ml-auto px-2 py-0.5 rounded bg-brand-surface2 text-[10px] font-bold text-brand-muted uppercase">
                                    {service.category}
                                </span>
                            </div>

                            <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="flex-1 h-9 rounded-lg bg-brand-surface2 border border-brand-border text-brand-text font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1 hover:bg-brand-surface transition-colors">
                                    <Edit size={12} /> Düzenle
                                </button>
                                <button className="h-9 px-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    // Restaurant Menu Items
                    filteredMenuItems.map((menuItem) => (
                        <motion.div
                            key={menuItem.id}
                            variants={item}
                            className={`bg-brand-surface border rounded-2xl p-5 transition-all hover:shadow-lg group ${menuItem.isAvailable ? 'border-brand-border' : 'border-brand-border/50 opacity-60'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                                    <Utensils size={20} className="text-white" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${menuItem.isAvailable ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                        {menuItem.isAvailable ? 'Mevcut' : 'Tükendi'}
                                    </span>
                                    <button className="p-1.5 rounded-lg hover:bg-brand-surface2 text-brand-muted opacity-0 group-hover:opacity-100 transition-all">
                                        <MoreVertical size={14} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-black text-brand-text text-lg">{menuItem.name}</h3>
                            <p className="text-xs text-brand-muted mt-1 line-clamp-2">{menuItem.description}</p>

                            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-brand-border">
                                <div className="flex items-center gap-1.5 text-sm">
                                    <Clock size={12} className="text-brand-muted" />
                                    <span className="font-bold text-brand-text">{menuItem.preparationTime}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm">
                                    <span className="font-black text-brand-accent text-lg">₺{menuItem.price}</span>
                                </div>
                                <span className="ml-auto px-2 py-0.5 rounded bg-brand-surface2 text-[10px] font-bold text-brand-muted uppercase">
                                    {menuItem.category}
                                </span>
                            </div>

                            <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="flex-1 h-9 rounded-lg bg-brand-surface2 border border-brand-border text-brand-text font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1 hover:bg-brand-surface transition-colors">
                                    <Edit size={12} /> Düzenle
                                </button>
                                <button className={`h-9 px-3 rounded-lg transition-all ${menuItem.isAvailable
                                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
                                    : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'
                                    }`}>
                                    {menuItem.isAvailable ? <X size={12} /> : <Check size={12} />}
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>

            {/* Empty State */}
            {((isBarber && filteredBarberServices.length === 0) || (!isBarber && filteredMenuItems.length === 0)) && (
                <div className="py-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-brand-surface2 flex items-center justify-center mx-auto mb-4">
                        {isBarber ? <Scissors size={24} className="text-brand-muted" /> : <Utensils size={24} className="text-brand-muted" />}
                    </div>
                    <p className="text-sm font-bold text-brand-muted uppercase tracking-widest">
                        {search ? 'Sonuç bulunamadı' : (isBarber ? 'Henüz hizmet eklenmemiş' : 'Henüz ürün eklenmemiş')}
                    </p>
                </div>
            )}

            {/* Stats Footer */}
            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {isBarber ? (
                    <>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-4 text-center">
                            <p className="text-2xl font-black text-brand-text">{mockBarberServices.length}</p>
                            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Toplam Hizmet</p>
                        </div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-4 text-center">
                            <p className="text-2xl font-black text-green-500">{mockBarberServices.filter(s => s.isActive).length}</p>
                            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Aktif</p>
                        </div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-4 text-center">
                            <p className="text-2xl font-black text-brand-text">₺{Math.min(...mockBarberServices.map(s => s.price))}</p>
                            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">En Düşük</p>
                        </div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-4 text-center">
                            <p className="text-2xl font-black text-brand-text">₺{Math.max(...mockBarberServices.map(s => s.price))}</p>
                            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">En Yüksek</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-4 text-center">
                            <p className="text-2xl font-black text-brand-text">{mockMenuCategories.length}</p>
                            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Kategori</p>
                        </div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-4 text-center">
                            <p className="text-2xl font-black text-brand-text">{mockMenuItems.length}</p>
                            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Toplam Ürün</p>
                        </div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-4 text-center">
                            <p className="text-2xl font-black text-green-500">{mockMenuItems.filter(m => m.isAvailable).length}</p>
                            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Mevcut</p>
                        </div>
                        <div className="bg-brand-surface border border-brand-border rounded-xl p-4 text-center">
                            <p className="text-2xl font-black text-red-500">{mockMenuItems.filter(m => !m.isAvailable).length}</p>
                            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Tükendi</p>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
}
