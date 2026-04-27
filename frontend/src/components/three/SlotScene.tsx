'use client';

import React from 'react';
import { ContactShadows, Float, Stage } from '@react-three/drei';
import { SlotGrid } from './SlotGrid';
import { Slot } from '@/data/demoData';

interface SlotSceneProps {
    slots: Slot[];
    selectedId: string | null;
    hoveredId: string | null;
    onHover: (id: string | null) => void;
    onSelect: (id: string | null) => void;
}

export function SlotScene({ slots, selectedId, hoveredId, onHover, onSelect }: SlotSceneProps) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#A3E635" />
            <spotLight
                position={[0, 10, 0]}
                intensity={1.5}
                angle={0.3}
                penumbra={1}
                color="#F1F5FF"
                castShadow
            />

            <Stage preset="rembrandt" intensity={0.5} environment="city" adjustCamera={false}>
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <SlotGrid
                        slots={slots}
                        selectedId={selectedId}
                        hoveredId={hoveredId}
                        onHover={onHover}
                        onSelect={onSelect}
                    />
                </Float>
            </Stage>

            <ContactShadows
                position={[0, -2, 0]}
                opacity={0.4}
                scale={20}
                blur={2.5}
                far={5}
            />
        </>
    );
}
