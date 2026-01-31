'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '@/app/faculty-simulator/faculty.module.css';

interface ChatInterfaceProps {
    professorProfile: {
        name: string;
        university: string;
        research: string;
    };
    onEnd: () => void;
}

import VoiceInput from '@/components/ui/VoiceInput';

export default function ChatInterface({ professorProfile, onEnd }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Initial greeting trigger
    useEffect(() => {
        const startConversation = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/simulation/faculty-chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: [], professorProfile })
                });
                const data = await res.json();
                if (data.success) {
                    setMessages([{ role: 'assistant', content: data.message }]);
                }
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        startConversation();
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        const newHistory = [...messages, userMsg];
        setMessages(newHistory);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/simulation/faculty-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newHistory, professorProfile })
            });
            const data = await res.json();
            if (data.success) {
                setMessages([...newHistory, { role: 'assistant', content: data.message }]);
            }
        } catch (error) {
            alert("Connection to Professor lost.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.chatContainer}>
            <header className={styles.chatHeader}>
                <div className={styles.professorInfo}>
                    <div className={styles.avatar}>Prof</div>
                    <div>
                        <strong>Dr. {professorProfile.name}</strong>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{professorProfile.university}</div>
                    </div>
                </div>
                <button className={styles.endButton} onClick={onEnd}>End Interview</button>
            </header>

            <div className={styles.chatWindow}>
                {messages.map((m, i) => (
                    <div key={i} className={`${styles.message} ${m.role === 'user' ? styles.userMessage : styles.aiMessage}`}>
                        {m.content}
                    </div>
                ))}
                {loading && <div className={styles.aiMessage}>Thinking...</div>}
                <div ref={bottomRef} />
            </div>

            <div className={styles.inputArea}>
                <VoiceInput onTranscript={(text) => setInput(prev => prev + ' ' + text)} disabled={loading} />
                <input
                    className={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your answer..."
                    disabled={loading}
                />
                <button className={styles.sendButton} onClick={handleSend} disabled={loading}>
                    Send
                </button>
            </div>
        </div>
    );
}
