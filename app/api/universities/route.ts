import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const universities = await prisma.university.findMany({
            include: {
                programs: {
                    select: {
                        name: true,
                        level: true,
                        field_of_study: true
                    },
                    take: 10 // Limit programs per uni for the directory view
                }
            },
            orderBy: [
                { country: 'asc' },
                { name: 'asc' }
            ]
        });

        return NextResponse.json({
            success: true,
            data: universities
        });
    } catch (error) {
        console.error('Fetch universities error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch universities' }, { status: 500 });
    }
}
