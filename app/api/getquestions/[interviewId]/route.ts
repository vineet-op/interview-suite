// app/api/getquestions/[interviewId]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { interviewId: string } }
) {
    try {
        const interviewId = await params.interviewId

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
            // Attempt to clean and parse the aiResponse
            const cleanedResponse = interview.aiResponse
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();

            const aiData = JSON.parse(cleanedResponse);
            parsedQuestions = aiData.questions || [];
        } catch (e) {
            console.error("Failed to parse aiResponse:", e);
            // Fallback to an empty array if parsing fails
            parsedQuestions = [];
        }

        return NextResponse.json({
            ...interview,
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