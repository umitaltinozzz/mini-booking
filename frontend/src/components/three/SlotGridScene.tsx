'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { DESIGN_TOKENS, SLOT_THEME, SLOT_STATUS, SlotStatus } from '@/constants/theme';

interface SlotData {
    id: string;
    status: SlotStatus;
    position: [number, number, number];
}

interface SlotGridSceneProps {
    slots: SlotData[];
    selectedId?: string | null;
    onSelect?: (id: string) => void;
}

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export function SlotGridScene({ slots, selectedId, onSelect }: SlotGridSceneProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    useEffect(() => {
        if (!meshRef.current) return;

        slots.forEach((slot, i) => {
            const { position, status, id } = slot;
            const isSelected = id === selectedId;

            tempObject.position.set(...position);
            tempObject.scale.set(0.9, 0.9, 0.2);
            tempObject.updateMatrix();
            meshRef.current?.setMatrixAt(i, tempObject.matrix);

            // Color mapping
            let colorHex = SLOT_THEME[status].color;
            if (isSelected) colorHex = SLOT_THEME[SLOT_STATUS.SELECTED].color;

            tempColor.set(colorHex);
            meshRef.current?.setColorAt(i, tempColor);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    }, [slots, selectedId]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            <instancedMesh
                ref={meshRef}
                args={[null as any, null as any, slots.length]}
                onClick={(e: ThreeEvent<MouseEvent>) => {
                    e.stopPropagation();
                    if (e.instanceId !== undefined) {
                        onSelect?.(slots[e.instanceId].id);
                    }
                }}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial />
            </instancedMesh>
        </>
    );
}
