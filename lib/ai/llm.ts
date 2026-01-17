import { ProgramData } from '../../types/program';
import { ComprehensiveEvaluation } from '../../types/ai-response';

// Re-export GeneratedQuestion locally to match existing code or update references
// Ideally, updates should use the one from ai-response, but for MVP we'll map or re-declare if needed.
// For now, let's stick to the generated question simple type in this file for the 'generateQuestions' function
// but use the comprehensive one for the big eval.

export interface SimpleQuestion {
    id: string;
    category: 'Technical' | 'Motivation' | 'Behavioral' | 'Research';
    text: string;
    tips?: string;
}

export async function generateQuestions(programData: ProgramData): Promise<SimpleQuestion[]> {
    // START MOCK IMPLEMENTATION
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
        {
            id: '1',
            category: 'Technical',
            text: `Explain the core concepts of ${programData.programName} that interest you most.`,
            tips: 'Focus on recent academic papers or specific modules in the curriculum.'
        },
        {
            id: '2',
            category: 'Motivation',
            text: `Why did you choose ${programData.university} over other European universities?`,
            tips: 'Cite specific faculty members or research labs.'
        },
        {
            id: '3',
            category: 'Behavioral',
            text: 'Describe a time you had to solve a complex problem with limited resources.',
            tips: 'Use the STAR method (Situation, Task, Action, Result).'
        },
        {
            id: '4',
            category: 'Research',
            text: 'What is your proposed thesis topic and how does it align with our faculty\'s research?',
            tips: 'Mention specific professors like Dr. Schmidt or Dr. Muller.'
        }
    ];
    // END MOCK IMPLEMENTATION
}

export async function generateComprehensiveEvaluation(
    program: ProgramData,
    conversationHistory: any[]
): Promise<ComprehensiveEvaluation> {
    // START MOCK EXPERT SYSTEM
    console.log("Generating Expert Evaluation for:", program.university);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate "Thinking"

    return {
        interview_readiness: {
            overall_score: 78,
            breakdown: {
                program_understanding: 85,
                technical_depth: 70,
                research_fit: 75,
                motivation: 80,
                communication: 85,
                academic_tone: 70 // European tone is often lower for beginners
            },
            strengths: [
                "Strong clear motivation for the program structure",
                "Good articulate communication style"
            ],
            weaknesses: [
                "Lack of specific faculty references",
                "Answers are slightly too 'sales-y' (marketing language)"
            ],
            top_3_improvements: [
                "Cite at least 2 papers from the department",
                "Reduce adjectives like 'passionate' and focus on 'evidence'",
                "Be more concise in technical explanations"
            ]
        },
        faculty_alignment: {
            overall_alignment_score: 65,
            top_faculty_matches: [
                {
                    faculty_name: "Dr. Klaus Weber",
                    alignment_score: 85,
                    reasons: ["His work on Distributed Systems aligns with your project experience"],
                    interview_mention_suggestion: "Mention your reading of his 2023 paper on edge computing."
                }
            ],
            missing_alignment_gaps: ["No mention of the AI Ethics application domain"],
            preparation_recommendations: ["Read the department's latest annual report"]
        },
        sop_consistency_check: {
            consistency_score: 90,
            identified_risks: [],
            strongly_aligned_points: ["Your stated interest in NLP matches your previous internship"],
            preparation_advice: ["Keep this consistency, it builds trust."]
        },
        follow_up_engine: {
            follow_up_questions: [
                "You mentioned 'scalability' - how exactly would you measure that in a distributed context?",
                "Can you defend your choice of Python over C++ for that specific project?"
            ],
            intent: "Probing technical depth and reasoning.",
            difficulty_level: "medium"
        },
        cultural_communication_coach: {
            detected_issues: ["Used 'I feel' too often instead of 'The data shows'"],
            recommended_rephrasing: [
                {
                    original_phrase: "I am passionate about coding",
                    improved_phrase: "I have consistently applied coding principles to solve...",
                    reason: "Avoid emotional states; focus on demonstrated action."
                }
            ],
            tone_score: 72,
            overall_advice: "Your tone is professional but slightly too American/enthusiastic. Aim for more sober, objective phrasing."
        },
        ethics_and_policy_evaluation: {
            ethics_score: 100, // Assumed safe
            policy_awareness: "not_applicable",
            strengths: ["No ethical risks detected in answers"],
            missing_elements: [],
            model_improvement_example: ""
        },
        admission_committee_simulation: {
            final_verdict: "borderline",
            justification: [
                "Candidate is competent but lacks specific research alignment.",
                "Communication is good, but technical depth needs verification."
            ],
            decisive_factors: ["Research Fit", "Technical Depth"],
            what_would_improve_decision: [
                "A strong defense of the thesis proposal",
                "Demonstrating knowledge of specific lab equipment/resources"
            ]
        }
    };
}

// Deprecated simple feedback - kept for compatibility if needed, but we should move to `generateComprehensiveEvaluation`
export async function generateFeedback(conversationHistory: any[]): Promise<string> {
    return "Feedback migrated to Expert System.";
}
