import type { Comment } from '../types/comment'

export function buildCommentTree(comments: Comment[]): Comment[] {
    const map = new Map<number, Comment>()
    const roots: Comment[] = []

    for (const comment of comments) {
        map.set(comment.id, { ...comment, replies: [] })
    }

    for (const comment of map.values()) {
        if (comment.parentId) {
            const parent = map.get(comment.parentId)
            if (parent) {
                parent.replies!.push(comment)
            } else {
                roots.push(comment)
            }
        } else {
            roots.push(comment)
        }
    }

    return roots
}
