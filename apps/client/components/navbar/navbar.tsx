'use client'

import Link from 'next/link'
import Toggle from '../toggle/toggle'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
    const { user } = useAuth()

    return (
        <nav className="sticky top-0 z-100 bg-background border-b border-foreground/10">
            <div className="mx-auto max-w-5xl py-6 flex justify-between items-center px-8 sm:px-0">
                <div className="flex gap-4 items-center">
                    <span className="font-display text-2xl font-semibold tracking-wide text-default">
                        Marginalia
                    </span>
                    <span className="text-default/60 hidden text-xs font-semibold tracking-widest sm:inline">
                        A READER'S NOTES
                    </span>
                </div>

                <div className="flex gap-4">
                    {user ? (
                        user ? (
                            <button className="text-default text-sm font-display border border-foreground/10 px-4 py-2">
                                {user.name.split(' ')[0]}
                            </button>
                        ) : (
                            <button>...</button>
                        )
                    ) : (
                        <>
                            <Link href="/login">
                                <button className="flex items-center hover:bg-foreground hover:text-default-foreground gap-2 text-default text-xs border border-default/10 px-4 py-2">
                                    Log In
                                </button>
                            </Link>

                            <Link href="/register">
                                <button className="flex items-center gap-2 border border-transparent hover:border-default/10 hover:bg-default-foreground hover:text-default bg-foreground text-default-foreground text-xs px-4 py-2">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}

                    <span className="border-l border-default/10"></span>

                    <Toggle />
                </div>
            </div>
        </nav>
    )
}
