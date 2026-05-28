'use client'

import Link from 'next/link'
import Toggle from '../toggle/toggle'
import { useAuth } from '@/context/AuthContext'
import { MenuIcon, UserIcon, XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { logout as logoutFromBackend } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const { user, logout } = useAuth()
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!menuOpen) return

        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false)
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') setMenuOpen(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [menuOpen])

    async function handleLogout() {
        setMenuOpen(false)
        try {
            await logoutFromBackend()
        } catch {
            // Continue logout even if backend call fails
        }
        logout()
        router.push('/')
    }

    return (
        <nav className="sticky top-0 z-100 bg-background border-b border-foreground/10">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-0 md:py-6">
                <div className="flex min-w-0 items-center gap-4">
                    <Link href="/" className="shrink-0">
                        <span className="font-display text-xl font-semibold tracking-wide text-default md:text-2xl">
                            Marginalia
                        </span>
                    </Link>
                    <span className="hidden text-xs font-semibold tracking-widest text-default/60 sm:inline">
                        A READER'S NOTES
                    </span>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                    {user ? (
                        <>
                            <div ref={menuRef} className="relative sm:hidden">
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen((open) => !open)}
                                    aria-expanded={menuOpen}
                                    aria-label={
                                        menuOpen
                                            ? 'Close menu'
                                            : 'Open account menu'
                                    }
                                    className="flex h-9 w-9 cursor-pointer items-center justify-center border border-foreground/10 text-default transition hover:bg-foreground hover:text-default-foreground"
                                >
                                    {menuOpen ? (
                                        <XIcon width={16} />
                                    ) : (
                                        <MenuIcon width={16} />
                                    )}
                                </button>

                                {menuOpen && (
                                    <div className="absolute right-0 top-full z-50 mt-2 flex min-w-[10rem] flex-col border border-default/10 bg-background shadow-sm">
                                        <Link
                                            href="/settings"
                                            onClick={() => setMenuOpen(false)}
                                            className="flex cursor-pointer items-center gap-2 border-b border-default/10 px-4 py-3 text-xs text-default transition hover:bg-foreground hover:text-default-foreground"
                                        >
                                            <UserIcon width={12} />
                                            Profile
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="cursor-pointer px-4 py-3 text-left text-xs text-default transition hover:bg-foreground hover:text-default-foreground"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="hidden items-center gap-4 sm:flex">
                                <Link href="/settings">
                                    <button
                                        type="button"
                                        className="flex h-9 shrink-0 cursor-pointer items-center justify-center gap-2 border border-foreground/10 px-4 font-display text-xs text-default transition hover:bg-foreground hover:text-default-foreground"
                                    >
                                        <UserIcon width={12} />
                                        {user.name.split(' ')[0]}
                                    </button>
                                </Link>
                                <button
                                    type="button"
                                    onClick={logout}
                                    className="flex h-9 shrink-0 cursor-pointer items-center gap-2 border border-default/10 bg-foreground px-4 text-xs text-default-foreground transition hover:bg-default-foreground hover:text-default"
                                >
                                    Log out
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <button
                                    type="button"
                                    className="flex h-9 shrink-0 cursor-pointer items-center gap-2 border border-default/10 px-3 text-xs text-default transition hover:bg-foreground hover:text-default-foreground sm:px-4"
                                >
                                    Log In
                                </button>
                            </Link>

                            <Link href="/register">
                                <button
                                    type="button"
                                    className="flex h-9 shrink-0 cursor-pointer items-center gap-2 border border-transparent bg-foreground px-3 text-xs text-default-foreground transition hover:border-default/10 hover:bg-default-foreground hover:text-default sm:px-4"
                                >
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}

                    <span className="hidden border-l border-default/10 sm:block"></span>

                    <Toggle />
                </div>
            </div>
        </nav>
    )
}
