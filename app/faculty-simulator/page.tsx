'use client';

import { useState } from 'react';
import styles from './faculty.module.css';
import ChatInterface from '@/components/faculty/ChatInterface';

export default function FacultySimulatorPage() {
    const [step, setStep] = useState<'setup' | 'chat'>('setup');
    const [profile, setProfile] = useState({
        name: '',
        university: '',
        research: ''
    });

    const handleStart = () => {
        if (profile.name && profile.university && profile.research) {
            setStep('chat');
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1>Faculty Persona Simulator</h1>
                <p>Train against specific professors by simulating their research interests and academic style.</p>
            </div>

            {step === 'setup' && (
                <div className={styles.card}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Professor Name</label>
                        <input
                            id="name"
                            className={styles.input}
                            placeholder="e.g. Klaus Weber"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="uni">University / Lab</label>
                        <input
                            id="uni"
                            className={styles.input}
                            placeholder="e.g. TU Munich, Robotics Lab"
                            value={profile.university}
                            onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="research">Key Research Topics</label>
                        <textarea
                            id="research"
                            className={styles.textarea}
                            placeholder="e.g. Distributed Consensus, Edge Computing, IoT Security..."
                            value={profile.research}
                            onChange={(e) => setProfile({ ...profile, research: e.target.value })}
                        />
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                            Tip: Copy keywords from their Google Scholar or Lab website for maximum realism.
                        </div>
                    </div>

                    <button
                        className={styles.button}
                        onClick={handleStart}
                        disabled={!profile.name || !profile.university || !profile.research}
                    >
                        Initialize Simulation
                    </button>
                </div>
            )}

            {step === 'chat' && (
                <ChatInterface
                    professorProfile={profile}
                    onEnd={() => setStep('setup')}
                />
            )}
        </main>
    );
}
