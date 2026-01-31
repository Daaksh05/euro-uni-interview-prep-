import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const history = await prisma.interviewResult.findMany({
            orderBy: {
                timestamp: 'asc'
            }
        });

        // Parse the feedbackJson back into object for frontend if needed, 
        // strictly speaking for the graph we only need top level fields, but parsing is safer for types
        const parsedHistory = history.map(item => ({
            ...item,
            timestamp: item.timestamp.getTime(), // Convert Date to timestamp number usually expected by frontend
            evaluation: JSON.parse(item.feedbackJson)
        }));

        return NextResponse.json({ history: parsedHistory });
    } catch (error) {
        console.error("Database Fetch Error:", error);
        return NextResponse.json({ history: [] }, { status: 500 });
    }
}
