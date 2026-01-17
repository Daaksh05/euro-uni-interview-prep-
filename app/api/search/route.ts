import { NextRequest, NextResponse } from 'next/server';
import { ProgramData } from '@/types/program';

// Mock data for MVP demonstration
const MOCK_DB: Record<string, ProgramData> = {
    'tum-informatics': {
        university: 'Technical University of Munich',
        programName: 'MSc Informatics',
        degreeLevel: 'Master',
        country: 'Germany',
        overview: 'A research-oriented master program designed for students with a strong background in computer science.',
        admissionRequirements: [
            'Bachelor degree in CS',
            'GRE Score (if applicable)',
            'Curriculum Analysis',
            'Motivation Letter'
        ],
        tuitionFees: '0 EUR (Administrative fees only)',
        applicationDeadline: '31st May for Winter Semester',
        interviewRequirement: true,
        interviewFormat: '20-minute technical interview with 2 professors. Focus on algorithms, math, and thesis topic.',
        sourceUrl: 'https://www.cit.tum.de/en/cit/studies/master-informatics/',
        confidenceScore: 'High'
    }
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { university, program } = body;

        // In a real implementation, this would call a search API/scraper
        // For now, we return mock data or a generic template

        const key = `${university}-${program}`.toLowerCase().replace(/\s+/g, '-');

        if (MOCK_DB[key]) {
            return NextResponse.json({ success: true, data: MOCK_DB[key] });
        }

        // Fallback Mock
        const fallback: ProgramData = {
            university: university || 'Unknown University',
            programName: program || 'Unknown Program',
            degreeLevel: 'Master',
            country: 'Europe',
            overview: 'Program details need to be fetched via live search API.',
            admissionRequirements: ['Check official website'],
            tuitionFees: 'Check official website',
            applicationDeadline: 'Check official website',
            interviewRequirement: false,
            confidenceScore: 'Low'
        };

        return NextResponse.json({ success: true, data: fallback });

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
    }
}
