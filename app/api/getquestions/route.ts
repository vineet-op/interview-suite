import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export const POST = async (req: NextRequest) => {
    try {
        const { role, company, jobDescription, selectedType } = await req.json();

        if (!role || !company || !selectedType || !jobDescription) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `You are simulating a ${selectedType} round of an interview for the position of ${role} at ${company}.
            Here is the job description:
            """ 
            ${jobDescription}
            """

            Generate 5 unique and relevant interview questions based on the selected round and job description:

            - If "Behavioral", focus on evaluating communication, teamwork, leadership, adaptability, and problem-solving abilities.
            - If "Technical", ask coding problems, algorithms, data structures, or system design questions suitable for the role.
            - If "Screening Call", include high-level background questions, motivations, and an overview of the candidate's technical experience.

            Return the response in **pure JSON format** with the following structure:

            {
            "role": "${role}",
            "company": "${company}",
            "interviewType": "${selectedType}",
            "jobDescription": "${jobDescription.replace(/\n/g, " ").slice(0, 1000)}",
            "questions": [
                {
                "id": 1,
                "question": "..."
                },
                {
                "id": 2,
                "question": "..."
                },
                ...
            ]
            }

            Do not include any explanations or notes outside the JSON. Only return the valid JSON object.
            `
        });

        if (!response.text) {
            return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 });
        }

        const cleanJson = response.text
            .replace(/^```json/, '')
            .replace(/^```/, '')
            .trim();

        console.log(cleanJson);
        // Return structured JSON response
        return NextResponse.json({
            success: true,
            questions: cleanJson
        });

    } catch (error) {
        console.log("Error while getting questions", error);
        return NextResponse.json({
            success: false,
            error: 'Failed to generate questions'
        }, { status: 500 });
    }
};