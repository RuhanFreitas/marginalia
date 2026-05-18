'use client'

export default function Toggle() {
    function toggleTheme() {
        document.documentElement.classList.toggle('dark')
    }

    return (
        <button className="text-default" onClick={toggleTheme}>
            Toggle
        </button>
    )
}
