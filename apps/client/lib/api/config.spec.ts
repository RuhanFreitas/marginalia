import { afterEach, describe, expect, it, vi } from 'vitest'

describe('getApiBaseUrl', () => {
    afterEach(() => {
        vi.unstubAllEnvs()
    })

    it('uses relative public URL in the browser', async () => {
        vi.stubEnv('NEXT_PUBLIC_API_URL', '/api')
        vi.stubEnv('API_INTERNAL_URL', 'http://server:3001')

        const { getApiBaseUrl } = await import('./config')

        expect(getApiBaseUrl()).toBe('/api')
    })

    it('uses internal absolute URL during SSR when set', async () => {
        vi.stubEnv('NEXT_PUBLIC_API_URL', '/api')
        vi.stubEnv('API_INTERNAL_URL', 'http://server:3001')

        const originalWindow = globalThis.window
        // @ts-expect-error simulate SSR
        delete globalThis.window

        vi.resetModules()
        const { getApiBaseUrl } = await import('./config')

        expect(getApiBaseUrl()).toBe('http://server:3001')

        globalThis.window = originalWindow
    })

    it('falls back to Docker internal URL during SSR when public URL is relative', async () => {
        vi.stubEnv('NEXT_PUBLIC_API_URL', '/api')
        vi.stubEnv('API_INTERNAL_URL', '')

        const originalWindow = globalThis.window
        // @ts-expect-error simulate SSR
        delete globalThis.window

        vi.resetModules()
        const { getApiBaseUrl } = await import('./config')

        expect(getApiBaseUrl()).toBe('http://server:3001')

        globalThis.window = originalWindow
    })
})
