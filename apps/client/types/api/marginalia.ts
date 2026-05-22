import { CommentType } from '@/components/comment/comment'

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
    comments: CommentType[]
}
