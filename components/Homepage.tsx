'use client'

import { Button } from "./ui/button";
import { useState } from "react";
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Homepage() {

    const [isHovered, setIsHovered] = useState(false)

    return <div className="bg-neutral-200 h-screen min-h-screen">
        <section className="pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-12">
                    <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
                        <Badge className="mb-4 bg-blue-50 text-blue-600 hover:bg-blue-100">
                            Launch Promo: 30% Off First Month
                        </Badge>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900">
                            Ace Your Next Interview with <span className="text-blue-600">AI-Powered</span> Practice
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                            Prep-Suite helps you land your dream job with personalized AI mock interviews, resume reviews, and
                            outreach templates.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    Start Practicing Now
                                    <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </motion.div>
                                </Button>
                            </motion.div>
                            <Button size="lg" variant="outline" className="border-slate-300">
                                Watch Demo
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    </div>
}