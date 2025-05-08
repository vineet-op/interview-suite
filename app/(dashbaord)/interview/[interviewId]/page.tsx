'use client'
import { Questions } from '@/components/Questions';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface InterviewData {
    interviewId: string;
    role: string;
    experience: string;
    jobDescription: string;
    questions: string[];
    answers: string[];
    aiResponse: string;
    parsedQuestions?: Array<{
        question: string;
        answer: string;
    }>;
}

export default function Page() {
    const params = useParams<{ interviewId: string }>();
    const interviewId = params.interviewId;
    const [data, setData] = useState<InterviewData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/getquestions/${interviewId}`);
            if (!res.ok) throw new Error('Failed to fetch');

            const result = await res.json();
            console.log("API response:", result);

            // Extract questions and initialize empty answers
            let questions: string[] = [];

            // Try to get questions from parsedQuestions first
            if (result.parsedQuestions && Array.isArray(result.parsedQuestions)) {
                questions = result.parsedQuestions.map(q => q.question);
            }
            // Fall back to aiResponse if needed
            else if (result.aiResponse) {
                try {
                    const parsed = JSON.parse(result.aiResponse);
                    questions = Array.isArray(parsed.questions) ? parsed.questions : [];
                } catch (e) {
                    console.error("Failed to parse aiResponse:", e);
                    questions = [];
                }
            }
            // Fall back to questions array if available
            else if (Array.isArray(result.questions)) {
                questions = result.questions;
            }

            // Ensure we have an empty answers array of the same length as questions
            const initialAnswers = Array(questions.length).fill("");

            setData({
                ...result,
                questions,
                answers: initialAnswers
            });
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err instanceof Error ? err.message : 'Fetch failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (interviewId) {
            fetchData();
        }
    }, [interviewId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!data) return <div>No data found</div>;

    return (
        <main className="flex min-h-screen w-screen flex-col items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-3xl">
                <h1 className="text-3xl font-bold text-center mb-8">Let's Begin the Test</h1>
            </div>
            <div className="p-6">
                <h1 className="text-2xl font-bold">{data.role} Interview</h1>
                <p>{data.experience} years experience</p>

                <div className="w-full">
                    <div className="mt-8 lg:w-6xl">
                        <Questions
                            questions={data.questions || []}
                            initialAnswers={Array(data.questions?.length || 0).fill('')}
                            role={data.role}
                            interviewId={interviewId}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}