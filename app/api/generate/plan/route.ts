import { NextRequest, NextResponse } from 'next/server';
import { ProgramData } from '@/types/program';
import { PrepPlan, DailyTask } from '@/types/plan';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { programData } = body as { programData: ProgramData };

        if (!programData) return NextResponse.json({ success: false }, { status: 400 });

        // MOCK PLAN GENERATION
        const plan: PrepPlan = {
            programName: programData.programName,
            durationWeeks: 2,
            schedule: [
                {
                    day: 1,
                    topic: 'Curriculum Deep Dive',
                    action: 'Review the module handbook specifically for the "Machine Learning" track.',
                    resources: [`${programData.university} Module Catalog`, 'Intro to ML (Coursera)']
                },
                {
                    day: 2,
                    topic: 'Research Alignment',
                    action: 'Read 2 recent papers by the department head.',
                    resources: ['Google Scholar', 'ResearchGate']
                },
                {
                    day: 3,
                    topic: 'Mock Interview Practice',
                    action: 'Practice "Tell me about yourself" with a focus on academic motivation.',
                    resources: ['EuroUni Helper Tip Sheet']
                },
                {
                    day: 4,
                    topic: 'Algorithm Revision',
                    action: 'Refresh knowledge on Graph Theory and Complexity.',
                    resources: ['GeeksForGeeks', 'LeetCode']
                }
            ]
        };

        return NextResponse.json({ success: true, data: plan });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
