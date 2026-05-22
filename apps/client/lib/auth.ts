import { handleJsonResponse, parseApiError } from '@/lib/api'
import type { AuthResponse, LoginBody, RegisterBody } from '@/types/api/auth'

export async function login(body: LoginBody): Promise<AuthResponse> {
    const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    return handleJsonResponse<AuthResponse>(res, 'Login failed')
}

export async function register(body: RegisterBody): Promise<AuthResponse> {
    const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    return handleJsonResponse<AuthResponse>(
        res,
        'Please, enter a valid data format',
    )
}

export async function deleteAccount(token: string): Promise<void> {
    const res = await fetch(`http://localhost:3001/user`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        throw new Error(await parseApiError(res, 'Failed to delete account'))
    }
}
