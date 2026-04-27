'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Instance, Instances, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { HERO_SLOTS, HeroSlot } from '@/data/heroSlots';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';

const STATUS_COLORS = {
    AVAILABLE: '#111A28', // surface2
    BOOKED: '#3B82F6',    // status-booked
    SELECTED: '#A3E635',  // accent
};

interface HeroSceneProps {
    onHover: (slot: HeroSlot | null) => void;
    onSelect: (slot: HeroSlot | null) => void;
    selectedId: string | null;
}

export function HeroScene({ onHover, onSelect, selectedId }: HeroSceneProps) {
    const isReducedMotion = useReducedMotionPref();
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const groupRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    // Smooth rotation & Mouse Parallax
    useFrame((state) => {
        if (!groupRef.current) return;

        if (!isReducedMotion) {
            const { x, y } = state.mouse;
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.4, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.4, 0.05);
        }

        if (ringRef.current && !isReducedMotion) {
            ringRef.current.rotation.z += 0.002;
        }
    });

    const cards = useMemo(() => {
        return HERO_SLOTS.map((slot, i) => {
            const angle = (i / HERO_SLOTS.length) * Math.PI * 2;
            const radius = 2.8;
            // Spiral vertical offset
            const yOffset = (i - HERO_SLOTS.length / 2) * 0.15;
            return {
                ...slot,
                position: [Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius] as [number, number, number],
                rotation: [0, -angle + Math.PI / 2, 0] as [number, number, number],
            };
        });
    }, []);

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.4} />
            {/* Dynamic Lights */}
            <pointLight position={[10, 10, 10]} intensity={2} color="#A3E635" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#3B82F6" />
            <spotLight position={[0, 10, 0]} intensity={1.5} angle={0.3} penumbra={1} color="#F1F5FF" />

            <Float speed={isReducedMotion ? 0 : 2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Core "Brain" Orb */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.8, 64, 64]} />
                    <MeshDistortMaterial
                        color="#111A28"
                        speed={isReducedMotion ? 0 : 3}
                        distort={0.4}
                        radius={1}
                        roughness={0.2}
                        metalness={0.8}
                        emissive="#A3E635"
                        emissiveIntensity={0.1}
                    />
                </mesh>

                {/* Abstract Data Rings */}
                <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2.8, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#21304A" transparent opacity={0.5} />
                </mesh>

                <Instances range={HERO_SLOTS.length}>
                    <boxGeometry args={[0.6, 0.4, 0.05]} />
                    <meshStandardMaterial />
                    {cards.map((card) => {
                        const isSelected = selectedId === card.id;
                        const isHovered = hoveredId === card.id;
                        let color = STATUS_COLORS[card.status];
                        if (isSelected && card.status === 'AVAILABLE') color = STATUS_COLORS.SELECTED;

                        return (
                            <group
                                key={card.id}
                                position={card.position}
                                rotation={card.rotation}
                                onPointerOver={(e) => {
                                    e.stopPropagation();
                                    setHoveredId(card.id);
                                    onHover(card);
                                    document.body.style.cursor = 'pointer';
                                }}
                                onPointerOut={() => {
                                    setHoveredId(null);
                                    onHover(null);
                                    document.body.style.cursor = 'default';
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelect(card);
                                }}
                            >
                                <Instance
                                    color={color}
                                    scale={isHovered || isSelected ? 1.1 : 1}
                                />

                                {/* Visual indicator for Booked status on the card itself */}
                                {card.status === 'BOOKED' && (
                                    <mesh position={[0, 0, 0.03]}>
                                        <planeGeometry args={[0.5, 0.3]} />
                                        <meshBasicMaterial color="#3B82F6" transparent opacity={0.2} />
                                    </mesh>
                                )}

                                {/* Selection Highlight */}
                                {isSelected && (
                                    <mesh scale={1.2}>
                                        <boxGeometry args={[0.6, 0.4, 0.06]} />
                                        <meshBasicMaterial color="#A3E635" transparent opacity={0.1} wireframe />
                                    </mesh>
                                )}
                            </group>
                        );
                    })}
                </Instances>
            </Float>

            <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={15} blur={2} far={4.5} />
        </group>
    );
}
