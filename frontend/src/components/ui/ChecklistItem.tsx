'use client';

import React from 'react';

interface ChecklistItemProps {
    label: string;
}

export function ChecklistItem({ label }: ChecklistItemProps) {
    return (
        <div className="flex items-center gap-4 group/item py-1">
            <div className="relative flex h-5 w-5 items-center justify-center shrink-0">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-accent group-hover/item:scale-125 transition-transform" />
                <div className="absolute inset-0 border border-brand-accent/20 rounded-full scale-100 group-hover/item:scale-110 transition-transform opacity-50" />
            </div>
            <span className="text-sm font-medium text-brand-muted group-hover/item:text-brand-text transition-colors">
                {label}
            </span>
        </div>
    );
}
