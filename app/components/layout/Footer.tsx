import { meta } from "@/lib/newdata";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-[var(--text-tertiary)]">
          <span className="text-[var(--terminal-green)]">©{year}</span>{" "}
          {meta.firstName}
        </div>

        {/* <div className="font-mono text-xs text-[var(--text-tertiary)] flex items-center gap-1">
          <span>Built with</span>
          <span className="text-[var(--text-secondary)]">Next.js · TypeScript · TailwindCSS</span>
          <span>· Deployed on</span>
          <span className="text-[var(--text-secondary)]">Vercel</span>
        </div> */}

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${meta.email}`}
            className="font-mono text-xs text-[var(--text-tertiary)] hover:text-[var(--terminal-green)] hover:font-bold transition-colors"
          >
            Email
          </a>
          <span className="text-[var(--border)]">·</span>
          <a
            href="https://github.com/keanumanly"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--text-tertiary)] hover:text-[var(--terminal-green)] hover:font-bold transition-colors"
          >
            GitHub
          </a>
          <span className="text-[var(--border)]">·</span>
          <a
            href="https://www.linkedin.com/in/keanu-manly/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--text-tertiary)] hover:text-[var(--terminal-green)] hover:font-bold transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}