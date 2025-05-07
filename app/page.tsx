import Cta from "@/components/Cta";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-200">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="flex flex-col lg:flex-row sm:flex-col md:flex-col p-5 gap-10">
          <Features />
        </div>
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

