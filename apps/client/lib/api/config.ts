const PUBLIC_API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

/** Browser and SSR fallback when no internal URL is set. */
export const API_BASE_URL = PUBLIC_API_URL

/** Server-side fetches in Docker use the internal service URL. */
export function getApiBaseUrl(): string {
    if (typeof window === 'undefined' && process.env.API_INTERNAL_URL) {
        return process.env.API_INTERNAL_URL
    }
    return PUBLIC_API_URL
}
