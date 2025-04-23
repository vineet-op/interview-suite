import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export default function Modal({ onClose }: { onClose: () => void }) {

    const router = useRouter()
    const [selectedType, setselectedType] = useState('');
    const [role, setRole] = useState('');
    const [company, setCompany] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    const GetQuestions = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/getquestions", {
                role,
                company,
                jobDescription,
                selectedType
            })
            toast('Questions generated successfully')
        } catch (error) {
            toast("Failed to generate questions")
            throw new Error('Failed to generate questions');

        }
        finally {
            console.log('Questions generation completed')
            router.push('/interview/questions')
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-xl relative animate-in ease-in zoom-in duration-400">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
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

                                <input
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    type="text"
                                    className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 font-sans">Company</label>
                                <input
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className=" text-sm mb-1 font-sans">Job Description</label>
                                <textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className="w-[530px] h-28 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-2 font-sans">Round</label>
                            <div className="flex gap-2">
                                {["Behavioral", "Technical", "Screening Call"].map(
                                    (type, index) => (
                                        <Button
                                            key={index}
                                            className={`font-sans text-xs bg-neutral-500 rounded-full cursor-pointer ${selectedType === type ? 'bg-blue-500 hover:bg-blue-600' : 'hover:bg-blue-500'}`}
                                            onClick={() => setselectedType(type)}
                                        >
                                            {type}
                                        </Button>
                                    )
                                )}
                            </div>
                        </div>

                        <button
                            onClick={GetQuestions}
                            className="w-full bg-blue-500 cursor-pointer  font-sans text-white py-2.5 rounded-md hover:bg-blue-600 transition-colors mt-6"
                        >
                            Start Interview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}