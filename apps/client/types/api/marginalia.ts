import type { Comment } from '@/types/api/comment'

export type Marginalia = {
    id: number
    userId: number
    title: string
    description: string
    cover: string
    book: string
    author: string
    contentEn: string
    createdAt: string
    updatedAt: string
    comments: Comment[]
}

export type CreateMarginaliaBody = {
    title: string
    book: string
    author: string
    description: string
    cover: string
    contentEn: string
}
