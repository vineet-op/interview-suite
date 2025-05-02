"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
// import { useMediaQuery } from "@/hooks/use-media-query"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { theme, setTheme } = useTheme()
    // const isDesktop = useMediaQuery("(min-width: 768px)")

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])



    const toggleMenu = () => setIsOpen(!isOpen)

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "FAQ", href: "#faq" },
    ]

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="flex items-center">
                        <motion.a href="/" className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <span className="text-2xl font-bold text-blue-600">Prep-Suite</span>
                        </motion.a>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="text-slate-600 hover:text-blue-600 transition-colors"
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-4">
                            <Button
                                variant="outline"
                                className="border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-600"
                            >
                                Log In
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
                        </div>

                        <button className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100" onClick={toggleMenu}>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white shadow-lg"
                >
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-700 hover:text-blue-600 py-2 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-slate-200 flex flex-col space-y-4">
                                <Button variant="outline" className="w-full border-slate-200">
                                    Log In
                                </Button>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
                            </div>
                        </nav>
                    </div>
                </motion.div>
            )}
        </header>
    )
}
