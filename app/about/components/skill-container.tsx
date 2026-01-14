"use client";
import { AboutData } from "@/lib/data";
import { Step } from "../components/step"
import { CodeXml, Braces, Cloud, Database, Wrench, Layers } from "lucide-react";
import { IconsContainer } from "./icons-container"

export const iconMap = {
  CodeXml,
  Braces,
  Cloud,
  Database,
  Wrench,
  Layers,
}

export type IconName = keyof typeof iconMap

export const isIconName = (name: string): name is IconName => {
  return name in iconMap
}


export const SkillContainer = ({value}: {value: number}) => {
    return (
        <>
        {
            value ==0 ?
            AboutData.skills.map((item, index)=>(
                <div key={item.name+index}className="flex flex-col lg:border-r py-10 relative group lg:border-l lg:border-b dark:border-neutral-800">
                    <div className="opacity-0 group-hover:opacity-100 transition duration-200 group absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none">
                    </div>
                    <div className="mb-4 relative z-10 px-10">
                        {isIconName(item.icon) && (
                          <IconsContainer name={item.icon} />
                        )}
                    </div>
                    <div className="text-lg font-bold mb-2 relative z-10 px-10">
                      <div className="absolute left-0 inset-y-0 h-6 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-indigo-500 transition duration-200">
                      </div>
                      <span className="group-hover:translate-x-2 transition duration-200 inline-block">{item.name}</span>
                    </div>
                    <div className="text-sm text-muted dark:text-muted-dark max-w-sm mx-auto relative z-10 px-10">
                        {item.decription}
                      <ul className="list-none  mt-2">
                        {
                            item.tech.map((childitm, indx)=>(
                                <Step key={childitm+indx} title={childitm} />
                            ))
                        }
                      </ul>
                    </div>
                  </div>
            ))
            :
            AboutData.skills1.map((item, index)=>(
                <div key={item.name+index}className="flex flex-col lg:border-r py-10 relative group lg:border-l lg:border-b dark:border-neutral-800">
                    <div className="opacity-0 group-hover:opacity-100 transition duration-200 group absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none">
                    </div>
                    <div className="mb-4 relative z-10 px-10">
                        {isIconName(item.icon) && (
                          <IconsContainer name={item.icon} />
                        )}
                    </div>
                    <div className="text-lg font-bold mb-2 relative z-10 px-10">
                      <div className="absolute left-0 inset-y-0 h-6 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-indigo-500 transition duration-200">
                      </div>
                      <span className="group-hover:translate-x-2 transition duration-200 inline-block">{item.name}</span>
                    </div>
                    <div className="text-sm text-muted dark:text-muted-dark max-w-sm mx-auto relative z-10 px-10">
                        {item.decription}
                      <ul className="list-none  mt-2">
                        {
                            item.tech.map((childitm, indx)=>(
                                <Step key={childitm+indx} title={childitm} />
                            ))
                        }
                      </ul>
                    </div>
                  </div>
            ))
        }
        </>
    )
}