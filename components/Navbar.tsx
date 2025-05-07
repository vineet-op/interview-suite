import React from 'react'
import Link from "next/link"
import { Mic, } from "lucide-react"
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
    return (
        <div>
            <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-teal-500 to-teal-400 text-white p-2 rounded-lg">
                            <Mic className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-200">
                            Prep-Suite
                        </span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="font-light text-gray-300 hover:text-teal-400 transition-colors">
                            Home
                        </Link>
                        <Link href="/" className="font-light text-gray-300 hover:text-teal-400 transition-colors">
                            How it Works
                        </Link>
                        <Link href="/" className="font-light text-gray-300 hover:text-teal-400 transition-colors">
                            Features
                        </Link>
                        <Link href="/" className="font-light text-gray-300 hover:text-teal-400 transition-colors">
                            About
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar