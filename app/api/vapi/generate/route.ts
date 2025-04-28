import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
        const questions = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Generate ${amount} interview questions for a ${type} interview for the role of ${role} at level ${level} with a focus on ${techstack}. The questions should be tailored to assess the candidate's skills and experience in ${techstack}. Return the questions in a JSON format with each question having an "id" and "question" property.`

        })

        const interview = {
            role, type, level,
            techstack: techstack.split(","),
            questions: questions,
            finalized: true,
            createdAt: new Date().toISOString()

        }


        //!Wanted to store into Prisma

        return Response.json({
            success: true
        }, {
            status: 200
        })

    } catch (error) {
        console.log("Error While Making POST", error);
        throw Error
    }
}