import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import StoreProvider from "@/components/features/StoreProvider";
import ToastMessage from "@/components/context/ToastMessage";
import Theme from "@/components/features/Theme";

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
        className={`${spaceGrotesk.variable} bg-background-color text-foreground-theme-color`}
        id="body"
      >
        <StoreProvider>
          <Theme />
          <main className="w-full">
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
