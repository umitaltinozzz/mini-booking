'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    HelpCircle, MessageCircle, Phone, Mail, FileText,
    ChevronRight, ExternalLink, Book, Video
} from 'lucide-react';

const faqItems = [
    {
        question: 'Randevu nasıl tamamlarım?',
        answer: 'Dashboard ekranında aktif randevunuzun altındaki "Tamamla" butonuna tıklayarak randevuyu tamamlayabilirsiniz.',
    },
    {
        question: 'Mola nasıl veririm?',
        answer: 'Dashboard ekranında sağ taraftaki "Hızlı İşlemler" bölümünden "Mola Al" butonuna tıklayabilirsiniz.',
    },
    {
        question: 'Müsaitlik saatlerimi nasıl değiştiririm?',
        answer: 'Sol menüden "Müsaitlik" sayfasına giderek haftalık çalışma saatlerinizi düzenleyebilirsiniz.',
    },
    {
        question: 'Randevu iptal edebilir miyim?',
        answer: 'Henüz başlamamış randevular için randevu detaylarından iptal işlemi yapabilirsiniz. İptal politikası işletmenize göre değişebilir.',
    },
];

const helpResources = [
    { icon: Book, label: 'Kullanım Kılavuzu', description: 'Detaylı kullanım rehberi', href: '#' },
    { icon: Video, label: 'Video Eğitimler', description: 'Adım adım video anlatımlar', href: '#' },
    { icon: FileText, label: 'SSS', description: 'Sık sorulan sorular', href: '#' },
];

export default function StaffHelpPage() {
    return (
        <div className="animate-in fade-in duration-500 max-w-3xl">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-black text-brand-text">Yardım Merkezi</h1>
                <p className="text-sm text-brand-muted mt-1">Size nasıl yardımcı olabiliriz?</p>
            </div>

            {/* Quick Contact */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-6"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <HelpCircle size={24} />
                    </div>
                    <div>
                        <h2 className="font-black text-xl">Yardıma mı ihtiyacınız var?</h2>
                        <p className="text-white/80 text-sm">Destek ekibimiz size yardımcı olmaya hazır</p>
                    </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
                        <MessageCircle size={18} />
                        <span className="font-bold text-sm">Canlı Destek</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
                        <Phone size={18} />
                        <span className="font-bold text-sm">0850 XXX XX XX</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
                        <Mail size={18} />
                        <span className="font-bold text-sm">E-posta</span>
                    </button>
                </div>
            </motion.div>

            {/* Resources */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-brand-surface border border-brand-border rounded-2xl p-5 mb-6"
            >
                <h3 className="font-black text-brand-text mb-4">Kaynaklar</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                    {helpResources.map((resource, index) => (
                        <a
                            key={index}
                            href={resource.href}
                            className="flex flex-col items-center text-center p-4 bg-brand-surface2/50 rounded-xl hover:bg-brand-surface2 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-purple-500/20 transition-colors">
                                <resource.icon size={24} className="text-purple-500" />
                            </div>
                            <p className="font-bold text-brand-text text-sm">{resource.label}</p>
                            <p className="text-xs text-brand-muted mt-1">{resource.description}</p>
                        </a>
                    ))}
                </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden"
            >
                <div className="p-5 border-b border-brand-border">
                    <h3 className="font-black text-brand-text">Sık Sorulan Sorular</h3>
                </div>
                <div className="divide-y divide-brand-border">
                    {faqItems.map((item, index) => (
                        <details key={index} className="group">
                            <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-brand-surface2/30 transition-colors">
                                <span className="font-bold text-brand-text">{item.question}</span>
                                <ChevronRight size={18} className="text-brand-muted group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="px-5 pb-5 text-sm text-brand-muted">
                                {item.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </motion.div>

            {/* Contact Manager */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
            >
                <p className="text-sm text-blue-600 font-bold">
                    💼 İşletme yöneticinizle iletişime geçmek için sol menüdeki "Yardım" bölümünden destek talebi oluşturabilirsiniz.
                </p>
            </motion.div>
        </div>
    );
}
