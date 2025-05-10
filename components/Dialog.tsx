import React from 'react'
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

const Dialog = () => {
    return (
        <>
            <section className="py-24 bg-gray-900 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900 pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-700 bg-gray-800/50 text-sm text-teal-400 mb-4">
                            <span className="font-sans flex text-sm h-2 w-2 rounded-full bg-teal-400 mr-2"></span>
                            Simple Process
                        </div>
                        <h2 className="font-sans text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
                        <p className=" font-sans text-xl text-gray-400 max-w-3xl mx-auto">Get started in just simple steps</p>
                    </div>

                    <div className="flex justify-center items-center w-full h-full gap-8">
                        <HeroVideoDialog
                            className="h-1/2 w-1/2  border-teal-400 border-2 rounded-xl"
                            animationStyle="from-center"
                            videoSrc="https://www.youtube.com/embed/spSgV8WBoK8"
                            thumbnailSrc="https://www.intermedia-solutions.de/wp-content/uploads/video-thumbnail-01.jpg"
                            thumbnailAlt="Dummy Video Thumbnail"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dialog
