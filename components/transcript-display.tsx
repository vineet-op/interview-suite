import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function TranscriptDisplay() {
    // This would be populated with actual transcript data in a real implementation
    const sampleTranscript = [
        "Hello, I'm your AI interviewer today.",
        "I'll be asking you a series of questions about your experience and skills.",
        "Let's start with your background. Could you tell me about your previous roles?",
    ]

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>
                    AI Transcript
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-48 overflow-y-auto bg-gray-50 p-4 rounded-md border">
                    {sampleTranscript.map((line, index) => (
                        <p key={index} className="mb-2 leading-relaxed">
                            <span className="font-semibold text-blue-600">AI: </span>
                            {line}
                        </p>
                    ))}
                    <div className="h-5 w-2 bg-gray-400 inline-block animate-pulse ml-1"></div>
                </div>
            </CardContent>
        </Card>
    )
}
