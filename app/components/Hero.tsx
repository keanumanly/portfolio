"use client";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function Hero() {
    return (
    <div id="hero" className="relative flex min-h-screen h-full w-full flex-col items-start justify-start overflow-hidden">
        <BackgroundRippleEffect />
        <div className="mt-60 w-full">
            <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
                Keanu Ely Gilbert Manly
            </h2>
            <h2 className="relative z-10 mx-auto mt-4 max-w-1xl text-center text-1xl font-bold text-neutral-800 md:text-1xl lg:text-3xl dark:text-neutral-100">
                Software Engineer
            </h2>
            {/* <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
                Turning complex problems into scalable software solutions.
            </p> */}
            <div className="relative z-10 mx-auto mt-4 text-center">
                <TextGenerateEffect words={"Building intelligent systems with human intent."} />
            </div>
        </div>
  
        <div className="relative z-10 flex flex-col items-center gap-3 mt-12 w-full sm:flex-row sm:justify-center sm:gap-4 sm:mt-16 lg:mt-20"> 
            <button className="p-[3px] relative cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2  bg-black rounded-[6px] font-bold relative group transition duration-200 text-white hover:bg-transparent">
                    View Projects
                </div>
            </button>
        </div>
    </div>
    );
  }
  