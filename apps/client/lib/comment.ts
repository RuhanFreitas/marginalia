export async function getComments(slug: string) {
    const res = await fetch(`http://localhost:3001/comment/${slug}/comments`)

    if (!res.ok) return []

    return await res.json()
}

export async function postComment(body: any, token: string) {
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

export async function replyComment(body: any, token: string) {
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
