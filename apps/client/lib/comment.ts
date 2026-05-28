import { handleJsonResponse, parseApiError } from '@/lib/api'
import { API_BASE_URL } from '@/lib/config'
import type { Comment, CreateCommentBody } from '@/types/api/comment'

export async function getComments(slug: string): Promise<Comment[]> {
    const res = await fetch(`${API_BASE_URL}/comment/${slug}/comments`, {
        credentials: 'include',
    })

    return handleJsonResponse<Comment[]>(res, 'Failed to load comments')
}

export async function postComment(body: CreateCommentBody): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        throw new Error(await parseApiError(res, 'Failed to post comment'))
    }
}

export async function replyComment(body: CreateCommentBody): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        throw new Error(await parseApiError(res, 'Failed to post reply'))
    }
}
