import React from 'react'
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";


const Dialog = () => {
    return (
        <div className='w-4xl mx-auto mt-52 flex justify-center flex-col'>
            <div className="font-sans inline-flex items-center px-3 py-1 rounded-full border border-gray-700 bg-gray-800/50 text-sm text-teal-400 mb-4 mx-auto text-center">
                <span className="flex h-2 w-2 rounded-full bg-teal-400 mr-2"></span>
                How it Works
            </div>
            <div className='font-sans text-3xl pt-5 text-white mx-auto text-center'>Getting<span className='text-teal-400'> Started</span> </div>
            <HeroVideoDialog
                className="block dark:hidden pt-5"
                animationStyle="from-center"
                videoSrc="https://www.example.com/dummy-video"
                thumbnailSrc="https://www.example.com/dummy-thumbnail.png"
                thumbnailAlt="Dummy Video Thumbnail"
            />
        </div>
    )
}

export default Dialog
