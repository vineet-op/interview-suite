"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FeedbackData {
    overallRating: number;
    strengths: string[];
    improvements: string[];
    questionFeedback: {
        question: string;
        answer: string;
        rating: number;
        feedback: string;
        exampleResponse: string;
    }[];
}

interface InterviewData {
    interviewId: string;
    username?: string;
    role: string;
    experience: string;
    jobDescription: string;
    questions: string[];
    answers: string[];
    aiResponse: string;
    feedbackResponse?: FeedbackData;
    createdAt: string;
}

export default function FeedbackPage() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [interview, setInterview] = useState<InterviewData | null>(null);

    async function getFeedback() {
        try {
            setLoading(true);
            // Make sure to use the correct interview ID from params
            const interviewId = params.interviewId;

            if (!interviewId) {
                setError("Interview ID not found");
                setLoading(false);
                return;
            }

            console.log("Fetching feedback for interview ID:", interviewId);
            const response = await axios.get(`/api/submit-feedback?interviewId=${interviewId}`);

            if (response.data.success) {
                console.log("Received interview data:", response.data.interview);
                setInterview(response.data.interview);
            } else {
                setError("Failed to retrieve feedback");
            }
        } catch (err) {
            console.error("Error fetching feedback:", err);
            setError("An error occurred while fetching feedback");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFeedback();
    }, [params.interviewId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Card className="w-full max-w-3xl">
                    <CardHeader>
                        <CardTitle className="text-red-500">Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{error}</p>
                        <button
                            onClick={getFeedback}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Try Again
                        </button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!interview || !interview.feedbackResponse) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Card className="w-full max-w-3xl">
                    <CardHeader>
                        <CardTitle>No Feedback Available</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>No feedback data was found for this interview.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const feedback = interview.feedbackResponse;

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Your Interview Feedback</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div>
                                <span className="text-gray-600">Role:</span> {interview.role}
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Overall Rating:</span>
                                <Badge className={`text-lg ${feedback.overallRating >= 8 ? "bg-green-500" :
                                        feedback.overallRating >= 6 ? "bg-yellow-500" : "bg-red-500"
                                    }`}>
                                    {feedback.overallRating}/10
                                </Badge>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 text-green-600">Strengths</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {feedback.strengths.map((strength, index) => (
                                <li key={index}>{strength}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-amber-600">Areas for Improvement</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {feedback.improvements.map((improvement, index) => (
                                <li key={index}>{improvement}</li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-4">Question-by-Question Feedback</h2>

            {feedback.questionFeedback.map((qf, index) => (
                <Card key={index} className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Question {index + 1}</span>
                            <Badge className={`${qf.rating >= 8 ? "bg-green-500" :
                                    qf.rating >= 6 ? "bg-yellow-500" : "bg-red-500"
                                }`}>
                                {qf.rating}/10
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Question:</h3>
                            <p className="text-gray-700">{qf.question}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Your Answer:</h3>
                            <p className="text-gray-700">{qf.answer}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-blue-600">Feedback:</h3>
                            <p>{qf.feedback}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <h3 className="font-semibold text-green-600">Example Strong Response:</h3>
                            <p>{qf.exampleResponse}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}