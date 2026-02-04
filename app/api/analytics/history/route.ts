import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ history: [] }, { status: 401 });
    }

    try {
        const history = await prisma.interviewResult.findMany({
            where: { userId: session.user.id },
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
