'use client'
import React, { useEffect, useState } from 'react'

interface InterviewData {
    interviewId: number;
    role: string;
    experience: string;
    jobDescription: string;
    questions: string[];
    answers: string[];
    aiResponse: string;
    parsedQuestions?: Array<{ // Optional parsed data
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
    if (!data) return <div>No data found</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{data.role} Interview</h1>
            <p>{data.experience} years experience</p>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Questions:</h2>
                {data.parsedQuestions?.length ? (
                    data.parsedQuestions.map((q, i) => (
                        <div key={i} className="mb-6 p-4 border rounded-lg">
                            <h3 className="font-medium">Q: {q.question}</h3>
                            <p className="mt-2 text-gray-600 whitespace-pre-line">
                                A: {q.answer}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No questions available</p>
                )}
            </div>
        </div>
    );
}