import type { Metadata } from "next";
import { Roboto, Anybody } from 'next/font/google'
import "./globals.css"
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import ClientProviders from "./components/ClientProviders";
import { avantGarde, avantGardeCondensed } from "./fonts/avantGarde";


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto'
})

// Alternative libre à "Druk Text Wide Medium" (titres du site RHCP, police commerciale)
const anybody = Anybody({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-anybody'
})

export const metadata: Metadata = {
  // TODO: remplacer par le domaine réel une fois connu
  metadataBase: new URL('https://chilimonks.fr'),
  title: "Chili Monks",
  description: "Chili Monks - Red Hot Chili Peppers Tribute Band. Official website with upcoming shows, videos, and news.",
  keywords: "Chili Monks, Red Hot Chili Peppers tribute, RHCP tribute, rock band, tribute band, concerts, live music",
  authors: [{ name: "Chili Monks" }],
  creator: "Chili Monks",
  publisher: "Chili Monks",
  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "any" },
      { url: "/images/favicon.ico", sizes: "16x16", type: "image/ico" },
      { url: "/images/favicon.ico", sizes: "32x32", type: "image/ico" },
    ],
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  openGraph: {
    title: "Chili Monks",
    description: "Chili Monks - Red Hot Chili Peppers Tribute Band. Official website with upcoming shows, videos, and news.",
    url: "https://chilimonks.fr",
    siteName: "Chili Monks",
    images: [
      {
        url: "/images/chili-monks-logo.png",
        width: 1200,
        height: 630,
        alt: "Chili Monks Logo",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chili Monks",
    description: "Chili Monks - Red Hot Chili Peppers Tribute Band. Official website with upcoming shows, videos, and news.",
    images: ["/images/chili-monks-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${roboto.variable} ${anybody.variable} ${avantGarde.variable} ${avantGardeCondensed.variable} font-avant-garde min-h-screen flex flex-col`}>
        <ClientProviders>
          <Header />
          <main className="pt-50 flex-1">
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
