export type CommentBase = {
    id: number
    content: string
    parentId: number | null
    userId: number
    marginaliaId: number
    createdAt: string
    updatedAt: string
    user?: {
        id: number
        name: string
    }
}

export type Comment = CommentBase & {
    replies?: Comment[]
}

export type CreateCommentBody = {
    content: string
    marginaliaId: number
    parentId?: number
}
