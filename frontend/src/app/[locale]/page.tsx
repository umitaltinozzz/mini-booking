'use client';

import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Features } from '@/components/sections/Features';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhatsPossible } from '@/components/sections/WhatsPossible';
import { Integrations } from '@/components/sections/Integrations';
import { SecurityTrust } from '@/components/sections/SecurityTrust';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
    return (
        <main className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-accent/30 transition-colors duration-300">
            <Navbar />

            <Hero />
            <HowItWorks />
            <Features />
            <Testimonials />
            <WhatsPossible />
            <Integrations />
            <SecurityTrust />
            <Pricing />
            <FAQ />
            <FinalCTA />
            <Footer />
        </main>
    );
}
