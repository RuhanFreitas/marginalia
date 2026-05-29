import { DEFAULT_THEME, THEME_STORAGE_KEY } from '@/lib/theme'

const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var theme=t==='dark'||t==='light'?t:'${DEFAULT_THEME}';document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(theme);}catch(e){document.documentElement.classList.add('${DEFAULT_THEME}');}})();`

export default function ThemeScript() {
    return (
        <script
            dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
    )
}
