export interface InterviewReadiness {
    overall_score: number;
    breakdown: {
        program_understanding: number;
        technical_depth: number;
        research_fit: number;
        motivation: number;
        communication: number;
        academic_tone: number;
    };
    strengths: string[];
    weaknesses: string[];
    top_3_improvements: string[];
}

export interface FacultyAlignment {
    overall_alignment_score: number;
    top_faculty_matches: Array<{
        faculty_name: string;
        alignment_score: number;
        reasons: string[];
        interview_mention_suggestion: string;
    }>;
    missing_alignment_gaps: string[];
    preparation_recommendations: string[];
}

export interface SopConsistencyCheck {
    consistency_score: number;
    identified_risks: Array<{
        issue: string;
        why_it_matters: string;
        likely_follow_up_question: string;
    }>;
    strongly_aligned_points: string[];
    preparation_advice: string[];
}

export interface FollowUpEngine {
    follow_up_questions: string[];
    intent: string;
    difficulty_level: 'easy' | 'medium' | 'hard';
}

export interface CulturalCommunicationCoach {
    detected_issues: string[];
    recommended_rephrasing: Array<{
        original_phrase: string;
        improved_phrase: string;
        reason: string;
    }>;
    tone_score: number;
    overall_advice: string;
}

export interface EthicsAndPolicyEvaluation {
    ethics_score: number;
    policy_awareness: 'high' | 'medium' | 'low' | 'not_applicable';
    strengths: string[];
    missing_elements: string[];
    model_improvement_example: string;
}

export interface AdmissionCommitteeSimulation {
    final_verdict: 'strong_admit' | 'borderline' | 'reject';
    justification: string[];
    decisive_factors: string[];
    what_would_improve_decision: string[];
}

export interface ComprehensiveEvaluation {
    interview_readiness: InterviewReadiness;
    faculty_alignment: FacultyAlignment;
    sop_consistency_check: SopConsistencyCheck;
    follow_up_engine: FollowUpEngine;
    cultural_communication_coach: CulturalCommunicationCoach;
    ethics_and_policy_evaluation: EthicsAndPolicyEvaluation;
    admission_committee_simulation: AdmissionCommitteeSimulation;
}
