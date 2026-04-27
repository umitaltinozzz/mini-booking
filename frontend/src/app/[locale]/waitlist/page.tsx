'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Mail, Phone, User, CheckCircle2, ArrowLeft, Bell } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function WaitlistPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        preferredDate: '',
        preferredTime: '',
        notes: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-md w-full text-center"
                >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-emerald-600" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 mb-4">
                        Bekleme Listesine Eklendi!
                    </h1>
                    <p className="text-slate-600 mb-8">
                        Müsaitlik durumu oluştuğunda size SMS ve e-posta ile bilgi vereceğiz.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Ana Sayfaya Dön
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 py-6">
                <div className="max-w-2xl mx-auto px-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-4">
                        <ArrowLeft size={18} />
                        <span className="text-sm font-medium">Geri Dön</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center">
                            <Bell size={28} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-800">Bekleme Listesi</h1>
                            <p className="text-sm text-slate-500">Müsaitlik olduğunda sizi haberdar edelim</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Form */}
            <main className="py-8 px-6">
                <div className="max-w-2xl mx-auto">
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200"
                    >
                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    <User size={14} className="inline mr-2" />
                                    Ad Soyad *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                    placeholder="Adınız Soyadınız"
                                />
                            </div>

                            {/* Phone & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        <Phone size={14} className="inline mr-2" />
                                        Telefon *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        placeholder="0532 XXX XX XX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        <Mail size={14} className="inline mr-2" />
                                        E-posta
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        placeholder="ornek@email.com"
                                    />
                                </div>
                            </div>

                            {/* Preferred Date & Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        <Clock size={14} className="inline mr-2" />
                                        Tercih Edilen Tarih
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.preferredDate}
                                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                        className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        Tercih Edilen Saat
                                    </label>
                                    <select
                                        value={formData.preferredTime}
                                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                                        className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                    >
                                        <option value="">Saat seçin</option>
                                        <option value="morning">Sabah (09:00 - 12:00)</option>
                                        <option value="afternoon">Öğleden Sonra (12:00 - 17:00)</option>
                                        <option value="evening">Akşam (17:00 - 20:00)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Not (Opsiyonel)
                                </label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    rows={3}
                                    className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                                    placeholder="Eklemek istediğiniz bir not var mı?"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-8 w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Kaydediliyor...
                                </>
                            ) : (
                                <>
                                    <Bell size={20} />
                                    Bekleme Listesine Katıl
                                </>
                            )}
                        </button>

                        <p className="mt-4 text-xs text-slate-400 text-center">
                            Müsaitlik olduğunda SMS ve e-posta ile bilgilendirileceksiniz.
                        </p>
                    </motion.form>
                </div>
            </main>
        </div>
    );
}
