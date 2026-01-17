import type { Metadata } from 'next';
import './globals.css';

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
            <body>{children}</body>
        </html>
    );
}
