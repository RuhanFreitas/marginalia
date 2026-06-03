export function getAuthCookieOptions(maxAge: number) {
    const secure =
        process.env.COOKIE_SECURE === 'true' ||
        (process.env.COOKIE_SECURE !== 'false' &&
            process.env.NODE_ENV === 'production')

    return {
        httpOnly: true,
        secure,
        sameSite: 'lax' as const,
        path: process.env.COOKIE_PATH ?? '/api',
        maxAge,
    }
}
