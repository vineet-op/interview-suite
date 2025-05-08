'use client'

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from "sonner";

interface RecordProps {
    onAnswer: (answer: string) => void;
}

export default function Record({ onAnswer }: RecordProps) {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    const [userAnswer, setUserAnswer] = useState("");
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

    // Reset state when component mounts (new question)
    useEffect(() => {
        setUserAnswer("");
        setIsAnswerSubmitted(false);
    }, []);

    const handleRecording = () => {
        if (!isRecording) {
            // Starting a new recording
            setUserAnswer("");
            setIsAnswerSubmitted(false);
            startSpeechToText();
            toast.info("Recording started. Speak clearly into your microphone.");
        } else {
            // Stopping the recording
            stopSpeechToText();

            // Validate answer length only if we have results
            if (userAnswer.trim().length < 10) {
                toast.error("Please provide a more detailed answer (at least 10 characters)");
                return;
            }

            // Pass the complete answer to parent and mark as submitted
            onAnswer(userAnswer);
            setIsAnswerSubmitted(true);
            toast.success("Answer submitted!");
        }
    };

    useEffect(() => {
        if (error) {
            console.error("Speech recognition error:", error);
            toast.error("Speech recognition error. Please try again.");
        }
    }, [error]);

    // Process speech recognition results
    useEffect(() => {
        if (results && results.length > 0) {
            const fullTranscript = results
                .map(result => typeof result === 'string' ? result : result?.transcript)
                .join(' ');

            // Only update if we have content and haven't submitted
            if (fullTranscript && !isAnswerSubmitted) {
                setUserAnswer(fullTranscript);
                console.log("Speech recognition transcript:", fullTranscript);
            }
        }
    }, [results, isAnswerSubmitted]);

    return (
        <div className="space-y-2">
            <Button
                onClick={handleRecording}
                variant={isRecording ? "destructive" : "default"}
                disabled={isAnswerSubmitted} // Disable after submission
            >
                {isRecording ? (
                    <>
                        <span className="relative flex h-3 w-3 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        Stop Recording
                    </>
                ) : isAnswerSubmitted ? "Answer Submitted" : "Start Answer"}
            </Button>

            <div className="min-h-[40px] p-2 border rounded bg-gray-50">
                {isRecording ? (
                    <div className="text-blue-600">
                        {interimResult || "Listening..."}
                    </div>
                ) : (
                    userAnswer || "Your answer will appear here"
                )}
            </div>

            {isAnswerSubmitted && (
                <div className="text-green-600 text-sm">
                    Answer saved! Use the Next button to continue.
                </div>
            )}
        </div>
    );
}