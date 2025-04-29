import { Button } from "@/components/ui/button"
import VideoFeed from "@/components/video-feed"
import TranscriptDisplay from "@/components/transcript-display"
import { Mic, Phone, PhoneOff } from "lucide-react"

export default function Agent() {
    return (
        <main className="min-h-screen  bg-gray-50 w-7xl p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">AI Interview Platform</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* User Video Feed */}
                    <VideoFeed label="You" />

                    {/* AI Bot Video Feed */}
                    <VideoFeed label="AI Interviewer" isAI />
                </div>

                {/* Call Controls */}
                <div className="flex justify-center gap-4 mb-8">
                    <Button variant="outline" size="lg" className="rounded-full h-14 w-14 p-0">
                        <Mic className="h-6 w-6" />
                    </Button>
                    <Button variant="default" size="lg" className="rounded-full h-14 w-14 p-0 bg-green-600 hover:bg-green-700">
                        <Phone className="h-6 w-6" />
                    </Button>
                    <Button variant="destructive" size="lg" className="rounded-full h-14 w-14 p-0">
                        <PhoneOff className="h-6 w-6" />
                    </Button>
                </div>

                {/* AI Transcript */}
                <TranscriptDisplay />
            </div>
        </main>
    )
}
