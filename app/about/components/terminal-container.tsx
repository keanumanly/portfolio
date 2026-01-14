
"use client";
import { AnimatedSpan, Terminal, TypingAnimation } from "../../components/ui/terminal"
import { AboutData } from "@/lib/data";

export const TerminalContainer = () => {
    return (
        <section id="detail">
          <Terminal>
            <TypingAnimation delay={0}>$ npx install software-engineer</TypingAnimation>
            <AnimatedSpan className="text-green-500">
              ✔ Named: {AboutData.name}
            </AnimatedSpan>
            <AnimatedSpan className="text-green-500">
              ✔ Role: {AboutData.title}
            </AnimatedSpan>
            <AnimatedSpan className="text-green-500">
              ✔ Base: {AboutData.location}
            </AnimatedSpan>
            <AnimatedSpan className="text-blue-500">
              <span>ℹ Expertise:</span>
              {
                AboutData.expertise.map((item, index) => (
                    <span key={item+index}className="pl-2">- {item}</span>
                ))
              }
            </AnimatedSpan>
            <AnimatedSpan className="text-blue-500">
              <span>ℹ Personal interests:</span>
              {
                AboutData.interest.map((item, index) => (
                    <span key={item+index}className="pl-2">- {item}</span>
                ))
              }
            </AnimatedSpan>
          </Terminal>
        </section>
        )
}