import {
    CodeXml,
    Braces,
    Cloud,
    Database,
    Wrench,
    Layers,
  } from "lucide-react"
  
  const iconMap = {
    CodeXml,
    Braces,
    Cloud,
    Database,
    Wrench,
    Layers,
  }
  
  type IconName = keyof typeof iconMap
  
  
  export const IconsContainer = ({ name }: { name: IconName }) => {
    const IconComponent = iconMap[name]
    if (!IconComponent) return null
  
    return <IconComponent className="group-hover:text-indigo-500" />
  }
  