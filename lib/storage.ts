import { ComprehensiveEvaluation } from '../types/ai-response';

const STORAGE_KEY = 'eurouni_interview_history';

export interface HistoricalResult {
    id: string;
    timestamp: number;
    programName: string;
    university: string;
    overallScore: number;
    toneScore: number;
    verdict: string;
    evaluation: ComprehensiveEvaluation;
}

export function saveInterviewResult(evaluation: ComprehensiveEvaluation, programName: string, university: string) {
    if (typeof window === 'undefined') return;

    // Create a historical record
    const record: HistoricalResult = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        programName,
        university,
        overallScore: evaluation.interview_readiness.overall_score,
        toneScore: evaluation.cultural_communication_coach.tone_score,
        verdict: evaluation.admission_committee_simulation.final_verdict,
        evaluation
    };

    // Get existing history
    const existing = getInterviewHistory();
    const updated = [...existing, record];

    // Save
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getInterviewHistory(): HistoricalResult[] {
    if (typeof window === 'undefined') return [];

    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return [];

    try {
        const parsed = JSON.parse(json);
        return parsed.sort((a: any, b: any) => a.timestamp - b.timestamp);
    } catch (e) {
        console.error("Failed to parse history", e);
        return [];
    }
}
