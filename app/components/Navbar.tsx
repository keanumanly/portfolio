import Link from "next/link";
import { FloatingNav } from "./ui/floating-navbar"
import { User, Briefcase, Folder } from "lucide-react";

export default function Navbar() {
    const navItems = [
        {
          name: "About",
          link: "/",
          icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Experience",
            link: "/experience",
            icon: <Briefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Projects",
            link: "/projects",
            icon: (
            <Folder className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
    ];
  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur border-b border-neutral-800">
      <FloatingNav navItems={navItems} />
    </nav>
  );
}
