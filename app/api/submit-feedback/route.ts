import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const { interviewId, questions, answers, feedback } = await req.json()

        console.log("Received feedback data:", { interviewId, questions, answers });
        console.log("Feedback object:", feedback);

        if (!interviewId) {
            return NextResponse.json(
                { error: "Interview ID is required" },
                { status: 400 }
            );
        }

        // Update interview record in Prisma using the correct schema field names
        const updatedInterview = await prisma.interviews.update({
            where: {
                interviewId: interviewId
            },
            data: {
                // Your schema has these as String[] so no need to stringify
                questions: questions,
                answers: answers,
                feedbackResponse: JSON.stringify(feedback) // Store as JSON string
            }
        })

        return NextResponse.json({
            success: true,
            interview: updatedInterview
        })

    } catch (error) {
        console.error("Error saving feedback:", error)
        return NextResponse.json(
            { error: "Failed to save feedback", details: (error as Error).message },
            { status: 500 }
        )
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const interviewId = searchParams.get('interviewId');

        if (!interviewId) {
            return NextResponse.json(
                { error: "Interview ID is required" },
                { status: 400 }
            );
        }

        // Fetch interview record from Prisma using the correct field name
        const interview = await prisma.interviews.findUnique({
            where: { interviewId: interviewId }
        });

        if (!interview) {
            return NextResponse.json(
                { error: "Interview not found" },
                { status: 404 }
            );
        }

        // Parse JSON string for feedbackResponse but keep questions and answers as they are
        return NextResponse.json({
            success: true,
            interview: {
                ...interview,
                // No need to parse questions and answers since they're already arrays
                feedbackResponse: interview.feedbackResponse ? JSON.parse(interview.feedbackResponse) : null
            }
        });

    } catch (error) {
        console.error("Error retrieving feedback:", error)
        return NextResponse.json(
            { error: "Failed to retrieve feedback", details: (error as Error).message },
            { status: 500 }
        )
    }
}