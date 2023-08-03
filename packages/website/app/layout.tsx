import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin-ext"],
  variable: "--font-code",
  display: "block",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="overflow-y-scroll bg-slate-50 dark:bg-slate-950 dark:text-white"
    >
      <body className={[inter.className, jetBrainsMono.variable].join(" ")}>
        {children}
      </body>
      <Script
        defer
        data-domain="rsc-parser.vercel.app"
        src="/js/script.outbound-links.js"
      ></Script>
    </html>
  );
}
