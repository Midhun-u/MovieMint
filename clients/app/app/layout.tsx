import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Footer from "@/components/layout/Footer";
import StoreProvider from "@/components/features/StoreProvider";
import ToastMessage from "@/components/context/components/ToastMessage";
import Theme from "@/components/features/Theme";
import "./globals.css"

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: "MovieMint",
  description: "A movie ticket booking platform",
  icons: {
    icon: '/assets/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${spaceGrotesk.variable} bg-background-color text-foreground-theme-color h-dvh overflow-scroll relative`}
        id="body"
      >
        <StoreProvider>
          <Theme />
          <main className="w-full h-dvh overflow-scroll">
            <ToastMessage>
              {children}
            </ToastMessage>
            <Footer />
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
