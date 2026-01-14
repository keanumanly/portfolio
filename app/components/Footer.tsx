"use client";
import { FaLinkedin, FaGithub, FaVoicemail } from "react-icons/fa";
import { Send } from 'lucide-react';

export default function Footer() {
    return (
        <>
            <footer className="border-t relative flex flex-col w-full  items-start justify-start">
                <div className="w-full mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
                        <div className="flex flex-col gap-4">
                            <div className="w-full flex items-center space-x-2">
                                <h2 className="text-xl font-bold bg-[linear-gradient(243deg,_#FCB076_2%,_#FB543A_87%)] bg-clip-text text-transparent">Nice to see you here!</h2>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                This website is best viewed on desktop
                            </p>

                            <div className="flex space-x-4">
                                <a 
                                    href="https://www.linkedin.com/in/keanu-manly/" target="_blank" rel="noopener noreferrer"
                                    className="text-neutral-100 hover:text-neutral-400 transition-colors"
                                >
                                    <FaLinkedin className="h-7 w-7"/>
                                </a>

                                <a
                                    href="https://github.com/keanumanly/" target="_blank" rel="noopener noreferrer"
                                    className="text-neutral-100 hover:text-neutral-400 transition-colors"
                                >
                                    <FaGithub className="h-7 w-7"/>
                                </a>

                                <a
                                    href="mailto:manlykeanu@gmail.com" 
                                    className="text-neutral-100 hover:text-neutral-400 transition-colors"
                                >
                                    <Send className="h-7 w-7"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    <p className="text-sm text-muted-foreground">
                        Designed & Developed by Keanu, Copyright © 2026
                    </p>
                </div>
            </footer>
    </>

    )
}