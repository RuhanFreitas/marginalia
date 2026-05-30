import {
    applyTheme,
    DEFAULT_THEME,
    getResolvedTheme,
    getStoredTheme,
    setStoredTheme,
    THEME_STORAGE_KEY,
} from './theme'

describe('theme', () => {
    beforeEach(() => {
        localStorage.clear()
        document.documentElement.className = ''
    })

    it('stores and reads theme from localStorage', () => {
        setStoredTheme('dark')
        expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
        expect(getStoredTheme()).toBe('dark')
    })

    it('returns null for invalid stored values', () => {
        localStorage.setItem(THEME_STORAGE_KEY, 'invalid')
        expect(getStoredTheme()).toBeNull()
    })

    it('resolves to default when nothing is stored', () => {
        expect(getResolvedTheme()).toBe(DEFAULT_THEME)
    })

    it('applies theme class on document element', () => {
        document.documentElement.classList.add('light')
        applyTheme('dark')
        expect(document.documentElement.classList.contains('dark')).toBe(true)
        expect(document.documentElement.classList.contains('light')).toBe(
            false,
        )
    })
})
