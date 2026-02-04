import styles from './page.module.css';
import SearchForm from '@/components/home/SearchForm';
import SupportedDirectory from '@/components/home/SupportedDirectory';
import { prisma } from '@/lib/db';

async function getStats() {
    try {
        const [interviews, universities, programs] = await Promise.all([
            prisma.interviewResult.count(),
            prisma.university.count(),
            prisma.program.count()
        ]);
        return {
            interviews: interviews || 0,
            universities: universities || 0,
            programs: programs || 0,
            admitted: 85 // Static high value for now
        };
    } catch (e) {
        return { interviews: 0, universities: 0, programs: 0, admitted: 0 };
    }
}

export default async function Home() {
    const stats = await getStats();

    return (
        <main className={styles.main}>
            {/* Decorative Background Elements */}
            <div className={`${styles.decorativeCircle} ${styles.circle1}`}></div>
            <div className={`${styles.decorativeCircle} ${styles.circle2}`}></div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1>Master Your European <br /> Academic Future.</h1>
                        <p>
                            Beyond generic prep. We specialize in the rigor of European
                            admissions—from Technical PhDs to Master's at top continental labs.
                        </p>
                    </div>

                    <div className={styles.statsRow}>
                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>{stats.interviews}+</span>
                            <span className={styles.statLabel}>Interviews Simulated</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>{stats.universities}</span>
                            <span className={styles.statLabel}>Elite Universities</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>{stats.programs}</span>
                            <span className={styles.statLabel}>Target Programs</span>
                        </div>
                    </div>
                </section>

                <section className={styles.searchWrapper}>
                    <div className={styles.searchBox}>
                        <h2>Initialize Prep</h2>
                        <p>Search for your target university and program to start your AI-powered journey.</p>
                        <SearchForm />
                    </div>
                </section>

                <SupportedDirectory />
            </div>
        </main >
    );
}
