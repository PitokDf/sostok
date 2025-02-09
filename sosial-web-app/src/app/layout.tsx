
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'chatSostok',
  description: 'Connect and share with friends on chatSostok',
  icons: "/images/favicon.ico",
  verification: {
    google: "7UVWLjtHfAA1ccchiarJNOFElAmh6e2a4nHTqbosAZU"
  },
  keywords: ["chatSostok", "sosial media", "chatingan", "selingkuh", "pemula"],
  openGraph: {
    title: "chatSostok",
    description: 'Connect and share with friends on chatSostok',
    url: "https://sostok.vercel.app/",
    siteName: "chatSostok",
    images: ["https://sostok.vercel.app/images/favicon.ico"],
    locale: 'id_ID',
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1
    }
  },
  authors: [{
    name: "Pito Desri Pauzi",
    url: "https://protofolio-ashy-one.vercel.app/"
  }]
};

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
