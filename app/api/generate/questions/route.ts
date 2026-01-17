import { NextRequest, NextResponse } from 'next/server';
import { generateQuestions } from '@/lib/ai/llm';
import { ProgramData } from '@/types/program';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { programData } = body as { programData: ProgramData };

        if (!programData) {
            return NextResponse.json({ success: false, error: 'Missing program data' }, { status: 400 });
        }

        const questions = await generateQuestions(programData);

        return NextResponse.json({ success: true, data: questions });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to generate questions' }, { status: 500 });
    }
}
