import { handleJsonResponse, parseApiError } from '@/lib/api'
import type { Comment, CreateCommentBody } from '@/types/api/comment'

export async function getComments(slug: string): Promise<Comment[]> {
    const res = await fetch(`http://localhost:3001/comment/${slug}/comments`)

    return handleJsonResponse<Comment[]>(res, 'Failed to load comments')
}

export async function postComment(
    body: CreateCommentBody,
    token: string,
): Promise<void> {
    const res = await fetch('http://localhost:3001/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        throw new Error(await parseApiError(res, 'Failed to post comment'))
    }
}

export async function replyComment(
    body: CreateCommentBody,
    token: string,
): Promise<void> {
    const res = await fetch('http://localhost:3001/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        throw new Error(await parseApiError(res, 'Failed to post reply'))
    }
}
