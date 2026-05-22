import { handleJsonResponse } from '@/lib/api'
import type { UpdateUserBody, User } from '@/types/api/user'

export async function updateAccount(
    body: UpdateUserBody,
    token: string,
): Promise<User> {
    const res = await fetch(`http://localhost:3001/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })

    return handleJsonResponse<User>(res, 'Failed to update account')
}
