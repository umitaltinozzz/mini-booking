'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AccordionItemProps {
    id: string;
    isOpen: boolean;
    onToggle: () => void;
    question: string;
    answer: string;
}

export function AccordionItem({ id, isOpen, onToggle, question, answer }: AccordionItemProps) {
    const isReducedMotion = useReducedMotion();

    const contentId = `${id}-content`;
    const buttonId = `${id}-button`;

    return (
        <div
            className={`group border rounded-2xl transition-all duration-300 ${isOpen
                    ? 'bg-brand-surface border-brand-accent/30'
                    : 'bg-brand-surface2/50 border-brand-border hover:border-brand-accent/20'
                }`}
        >
            <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-2xl"
            >
                <span className={`text-sm md:text-base font-black transition-colors ${isOpen ? 'text-brand-text' : 'text-brand-muted group-hover:text-brand-text'}`}>
                    {question}
                </span>
                <div className="relative flex items-center justify-center w-6 h-6 shrink-0 ml-4">
                    {/* CSS Cross/Minus Icon */}
                    <div className={`absolute w-4 h-0.5 bg-current transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-0'}`} />
                    <div className={`absolute w-0.5 h-4 bg-current transition-transform duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={isReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={isReducedMotion ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1 }}
                        exit={isReducedMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-0">
                            <div className="h-[1px] w-full bg-brand-accent/10 mb-6" />
                            <p className="text-sm md:text-base text-brand-muted font-medium leading-relaxed">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
