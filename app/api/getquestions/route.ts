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
            contents: prompt,
        });

        const responseText = result.text || '';
        console.log("Gemini response:", responseText);

        const cleanText = responseText.replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();
        console.log(cleanText);

        // Parse the JSON response
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(cleanText);
        } catch (error) {
            console.error('Failed to parse JSON response:', error);
            return NextResponse.json({ error: 'Invalid JSON response from AI' }, { status: 500 });
        }

        // Extract questions and answers
        const questions = parsedResponse.questions.map((q: any) => q.question);
        const answers = parsedResponse.questions.map((q: any) => q.answer);

        const interview = await prisma.interviews.create({
            data: {
                interviewId: crypto.randomUUID(),
                role,
                experience,
                jobDescription,
                aiResponse: cleanText,
                questions: questions,
                answers: answers,
                createdAt: new Date().toISOString(),
            },
        });

        return NextResponse.json({ success: true, interview });
    } catch (error: any) {
        console.error('Error in API:', error);
        return NextResponse.json({ error: 'Failed to generate or save interview' }, { status: 500 });
    }
};


