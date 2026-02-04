import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ProgramData } from '@/types/program';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { university, program } = body;

        const uniInput = (university || '').trim();
        const progInput = (program || '').trim();

        // Keyword expansion for better matching
        const searchTerms = [progInput];
        if (progInput.toLowerCase() === 'ai') searchTerms.push('Artificial Intelligence');
        if (progInput.toLowerCase() === 'cs') searchTerms.push('Computer Science');

        const idMatch = uniInput.toLowerCase().replace(/\s+/g, '-');

        // 1. Try a more specific search first (AND)
        let programs = await prisma.program.findMany({
            where: {
                AND: [
                    {
                        OR: searchTerms.filter(t => t.length > 0).map(term => ({ name: { contains: term } }))
                    },
                    {
                        university: {
                            OR: [
                                { name: { contains: uniInput } },
                                { id: idMatch } // Try exact ID match first
                            ]
                        }
                    }
                ]
            },
            include: { university: true },
            orderBy: { university: { qs_global_rank: 'asc' } },
            take: 5
        });

        // 2. Fallback to broad search if no specific matches, but ONLY if inputs are not empty
        if (programs.length === 0 && (uniInput || progInput)) {
            programs = await prisma.program.findMany({
                where: {
                    OR: [
                        progInput ? { name: { contains: progInput } } : undefined,
                        uniInput ? {
                            university: {
                                OR: [
                                    { name: { contains: uniInput } },
                                    { id: { contains: idMatch } }
                                ]
                            }
                        } : undefined
                    ].filter(Boolean) as any
                },
                include: { university: true },
                orderBy: { university: { qs_global_rank: 'asc' } },
                take: 5
            });
        }

        if (programs.length > 0) {
            // Find the best match (e.g., if both uni and program match)
            // For now, take the first one (ordered by QS rank)
            const p = programs[0];
            const data: ProgramData = {
                university: p.university.name,
                programName: p.name,
                degreeLevel: p.level as any,
                country: p.university.country,
                overview: `A prestigious ${p.level} program focusing on ${p.field_of_study}.`,
                admissionRequirements: [
                    'Bachelor degree in relevant field',
                    'English Proficiency (B2/C1)',
                    'Motivation Letter',
                    'Academic Transcripts'
                ],
                tuitionFees: p.university.country === 'Germany' ? '0-1500 EUR (Public)' : 'Variable - Check official portal',
                applicationDeadline: 'Check official website',
                interviewRequirement: p.research_focused,
                interviewFormat: p.research_focused ? 'Technical interview with research faculty.' : 'Standard admission review.',
                sourceUrl: p.university.website_url || undefined,
                confidenceScore: 'High',
                // New Rich Metadata
                qsGlobalRank: p.university.qs_global_rank || undefined,
                qsEuropeRank: p.university.qs_europe_rank || undefined,
                researchStrengths: p.university.research_strengths || undefined,
                focusAreas: p.university.focus_areas || undefined,
                foundingYear: p.university.founding_year || undefined,
                gdprCompliance: p.university.gdpr_compliance_note || undefined,
                euAiActAligned: p.university.eu_ai_act_aligned || false
            };
            return NextResponse.json({ success: true, data });
        }

        // Fallback for unknown programs
        const fallback: ProgramData = {
            university: university || 'Unknown University',
            programName: program || 'Unknown Program',
            degreeLevel: 'Master',
            country: 'Europe',
            overview: 'Program details need to be verified via official university portal.',
            admissionRequirements: ['Check official website'],
            tuitionFees: 'Check official website',
            applicationDeadline: 'Check official website',
            interviewRequirement: false,
            confidenceScore: 'Low'
        };

        return NextResponse.json({ success: true, data: fallback });

    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ success: false, error: 'Database search failed' }, { status: 500 });
    }
}
