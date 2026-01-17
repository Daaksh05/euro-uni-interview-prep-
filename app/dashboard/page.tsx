import { Suspense } from 'react';
import styles from './dashboard.module.css';

// We need a wrapper component to handle the search params safely
import DashboardContent from '@/components/dashboard/DashboardContent';

export default function DashboardPage() {
    return (
        <main className={styles.main}>
            <div className="container">
                <header className={styles.header}>
                    <h1>Interview Dashboard</h1>
                </header>
                <Suspense fallback={<div>Loading program data...</div>}>
                    <DashboardContent />
                </Suspense>
            </div>
        </main>
    );
}
