import { Injectable } from '@nestjs/common'
import { CreateCommentDTO } from './dto/create-comment.dto'
import { CommentRepository } from './comment.repository'
import { UpdateCommentDTO } from './dto/update-comment.dto'
import { buildCommentTree } from '../helpers/build-comment-tree'

@Injectable()
export class CommentService {
    constructor(private readonly commentRepository: CommentRepository) {}

    async getComments(id: number) {
        const comments = await this.commentRepository.findByMarginaliaId(id)

        return buildCommentTree(comments)
    }

    async create(createCommentDTO: CreateCommentDTO, id: number) {
        return await this.commentRepository.create(createCommentDTO, id)
    }

    async updateById(
        updateCommentDTO: UpdateCommentDTO,
        id: number,
        userId: number,
    ) {
        return await this.commentRepository.updateById(
            updateCommentDTO,
            id,
            userId,
        )
    }

    async delete(id: number, userId: number) {
        return await this.commentRepository.delete(id, userId)
    }
}
