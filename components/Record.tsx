'use client'

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from "sonner";

interface RecordProps {
    question: string;
    questionIndex: number;
    onAnswer: (answer: string) => void;
    currentAnswer: string
}

export default function Record({ question, questionIndex, onAnswer, currentAnswer }: RecordProps) {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    const [userAnswer, setUserAnswer] = useState("");

    const handleRecording = () => {
        if (isRecording) {
            stopSpeechToText();
            if (userAnswer.length < 10) {
                toast.error("Answer too short");
                return;
            }

            onAnswer(userAnswer);
        } else {
            setUserAnswer("");
            startSpeechToText();
        }
    };

    useEffect(() => {
        setUserAnswer(currentAnswer || "");
    }, [currentAnswer]);


    useEffect(() => {
        if (error) {
            toast.error("Speech recognition error");
        }
    }, [error]);

    useEffect(() => {
        const fullTranscript = results
            .map(result => typeof result === 'string' ? result : result?.transcript)
            .join(' ');
        setUserAnswer(fullTranscript);
    }, [results]);

    return (
        <div>
            <Button onClick={handleRecording}>
                {isRecording ? "Stop Recording" : "Start Answer"}
            </Button>
            {userAnswer && (
                <div className="mt-2 p-2 border rounded bg-gray-50">
                    <strong>Transcript:</strong> {userAnswer}
                </div>
            )}
        </div>
    );
}
