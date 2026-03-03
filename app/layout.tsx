import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import { meta } from "@/lib/newdata";
import "@/styles/globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${meta.name} — ${meta.title}`,
    template: `%s | ${meta.name}`,
  },
  description: meta.heroSub,
  keywords: [
    "Full-Stack Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "AWS",
    "Software Engineer Philippines",
  ],
  authors: [{ name: meta.name, url: "https://keanu-sect.vercel.app/" }],
  creator: meta.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://keanu-sect.vercel.app/",
    title: `${meta.name} — ${meta.title}`,
    description: meta.heroStatement,
    siteName: meta.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${syne.variable}`}>
      <body className="noise-overlay">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
