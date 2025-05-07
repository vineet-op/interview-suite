'use client';
import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

const Cta = () => {



    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/30 to-purple-900/30 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/40 rounded-full filter blur-3xl"></div>
            <div className="container mx-auto px-4 text-center relative z-10 w-full">

                <div className="max-w-8xl mx-4 bg-gray-900/90 backdrop-blur-sm p-12 rounded-3xl border border-teal-100">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-sans">Ready to Ace Your Next Interview?</h2>
                    <p className="text-xl mb-8 text-gray-400 font-sans">
                        Join thousands of job seekers who have improved their interview skills and landed their dream jobs.
                    </p>
                    <a href="#home">
                        <Button
                            className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-white text-lg py-6 px-8 rounded-xl border-0 font-sans text-center cursor-pointer">
                            Get Started for Free
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Cta
