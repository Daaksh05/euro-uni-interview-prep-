'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import styles from './analytics.module.css';

interface HistoricalResult {
    id: string;
    timestamp: number;
    programName: string;
    overallScore: number;
    toneScore: number;
}

export default function AnalyticsPage() {
    const [history, setHistory] = useState<HistoricalResult[]>([]);
    const [averageScore, setAverageScore] = useState(0);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch('/api/analytics/history');
                const data = await res.json();
                if (data.history) {
                    setHistory(data.history);
                    if (data.history.length > 0) {
                        const sum = data.history.reduce((acc: any, curr: any) => acc + curr.overallScore, 0);
                        setAverageScore(Math.round(sum / data.history.length));
                    }
                }
            } catch (e) { console.error(e); }
        };
        fetchHistory();
    }, []);

    // Format date for chart
    const chartData = history.map(h => ({
        date: new Date(h.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        score: h.overallScore,
        tone: h.toneScore,
        name: h.programName
    }));

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1>Progressive Analytics</h1>
                <p>Track your interview readiness and improvement over time.</p>
            </div>

            {history.length === 0 ? (
                <div className={styles.emptyState}>
                    <h2>No Data Yet</h2>
                    <p>Complete your first mock interview to see your analytics here.</p>
                </div>
            ) : (
                <>
                    <div className={styles.statsRow}>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{history.length}</div>
                            <div className={styles.statLabel}>Interviews Completed</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{averageScore}</div>
                            <div className={styles.statLabel}>Average Readiness</div>
                        </div>
                    </div>

                    <div className={styles.chartGrid}>
                        <div className={styles.chartCard}>
                            <h2>Readiness Trend</h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="date" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
                                    />
                                    <Line type="monotone" dataKey="score" stroke="#34d399" strokeWidth={3} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className={styles.chartCard}>
                            <h2>Tone vs. Content Balance</h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="date" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="score" fill="#34d399" name="Content Score" />
                                    <Bar dataKey="tone" fill="#818cf8" name="Tone Score" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}
