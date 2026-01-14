"use client";
import { AboutData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";

export const CertificateContainer = () => {
    return (
        <>
          <p className=" mb-6 sm:mb-8 lg:mb-10 text-center text-3xl sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white ">
          Certifications
          </p>
            <div className="
            mx-auto 
            max-w-6xl 
            px-6 sm:px-8 lg:px-12 
            py-12 
            flex flex-col md:flex-row 
            items-start
            grid grid-cols-1 md:grid-cols-2
            gap-10 ">
                {
                    AboutData.certificate.map((item, index) => (
                        <figure
                            onClick={() => {
                                if(item.url){
                                    window.open("https://www.credly.com/badges/c92fc0b9-57fb-4f5e-a923-06cb24352d52", "_blank", "noopener,noreferrer")
                                }
                            }}
                            className={cn(
                            "relative w-full max-w-md cursor-pointer overflow-hidden rounded-2xl p-5",
                            "bg-white dark:bg-transparent dark:backdrop-blur-md",
                            "transition-all duration-200 ease-out",
                            "hover:scale-[1.02]",
                            "hover:ring-2 hover:ring-indigo-500/60 hover:ring-offset-2",
                            "ring-offset-white dark:ring-offset-black",
                            "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_6px_20px_rgba(0,0,0,.08)]",
                            "dark:border dark:border-white/10",
                            "dark:shadow-[0_-20px_80px_-20px_#ffffff1f_inset]"
                            )}
                            key={item.name+index}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                                    <span className="text-xl text-green-500">
                                    <BadgeCheck />
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <figcaption className="flex flex-wrap items-center gap-1 text-sm sm:text-base font-medium dark:text-white">
                                        <span>{item.name}</span>
                                    </figcaption>
                                    <span className="text-xs text-gray-500">{item.date}</span>
                                    <p className="text-sm text-gray-600 dark:text-white/60">{item.from}</p>
                                </div>
                            </div>
                        </figure>
                    ))
                }
            </div>
        </>
    )
}