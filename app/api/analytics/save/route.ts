import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ComprehensiveEvaluation } from '@/types/ai-response';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { evaluation, programName, university } = body as {
            evaluation: ComprehensiveEvaluation;
            programName: string;
            university: string;
        };

        const result = await prisma.interviewResult.create({
            data: {
                programName,
                university,
                overallScore: evaluation.interview_readiness.overall_score,
                toneScore: evaluation.cultural_communication_coach.tone_score,
                verdict: evaluation.admission_committee_simulation.final_verdict,
                feedbackJson: JSON.stringify(evaluation)
            }
        });

        return NextResponse.json({ success: true, id: result.id });
    } catch (error) {
        console.error("Database Save Error:", error);
        return NextResponse.json({ success: false, error: 'Failed to save result' }, { status: 500 });
    }
}
