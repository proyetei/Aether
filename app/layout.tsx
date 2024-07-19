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
          className={`${bodyText.className} bg-gradient-to-b from-slate-900 via-indigo-950 to-black text-indigo-200 relative dark:text-opacity-90`}
        >
          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'var(--background-image)' }}></div>
          {/* SVG at the bottom left corner */}
          {/* <div className="absolute bottom-20 left-20 z-0 lg:scale-90 md:scale-90 sm:scale-50 opacity-50">
            <Image
              alt="Journal bottom left"
              src="/journal.svg"
              width={300} 
              height={300} 
              priority
            />
          </div> */}

          {/* SVG at the top right corner */}
          {/* <div className="absolute z-0 lg:scale-90 md:scale-90 sm:scale-50 opacity-50">
            <Image
              alt="Constellation top right"
              src="/constellation.svg"
              width={300} 
              height={300}
              priority
            />
          </div>  */}

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
