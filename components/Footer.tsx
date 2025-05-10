import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-400 py-8 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row lg:flex-col gap-5 justify-center items-center">
                    <Link href={"https://x.com/Vineet2OP"}>
                        <p className="text-base cursor-pointer mb-4 md:mb-0 text-center font-sans ">Made with Patience by <span className='underline decoration-wavy decoration-teal-500 font-sans text-teal-500'>
                            Vineet
                        </span> 💖 </p>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
