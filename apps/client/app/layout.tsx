import { Inter, Libre_Baskerville } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const baskerville = Libre_Baskerville({
    subsets: ['latin'],
    variable: '--font-libre_baskerville',
})

export const metadata: Metadata = {
    title: 'Marginalia',
    description: "A reader's note",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={`${inter.className} ${inter.variable} ${baskerville.variable} light`}
        >
            <body className="bg-background h-full">
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    )
}
