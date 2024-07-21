import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
const inter = Inter({ subsets: ['latin'] })
import Image from 'next/image'
import { Toaster } from '@/components/ui/toaster'
import {dark} from "@clerk/themes";
import { bodyText } from '@/fonts/font'
export const metadata: Metadata = {
  title: 'Aether',
  description: 'A psychological analysis app aimed at improving mental health',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
      <html lang="en">
        <body
          className={`${bodyText.className} bg-gradient-to-b from-[#1a1927] via-[#19172c] to-zinc-950 text-indigo-200 relative dark:text-opacity-90`}
        >
          <div className=' absolute -z-10 right-[20rem] h-[20rem] w-[15rem] rounded-full blur-[10rem] sm:w-[68.75rem] bg-[#a11559]'> </div>
          <div className=' fixed z-0 left-[11rem] h-[20rem] w-[15rem] rounded-full blur-[10rem] sm:w-[68.75rem] bg-[#1a206e]'> </div>
           {/* <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/header.png')" }}> </div> */}
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>

          <Toaster />
        </body>
      </html>
    </ClerkProvider>

  )
}
