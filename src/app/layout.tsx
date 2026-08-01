import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Syncopate, Chakra_Petch, Share_Tech_Mono } from "next/font/google"; // Assuming these are available or I should swtich to Inter if not, but create-next-app included them.
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "The Rooftop Crawler | Spider-Man Portfolio",
  description: "A Spider-Man themed immersive portfolio experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${syncopate.variable} ${chakraPetch.variable} ${shareTechMono.variable} antialiased bg-spider-black text-spider-white`}
      >
        {children}
      </body>
    </html>
  );
}

