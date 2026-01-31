import { NextResponse } from 'next/server';
import { generateSOPAnalysis } from '@/lib/ai/llm';

export async function POST(req: Request) {
    try {
        const { sopText, programName } = await req.json();

        if (!sopText) {
            return NextResponse.json(
                { success: false, error: 'SOP text is required' },
                { status: 400 }
            );
        }

        const analysis = await generateSOPAnalysis(sopText, programName || 'General Program');

        return NextResponse.json({ success: true, data: analysis });
    } catch (error) {
        console.error('SOP Analysis Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to analyze SOP' },
            { status: 500 }
        );
    }
}
