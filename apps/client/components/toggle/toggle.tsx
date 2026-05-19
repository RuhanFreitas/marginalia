'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useState } from 'react'

export default function Toggle() {
    const [mode, setMode] = useState<boolean>(false)

    function toggleTheme() {
        setMode((prev) => !prev)
        document.documentElement.classList.toggle('dark')
    }

    return (
        <button className="text-default" onClick={toggleTheme}>
            {mode === false ? <MoonIcon width={18} /> : <SunIcon width={18} />}
        </button>
    )
}
