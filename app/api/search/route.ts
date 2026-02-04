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
        admissionRequirements: ['Bachelor degree in CS', 'GRE Score', 'Curriculum Analysis', 'Motivation Letter'],
        tuitionFees: '0 EUR (Regular) / 6,000 EUR (Non-EU per sem from 2024)',
        applicationDeadline: '31st May',
        interviewRequirement: true,
        interviewFormat: '20-minute mandatory aptitude interview focusing on technical math and logic.',
        sourceUrl: 'https://www.cit.tum.de/en/cit/studies/master-informatics/',
        confidenceScore: 'High'
    },
    'tum-robotics': {
        university: 'Technical University of Munich',
        programName: 'MSc Robotics, Cognition, Intelligence',
        degreeLevel: 'Master',
        country: 'Germany',
        overview: 'Interdisciplinary program combining mechanical engineering, electrical engineering, and informatics.',
        admissionRequirements: ['Bachelor in Engineering or CS', 'Aptitude Assessment', 'Scientific Essay'],
        tuitionFees: '0 EUR (Regular) / 6,000 EUR (Non-EU per sem)',
        applicationDeadline: '31st May',
        interviewRequirement: true,
        interviewFormat: 'Personal interview as part of the direct aptitude assessment.',
        confidenceScore: 'High'
    },
    'psl-ai-society': {
        university: 'Paris Sciences et Lettres (PSL)',
        programName: 'MSc Artificial Intelligence and Society',
        degreeLevel: 'Master',
        country: 'France',
        overview: 'Multidisciplinary AI program focusing on both technical implementation and societal impact.',
        admissionRequirements: ['Bachelor in AI/CS/Math', 'Transcripts', 'SOP', 'B2/C1 English Proficiency'],
        tuitionFees: 'Approx 243 EUR (EU) / Higher for Non-EU',
        applicationDeadline: 'May',
        interviewRequirement: true,
        interviewFormat: 'Mandatory interview focusing on research interest and interdisciplinary fit.',
        confidenceScore: 'High'
    },
    'psl-cognitive-science': {
        university: 'Paris Sciences et Lettres (PSL)',
        programName: 'MSc Cognitive Science (Cogmaster)',
        degreeLevel: 'Master',
        country: 'France',
        overview: 'World-class interdisciplinary program in cognitive science at ENS-PSL.',
        admissionRequirements: ['Bachelor in Science, Engineering or Humanities', 'Strong academic record', 'Research Project Proposal'],
        tuitionFees: 'Standard French university fees',
        applicationDeadline: 'March/April',
        interviewRequirement: true,
        interviewFormat: 'Highly technical and research-oriented interview with ENS faculty.',
        confidenceScore: 'High'
    },
    'eth-computer-science': {
        university: 'ETH Zurich',
        programName: 'MSc Computer Science',
        degreeLevel: 'Master',
        country: 'Switzerland',
        overview: 'Top-ranked CS program globally, focused on high-level research and theoretical foundations.',
        admissionRequirements: ['Bachelor in CS', 'GRE General Test', 'Letters of Recommendation', '90% Core Competencies Coverage'],
        tuitionFees: '730 CHF per semester',
        applicationDeadline: '15th December',
        interviewRequirement: false,
        interviewFormat: 'Admission is primarily document-based, but rare interviews may occur for boundary cases.',
        confidenceScore: 'High'
    },
    'eth-data-science': {
        university: 'ETH Zurich',
        programName: 'MSc Data Science',
        degreeLevel: 'Master',
        country: 'Switzerland',
        overview: 'Specialized program for large-scale data analysis and machine learning.',
        admissionRequirements: ['Bachelor in CS, Math, Phys', 'Math Background Check', 'GRE', 'SOP'],
        tuitionFees: '730 CHF per semester',
        applicationDeadline: '15th December',
        interviewRequirement: false,
        interviewFormat: 'Holistic profile review by joint committee (CS, ITET, Math).',
        confidenceScore: 'High'
    },
    'polytechnique-ai': {
        university: 'École Polytechnique',
        programName: 'MSc&T in Artificial Intelligence',
        degreeLevel: 'Master',
        country: 'France',
        overview: 'Elite program focused on the mathematical and computational foundations of AI.',
        admissionRequirements: ['Bachelor in Math/CS', 'Strong academic record', 'English C1', 'Personal Statement'],
        tuitionFees: 'Check official website (Approx 12,000 EUR/year)',
        applicationDeadline: 'Nov/Jan/Mar rounds',
        interviewRequirement: true,
        interviewFormat: '30-minute remote interview assessing motivation and technical knowledge in math/logic.',
        confidenceScore: 'High'
    },
    'sorbonne-ai': {
        university: 'Sorbonne University',
        programName: 'Master in Computer Science - AI Track',
        degreeLevel: 'Master',
        country: 'France',
        overview: 'Broad computer science curriculum with specialization in advanced AI and big data.',
        admissionRequirements: ['Bachelor in CS/Math', 'Transcripts', 'CV', 'Motivation Letter'],
        tuitionFees: 'Standard French university fees (approx 243 EUR)',
        applicationDeadline: 'March/April',
        interviewRequirement: true,
        interviewFormat: 'Live video call focusing on thought process and previous scientific projects.',
        confidenceScore: 'High'
    },
    'paris-saclay-ai': {
        university: 'University of Paris-Saclay',
        programName: 'Master in Computer Science - AI Specialization',
        degreeLevel: 'Master',
        country: 'France',
        overview: 'Large-scale program at the heart of the Paris-Saclay innovation cluster.',
        admissionRequirements: ['Bachelor in CS', 'Auto-evaluation Questionnaire', 'B2/C1 English', 'SOP'],
        tuitionFees: 'approx 243 EUR (EU) / Higher for Non-EU',
        applicationDeadline: 'March/April',
        interviewRequirement: false,
        interviewFormat: 'Profile review based on questionnaire and academic performance.',
        confidenceScore: 'High'
    },
    'vub-ai': {
        university: 'Vrije Universiteit Brussel (VUB)',
        programName: 'MSc in Computer Science - AI Track',
        degreeLevel: 'Master',
        country: 'Belgium',
        overview: 'European capital-based program with strong focus on software engineering and AI ethics.',
        admissionRequirements: ['Bachelor in CS/Engineering', 'CV', 'Thesis Writing Sample', 'Motivation Letter'],
        tuitionFees: 'Approx 1,000-4,000 EUR depending on origin',
        applicationDeadline: 'March (Non-EU) / June (EU)',
        interviewRequirement: true,
        interviewFormat: 'Technical interview covering Algebra, DSP, and Python/C++ skills.',
        confidenceScore: 'High'
    }
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { university, program } = body;

        const uniInput = (university || '').toLowerCase();
        const progInput = (program || '').toLowerCase();

        // 1. Exact or near-exact key match
        const exactKey = `${university}-${program}`.toLowerCase().replace(/\s+/g, '-');
        if (MOCK_DB[exactKey]) {
            return NextResponse.json({ success: true, data: MOCK_DB[exactKey] });
        }

        // 2. Fuzzy match across DB
        const match = Object.values(MOCK_DB).find(p => {
            const uniMatch = p.university.toLowerCase().includes(uniInput) ||
                (uniInput.includes('psl') && p.university.toLowerCase().includes('paris sciences')) ||
                (uniInput.includes('polytechnique') && p.university.toLowerCase().includes('polytechnique')) ||
                (uniInput.includes('saclay') && p.university.toLowerCase().includes('saclay')) ||
                (uniInput.includes('vub') || uniInput.includes('brussel')) && p.university.toLowerCase().includes('brussel');

            const progMatch = p.programName.toLowerCase().includes(progInput) ||
                progInput.split(' ').some((word: string) => word.length > 3 && p.programName.toLowerCase().includes(word)) ||
                (progInput.includes('ai') && p.programName.toLowerCase().includes('artificial intelligence'));
            return uniMatch && progMatch;
        });

        if (match) {
            return NextResponse.json({ success: true, data: match });
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
