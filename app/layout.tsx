import { Outfit } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'EuroUni Interview Prep AI',
    description: 'AI-powered interview preparation for European Universities',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={outfit.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
