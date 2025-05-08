"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react"
import Record from "./Record"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { GoogleGenAI } from "@google/genai"
import axios from "axios"

interface QuestionsProps {
    questions: string[];
    initialAnswers: string[];
    role: string;
    interviewId: string | number
}

export function Questions({ questions, initialAnswers = [], role, interviewId }: QuestionsProps) {
    const router = useRouter()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<string[]>(
        initialAnswers.length > 0 ? initialAnswers : Array(questions.length).fill("")
    )
    const [isGenerating, setIsGenerating] = useState(false)
    const [recordKey, setRecordKey] = useState(0) // Key to force Record component remount

    // When question index changes, force the Record component to remount
    useEffect(() => {
        setRecordKey(prevKey => prevKey + 1)
    }, [currentQuestionIndex])

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        }
    }

    const handleAnswerSave = (answer: string) => {
        const newAnswers = [...answers]
        newAnswers[currentQuestionIndex] = answer
        setAnswers(newAnswers)
        console.log(`Saving answer for question ${currentQuestionIndex + 1}:`, answer);
    }

    // Make sure your API key is properly configured in your environment
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

    const handleFinish = async () => {
        setIsGenerating(true)
        try {
            // Generate feedback with Gemini
            const prompt = `
                Analyze these interview Q&A for a ${role} position:
                
                Please provide detailed feedback in JSON format with the following structure:
                {
                  "overallRating": number, // 1-10
                  "strengths": string[], // array of strengths
                  "improvements": string[], // array of areas to improve
                  "questionFeedback": [ // detailed feedback for each question
                    {
                      "question": string,
                      "answer": string,
                      "rating": number, // 1-10
                      "feedback": string,
                      "exampleResponse": string
                    },
                    // more question feedback objects...
                  ]
                }
                
                Questions and Answers:
                ${questions.map((q, i) => `Q: ${q}\nA: ${answers[i] || 'No answer'}`).join('\n\n')}
            `

            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [{ role: 'user', parts: [{ text: prompt }] }]
            });

            // Parse JSON response
            const rawResponse = response?.text?.toString() || "";
            console.log("Raw AI response:", rawResponse);

            // Clean and parse the JSON response
            let cleanResponse = rawResponse
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            // Try to find JSON in the response if it's not properly formatted
            let jsonMatch = cleanResponse.match(/(\{[\s\S]*\})/);
            console.log("jsonMatch", jsonMatch);

            if (jsonMatch) {
                cleanResponse = jsonMatch[0];
            }

            console.log("Cleaned response:", cleanResponse);

            let feedback;
            try {
                feedback = await JSON.parse(cleanResponse);
                console.log("Parsed feedback:", feedback);
            } catch (parseError) {
                console.error("Failed to parse JSON:", parseError);
                toast.error("Failed to parse AI feedback response");
                setIsGenerating(false);
                return;
            }

            // Save to database - using the correct endpoint and parameter names that match your schema
            console.log("Saving feedback to database:", {
                interviewId,
                questions,
                answers,
                feedback
            });

            const res = await axios.post("/api/submit-feedback", {
                interviewId,
                questions,
                answers,
                feedback // This will be saved as feedbackResponse in your schema
            });

            if (res.data.success) {
                toast.success("Feedback generated successfully!");
                router.push(`/interview/${interviewId}/feedback`);
            } else {
                throw new Error("Server returned error");
            }
        } catch (error) {
            console.error("Error generating feedback:", error);
            toast.error("Failed to generate feedback");
            setIsGenerating(false);
        }
    }

    function textToSpeech(text: string) {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text)
            window.speechSynthesis.speak(speech)
        }
    }

    return (
        <Card className="w-full shadow-lg">
            <CardHeader>
                <CardTitle>
                    Question {currentQuestionIndex + 1} of {questions.length}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-xl font-medium">{questions[currentQuestionIndex]}</div>
                <div className="min-h-[20px] p-4 rounded-md border border-gray-300 flex gap-2.5 hover:text-blue-600">
                    <div className="font-thin cursor-pointer flex gap-2.5 ">
                        <Volume2 onClick={() => textToSpeech(questions[currentQuestionIndex])} />
                        Tap this icon to say the question
                    </div>
                </div>
                {answers[currentQuestionIndex] && (
                    <div className="p-4 rounded-md bg-gray-50 border border-gray-200">
                        <p className="font-medium mb-1">Your Answer:</p>
                        <p>{answers[currentQuestionIndex]}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="space-x-6 w-full">
                    {currentQuestionIndex === questions.length - 1 ? (
                        <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
                            {isGenerating ? "Generating..." : "Finish"}
                        </Button>
                    ) : (
                        <div className="flex gap-2 px-1 py-4 text-center items-center justify-between">
                            <div>
                                {/* Use a key to force remount when question changes */}
                                <Record
                                    key={recordKey}
                                    onAnswer={handleAnswerSave}
                                />
                            </div>
                            <div className="flex gap-5">
                                <Button
                                    onClick={handlePrevious}
                                    disabled={currentQuestionIndex === 0}
                                    className="flex items-center"
                                >
                                    <ArrowLeft className="h-4 w-4" />Previous
                                </Button>

                                <Button
                                    onClick={handleNext}
                                    disabled={currentQuestionIndex === questions.length - 1}
                                    className="flex items-center"
                                >
                                    Next <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}