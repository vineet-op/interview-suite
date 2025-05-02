'use client'

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea"
import { GoogleGenAI } from "@google/genai";
import axios from 'axios'

export default function Modal({ onClose }: { onClose: () => void }) {
    const router = useRouter()
    const [role, setRole] = useState<string>('');
    const [experience, setExperience] = useState<string>('');
    const [jobDescription, setJobDescription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [AiResponse, setAiResponse] = useState([]);


    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:3000/api/getquestions', {
                role,
                experience,
                jobDescription,
            });

            const cleanResponse = (res.data.text.replace('```json', '')).replace('```', '')

            if (cleanResponse) {
                console.log(JSON.parse(cleanResponse));
                setAiResponse(cleanResponse || [])
            } else {
                console.error(res.data.error);
            }
        } catch (error) {
            console.error('Error generating content:', error);
        } finally {
            setLoading(false);
            setRole("")
            setExperience("")
            setJobDescription("")
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-xl relative animate-in ease-in zoom-in duration-400">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 font-sans"
                >
                    <X className="h-4 w-4" />
                </button>
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-center text-blue-600 mb-6 font-sans">
                        Interview Prep
                    </h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1 font-sans">Role</label>

                                <Input
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    type="text"
                                    className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 font-sans">Experience</label>
                                <Input
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                                />
                            </div>
                            <div>
                                <label className=" text-sm mb-1 font-sans">Job Description</label>
                                <Textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className="w-[530px] h-28 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                                />
                            </div>
                        </div>

                        <Button
                            disabled={loading ? true : false}
                            onClick={onSubmit}
                            className={`w-full bg-blue-500 cursor-pointer font-sans text-white py-2.5 rounded-md hover:bg-blue-600 transition-colors mt-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Start Interview
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}