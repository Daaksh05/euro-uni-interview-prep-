'use client';

import { useState, useEffect } from 'react';

interface VoiceInputProps {
    onTranscript: (text: string) => void;
    disabled?: boolean;
}

export default function VoiceInput({ onTranscript, disabled }: VoiceInputProps) {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            // @ts-ignore
            const speechRecognition = new window.webkitSpeechRecognition();
            speechRecognition.continuous = false;
            speechRecognition.interimResults = false;
            speechRecognition.lang = 'en-US';

            speechRecognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                onTranscript(transcript);
                setIsListening(false);
            };

            speechRecognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            speechRecognition.onend = () => {
                setIsListening(false);
            };

            setRecognition(speechRecognition);
        }
    }, [onTranscript]);

    const toggleListening = () => {
        if (!recognition) {
            alert("Your browser does not support speech recognition. Please use Chrome.");
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
            setIsListening(true);
        }
    };

    if (!recognition) return null; // Don't render if not supported

    return (
        <button
            onClick={toggleListening}
            disabled={disabled}
            style={{
                background: isListening ? '#ef4444' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: isListening ? '0 0 10px #ef4444' : 'none',
                fontSize: '1.2rem'
            }}
            title={isListening ? "Stop Recording" : "Speak Answer"}
        >
            {isListening ? '⏹️' : '🎤'}
        </button>
    );
}
