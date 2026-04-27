'use client';

import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: React.ReactNode;
    error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                        <input
                            type="checkbox"
                            ref={ref}
                            className="peer sr-only"
                            {...props}
                        />
                        <div className={cn(
                            "w-5 h-5 rounded-md border border-brand-border bg-brand-surface2/50 transition-all",
                            "peer-checked:bg-brand-accent peer-checked:border-brand-accent group-hover:border-brand-accent/50",
                            error && "border-red-500/50"
                        )} />
                        <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-bg opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={4} />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-brand-muted group-hover:text-brand-text transition-colors leading-tight">
                        {label}
                    </span>
                </label>
                {error && (
                    <p className="text-[10px] font-bold text-red-500 ml-8 mt-1 uppercase tracking-wider">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
