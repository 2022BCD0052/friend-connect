"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Loader from "./components/Loader";
import Header from "./components/Header";
import MeetingAction from "./components/MeetingAction";
import MeetingFeature from "./components/MeetingFeature";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(false);
      const hasShownWelcome = localStorage.getItem("hasShownWelcome");
      if (!hasShownWelcome) {
        toast.success(`Welcome back! ${session?.user?.name}!`);
        localStorage.setItem("hasShownWelcome", "true");
      }
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status, session]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
         <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,0,255,0.3),_transparent)] opacity-50 animate-pulse" />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[url('/futuristic-overlay.svg')] bg-cover opacity-20" />
      <div className="absolute inset-0 w-full h-full bg-[url('/cyber-grid.png')] bg-center bg-cover opacity-30 animate-fadeIn" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(255,0,150,0.2),_transparent)] opacity-50" />
      <Header />
      <main className="flex-grow p-8 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div

              className="md:w-1/2 mb-8 md:mb-0 p-5 rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-lg  hover:scale-105 "
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-600 drop-shadow-[0_0_10px_rgba(55,155,205,0.9)] animate-pulse">
              Welcome to Connect Friends
              </h1>
              <p className="text-2xl text-gray-300 mb-12 leading-relaxed tracking-wide animate-fadeIn">
                Experience futuristic video calling with AI-powered enhancements, seamless connectivity, and real-time collaboration.
              </p>
              <MeetingAction />
            </motion.div>

            <motion.div
              className="md:w-1/2 mb-8 md:mb-0 p-3 flex  items-center justify-center rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-lg  hover:scale-105 "
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15),_transparent)] opacity-60 animate-pulse" />
 
              <MeetingFeature />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
