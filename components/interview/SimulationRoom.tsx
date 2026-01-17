'use client';

import { useState } from 'react';
import styles from './simulation.module.css';

interface Question {
    id: string;
    text: string;
    category: string;
    tips?: string;
}

interface SimulationRoomProps {
    questions: Question[];
    onExit: () => void;
}

export default function SimulationRoom({ questions, onExit }: SimulationRoomProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [mode, setMode] = useState<'answering' | 'feedback'>('answering');
    const [loadingFeedback, setLoadingFeedback] = useState(false);

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const handleSubmitAnswer = async () => {
        if (!answer.trim()) return;
        setLoadingFeedback(true);

        // Mock API call for feedback
        // In reality, this would go to an API route
        setTimeout(() => {
            setFeedback("That's a solid start. You mentioned your interest in the curriculum, but try to cite specific modules like 'Advanced Algorithms' to show deeper research.");
            setMode('feedback');
            setLoadingFeedback(false);
        }, 1500);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setAnswer('');
            setFeedback('');
            setMode('answering');
        } else {
            alert("Interview Complete! Preparation plan will be generated.");
            onExit();
        }
    };

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
                {mode === 'answering' && currentQuestion.tips && (
                    <div className={styles.tipBox}>
                        <strong>💡 Tip:</strong> {currentQuestion.tips}
                    </div>
                )}

                {mode === 'answering' ? (
                    <div className={styles.answerSection}>
                        <textarea
                            className={styles.textArea}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Type your answer here (or speak if voice enabled)..."
                        />
                        <button
                            className={styles.submitButton}
                            onClick={handleSubmitAnswer}
                            disabled={loadingFeedback || !answer.trim()}
                        >
                            {loadingFeedback ? 'Analyzing...' : 'Submit Answer'}
                        </button>
                    </div>
                ) : (
                    <div className={styles.feedbackSection}>
                        <h4>AI Feedback</h4>
                        <p>{feedback}</p>
                        <button className={styles.nextButton} onClick={handleNext}>
                            {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
