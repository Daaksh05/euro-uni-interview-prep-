'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProgramData } from '@/types/program';
import styles from './dashboardContent.module.css';
import SimulationRoom from '@/components/interview/SimulationRoom';

export default function DashboardContent() {
    const searchParams = useSearchParams();
    const university = searchParams.get('university');
    const program = searchParams.get('program');

    const [data, setData] = useState<ProgramData | null>(null);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [generating, setGenerating] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);
    const [plan, setPlan] = useState<any>(null);
    const [generatingPlan, setGeneratingPlan] = useState(false);

    useEffect(() => {
        if (!university || !program) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ university, program })
                });
                const result = await res.json();
                if (result.success) {
                    setData(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [university, program]);

    const handleGenerateMock = async () => {
        if (!data) return;
        setGenerating(true);
        try {
            const res = await fetch('/api/generate/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ programData: data })
            });
            const result = await res.json();
            if (result.success) {
                setQuestions(result.data);
            }
        } catch (error) {
            alert('Failed to generate mock interview');
        } finally {
            setGenerating(false);
        }
    };

    // Plan Generation Handler
    const handleGeneratePlan = async () => {
        if (!data) return;
        setGeneratingPlan(true);
        try {
            const res = await fetch('/api/generate/plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ programData: data })
            });
            const result = await res.json();
            if (result.success) setPlan(result.data);
        } catch (e) { alert('Failed to generate plan'); }
        finally { setGeneratingPlan(false); }
    };

    if (loading) return <div className={styles.loader}>Analyzing Program Details...</div>;

    if (isSimulating && data) {
        return <SimulationRoom questions={questions} programData={data} onExit={() => {
            setIsSimulating(false);
            // Optionally auto-trigger plan generation here
        }} />;
    }

    if (!university || !program) {
        return (
            <div className={styles.emptyState}>
                <h2>No Program Selected</h2>
                <p>Please search for a university program on the home page to start your prep.</p>
                <a href="/" className={styles.actionButton} style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}>
                    Go to Home
                </a>
            </div>
        );
    }

    if (!data) return <div>No data found. Please try again.</div>;

    return (
        <div className={styles.dashboardGrid}>
            <div className={styles.column}>
                <section className={styles.card}>
                    <h2>Program Snapshot</h2>
                    <div className={styles.meta}>
                        <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{data.programName}</h3>
                        <p className={styles.subtitle}>{data.university} • {data.country}</p>
                    </div>
                    <div className={styles.badgeRow}>
                        <span className={styles.badge}>Confidence: {data.confidenceScore}</span>
                        {data.interviewRequirement ?
                            <span className={`${styles.badge} ${styles.warning}`}>Interview Required</span> :
                            <span className={`${styles.badge} ${styles.success}`}>No Interview</span>
                        }
                    </div>
                    <div className={styles.details}>
                        <p><strong>Format:</strong> {data.interviewFormat || 'Not specified'}</p>
                        <p><strong>Tuition:</strong> {data.tuitionFees}</p>
                    </div>
                </section>

                <section className={styles.card}>
                    <h2>Interview Prep</h2>
                    {questions.length === 0 ? (
                        <>
                            <p>Status: <strong>Ready to Generate</strong></p>
                            <button
                                className={styles.actionButton}
                                onClick={handleGenerateMock}
                                disabled={generating}
                            >
                                {generating ? 'Generating AI Simulation...' : 'Start Mock Interview'}
                            </button>
                        </>
                    ) : (
                        <div className={styles.questionList}>
                            <h3>Mock Interview Ready</h3>
                            <p>We have prepared {questions.length} tailored questions.</p>
                            <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem' }}>
                                {questions.slice(0, 3).map((q: any) => (
                                    <li key={q.id}>{q.text}</li>
                                ))}
                            </ul>
                            <button
                                className={styles.actionButton}
                                style={{ marginTop: '1rem' }}
                                onClick={() => setIsSimulating(true)}
                            >
                                Enter Simulation Room
                            </button>
                        </div>
                    )}
                </section>

                <section className={styles.card}>
                    <h2>Preparation Plan</h2>
                    {!plan ? (
                        <button
                            className={styles.actionButton}
                            onClick={handleGeneratePlan}
                            disabled={generatingPlan}
                        >
                            {generatingPlan ? 'Drafting Schedule...' : 'Generate 2-Week Plan'}
                        </button>
                    ) : (
                        <div className={styles.planList}>
                            <p><strong>Focus:</strong> {plan.programName} ({plan.durationWeeks} weeks)</p>
                            <div className={styles.timeline}>
                                {plan.schedule.map((t: any) => (
                                    <div key={t.day} className={styles.timelineItem}>
                                        <div className={styles.dayBadge}>Day {t.day}</div>
                                        <div className={styles.taskContent}>
                                            <h4>{t.topic}</h4>
                                            <p>{t.action}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>


            </div>
        </div>
    );
}
