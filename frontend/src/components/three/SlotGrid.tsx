'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import { Slot } from '@/data/demoData';
import { STATUS_COLORS } from '@/constants/status';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SlotGridProps {
    slots: Slot[];
    selectedId: string | null;
    hoveredId: string | null;
    onHover: (id: string | null) => void;
    onSelect: (id: string | null) => void;
}

export function SlotGrid({ slots, selectedId, hoveredId, onHover, onSelect }: SlotGridProps) {
    const isReducedMotion = useReducedMotion();
    const meshRef = useRef<THREE.InstancedMesh>(null);

    // Group slots by time for the grid layout
    const uniqueTimes = useMemo(() => Array.from(new Set(slots.map(s => s.time))).sort(), [slots]);
    const uniqueStaff = useMemo(() => Array.from(new Set(slots.map(s => s.staffId))), [slots]);

    const gridData = useMemo(() => {
        return slots.map((slot) => {
            const x = uniqueStaff.indexOf(slot.staffId) - (uniqueStaff.length - 1) / 2;
            const z = uniqueTimes.indexOf(slot.time) - (uniqueTimes.length - 1) / 2;

            let height = 0.2;
            if (slot.status === 'BOOKED') height = 0.6;
            if (slot.status === 'CANCELLED') height = 0.1;

            return {
                ...slot,
                position: [x * 1.2, height / 2, z * 0.8] as [number, number, number],
                scale: [1, height, 0.6] as [number, number, number],
            };
        });
    }, [slots, uniqueStaff, uniqueTimes]);

    return (
        <group>
            <Instances range={slots.length}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial roughness={0.6} metalness={0.1} />

                {gridData.map((data) => {
                    const isSelected = selectedId === data.id;
                    const isHovered = hoveredId === data.id;

                    let color = STATUS_COLORS[data.status];
                    // If selected and it's NOT booked, we can show it green, 
                    // but user said: "selected: yeşil halo, fill duruma göre kalır (booked ise mavi kalacak)"
                    // Actually, if it's available and selected, surely it becomes green?
                    // "SELECTED: yeşil halo/border, fill duruma göre kalır (booked ise mavi kalacak)"
                    // Okay, if it's BOOKED, it stays blue. 

                    return (
                        <group
                            key={data.id}
                            position={data.position}
                            onPointerOver={(e) => {
                                e.stopPropagation();
                                onHover(data.id);
                                document.body.style.cursor = 'pointer';
                            }}
                            onPointerOut={() => {
                                onHover(null);
                                document.body.style.cursor = 'default';
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect(data.id);
                            }}
                        >
                            <Instance
                                scale={data.scale}
                                color={color}
                            />

                            {/* Selected Halo / Outline */}
                            {isSelected && (
                                <mesh scale={[1.1, data.scale[1] + 0.05, 0.7]} position={[0, 0, 0]}>
                                    <boxGeometry args={[1, 1, 1]} />
                                    <meshBasicMaterial color={STATUS_COLORS.SELECTED} transparent opacity={0.3} wireframe />
                                </mesh>
                            )}

                            {/* Hover Effect */}
                            {isHovered && !isSelected && (
                                <mesh scale={[1.05, data.scale[1] + 0.02, 0.65]} position={[0, 0, 0]}>
                                    <boxGeometry args={[1, 1, 1]} />
                                    <meshBasicMaterial color={STATUS_COLORS.SELECTED} transparent opacity={0.1} />
                                </mesh>
                            )}
                        </group>
                    );
                })}
            </Instances>
        </group>
    );
}
