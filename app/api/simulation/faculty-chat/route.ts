import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { messages, professorProfile } = await req.json();

        // START MOCK LLM LOGIC
        // In a real app, we would construct a System Prompt using the professorProfile
        // and send the messages array to OpenAI/Anthropic.

        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate thinking

        const lastUserMessage = messages[messages.length - 1].content.toLowerCase();
        let responseText = "";

        // Simple keyword matching to simulate "context awareness"
        if (messages.length <= 1) {
            responseText = `Hello. I am Dr. ${professorProfile.name}. I see you are interested in joining my group at ${professorProfile.university}. My work focuses heavily on ${professorProfile.research}. Why do you think your background makes you a suitable candidate for this specific research area?`;
        } else if (lastUserMessage.includes('project') || lastUserMessage.includes('research')) {
            responseText = `That is an interesting point. However, in our lab, we strictly follow a methodology based on ${professorProfile.research}. How would you adapt your previous experience to align with these constraints?`;
        } else {
            responseText = `I see. But let's be more specific. Can you cite any recent developments in ${professorProfile.research} that inspired this answer? In Europe, we value theoretical depth alongside practical skills.`;
        }
        // END MOCK LLM LOGIC

        return NextResponse.json({
            success: true,
            message: responseText
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to generate faculty response' },
            { status: 500 }
        );
    }
}
