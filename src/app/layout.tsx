import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Footer from "@/components/Footer";
import StoreProvider from "@/components/providers/StoreProvider";
import { Toaster } from "react-hot-toast";
import { dark } from '@clerk/themes'



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "PlayCodeHub",
  description: "PlayCodeHub is a an online coding playground for developers to test, share and collaborate on code snippets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      afterSignOutUrl={"/"} 
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "#111827",
          colorInputBackground: "#111827",
          colorPrimary: "#c2410c",
          colorTextOnPrimaryBackground: "white"
        }
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col`}
          >
            <StoreProvider>
              <ConvexClientProvider>
                  {children}
              </ConvexClientProvider>
              
              
            </StoreProvider>

            <Toaster 
              position="top-center"
            />
        </body>
      </html>
    </ClerkProvider>
  );
}
