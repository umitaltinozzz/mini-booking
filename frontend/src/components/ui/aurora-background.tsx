"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    showRadialGradient?: boolean;
}

export const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <div
            className={cn(
                "relative flex flex-col min-h-screen bg-brand-bg text-brand-text transition-bg overflow-hidden",
                className
            )}
            {...props}
        >
            {/* Aurora Effect Layer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={cn(
                        `absolute inset-0
            
            /* Light mode - Green */
            [--aurora-1:rgba(163,230,53,0.15)]
            [--aurora-2:rgba(132,204,22,0.1)]
            [--aurora-3:rgba(74,222,128,0.08)]
            
            /* Dark mode - Purple/Violet */
            dark:[--aurora-1:rgba(139,92,246,0.15)]
            dark:[--aurora-2:rgba(167,139,250,0.1)]
            dark:[--aurora-3:rgba(196,181,253,0.08)]
            
            [background-image:repeating-linear-gradient(100deg,var(--aurora-1)_0%,var(--aurora-2)_15%,transparent_30%,transparent_45%,var(--aurora-3)_60%,var(--aurora-1)_75%,transparent_90%)]
            [background-size:300%_300%]
            animate-aurora
            
            after:content-[''] after:absolute after:inset-0
            after:[background-image:repeating-linear-gradient(100deg,var(--aurora-2)_0%,var(--aurora-1)_10%,transparent_25%,transparent_40%,var(--aurora-3)_55%)]
            after:[background-size:250%_250%]
            after:animate-aurora
            after:mix-blend-soft-light
            after:opacity-50
            
            blur-[80px]
            opacity-20
            `,
                        showRadialGradient &&
                        `[mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,black_20%,transparent_70%)]`
                    )}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1">
                {children}
            </div>
        </div>
    );
};
