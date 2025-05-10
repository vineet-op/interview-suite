"use client"

import Cta from "@/components/Cta";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useUser } from '@clerk/nextjs'
import Dialog from "@/components/Dialog";
import { useRef } from "react";


export default function Home() {

  const router = useRouter()
  const dialogRef = useRef<HTMLDivElement>(null);
  const { isLoaded, isSignedIn } = useUser()

  if (isLoaded && isSignedIn) {
    router.replace("/interview")
  }

  const handleScrollToDialog = () => {
    dialogRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-200">
      <Navbar />
      <main className="flex-1">
        <Hero onWatchDemoClick={handleScrollToDialog} />
        <Dialog ref={dialogRef} />
        <div className="flex flex-col lg:flex-row sm:flex-col md:flex-col p-5 gap-10">
          <Features />
        </div>
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

