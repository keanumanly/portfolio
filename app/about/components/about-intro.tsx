"use client";
import { NumberTicker } from "../../components/ui/number-ticker"
import { AboutData } from "@/lib/data";

export const AboutIntro = () => {
    const aboutText = "text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300 tracking-wide";
    return (
        <section id="profile" className="space-y-5">
          <div className="text-3xl mx-auto font-bold text-neutral-600 dark:text-neutral-200">
            {AboutData.slugan}
          </div>
          <p className={aboutText}>
            {AboutData.summary}
          </p>
          <p className={aboutText}>
            I’m currently at <span className="text-purple-600">Boom AI Solutions OPC</span>, {AboutData.summary1}
          </p>
          <div className="flex items-baseline gap-5">
            <div className="flex flex-col items-center gap-2">
              <NumberTicker
                value={AboutData.yearsexp}
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  font-semibold
                  tracking-tight
                  text-neutral-900
                  dark:text-neutral-100
                "
                // className="text-3xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
              />
              <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 uppercase">
                years experience
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <NumberTicker
                value={AboutData.certificates}
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  font-semibold
                  tracking-tight
                  text-neutral-900
                  dark:text-neutral-100
                "
                // className="text-3xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
              />
              <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 uppercase">
              AWS Certifications
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <NumberTicker
                value={AboutData.projects}
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  font-semibold
                  tracking-tight
                  text-neutral-900
                  dark:text-neutral-100
                "
                // className="text-3xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
              />
              <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 uppercase">
              Projects Built
              </span>
            </div>

          </div>
        </section>
    )

}