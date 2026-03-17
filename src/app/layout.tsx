import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jessa Cake Delights | Custom Cakes in Malandag",
    template: "%s | Jessa Cake Delights",
  },
  description:
    "Order custom cakes for birthdays, christenings, graduations, and celebrations. Handcrafted with love in Malandag, Malungon, Sarangani Province.",
  keywords: [
    "cakes",
    "custom cakes",
    "birthday cakes",
    "Malandag",
    "Malungon",
    "Sarangani Province",
    "Jessa Cakes",
    "order cakes online",
  ],
  openGraph: {
    title: "Jessa Cake Delights",
    description:
      "Handcrafted cakes for every celebration. Order online for pickup or delivery in Malandag, Malungon.",
    type: "website",
    locale: "en_PH",
  },
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
