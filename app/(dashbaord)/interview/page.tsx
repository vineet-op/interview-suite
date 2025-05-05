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
        <div className="w-screen h-screen pt-16 ">
            <div className="text-blue-500 font-semibold text-xl pb-4">
                Interview Prep
            </div>
            <div className="flex gap-4">
                <Button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 text-center cursor-pointer hover:bg-blue-500 hover:text-white justify-center bg-blue-200 text-blue-800 px-4 py-2 rounded-md w-[356px] h-[73px]"
                >
                    <Plus />
                    Start new interview
                </Button>
            </div>
            {open && <div>
                <Modal onClose={() => setOpen(false)} />
            </div>}

            <div className='flex flex-col items-stretch w-full'>
                <div className='text-2xl font-medium mt-10'>
                    Previous Interview
                </div>
                <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-2  max-w-8xl mt-5">
                    {interviewInfo.map((data, index) => (
                        <div key={index} className="group shadow-md rounded-lg py-3 gap-5 border border-gray-200 hover:shadow-lg transition-shadow w-full h-full px-2  hover:bg-blue-500 cursor-pointer">
                            <div className="text-lg font-semibold text-blue-600 group-hover:text-white">{data?.role}</div>
                            <div className="text-gray-600 line-clamp-3 group-hover:text-white">{data?.jobDescription}</div>
                            <div className="text-gray-600 line-clamp-3 group-hover:text-white">
                                {new Date(data?.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: '2-digit'
                                })}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default page