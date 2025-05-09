"use client"

import React, { use, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Modal from '@/components/Modal/page'
import axios from 'axios'

interface InterviewInfo {
    role: string
    jobDescription: string
    createdAt: string
}

const page = () => {


    const [open, setOpen] = useState<boolean>(false)
    const [interviewInfo, setInterviewInfo] = useState<InterviewInfo[]>([])

    async function getInterviewInfo() {
        const response = await axios.get("http://localhost:3000/api/get-interview-info")
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

                            <div className="relative z-10">
                                <div className="text-lg font-semibold text-teal-400 group-hover:text-teal-300 mb-2">{data?.role}</div>

                                <div className="text-gray-400 line-clamp-3 group-hover:text-gray-300 mb-3">
                                    {data?.jobDescription}
                                </div>

                                <div className="text-gray-500 text-sm flex items-center">
                                    <span className="inline-block h-2 w-2 rounded-full bg-teal-400 mr-2"></span>
                                    {new Date(data?.createdAt).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "2-digit",
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default page