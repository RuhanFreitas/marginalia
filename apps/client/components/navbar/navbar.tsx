'use client'

import Link from 'next/link'
import Toggle from '../toggle/toggle'
import { useAuth } from '@/context/AuthContext'
import { UserIcon } from 'lucide-react'

export default function Navbar() {
    const { user, logout } = useAuth()

    return (
        <nav className="sticky top-0 z-100 bg-background border-b border-foreground/10">
            <div className="mx-auto max-w-5xl py-6 flex justify-between items-center px-8 sm:px-0">
                <div className="flex gap-4 items-center">
                    <Link href="/">
                        <span className="font-display text-2xl font-semibold tracking-wide text-default">
                            Marginalia
                        </span>
                    </Link>
                    <span className="text-default/60 hidden text-xs font-semibold tracking-widest sm:inline">
                        A READER'S NOTES
                    </span>
                </div>

                <div className="flex gap-4">
                    {user ? (
                        user && (
                            <>
                                <Link href="/settings">
                                    <button className="flex cursor-pointer transition items-center gap-2 justify-center text-default text-xs font-display hover:text-default-foreground hover:bg-foreground border border-foreground/10 px-4 py-2">
                                        <UserIcon width={12} />{' '}
                                        {user.name.split(' ')[0]}
                                    </button>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="flex cursor-pointer transition items-center bg-foreground text-default-foreground hover:bg-default-foreground hover:text-default gap-2 text-xs border border-default/10 px-4 py-2"
                                >
                                    Log out
                                </button>
                            </>
                        )
                    ) : (
                        <>
                            <Link href="/login">
                                <button className="flex cursor-pointer transition items-center hover:bg-foreground hover:text-default-foreground gap-2 text-default text-xs border border-default/10 px-4 py-2">
                                    Log In
                                </button>
                            </Link>

                            <Link href="/register">
                                <button className="flex cursor-pointer transition items-center gap-2 border border-transparent hover:border-default/10 hover:bg-default-foreground hover:text-default bg-foreground text-default-foreground text-xs px-4 py-2">
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
