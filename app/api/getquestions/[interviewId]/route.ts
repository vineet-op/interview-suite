// app/api/getquestions/[interviewId]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { interviewId: string } }
) {
    try {
        const interviewId = parseInt(params.interviewId);
        if (isNaN(interviewId)) {
            return NextResponse.json({ error: "Invalid interview ID" }, { status: 400 });
        }

        const interview = await prisma.interviews.findUnique({
            where: { interviewId },
            select: {
                interviewId: true,
                role: true,
                experience: true,
                jobDescription: true,
                aiResponse: true,
                createdAt: true
            }
        });

        if (!interview) {
            return NextResponse.json({ error: "Interview not found" }, { status: 404 });
        }

        // Parse the nested structure
        let parsedQuestions = [];
        try {
            const aiData = JSON.parse(interview.aiResponse);
            parsedQuestions = aiData.questions || [];
        } catch (e) {
            console.error("Failed to parse aiResponse:", e);
        }

        return NextResponse.json({
            parsedQuestions
        });

    } catch (error) {
        console.error("Error fetching interview:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}