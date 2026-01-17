'use client';

import { useState } from 'react';
import styles from './simulation.module.css';
import { generateComprehensiveEvaluation } from '@/lib/ai/llm';
import { ProgramData } from '@/types/program';
import { ComprehensiveEvaluation, SimpleQuestion } from '@/types/ai-response';

interface SimulationRoomProps {
    questions: SimpleQuestion[];
    programData: ProgramData;
    onExit: () => void;
}

export default function SimulationRoom({ questions, programData, onExit }: SimulationRoomProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [history, setHistory] = useState<any[]>([]);

    // UI States
    const [mode, setMode] = useState<'answering' | 'evaluating' | 'report'>('answering');
    const [evaluation, setEvaluation] = useState<ComprehensiveEvaluation | null>(null);

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const handleNext = () => {
        // Save current answer
        const newHistory = [...history, { question: currentQuestion, answer }];
        setHistory(newHistory);
        setAnswer('');

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Finished all questions, generate report
            generateReport(newHistory);
        }
    };

    const generateReport = async (finalHistory: any[]) => {
        setMode('evaluating');
        try {
            const report = await generateComprehensiveEvaluation(programData, finalHistory);
            setEvaluation(report);
            setMode('report');
        } catch (e) {
            alert("Failed to generate evaluation");
            onExit();
        }
    };

    if (mode === 'evaluating') {
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.spinner}></div>
                <h3>Admissions Committee is reviewing your answers...</h3>
                <p>Analyzing technical depth, research fit, and academic tone.</p>
            </div>
        );
    }

    if (mode === 'report' && evaluation) {
        return (
            <div className={styles.reportContainer}>
                <header className={styles.reportHeader}>
                    <h2>Interview Performance Report</h2>
                    <span className={`${styles.verdictBadge} ${styles[evaluation.admission_committee_simulation.final_verdict]}`}>
                        Verdict: {evaluation.admission_committee_simulation.final_verdict.replace('_', ' ').toUpperCase()}
                    </span>
                </header>

                <div className={styles.scoreGrid}>
                    <div className={styles.scoreCard}>
                        <h4>Readiness Score</h4>
                        <div className={styles.bigScore}>{evaluation.interview_readiness.overall_score}/100</div>
                    </div>
                    <div className={styles.scoreCard}>
                        <h4>Tone Check</h4>
                        <div className={styles.bigScore}>{evaluation.cultural_communication_coach.tone_score}/100</div>
                    </div>
                </div>

                <section className={styles.reportSection}>
                    <h3>🎓 Faculty Alignment</h3>
                    {evaluation.faculty_alignment.top_faculty_matches.map((fac, i) => (
                        <div key={i} className={styles.facultyMatch}>
                            <strong>{fac.faculty_name} ({fac.alignment_score}% match)</strong>
                            <p>{fac.interview_mention_suggestion}</p>
                        </div>
                    ))}
                </section>

                <section className={styles.reportSection}>
                    <h3>💬 Cultural Coaching</h3>
                    <p>{evaluation.cultural_communication_coach.overall_advice}</p>
                    <ul className={styles.tipsList}>
                        {evaluation.cultural_communication_coach.recommended_rephrasing.map((item, i) => (
                            <li key={i}>
                                <span className={styles.bad}>"{item.original_phrase}"</span> ➔
                                <span className={styles.good}> "{item.improved_phrase}"</span>
                                <br /><small>{item.reason}</small>
                            </li>
                        ))}
                    </ul>
                </section>

                <button className={styles.exitButton} onClick={onExit}>Return to Dashboard</button>
            </div>
        );
    }

    return (
        <div className={styles.room}>
            <div className={styles.header}>
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span className={styles.category}>{currentQuestion.category}</span>
                <button onClick={onExit} className={styles.exitButton}>Exit</button>
            </div>

            <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.questionText}>{currentQuestion.text}</h3>
                {currentQuestion.tips && (
                    <div className={styles.tipBox}>
                        <strong>💡 Tip:</strong> {currentQuestion.tips}
                    </div>
                )}

                <div className={styles.answerSection}>
                    <textarea
                        className={styles.textArea}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                    />
                    <button
                        className={styles.submitButton}
                        onClick={handleNext}
                        disabled={!answer.trim()}
                    >
                        {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish & Get Evaluation'}
                    </button>
                </div>
            </div>
        </div>
    );
}
