"use client";
import { cn } from "@/lib/utils"
import { BackgroundBeams } from "../components/ui/background-beams"
import { Marquee } from "../components/ui/marquee"
import { ChevronDown, ChevronUp } from "lucide-react";
import { AboutData } from "@/lib/data";
import { usePathname } from "next/navigation";

export default function FeatProjectPage() {
    const pathname = usePathname();

      const ReviewCard = ({
        img
      }: {
        img: string
      }) => {
        return (
          <figure
            className={cn(
              "relative h-full w-full cursor-pointer overflow-hidden rounded-xl border p-4",
              // light styles
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              // dark styles
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
          >
              <img className="rounded-xl" width="536" height="224" alt="" src={img} />
          </figure>
        )
      }
      
    return(
        <div id="featureproj" className="min-h-screen bg-background relative">
            {
                pathname === "/projects" && <BackgroundBeams />
            }
            <div className="border-b border-border/50">
                <div className="max-w-5xl mx-auto relative">
                <div className="p-3 flex items-center justify-between">
                    <p className="flex flex-col items-start mb-6 sm:mb-8 lg:mb-10 text-center text-3xl sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white ">
                    Selected Works
                    <span className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300 tracking-wide font-normal">Selected projects showcasing my approach to building clean, scalable applications.</span>
                    </p>
                </div>
                </div>
            </div>

            {
                AboutData.project.map((item, index)=>(
                    <div key={item.name+index} className="max-w-5xl mx-auto px-6 lg:px-10 pt-10">
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
                                        <div className="hidden md:block absolute top-2 left-0 w-px h-full bg-border">
                                            <div className="hidden md:block absolute -translate-x-1/2 size-3 bg-primary rounded-full z-10" />
                                        </div>
                                        <div className="space-y-6 relative rounded-xl bg-neutral-900 p-4 pl-6 text-white">
                                            <span className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-indigo-400 to-purple-500"></span>
                                            <div className="relative z-10 flex flex-col gap-2">
                                                <h2 className="text-2xl font-semibold tracking-tight text-balance">
                                                    {item.name}
                                                </h2>
                                                <h4 className="text-1xl font-semibold tracking-tight text-balance">
                                                    {item.role}
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {
                                                        item.languages.map((lang, indx)=>(
                                                            <span key={lang+indx} className="h-6 w-fit px-2 text-xs font-medium bg-muted text-muted-foreground rounded-full border flex items-center justify-center"
                                                            >
                                                                {lang}
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            {
                                                item.screenshots && (
                                            <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance">
                                                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                                                    <Marquee reverse pauseOnHover className="[--duration:15s]">
                                                        {item.screenshots.map((review) => (
                                                        <ReviewCard key={review.username} {...review} />
                                                        ))}
                                                    </Marquee>
                                                    {/* <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
                                                    <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div> */}
                                                </div>
                                                <ul className="space-y-4">
                                                    <li className="text-sm sm:text-base flex text-justify gap-3 rounded-xl px-4 text-neutral-200"> 
                                                        {item.description}
                                                    </li>
                                                </ul>
                                            </div>
                                            )}
                                            { item.apis && (
                                                <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance">
                                                    <ul className="space-y-4">
                                                        <li className="text-sm sm:text-base flex text-justify gap-3 rounded-xl px-4 text-neutral-200">
                                                            {item.description}
                                                        </li>
                                                    </ul>
                                                    <details className="group rounded-lg border-b  p-4">
                                                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-white">
                                                        <span>Features:</span>

                                                        {/* Icons */}
                                                        <span className="relative h-4 w-4">
                                                        <ChevronDown className="absolute inset-0 transition-opacity group-open:opacity-0" />
                                                        <ChevronUp className="absolute inset-0 opacity-0 transition-opacity group-open:opacity-100" />
                                                        </span>
                                                    </summary>

                                                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                                                        {
                                                            item.apis.map((api, indx)=> (
                                                                <li key={api+indx} className="text-sm sm:text-base text-neutral-200">
                                                                    {api}
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                    </details>
                                                </div>

                                            )}
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