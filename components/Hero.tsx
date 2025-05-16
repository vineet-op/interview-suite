
'use client'
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignInButton } from '@clerk/nextjs'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

type HeroProps = {
    onWatchDemoClick: () => void;
};

const Hero = ({ onWatchDemoClick }: HeroProps) => {

    return (
        <section id="home" className="py-24 relative overflow-hidden ">
            <div className="absolute inset-0 bg-gradient-to-b from-teal-900/20 to-gray-950/0 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/25 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 flex justify-center items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-4xl text-center space-y-8">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-700 bg-gray-800/50 text-sm text-teal-400 mx-auto font-sans">
                        <span className="flex h-2 w-2 rounded-full bg-teal-400 mr-2"></span>
                        AI-Powered Mock Interview
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-white font-sans">
                        Ace Your Next{" "}
                        <span className="underline decoration-wavy decoration-teal-500 ">
                            Interview
                        </span>{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200 block">
                            <span className="text-white">with</span> Prep-Suite
                        </span>
                    </h1>
                    <p className="text-xl font-sans text-gray-400">
                        Practice interviews, get personalized feedback, and improve your skills with our cutting-edge AI
                        platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <SignInButton mode="modal" forceRedirectUrl="/interview">
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-teal-500 font-sans text-black to-teal-400 hover:from-teal-400 hover:to-teal-700 text-lg py-6 px-8 rounded-xl border-0 cursor-pointer"
                            >
                                Start Practicing Now
                                <motion.div transition={{ duration: 0.3 }}>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </motion.div>
                            </Button>
                        </SignInButton>
                        <Button
                            onClick={onWatchDemoClick}
                            variant="outline"
                            className="text-lg py-6 px-8 font-sans rounded-xl cursor-pointer border-gray-700 text-gray-900 hover:bg-gray-800 hover:text-white"
                        >
                            Watch Demo
                        </Button>
                    </div>
                </motion.div>

            </div>

            <div className="flex justify-center mt-14 z-30 pointer-events-auto">
                <a
                    href="https://peerlist.io/vineetop/project/prepsuite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer inline-block"
                >
                    <Image
                        alt="peerlistlogo"
                        src="/peerlist.svg"
                        width={200}
                        height={300}
                        className="cursor-pointer"
                    />
                </a>
            </div>


        </section >

    )
}

export default Hero
