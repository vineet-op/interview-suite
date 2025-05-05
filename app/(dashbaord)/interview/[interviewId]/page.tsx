'use client'
import { Questions } from '@/components/Questions';
import Record from '@/components/Record';
import React, { useEffect, useState } from 'react'

interface InterviewData {
    interviewId: number;
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

export default function Page({ params }: { params: { interviewId: string } }) {
    const interviewId = params.interviewId;
    const [data, setData] = useState<InterviewData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/getquestions/${interviewId}`);
                if (!res.ok) throw new Error('Failed to fetch');

                const result = await res.json();

                // Fallback parsing if API doesn't provide parsedQuestions
                const questions = result.parsedQuestions ||
                    (result.aiResponse ? JSON.parse(result.aiResponse).questions : []);

                setData({
                    ...result,
                    parsedQuestions: questions
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Fetch failed');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [interviewId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!data) return <div>No data found</div>

    return (
        <main className="flex min-h-screen w-screen flex-col items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-3xl">
                <h1 className="text-3xl font-bold text-center mb-8">Let's Begin the Test</h1>
            </div>
            <div className="p-6">
                <h1 className="text-2xl font-bold">{data?.role} Interview</h1>
                <p>{data?.experience} years experience</p>

                <div className=' w-full'>
                    <div className="mt-8 lg:w-6xl">
                        <Questions
                            questions={data.parsedQuestions?.map(q => q.question) || data.questions || []}
                            initialAnswers={data.parsedQuestions?.map(q => q.answer) || data.answers || []}
                            role={data.role}
                            interviewId={interviewId}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}