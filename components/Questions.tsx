"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, Volume } from "lucide-react"


interface QuestionsProps {
    questions: string[];
    initialAnswers: string[];
    role: string;
}

export function Questions({ questions, initialAnswers, role }: QuestionsProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<string[]>(initialAnswers)


    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
    }

    const handlePrevious = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        }
    }

    const handleFinish = () => {
        alert(`${role} interview completed! Thank you for your answers.`)
        console.log("All answers:", answers)
        setCurrentQuestionIndex(0)
        setAnswers(initialAnswers)

    }


    const allQuestionsAnswered = currentQuestionIndex === questions.length - 1

    function textToSpeech(text: any) {
        console.log(text)
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
                <div className="min-h-[120px] p-4 rounded-md border border-gray-300">
                    <Volume onClick={() => textToSpeech(questions[currentQuestionIndex])} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">



                <div className="space-x-2">
                    {allQuestionsAnswered ? (
                        <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
                            Finish
                        </Button>
                    ) : (

                        <div className="flex gap-2 px-1 py-4 text-center items-center justify-center">
                            <Button onClick={handlePrevious} className="flex items-center">
                                <ArrowLeft className=" h-4 w-4" />Previos
                            </Button>

                            <Button onClick={handleNext} className="flex items-center">
                                Next <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card >
    )
}