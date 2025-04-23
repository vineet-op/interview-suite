"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Modal from '@/components/Modal/page'

const page = () => {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className="w-full h-screen bg-neutral-100 pt-16 pl-10">
            <div className="text-blue-500 font-semibold text-xl pb-16">
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
        </div>

    )
}

export default page