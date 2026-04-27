'use client';

import React from 'react';

export function MeshGradient() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-brand-bg">
            <div
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-accent/10 blur-[120px] animate-pulse"
                style={{ animationDuration: '8s' }}
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-accent2/5 blur-[150px] animate-pulse"
                style={{ animationDuration: '12s', animationDelay: '2s' }}
            />
            <div
                className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-brand-accent/5 blur-[100px] animate-pulse"
                style={{ animationDuration: '10s', animationDelay: '1s' }}
            />

            {/* Subtle Grid Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, var(--brand-accent) 1px, transparent 0)',
                    backgroundSize: '48px 48px'
                }}
            />
        </div>
    );
}
