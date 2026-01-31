'use client';

import { useState } from 'react';
import { SOPAnalysis } from '@/lib/ai/llm';
import styles from './sopReview.module.css';

export default function SOPReviewPage() {
    const [program, setProgram] = useState('');
    const [sopText, setSopText] = useState('');
    const [analysis, setAnalysis] = useState<SOPAnalysis | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!sopText.trim()) return;

        setLoading(true);
        try {
            const res = await fetch('/api/generate/sop-analysis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sopText, programName: program }),
            });
            const result = await res.json();
            if (result.success) {
                setAnalysis(result.data);
            }
        } catch (error) {
            console.error('Analysis failed', error);
            alert('Failed to analyze SOP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1>SOP Analysis Engine</h1>
                <p>Ensure your Statement of Purpose meets European Academic Standards</p>
            </div>

            <div className={styles.grid}>
                <div className={styles.column}>
                    <div className={styles.card}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="program">Target Program (Optional)</label>
                            <input
                                id="program"
                                type="text"
                                className={styles.input}
                                placeholder="e.g. MSc Data Science, TU Munich"
                                value={program}
                                onChange={(e) => setProgram(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="sop">Statement of Purpose</label>
                            <textarea
                                id="sop"
                                className={styles.textarea}
                                placeholder="Paste your full SOP here..."
                                value={sopText}
                                onChange={(e) => setSopText(e.target.value)}
                            />
                        </div>

                        <button
                            className={styles.button}
                            onClick={handleAnalyze}
                            disabled={loading || !sopText.trim()}
                        >
                            {loading ? 'Analyzing Academic Fit...' : 'Analyze SOP'}
                        </button>
                    </div>
                </div>

                <div className={styles.column}>
                    {analysis ? (
                        <div className={styles.results}>
                            <div className={styles.scoreCard}>
                                <div className={styles.scoreValue}>{analysis.score}/100</div>
                                <div className={styles.scoreLabel}>READINESS SCORE</div>
                                <div style={{ marginTop: '0.5rem', opacity: 0.8 }}>Tone: {analysis.tone}</div>
                            </div>

                            <div className={styles.section}>
                                <h3>✅ Strengths</h3>
                                <ul className={styles.list}>
                                    {analysis.strengths.map((s, i) => (
                                        <li key={i} className={`${styles.listItem} ${styles.strength}`}>{s}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.section}>
                                <h3>⚠️ Weaknesses</h3>
                                <ul className={styles.list}>
                                    {analysis.weaknesses.map((w, i) => (
                                        <li key={i} className={`${styles.listItem} ${styles.weakness}`}>{w}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.section}>
                                <h3>💡 Suggested Improvements</h3>
                                <ul className={styles.list}>
                                    {analysis.improvements.map((imp, i) => (
                                        <li key={i} className={`${styles.listItem} ${styles.improvement}`}>{imp}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className={`${styles.card} ${styles.emptyState}`}>
                            {!loading && (
                                <>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                                    <p>Paste your SOP to get a comprehensive breakdown of your academic fit, tone, and improvement areas.</p>
                                </>
                            )}
                            {loading && <p>Reading and analyzing your document...</p>}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
