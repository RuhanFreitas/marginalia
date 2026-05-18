import { Injectable } from '@nestjs/common'
import { CreateCommentDTO } from './dto/create-comment.dto'
import { CommentRepository } from './comment.repository'
import { UpdateCommentDTO } from './dto/update-comment.dto'

@Injectable()
export class CommentService {
    constructor(private readonly commentRepository: CommentRepository) {}

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
