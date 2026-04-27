'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone, User, CheckCircle2, ArrowLeft, Sparkles, Users, Calendar, MessageSquare } from 'lucide-react';
import { Link } from '@/i18n/routing';

const BUSINESS_TYPES = [
    { id: 'barber', label: 'Berber / Kuaför', icon: '💈' },
    { id: 'restaurant', label: 'Restoran / Kafe', icon: '🍽️' },
    { id: 'clinic', label: 'Klinik / Sağlık', icon: '🏥' },
    { id: 'beauty', label: 'Güzellik Salonu', icon: '💅' },
    { id: 'fitness', label: 'Spor Salonu', icon: '💪' },
    { id: 'education', label: 'Eğitim / Kurs', icon: '📚' },
    { id: 'corporate', label: 'Kurumsal', icon: '🏢' },
    { id: 'other', label: 'Diğer', icon: '📦' },
];

const EMPLOYEE_COUNTS = [
    { id: '1-5', label: '1-5 Çalışan' },
    { id: '6-15', label: '6-15 Çalışan' },
    { id: '16-50', label: '16-50 Çalışan' },
    { id: '50+', label: '50+ Çalışan' },
];

export default function DemoPage() {
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        phone: '',
        email: '',
        businessType: '',
        employeeCount: '',
        message: ''
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
            <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-800 border border-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl max-w-md w-full text-center"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-slate-900" />
                    </div>
                    <h1 className="text-2xl font-black text-white mb-4">
                        Demo Talebiniz Alındı!
                    </h1>
                    <p className="text-slate-400 mb-8">
                        Ekibimiz en kısa sürede sizinle iletişime geçecek. Genellikle 24 saat içinde dönüş yapıyoruz.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-lime-500/20 transition-all"
                    >
                        <ArrowLeft size={18} />
                        Ana Sayfaya Dön
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
            {/* Header */}
            <header className="border-b border-slate-700/50 py-6">
                <div className="max-w-4xl mx-auto px-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
                        <ArrowLeft size={18} />
                        <span className="text-sm font-medium">Ana Sayfa</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                            <Sparkles size={28} className="text-slate-900" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white">Demo Talep Formu</h1>
                            <p className="text-sm text-slate-400">AKRAN'ı işletmeniz için keşfedin</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Form - 3 cols */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={handleSubmit}
                            className="lg:col-span-3 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-slate-700/50"
                        >
                            <div className="space-y-6">
                                {/* Contact Info */}
                                <div>
                                    <h3 className="text-sm font-bold text-lime-400 uppercase tracking-wider mb-4">İletişim Bilgileri</h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Ad Soyad *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full h-12 px-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500"
                                                    placeholder="Adınız Soyadınız"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    İşletme Adı *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.businessName}
                                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                                    className="w-full h-12 px-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500"
                                                    placeholder="İşletme adınız"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Telefon *
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full h-12 px-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500"
                                                    placeholder="0532 XXX XX XX"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    E-posta *
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full h-12 px-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500"
                                                    placeholder="isletme@email.com"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Type */}
                                <div>
                                    <h3 className="text-sm font-bold text-lime-400 uppercase tracking-wider mb-4">İşletme Tipi</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {BUSINESS_TYPES.map((type) => (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, businessType: type.id })}
                                                className={`p-3 rounded-xl border text-center transition-all ${formData.businessType === type.id
                                                    ? 'bg-lime-500/20 border-lime-500 text-lime-400'
                                                    : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:border-slate-500'
                                                    }`}
                                            >
                                                <span className="text-2xl block mb-1">{type.icon}</span>
                                                <span className="text-xs font-medium">{type.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Employee Count */}
                                <div>
                                    <h3 className="text-sm font-bold text-lime-400 uppercase tracking-wider mb-4">Çalışan Sayısı</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {EMPLOYEE_COUNTS.map((count) => (
                                            <button
                                                key={count.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, employeeCount: count.id })}
                                                className={`p-3 rounded-xl border text-center transition-all ${formData.employeeCount === count.id
                                                    ? 'bg-lime-500/20 border-lime-500 text-lime-400'
                                                    : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:border-slate-500'
                                                    }`}
                                            >
                                                <span className="text-sm font-medium">{count.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Mesajınız (Opsiyonel)
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={3}
                                        className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 resize-none"
                                        placeholder="Beklentilerinizi veya sorularınızı yazabilirsiniz..."
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="mt-8 w-full h-14 bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-900 font-black rounded-xl transition-all hover:shadow-lg hover:shadow-lime-500/20 flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        Demo Talep Et
                                    </>
                                )}
                            </button>
                        </motion.form>

                        {/* Info Cards - 2 cols */}
                        <div className="lg:col-span-2 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
                            >
                                <h3 className="text-lg font-bold text-white mb-4">Demo sürecinde neler olacak?</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-lime-500/20 flex items-center justify-center flex-shrink-0">
                                            <Phone size={16} className="text-lime-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Telefon Görüşmesi</p>
                                            <p className="text-xs text-slate-400">İhtiyaçlarınızı anlamamız için kısa bir görüşme</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-lime-500/20 flex items-center justify-center flex-shrink-0">
                                            <Calendar size={16} className="text-lime-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Canlı Demo</p>
                                            <p className="text-xs text-slate-400">30 dakikalık kişiselleştirilmiş demo</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-lime-500/20 flex items-center justify-center flex-shrink-0">
                                            <Users size={16} className="text-lime-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Ücretsiz Kurulum</p>
                                            <p className="text-xs text-slate-400">Ekibimiz sisteminizi sizin için kurar</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-gradient-to-br from-lime-500/10 to-emerald-500/10 rounded-2xl p-6 border border-lime-500/20"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <MessageSquare size={24} className="text-lime-400" />
                                    <h3 className="text-lg font-bold text-white">Hızlı Destek</h3>
                                </div>
                                <p className="text-sm text-slate-300 mb-4">
                                    Acil sorularınız mı var? WhatsApp üzerinden anında destek alın.
                                </p>
                                <a
                                    href="https://wa.me/905XXXXXXXXX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white font-bold rounded-xl text-sm hover:bg-emerald-600 transition-colors"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp ile Yaz
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
