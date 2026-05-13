import { Comment, Marginalia } from '../generated/prisma/client'

export type MarginaliaWithComments = Marginalia & {
    comments: Comment[]
}
