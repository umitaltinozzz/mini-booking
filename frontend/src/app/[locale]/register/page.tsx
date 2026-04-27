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
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { UserPlus, ArrowRight, Loader2 } from 'lucide-react';

export default function RegisterPage() {
    const t = useTranslations('Auth');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const registerSchema = z.object({
        name: z.string().min(2, t('validation.required')),
        email: z.string().email(t('validation.invalid_email')),
        password: z.string().min(8, t('validation.min_password')),
        confirmPassword: z.string(),
        kvkk: z.boolean().refine(val => val === true, {
            message: t('validation.kvkk_required')
        })
    }).refine((data) => data.password === data.confirmPassword, {
        message: t('validation.match_password'),
        path: ["confirmPassword"],
    });

    type RegisterFormValues = z.infer<typeof registerSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true);
        // Simulate API call
        console.log('Register data:', data);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsLoading(false);
        toast.success(t('toast.register_success'));

        // Redirect to onboarding
        router.push('/onboarding');
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
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-accent2/5 blur-[60px] rounded-full" />

                    <div className="mb-8 text-center space-y-3 relative z-10">
                        <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <UserPlus className="w-8 h-8 text-brand-accent" />
                        </div>
                        <h1 className="text-3xl font-black text-brand-text tracking-tighter">
                            {t('register_title')}
                        </h1>
                        <p className="text-sm text-brand-muted font-medium">
                            {t('register_desc')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
                        <Input
                            label={t('name_label')}
                            type="text"
                            placeholder={t('name_placeholder')}
                            error={errors.name?.message}
                            {...register('name')}
                        />

                        <Input
                            label={t('email_label')}
                            type="email"
                            placeholder={t('email_placeholder')}
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <Input
                            label={t('password_label')}
                            type="password"
                            placeholder={t('password_placeholder')}
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        <Input
                            label={t('confirm_password_label')}
                            type="password"
                            placeholder={t('password_placeholder')}
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword')}
                        />

                        <Checkbox
                            label={t('kvkk_confirm')}
                            error={errors.kvkk?.message}
                            {...register('kvkk')}
                        />

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl bg-brand-accent text-brand-bg font-black uppercase tracking-widest text-sm shadow-lg shadow-brand-accent/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {t('register_submit')}
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center relative z-10 border-t border-brand-border/50 pt-6">
                        <p className="text-sm text-brand-muted font-medium">
                            {t('have_account')}{' '}
                            <Link href="/login" className="text-brand-accent font-black hover:underline underline-offset-4">
                                {t('login_link')}
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
