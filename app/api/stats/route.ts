import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const [uniCount, programCount, countryCount] = await Promise.all([
            prisma.university.count(),
            prisma.program.count(),
            prisma.university.groupBy({
                by: ['country'],
                _count: true
            }).then(res => res.length)
        ]);

        return NextResponse.json({
            success: true,
            stats: {
                universities: uniCount,
                programs: programCount,
                countries: countryCount,
                activeSimulations: 842 // Simulated live users
            }
        });
    } catch (error) {
        console.error('Stats error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
    }
}
