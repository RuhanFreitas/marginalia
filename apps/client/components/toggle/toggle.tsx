'use client'

import {
    applyTheme,
    getResolvedTheme,
    setStoredTheme,
    type Theme,
} from '@/lib/theme'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Toggle() {
    const [theme, setTheme] = useState<Theme | null>(null)

    useEffect(() => {
        setTheme(getResolvedTheme())
    }, [])

    function toggleTheme() {
        const current = theme ?? getResolvedTheme()
        const next: Theme = current === 'light' ? 'dark' : 'light'
        applyTheme(next)
        setStoredTheme(next)
        setTheme(next)
    }

    return (
        <button
            type="button"
            className="text-default"
            onClick={toggleTheme}
            aria-label={
                theme === 'dark'
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
            }
        >
            {theme === null ? (
                <span className="inline-block w-[18px] h-[18px]" aria-hidden />
            ) : theme === 'light' ? (
                <MoonIcon width={18} />
            ) : (
                <SunIcon width={18} />
            )}
        </button>
    )
}
