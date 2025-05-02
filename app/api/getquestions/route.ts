import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
    const { role, experience, jobDescription } = await req.json();
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Job Position: ${role}, Job Description: ${jobDescription}, Years of experience: ${experience}. Generate 5 interview theory questions with answers in JSON format. Please provide the questions and answers as fields in JSON format.`,
        });

        return NextResponse.json({ text: response.text });
    } catch (error) {
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}