import type { ReactNode } from "react"

interface FeatureCardProps {
    icon: ReactNode
    title: string
    description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 relative group hover:border-teal-500/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <div className="mb-5 relative z-10">{icon}</div>
            <h3 className="text-xl font-bold mb-3 text-white relative z-10 font-sans">{title}</h3>
            <p className="text-gray-400 relative z-10 font-sans">{description}</p>
        </div>
    )
}
