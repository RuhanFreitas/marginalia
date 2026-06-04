const DEFAULT_DEV_API = 'http://localhost:3001'

/** Docker Compose service name for the Nest API (SSR fallback). */
const DEFAULT_INTERNAL_API = 'http://server:3001'

function readPublicApiUrl(): string {
    return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_DEV_API
}

function readInternalApiUrl(): string | undefined {
    return process.env['API_INTERNAL_URL']
}

function isAbsoluteUrl(url: string): boolean {
    return /^https?:\/\//i.test(url)
}

/** Public API base (often `/api` in production behind nginx). */
export const API_BASE_URL = readPublicApiUrl()

/**
 * Base URL for API requests.
 * - Browser: relative `/api` is valid (same origin).
 * - Server (SSR): must be absolute; uses API_INTERNAL_URL or Docker default.
 */
export function getApiBaseUrl(): string {
    if (typeof window !== 'undefined') {
        return readPublicApiUrl()
    }

    const internal = readInternalApiUrl()
    if (internal) {
        return internal.replace(/\/$/, '')
    }

    const publicUrl = readPublicApiUrl()
    if (isAbsoluteUrl(publicUrl)) {
        return publicUrl.replace(/\/$/, '')
    }

    return DEFAULT_INTERNAL_API
}
