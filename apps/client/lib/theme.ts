export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

export const DEFAULT_THEME: Theme = 'light'

export function applyTheme(theme: Theme) {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
}

export function getStoredTheme(): Theme | null {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    return null
}

export function getResolvedTheme(): Theme {
    return getStoredTheme() ?? DEFAULT_THEME
}

export function setStoredTheme(theme: Theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
}
