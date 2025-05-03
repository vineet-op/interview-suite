import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import prisma from "@/lib/prisma";


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

export const POST = async (req: NextRequest) => {
    try {
        const { role, experience, jobDescription } = await req.json();

        const prompt = `Generate 5 technical interview questions for a ${role} with  years of ${experience} experience specializing in ${jobDescription}. Depends on this information generate a 5 interview questions with answers in jSON format. Please Give the questions and answers  as feilds in jSON format.
        {
            "questions": [
                {
                    "question": "...",
                    "answer": "...",
                }
            ]
        }`;

        const result = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
        });

        const responseText = result?.text || '';
        console.log("Gemini response:", responseText);

        const cleanText = responseText.replace('```json', '').replace('```', '').trim()
        console.log(cleanText);

        const interview = await prisma.interviews.create({
            data: {
                role,
                experience,
                jobDescription,
                aiResponse: cleanText,
                createdAt: new Date().toISOString(),
            },
        });

        return NextResponse.json({ success: true, interview });
    } catch (error: any) {
        console.error('Error in API:', error);
        return NextResponse.json({ error: 'Failed to generate or save interview' }, { status: 500 });
    }
};


