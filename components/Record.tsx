'use client'

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useSpeechToText from 'react-hook-speech-to-text';


export default function Record() {
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

    const [userAnswer, setUserAnswer] = useState("")

    useEffect(() => {
        results.forEach((result) => {
            if (typeof result !== 'string') {
                setUserAnswer(prev => prev + result.transcript)
            }
        })
    }, [results])

    return (
        <div>
            <Button onClick={isRecording ? stopSpeechToText : startSpeechToText} className="cursor-pointer px-4 py-1 w-30 bg-green-400 text-white hover:text-black" variant={"outline"}>
                {isRecording ? "Recording..." : "Start Recording"}
            </Button>
            <div>
                {isRecording.toString()}
            </div>
            <Button onClick={() => console.log(userAnswer)}>
                Show Answers
            </Button>
        </div>
    )
}   