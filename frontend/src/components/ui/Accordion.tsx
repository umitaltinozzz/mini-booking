'use client';

import React, { useState, useRef } from 'react';
import { AccordionItem } from './AccordionItem';
import { FAQItem } from '@/data/faq';
import { useTranslations } from 'next-intl';

interface AccordionProps {
    items: FAQItem[];
}

export function Accordion({ items }: AccordionProps) {
    const t = useTranslations('FAQ');
    const [openId, setOpenId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleToggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!containerRef.current) return;

        const buttons = Array.from(containerRef.current.querySelectorAll('button'));
        const activeIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (activeIndex + 1) % buttons.length;
            buttons[nextIndex].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (activeIndex - 1 + buttons.length) % buttons.length;
            buttons[prevIndex].focus();
        }
    };

    return (
        <div
            ref={containerRef}
            onKeyDown={handleKeyDown}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start"
        >
            {/* Column 1 */}
            <div className="space-y-4">
                {items.slice(0, 6).map((item) => (
                    <AccordionItem
                        key={item.id}
                        id={item.id}
                        isOpen={openId === item.id}
                        onToggle={() => handleToggle(item.id)}
                        question={t(item.questionKey)}
                        answer={t(item.answerKey)}
                    />
                ))}
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
                {items.slice(6, 12).map((item) => (
                    <AccordionItem
                        key={item.id}
                        id={item.id}
                        isOpen={openId === item.id}
                        onToggle={() => handleToggle(item.id)}
                        question={t(item.questionKey)}
                        answer={t(item.answerKey)}
                    />
                ))}
            </div>
        </div>
    );
}
