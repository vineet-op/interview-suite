'use client'

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'


export default function Modal({ onClose }: { onClose: () => void }) {

    const router = useRouter()

    const [role, setRole] = useState<string>('');
    const [experience, setExperience] = useState<string>('');
    const [jobDescription, setJobDescription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);



    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:3000/api/getquestions', {
                role,
                experience,
                jobDescription,
            });

            const responseData = res?.data;
            console.log("responseText", responseData);

            if (responseData?.success && responseData?.interview?.interviewId) {
                router.push(`/interview/${responseData.interview.interviewId}`);
            } else {
                toast("Invalid response format");
            }
        }

        catch (error) {
            console.error('Error generating content:', error);
            toast("Failed to get the data")

        } finally {
            setLoading(false);
            setRole("")
            setExperience("")
            setJobDescription("")
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-gray-950 rounded-lg w-full max-w-xl relative animate-in ease-in zoom-in duration-400 border border-teal-600">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 font-sans"
                >
                    <X className="h-4 w-4" />
                </button>
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-center text-teal-400 mb-6 font-sans">
                        Interview Prep
                    </h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1 font-sans text-teal-400">Role</label>

                                <Input
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    type="text"
                                    className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 font-sans text-teal-400">Experience</label>
                                <Input
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                                />
                            </div>
                            <div>
                                <label className=" text-sm mb-1 font-sans text-teal-400">Job Description</label>
                                <Textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className="w-[530px] h-28 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans"
                                />
                            </div>
                        </div>

                        <Button
                            disabled={loading ? true : false}
                            onClick={onSubmit}
                            className={`w-full bg-teal-500 cursor-pointer font-sans text-black py-2.5 rounded-md hover:bg-teal-600 transition-colors mt-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating Interview
                                </div>
                            ) : (
                                "Start Interview"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}