import type { Comment, CreateCommentBody } from '@/types/api/comment'

export async function getComments(slug: string): Promise<Comment[]> {
    const res = await fetch(`http://localhost:3001/comment/${slug}/comments`)

    if (!res.ok) return []

    return await res.json()
}

export async function postComment(body: CreateCommentBody, token: string) {
    const res = await fetch('http://localhost:3001/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })

    if (!res.ok) return

    return res
}

export async function replyComment(body: CreateCommentBody, token: string) {
    const res = await fetch('http://localhost:3001/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })

    if (!res.ok) return

    return res
}
