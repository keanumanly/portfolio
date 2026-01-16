"use client";
import { BackgroundBeams } from "../components/ui/background-beams"
import { AboutData } from "@/lib/data";
import { usePathname } from "next/navigation";

export default function ExperiencePage() {
    const pathname = usePathname();
    return (
        <div id="experience" className="min-h-screen bg-background relative">
            {
                pathname === "/experience" && <BackgroundBeams />
            }
            <div className="border-b border-border/50">
                <div className="max-w-5xl mx-auto relative">
                <div className="p-3 flex items-center justify-between">
                    <p className=" mb-6 sm:mb-8 lg:mb-10 text-center text-3xl sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white ">
                    Experience
                    </p>
                </div>
                </div>
            </div>
            {
                AboutData.experience.map((item, index)=> (
                    <div key={item.company+index}className="max-w-5xl mx-auto px-6 lg:px-10 pt-10">
                        <div className="relative">
                            <div  className="relative">
                                <div className="flex flex-col md:flex-row gap-y-6">
                                    <div className="md:w-48 flex-shrink-0">
                                        <div className="md:sticky md:top-8 pb-10">
                                            <time className="text-sm font-semibold text-muted-foreground block mb-3">
                                                {item.period}
                                            </time>
                                            <div className="inline-flex relative z-10 items-center justify-center w-10 h-10 text-foreground border border-border rounded-lg font-medium font-bold">
                                            {item.version}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 md:pl-8 relative pb-10">
                                        {/* Vertical timeline line */}
                                        <div className="hidden md:block absolute top-2 left-0 w-px h-full bg-border">
                                        {/* Timeline dot */}
                                        <div className="hidden md:block absolute -translate-x-1/2 size-3 bg-primary rounded-full z-10" />
                                        </div>
                    
                                        <div className="space-y-6 relative rounded-xl bg-neutral-900 p-4 pl-6 text-white">
                                            <span className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-indigo-400 to-purple-500"></span>
                                            <div className="relative z-10 flex flex-col gap-2">
                                                <h2 className="text-2xl font-semibold tracking-tight text-balance">
                                                    {item.role}
                                                </h2>
                                                <h4 className="text-1xl font-semibold tracking-tight text-balance">
                                                    {item.company}
                                                </h4>
                    
                                                {/* Tags */}
                                                {/* <div className="flex flex-wrap gap-2">
                                                    <span className="h-6 w-fit px-2 text-xs font-medium bg-muted text-muted-foreground rounded-full border flex items-center justify-center"
                                                    >
                                                        JavaScript
                                                    </span>
                                                    <span className="h-6 w-fit px-2 text-xs font-medium bg-muted text-muted-foreground rounded-full border flex items-center justify-center"
                                                    >
                                                        Python
                                                    </span>
                                                </div> */}
                                            </div>
                                            <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance">
                                                <ul className="space-y-4">
                                                    {item.responsibilities.map((chlditm, indx)=>(
                                                        <li key={"li"+indx}className="text-sm sm:text-base flex text-justify gap-3 rounded-xl px-4 text-neutral-200"> 
                                                            {chlditm}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
            }
        </div>
    )
}