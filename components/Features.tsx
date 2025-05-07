import React from 'react'
import { Mic, FileText, Send } from "lucide-react"
import FeatureCard from "@/components/feature-card"

const Features = () => {
    return (
        <section className="py-24 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl"></div>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 relative z-10">
                    <div className="font-sans inline-flex items-center px-3 py-1 rounded-full border border-gray-700 bg-gray-800/50 text-sm text-teal-400 mb-4">
                        <span className="flex h-2 w-2 rounded-full bg-teal-400 mr-2"></span>
                        Key Features
                    </div>
                    <h2 className="text-3xl md:text-4xl font-sans mb-4 text-white">
                        Powerful Tools to Help You{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
                            Succeed
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-sans">
                        Our platform offers everything you need to prepare for your next interview
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Mic className="h-8 w-8 text-teal-400" />}
                        title="AI Mock Interview"
                        description="Practice with our AI interviewer that adapts to your responses and provides real-time feedback."
                    />
                    <FeatureCard
                        icon={<Send className="h-8 w-8 text-teal-400" />}
                        title="Outreach Templates"
                        description="Access customizable templates for reaching out to recruiters and following up after interviews."
                    />
                    <FeatureCard
                        icon={<FileText className="h-8 w-8 text-teal-400" />}
                        title="Resume Review"
                        description="Get detailed feedback on your resume from our AI to help you stand out to employers."
                    />
                </div>
            </div>
        </section>
    )
}

export default Features
