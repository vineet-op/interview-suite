import prisma from "@/lib/prisma";
import { google } from "@ai-sdk/google";
import { generateText } from 'ai';

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GET() {
    return Response.json({
        success: true
    }, {
        status: 200
    })
}


export async function POST(request: Request) {
    const { type, role, level, techstack, userid, amount } = await request.json();

    try {
        const { text: questions } = await generateText({
            model: google("gemini-1.5-flash"),
            prompt: `Generate ${amount} interview questions for a ${type} interview for the role of ${role} at level ${level} with a focus on ${techstack}. The questions should be tailored to assess the candidate's skills and experience in ${techstack}. Return the questions in a JSON format with each question having an "id" and "question" property.`

        })

        // const interview = {
        //     role, type, level,
        //     techstack: techstack.split(","),
        //     questions: questions,
        //     userid: userid,
        //     finalized: true,
        //     createdAt: new Date().toISOString()
        // }

        // Storing into Prisma
        const interviewRecord = await prisma.interviews.create({
            data: {
                role,
                type,
                level,
                techstack: techstack.split(","),
                questions,
                userid,
                finalize: true,
                createdAt: new Date().toISOString(),
                amount
            }
        })

        return Response.json({
            success: true,
            interviewRecord
        }, {
            status: 200
        })

    } catch (error) {
        console.log("Error While Making POST", error);
        throw Error
    }
}