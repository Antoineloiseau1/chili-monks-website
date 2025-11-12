import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css"
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import { avantGarde, avantGardeCondensed } from "./fonts/avantGarde";


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: "Chili Monks",
  description: "Chili Monks - Red Hot Chili Peppers Tribute Band. Official website with upcoming shows, videos, and news.",
  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "any" },
      { url: "/images/favicon.ico", sizes: "16x16", type: "image/ico" },
      { url: "/images/favicon.ico", sizes: "32x32", type: "image/ico" },
    ],
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${roboto.variable} ${avantGarde.variable} ${avantGardeCondensed.variable} font-stencil min-h-screen flex flex-col`}>
        <Header />
        <main className="pt-50 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
