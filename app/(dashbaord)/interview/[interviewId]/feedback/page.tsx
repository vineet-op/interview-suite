"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SkeletonCard } from '@/components/Skeleton-card'
import Link from 'next/link'

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
            const response = await axios.get(`https://interview-suite.vercel.app/api/submit-feedback?interviewId=${interviewId}`);

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
    }, []);

    if (loading) {
        return (
            <div className='w-screen min-h-screen flex justify-center'>
                <SkeletonCard />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center w-full min-h-screen">
                <Card className="w-full max-w-3xl border border-teal-400 bg-gray-950/10">
                    <CardHeader>
                        <CardTitle className="text-red-500 font-sans font-semibold">Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='font-sans font-semibold text-red-500'>{error}</div>
                        <button
                            onClick={getFeedback}
                            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded font-sans cursor-pointer font-semibold"
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
            <div className="flex justify-center w-full items-center min-h-screen">
                <Card className="w-full max-w-3xl text-center bg-teal-900">
                    <CardHeader>
                        <CardTitle className='font-sans text-2xl text-white'>No Feedback Available for this interview</CardTitle>
                    </CardHeader>
                    <CardContent className='font-sans font-bold text-white underline'>
                        <Link href={"/interview"}>Got to Home</Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const feedback = interview.feedbackResponse;

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold font-sans mb-8 text-teal-400">Your Interview Feedback</h1>

            <Card className="mb-8 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div className='font-sans font-bold text-white text-xl'>
                                <span className="text-white font-sans font-bold">Role:</span> {interview.role}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className='font-sans text-white'>Overall Rating:</span>
                                <Badge className={`text-base ${feedback.overallRating >= 7 ? "bg-green-500" :
                                    feedback.overallRating >= 5 ? "bg-yellow-500" : "bg-red-500"
                                    } font-sans`}>
                                    {feedback.overallRating}/10
                                </Badge>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 text-green-600 font-sans">Strengths</h3>
                        <ul className="list-disc pl-5 space-y-1 font-sans text-white">
                            {feedback.strengths.map((strength, index) => (
                                <li className='font-sans' key={index}>{strength} </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-amber-600 font-sans">Areas for Improvement</h3>
                        <ul className="list-disc pl-5 space-y-1 font-sans text-white">
                            {feedback.improvements.map((improvement, index) => (
                                <li className='font-sans' key={index}>{improvement}</li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <div className="text-2xl font-bold mb-4 text-teal-500 font-sans">Question-by-Question Feedback</div>

            {feedback.questionFeedback.map((qf, index) => (
                <Card key={index} className="mb-6 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center font-sans">
                            <span className='font-sans text-xl text-teal-400'>Question {index + 1}</span>
                            <Badge className={`${qf.rating >= 8 ? "bg-green-500" :
                                qf.rating >= 6 ? "bg-yellow-500" : "bg-red-500"
                                } font-sans `}>
                                {qf.rating}/10
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className='font-sans text-white '>
                            <p className="font-sans text-white">{qf.question}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold font-sans text-teal-400">Your Answer:</h3>
                            <p className=" font-sans text-white">{qf.answer}</p>
                        </div>

                        <div>
                            <h3 className=" font-sans text-teal-400 font-semibold">Feedback:</h3>
                            <p className='font-sans text-white'>{qf.feedback}</p>
                        </div>

                        <div className="bg-gray-800/70 rounded-xl p-5 border border-gray-700">
                            <h3 className="font-semibold font-sans text-teal-400">Example Strong Response:</h3>
                            <p className='font-sans text-white'>{qf.exampleResponse}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}