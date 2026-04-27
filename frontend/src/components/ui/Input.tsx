'use client';

import React, { forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="space-y-2 w-full">
                {label && (
                    <label className="text-xs font-black text-brand-muted uppercase tracking-[0.2em] ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    <input
                        ref={ref}
                        className={cn(
                            "w-full h-12 px-4 rounded-xl bg-brand-surface2/50 border border-brand-border text-brand-text font-bold placeholder:text-brand-muted/40 transition-all outline-none",
                            "focus:border-brand-accent/50 focus:bg-brand-surface group-hover:border-brand-border/80",
                            error ? "border-red-500/50 focus:border-red-500" : "focus:ring-2 focus:ring-brand-accent/10",
                            className
                        )}
                        {...props}
                    />
                    {/* Active Accent Border Line */}
                    <div className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-brand-accent transition-all duration-300 w-0 group-focus-within:w-1/2 opacity-0 group-focus-within:opacity-100 rounded-full",
                        error && "bg-red-500"
                    )} />
                </div>
                {error && (
                    <p className="text-[10px] font-bold text-red-500 ml-1 mt-1 uppercase tracking-wider">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
