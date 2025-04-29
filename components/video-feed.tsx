import { Card } from "@/components/ui/card"
import { User, Bot } from "lucide-react"

interface VideoFeedProps {
    label: string
    isAI?: boolean
}

export default function VideoFeed({ label, isAI = false }: VideoFeedProps) {
    return (
        <Card className="overflow-hidden rounded-xl shadow-md">
            <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                {isAI ? <Bot className="h-24 w-24 text-gray-600" /> : <User className="h-24 w-24 text-gray-600" />}

                {/* Video overlay elements */}
                <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md text-white text-sm">{label}</div>

                {isAI && (
                    <div className="absolute top-4 right-4 bg-red-500 px-2 py-1 rounded-md text-white text-xs animate-pulse">
                        AI BOT
                    </div>
                )}
            </div>
        </Card>
    )
}
