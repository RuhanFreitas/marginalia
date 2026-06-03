import { handleJsonResponse } from '@/lib/api'
import { getApiBaseUrl } from '@/lib/api'
import type { UpdateUserBody, User } from '@/types/api/user'

export async function updateAccount(body: UpdateUserBody): Promise<User> {
    const res = await fetch(`${getApiBaseUrl()}/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    })

    return handleJsonResponse<User>(res, 'Failed to update account')
}
