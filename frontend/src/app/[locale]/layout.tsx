import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from 'sonner';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AKRAN | Akıllı Kolay Randevu Artık Network'ünüzde",
    description: "İşletmeniz için modern randevu yönetim sistemi.",
    icons: {
        icon: [
            { url: '/logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/logo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        ],
        apple: [
            { url: '/logo/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        shortcut: '/logo/favicon.ico',
    },
    manifest: '/logo/site.webmanifest',
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`} suppressHydrationWarning>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Toaster position="bottom-right" theme="dark" closeButton richColors />
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
                {/* Sunum Modu Script - Sağ alt köşede buton gösterir */}
                <script src="/presentation/presentation.js" defer />
            </body>
        </html>
    );
}
