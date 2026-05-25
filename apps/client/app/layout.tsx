import { Inter, Libre_Baskerville } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'
import ThemeScript from '@/components/themeScript/themeScript'
import { AuthProvider } from '@/context/AuthContext'

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
            suppressHydrationWarning
            className={`${inter.className} ${inter.variable} ${baskerville.variable}`}
        >
            <head>
                <ThemeScript />
            </head>
            <body className="bg-background h-full">
                <AuthProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    )
}
