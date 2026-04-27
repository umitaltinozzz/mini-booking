'use client';

import React, { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { MeshGradient } from '@/components/ui/MeshGradient';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
    Building2,
    Users,
    Clock,
    ArrowRight,
    ArrowLeft,
    Check,
    Scissors,
    UtensilsCrossed,
    Stethoscope,
    Dumbbell,
    Sparkles,
    Car
} from 'lucide-react';

type Step = 1 | 2 | 3;

interface BusinessType {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

const BUSINESS_TYPES: BusinessType[] = [
    { id: 'barber', label: 'Kuaför / Berber', icon: Scissors },
    { id: 'restaurant', label: 'Restoran / Kafe', icon: UtensilsCrossed },
    { id: 'clinic', label: 'Klinik / Sağlık', icon: Stethoscope },
    { id: 'gym', label: 'Spor Salonu', icon: Dumbbell },
    { id: 'beauty', label: 'Güzellik Salonu', icon: Sparkles },
    { id: 'auto', label: 'Oto Servis', icon: Car },
];

const WORKING_HOURS = [
    '08:00 - 18:00',
    '09:00 - 19:00',
    '10:00 - 20:00',
    '10:00 - 22:00',
    '24 Saat',
    'Özel',
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [businessName, setBusinessName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [workingHours, setWorkingHours] = useState('');
    const [staffCount, setStaffCount] = useState('');

    const canProceedStep1 = businessName.length >= 2 && businessType !== '';
    const canProceedStep2 = staffCount !== '';
    const canProceedStep3 = workingHours !== '';

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep((prev) => (prev + 1) as Step);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => (prev - 1) as Step);
        }
    };

    const handleComplete = () => {
        // Create slug from business name
        const slug = businessName
            .toLowerCase()
            .replace(/ı/g, 'i')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

        // TODO: API call to save onboarding data
        console.log({ businessName, businessType, staffCount, workingHours, slug });

        // Redirect to tenant staff page
        router.push(`/${slug}/staff`);
    };

    const steps = [
        { number: 1, title: 'İşletme Bilgileri', icon: Building2 },
        { number: 2, title: 'Ekip Yapısı', icon: Users },
        { number: 3, title: 'Çalışma Saatleri', icon: Clock },
    ];

    return (
        <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <MeshGradient />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl"
            >
                <div className="bg-brand-surface border border-brand-border rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    {/* Decorative Glow */}
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-accent/10 blur-[60px] rounded-full" />

                    {/* Header */}
                    <div className="mb-8 text-center space-y-2 relative z-10">
                        <h1 className="text-2xl md:text-3xl font-black text-brand-text tracking-tighter">
                            İşletmenizi Kuralım 🚀
                        </h1>
                        <p className="text-sm text-brand-muted font-medium">
                            3 adımda işletmenizi hazır hale getirin
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-2 mb-10 relative z-10">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.number}>
                                <div className="flex flex-col items-center gap-2">
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${currentStep === step.number
                                            ? 'bg-brand-accent text-brand-bg scale-110'
                                            : currentStep > step.number
                                                ? 'bg-brand-accent/20 text-brand-accent'
                                                : 'bg-brand-surface2 text-brand-muted'
                                            }`}
                                    >
                                        {currentStep > step.number ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            <step.icon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= step.number ? 'text-brand-accent' : 'text-brand-muted'
                                        }`}>
                                        {step.title}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-12 h-0.5 mb-6 rounded-full transition-colors ${currentStep > step.number ? 'bg-brand-accent' : 'bg-brand-border'
                                        }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Step Content */}
                    <div className="relative z-10 min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {/* Step 1: Business Info */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <Input
                                        label="İşletme Adı"
                                        placeholder="Örn: Asil Berber"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                    />

                                    <div>
                                        <label className="block text-sm font-bold text-brand-text mb-3">
                                            İşletme Türü
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {BUSINESS_TYPES.map((type) => {
                                                const IconComponent = type.icon;
                                                return (
                                                    <button
                                                        key={type.id}
                                                        type="button"
                                                        onClick={() => setBusinessType(type.id)}
                                                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${businessType === type.id
                                                            ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                                                            : 'border-brand-border bg-brand-surface2 text-brand-muted hover:border-brand-accent/50'
                                                            }`}
                                                    >
                                                        <IconComponent className="w-6 h-6" />
                                                        <span className="text-xs font-bold">{type.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Team Structure */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-sm font-bold text-brand-text mb-3">
                                            Kaç kişilik ekibiniz var?
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {['1', '2-3', '4-6', '7+'].map((count) => (
                                                <button
                                                    key={count}
                                                    type="button"
                                                    onClick={() => setStaffCount(count)}
                                                    className={`p-4 rounded-2xl border-2 transition-all ${staffCount === count
                                                        ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                                                        : 'border-brand-border bg-brand-surface2 text-brand-muted hover:border-brand-accent/50'
                                                        }`}
                                                >
                                                    <span className="text-2xl font-black">{count}</span>
                                                    <span className="block text-xs font-medium mt-1">Kişi</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-brand-surface2 rounded-2xl p-4 border border-brand-border">
                                        <p className="text-sm text-brand-muted">
                                            💡 <span className="font-bold text-brand-text">İpucu:</span> Personel sayısına göre size en uygun planı önereceğiz.
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Working Hours */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-sm font-bold text-brand-text mb-3">
                                            Çalışma saatleriniz nedir?
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {WORKING_HOURS.map((hours) => (
                                                <button
                                                    key={hours}
                                                    type="button"
                                                    onClick={() => setWorkingHours(hours)}
                                                    className={`p-4 rounded-2xl border-2 transition-all ${workingHours === hours
                                                        ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                                                        : 'border-brand-border bg-brand-surface2 text-brand-muted hover:border-brand-accent/50'
                                                        }`}
                                                >
                                                    <Clock className="w-5 h-5 mx-auto mb-2" />
                                                    <span className="text-sm font-bold">{hours}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-brand-accent/10 to-brand-accent2/10 rounded-2xl p-4 border border-brand-accent/20">
                                        <p className="text-sm text-brand-text">
                                            ✨ <span className="font-bold">Neredeyse hazır!</span> Son adımda işletmenizi aktif edin.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-border relative z-10">
                        <Button
                            type="button"
                            onClick={handleBack}
                            className={`h-12 px-6 rounded-xl bg-brand-surface2 text-brand-muted font-bold flex items-center gap-2 hover:bg-brand-surface hover:text-brand-text transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''
                                }`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Geri
                        </Button>

                        {currentStep < 3 ? (
                            <Button
                                type="button"
                                onClick={handleNext}
                                disabled={
                                    (currentStep === 1 && !canProceedStep1) ||
                                    (currentStep === 2 && !canProceedStep2)
                                }
                                className="h-12 px-8 rounded-xl bg-brand-accent text-brand-bg font-black uppercase tracking-wider text-sm flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Devam
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={handleComplete}
                                disabled={!canProceedStep3}
                                className="h-12 px-8 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accent2 text-brand-bg font-black uppercase tracking-wider text-sm flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Kurulumu Tamamla
                                <Check className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
