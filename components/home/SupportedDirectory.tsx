'use client';

import { useState, useEffect } from 'react';
import styles from './supportedDirectory.module.css';

interface Program {
    name: string;
    level: string;
    field_of_study: string;
}

interface University {
    id: string;
    name: string;
    country: string;
    programs: Program[];
}

export default function SupportedDirectory() {
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/universities');
                const result = await res.json();
                if (result.success) {
                    setUniversities(result.data);
                }
            } catch (error) {
                console.error('Error fetching directory:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const countries = ['All', ...Array.from(new Set(universities.map(u => u.country)))].sort();

    const filteredUniversities = selectedCountry === 'All'
        ? universities
        : universities.filter(u => u.country === selectedCountry);

    if (loading) return null;

    return (
        <section className={styles.directory} id="supported-institutions">
            <h2>Supported Institutions</h2>
            <p>Explore the elite universities and specialized programs verified for high-fidelity simulation.</p>

            <div className={styles.controls}>
                {countries.map(country => (
                    <button
                        key={country}
                        className={`${styles.filterBtn} ${selectedCountry === country ? styles.activeFilter : ''}`}
                        onClick={() => setSelectedCountry(country)}
                    >
                        {country}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredUniversities.map(uni => (
                    <div key={uni.id} className={styles.card}>
                        <span className={styles.country}>{uni.country}</span>
                        <h3>{uni.name}</h3>
                        <div className={styles.programList}>
                            {uni.programs.length > 0 ? (
                                uni.programs.map((prog, idx) => (
                                    <div key={idx} className={styles.programItem}>
                                        <span className={styles.levelBadge}>{prog.level}</span>
                                        {prog.name}
                                    </div>
                                ))
                            ) : (
                                <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>General Institutional Support Available</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
