import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"


export async function GET(req: Request) {

    const experience = await prisma.interviews.findMany({
        where: {
            experience: "1"
        },
        select: {
            role: true,
            interviewId: true,
            jobDescription: true,
            createdAt: true
        }
    })
    return NextResponse.json({
        interview: experience
    })

}