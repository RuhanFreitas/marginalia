import { handleJsonResponse, parseApiError } from '@/lib/api'
import { API_BASE_URL } from '@/lib/config'
import type { AuthResponse, LoginBody, RegisterBody } from '@/types/api/auth'

export async function login(body: LoginBody): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    })

    return handleJsonResponse<AuthResponse>(res, 'Login failed')
}

export async function register(body: RegisterBody): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    })

    return handleJsonResponse<AuthResponse>(
        res,
        'Please, enter a valid data format',
    )
}

export async function logout(): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    })

    if (!res.ok) {
        throw new Error(await parseApiError(res, 'Failed to logout'))
    }
}

export async function deleteAccount(): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/user`, {
        method: 'DELETE',
        credentials: 'include',
    })

    if (!res.ok) {
        throw new Error(await parseApiError(res, 'Failed to delete account'))
    }
}
