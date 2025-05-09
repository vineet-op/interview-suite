"use client"

import React, { use, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Modal from '@/components/Modal/page'
import axios from 'axios'
import Link from 'next/link'

interface InterviewInfo {
    role: string
    jobDescription: string
    createdAt: string
    interviewId: string
}

const page = () => {


    const [open, setOpen] = useState<boolean>(false)
    const [interviewInfo, setInterviewInfo] = useState<InterviewInfo[]>([])

    async function getInterviewInfo() {
        const response = await axios.get("https://interview-suite.vercel.app/api/get-interview-info")
        setInterviewInfo(response.data.interview)
    }

    useEffect(() => {
        getInterviewInfo()
    }, [])


    return (
        <div className="w-screen h-screen pt-16  bg-gray-950 relative overflow-hidden ">
            <div className="flex gap-4">
                <Button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 text-center cursor-pointer bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-500 text-black font-medium px-4 py-2 rounded-xl w-[356px] h-[73px] border-0 shadow-md font-sans"
                >
                    <Plus />
                    Start new interview
                </Button>
            </div>
            {open && <div>
                <Modal onClose={() => setOpen(false)} />
            </div>}

            <div className='flex flex-col items-stretch w-full'>
                <div className='text-2xl font-medium mt-10 font-sans text-teal-500'>
                    Previous Interview
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 mt-5 pr-4">
                    {interviewInfo.map((data, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                            {/* Gradient accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-teal-400"></div>

                            {/* Blur effect */}
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-teal-500/10 rounded-full filter blur-xl opacity-0 group-hover:opacity-70 transition-opacity"></div>

                            <div className="relative z-10 ">
                                <div className="text-lg  font-semibold text-teal-400 group-hover:text-teal-300 mb-2">Role: {" "}{data?.role}</div>

                                <Link href={`/interview/${data?.interviewId}/feedback`}>
                                    <Button className=' m-2 cursor-pointer font-sans text-teal-500 border border-teal-300'>View Feedback</Button>
                                </Link>

                                <Link href={`/interview/${data?.interviewId}`}>
                                    <Button className=' m-2 cursor-pointer font-sans text-teal-500 border border-teal-300'>Try Again</Button>
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default page