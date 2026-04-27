'use client';

import { Suspense, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { useInViewLoad } from '@/hooks/useInViewLoad';

interface SceneContainerProps {
    children: ReactNode;
    className?: string;
    fallback?: ReactNode;
    dpr?: [number, number];
}

export function SceneContainer({ children, className, fallback, dpr = [1, 1.5] }: SceneContainerProps) {
    const { ref, isInView } = useInViewLoad();

    return (
        <div ref={ref} className={className}>
            {isInView ? (
                <Canvas
                    dpr={dpr}
                    gl={{ antialias: false, powerPreference: "high-performance" }}
                    camera={{ position: [0, 0, 5], fov: 45 }}
                >
                    <Suspense fallback={null}>
                        {children}
                    </Suspense>
                </Canvas>
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-brand-surface2/20">
                    {fallback || <div className="text-brand-muted text-sm">Yükleniyor...</div>}
                </div>
            )}
        </div>
    );
}
