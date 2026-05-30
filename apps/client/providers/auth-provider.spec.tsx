import { renderHook, waitFor, act } from '@testing-library/react'
import type { ReactNode } from 'react'

import { AuthProvider, useAuth } from './auth-provider'
import * as authApi from '@/lib/auth'
import { createUser } from '../test/helpers'

vi.mock('@/lib/auth', () => ({
    getCurrentUser: vi.fn(),
}))

function wrapper({ children }: { children: ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>
}

describe('AuthProvider', () => {
    beforeEach(() => {
        vi.mocked(authApi.getCurrentUser).mockReset()
    })

    it('loads current user on mount', async () => {
        const user = createUser()
        vi.mocked(authApi.getCurrentUser).mockResolvedValue(user)

        const { result } = renderHook(() => useAuth(), { wrapper })

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.user).toEqual(user)
    })

    it('clears user when session check fails', async () => {
        vi.mocked(authApi.getCurrentUser).mockResolvedValue(null)

        const { result } = renderHook(() => useAuth(), { wrapper })

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.user).toBeNull()
    })

    it('login and logout update user state', async () => {
        vi.mocked(authApi.getCurrentUser).mockResolvedValue(null)

        const { result } = renderHook(() => useAuth(), { wrapper })

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        const user = createUser()

        act(() => {
            result.current.login(user)
        })

        expect(result.current.user).toEqual(user)

        act(() => {
            result.current.logout()
        })

        expect(result.current.user).toBeNull()
    })

    it('clears user when auth-expired event fires', async () => {
        const user = createUser()
        vi.mocked(authApi.getCurrentUser).mockResolvedValue(user)

        const { result } = renderHook(() => useAuth(), { wrapper })

        await waitFor(() => {
            expect(result.current.user).toEqual(user)
        })

        act(() => {
            window.dispatchEvent(new CustomEvent('auth-expired'))
        })

        expect(result.current.user).toBeNull()
    })

    it('throws when useAuth is used outside provider', () => {
        expect(() => renderHook(() => useAuth())).toThrow(
            'useAuth must be used inside AuthProvider',
        )
    })
})
