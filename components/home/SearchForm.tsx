'use client';

import { useState } from 'react';
import styles from './searchForm.module.css';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
    const [university, setUniversity] = useState('');
    const [program, setProgram] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Redirect to dashboard with query params
        const params = new URLSearchParams({
            university: university,
            program: program
        });

        router.push(`/dashboard?${params.toString()}`);
        setLoading(false);
    };

    return (
        <form className={styles.form} onSubmit={handleSearch}>
            <div className={styles.inputGroup}>
                <label htmlFor="university">University</label>
                <input
                    id="university"
                    type="text"
                    placeholder="e.g. TUM, ETH Zurich"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="program">Program</label>
                <input
                    id="program"
                    type="text"
                    placeholder="e.g. MSc Informatics"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Searching...' : 'Find Interview Info'}
            </button>
        </form>
    );
}
