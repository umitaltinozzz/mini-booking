'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { MeshGradient } from '@/components/ui/MeshGradient';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { LogIn, ArrowRight, Loader2, Shield, Copy, Building2, User, Scissors, UtensilsCrossed, FlaskConical, Calendar, Users } from 'lucide-react';

// Customer booking URLs (no login required)
const CUSTOMER_BOOKINGS = [
    {
        label: 'Asil Berber',
        sublabel: 'Randevu Al',
        icon: Scissors,
        color: 'from-purple-500 to-pink-500',
        url: '/book/asil-berber',
    },
    {
        label: 'Mamma Mia',
        sublabel: 'Rezervasyon Yap',
        icon: UtensilsCrossed,
        color: 'from-orange-500 to-red-500',
        url: '/book/mamma-mia',
    },
];

// Mock credentials for different roles
const MOCK_CREDENTIALS = {
    admin: {
        email: 'admin@akran.io',
        password: 'Admin123!',
        label: 'Admin',
        icon: Shield,
        color: 'from-red-500 to-orange-500',
        redirect: '/admin',
        successMsg: 'Admin paneline yönlendiriliyorsunuz...'
    },
    asilBerber: {
        email: 'ahmet@asilberber.com',
        password: 'Tenant123!',
        label: 'Asil Berber',
        sublabel: 'İşletme Sahibi',
        icon: Scissors,
        color: 'from-brand-accent to-brand-accent2',
        redirect: '/asil-berber/dashboard',
        successMsg: 'Asil Berber paneline yönlendiriliyorsunuz...'
    },
    mammaMia: {
        email: 'mehmet@mammamia.com',
        password: 'Tenant123!',
        label: 'Mamma Mia',
        sublabel: 'İşletme Sahibi',
        icon: UtensilsCrossed,
        color: 'from-orange-500 to-red-500',
        redirect: '/mamma-mia/dashboard',
        successMsg: 'Mamma Mia paneline yönlendiriliyorsunuz...'
    },
    staffBerber: {
        email: 'canberk@asilberber.com',
        password: 'Staff123!',
        label: 'Asil Berber',
        sublabel: 'Çalışan (Berber)',
        icon: Scissors,
        color: 'from-blue-500 to-cyan-500',
        redirect: '/staff/asil-berber/dashboard',
        successMsg: 'Çalışan paneline yönlendiriliyorsunuz...'
    },
    staffRestaurant: {
        email: 'ayse@mammamia.com',
        password: 'Staff123!',
        label: 'Mamma Mia',
        sublabel: 'Çalışan (Garson)',
        icon: UtensilsCrossed,
        color: 'from-amber-500 to-orange-500',
        redirect: '/staff/mamma-mia/dashboard',
        successMsg: 'Garson paneline yönlendiriliyorsunuz...'
    },
    testTenant: {
        email: 'test@test.com',
        password: 'Test1234!',
        label: 'Test İşletmesi',
        sublabel: 'Test Hesabı',
        icon: FlaskConical,
        color: 'from-purple-500 to-pink-500',
        redirect: '/test-tenant/dashboard',
        successMsg: 'Test paneline yönlendiriliyorsunuz...'
    }
};

type RoleType = keyof typeof MOCK_CREDENTIALS;

export default function LoginPage() {
    const t = useTranslations('Auth');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successRole, setSuccessRole] = useState<RoleType | null>(null);

    const loginSchema = z.object({
        email: z.string().email(t('validation.invalid_email')),
        password: z.string().min(8, t('validation.min_password')),
    });

    type LoginFormValues = z.infer<typeof loginSchema>;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const quickLogin = async (role: RoleType) => {
        const cred = MOCK_CREDENTIALS[role];
        setValue('email', cred.email);
        setValue('password', cred.password);
        
        // Show loading
        setIsLoading(true);
        toast.loading(`${cred.label} olarak giriş yapılıyor...`);
        
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        setIsLoading(false);
        setSuccessRole(role);
        setShowSuccess(true);
        toast.dismiss();
        toast.success('Giriş Tamamlandı!');
        
        setTimeout(() => {
            router.push(cred.redirect);
        }, 1500);
    };

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        console.log('Login data:', data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        
        // Check which role is logging in
        const matchedRole = (Object.keys(MOCK_CREDENTIALS) as RoleType[]).find(
            role => MOCK_CREDENTIALS[role].email === data.email
        );

        if (matchedRole) {
            const cred = MOCK_CREDENTIALS[matchedRole];
            setSuccessRole(matchedRole);
            setShowSuccess(true);
            toast.success('Giriş Tamamlandı!');
            setTimeout(() => {
                router.push(cred.redirect);
            }, 1500);
        } else {
            toast.success(t('toast.login_success'));
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <MeshGradient />

            {/* Back to Home Link */}
            <Link
                href="/"
                className="absolute top-8 left-8 text-xs font-black text-brand-muted uppercase tracking-widest hover:text-brand-accent transition-colors flex items-center gap-2"
            >
                <div className="w-6 h-6 rounded-full border border-brand-border flex items-center justify-center group">
                    <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                </div>
                Ana Sayfa
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="bg-brand-surface border border-brand-border rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                    {/* Decorative Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/5 blur-[60px] rounded-full" />

                    <div className="mb-10 text-center space-y-3 relative z-10">
                        <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <LogIn className="w-8 h-8 text-brand-accent" />
                        </div>
                        <h1 className="text-3xl font-black text-brand-text tracking-tighter">
                            {t('login_title')}
                        </h1>
                        <p className="text-sm text-brand-muted font-medium">
                            {t('login_desc')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                        <Input
                            label={t('email_label')}
                            type="email"
                            placeholder={t('email_placeholder')}
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <div className="space-y-1">
                            <Input
                                label={t('password_label')}
                                type="password"
                                placeholder={t('password_placeholder')}
                                error={errors.password?.message}
                                {...register('password')}
                            />
                            <div className="flex justify-end">
                                <Link href="/forgot-password" title={t('forgot_password')} className="text-[10px] font-black text-brand-muted uppercase tracking-widest hover:text-brand-accent transition-colors">
                                    {t('forgot_password')}
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl bg-brand-accent text-brand-bg font-black uppercase tracking-widest text-sm shadow-lg shadow-brand-accent/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {t('login_submit')}
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center relative z-10">
                        <p className="text-sm text-brand-muted font-medium">
                            {t('no_account')}{' '}
                            <Link href="/register" className="text-brand-accent font-black hover:underline underline-offset-4">
                                {t('register_link')}
                            </Link>
                        </p>
                    </div>

                    {/* Customer Booking Section */}
                    <div className="mt-6 pt-6 border-t border-brand-border relative z-10">
                        <div className="flex items-center gap-2 justify-center mb-4">
                            <Calendar size={14} className="text-brand-accent" />
                            <span className="text-xs font-black text-brand-muted uppercase tracking-widest">Müşteri Olarak Dene</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {CUSTOMER_BOOKINGS.map((booking) => {
                                const Icon = booking.icon;
                                return (
                                    <Link
                                        key={booking.url}
                                        href={booking.url}
                                        className="bg-brand-surface2 hover:bg-brand-accent/10 border border-brand-border rounded-xl p-3 transition-all group text-center"
                                    >
                                        <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br ${booking.color} flex items-center justify-center`}>
                                            <Icon size={18} className="text-white" />
                                        </div>
                                        <p className="text-xs font-black text-brand-text">{booking.label}</p>
                                        <p className="text-[10px] text-brand-muted">{booking.sublabel}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Login Section */}
                    <div className="pt-4 border-t border-brand-border relative z-10">
                        <div className="flex items-center gap-2 justify-center mb-4">
                            <Users size={14} className="text-brand-accent" />
                            <span className="text-xs font-black text-brand-muted uppercase tracking-widest">Demo Giriş</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1">
                            {(Object.keys(MOCK_CREDENTIALS) as RoleType[]).map((role) => {
                                const cred = MOCK_CREDENTIALS[role];
                                const Icon = cred.icon;
                                return (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => quickLogin(role)}
                                        disabled={isLoading}
                                        className="w-full bg-brand-surface2 hover:bg-brand-accent/10 border border-brand-border rounded-xl p-2.5 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cred.color} flex items-center justify-center shrink-0`}>
                                                <Icon size={14} className="text-white" />
                                            </div>
                                            <div className="text-left flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs font-black text-brand-text truncate">{cred.label}</p>
                                                    {'sublabel' in cred && (
                                                        <span className="text-[10px] font-bold text-brand-muted bg-brand-bg/50 px-1.5 py-0.5 rounded shrink-0">
                                                            {cred.sublabel}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[11px] font-medium text-brand-muted truncate">{cred.email}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-brand-muted group-hover:text-brand-accent transition-colors shrink-0">
                                                <Copy size={12} />
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Success Overlay */}
                {showSuccess && successRole && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-brand-surface/95 backdrop-blur-sm rounded-[32px] flex flex-col items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                            className={`w-20 h-20 bg-gradient-to-br ${MOCK_CREDENTIALS[successRole].color} rounded-full flex items-center justify-center mb-4`}
                        >
                            {React.createElement(MOCK_CREDENTIALS[successRole].icon, { size: 40, className: "text-white" })}
                        </motion.div>
                        <h3 className="text-2xl font-black text-brand-text mb-2">Giriş Tamamlandı!</h3>
                        <p className="text-sm text-brand-muted">{MOCK_CREDENTIALS[successRole].successMsg}</p>
                    </motion.div>
                )}
            </motion.div>
        </main>
    );
}
