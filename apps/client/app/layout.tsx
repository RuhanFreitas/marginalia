import { Inter, Libre_Baskerville } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { Footer, Navbar, ThemeScript } from '@/components/layout'
import { AuthProvider } from '@/providers'

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
