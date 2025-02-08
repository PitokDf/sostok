
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'SOSTOK',
  description: 'Connect and share with friends on SOSTOK',
  icons: "/images/favicon.ico",
  verification: {
    google: "7UVWLjtHfAA1ccchiarJNOFElAmh6e2a4nHTqbosAZU"
  },
  keywords: ["sostok", "sosial media", "chatingan", "selingkuh", "pemula"],
  openGraph: {
    title: "SOSTOK",
    description: 'Connect and share with friends on SOSTOK',
    url: "https://sostok.vercel.app/",
    siteName: "SOSTOK",
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
