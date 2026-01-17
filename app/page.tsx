import Link from 'next/link';
import styles from './page.module.css';
import SearchForm from '@/components/home/SearchForm';

export default function Home() {
    return (
        <main className={styles.main}>
            <div className="container">
                <header className={styles.header}>
                    <h1>EuroUni Interview Prep AI</h1>
                    <p>Your personal AI coach for European University Admissions</p>
                </header>

                <section className={styles.searchSection}>
                    {/* Search Component will go here */}
                    <div className={styles.placeholderBox}>
                        <h2>Find Your Program</h2>
                        <p>Start by searching for your target university program.</p>
                        <SearchForm />
                    </div>
                </section>
            </div>
        </main>
    );
}
