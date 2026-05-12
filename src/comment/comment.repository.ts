import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { CreateCommentDTO } from './dto/create-comment.dto'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateCommentDTO } from './dto/update-comment.dto'
import { Comment } from '../generated/prisma/client'

@Injectable()
export class CommentRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(
        createCommentDTO: CreateCommentDTO,
        id: number,
    ): Promise<Comment> {
        try {
            return await this.prisma.comment.create({
                data: {
                    content: createCommentDTO.content,
                    marginalia: {
                        connect: {
                            id: createCommentDTO.marginaliaId,
                        },
                    },
                    user: {
                        connect: {
                            id: id,
                        },
                    },
                    ...(createCommentDTO.parentId && {
                        parent: {
                            connect: { id: createCommentDTO.parentId },
                        },
                    }),
                },
            })
        } catch (error) {
            throw new InternalServerErrorException('Comment not created')
        }
    }

    async updateById(
        updateCommentDTO: UpdateCommentDTO,
        id: number,
    ): Promise<Comment> {
        try {
            return await this.prisma.comment.update({
                data: {
                    content: updateCommentDTO.content,
                },
                where: { id },
            })
        } catch (error) {
            throw new NotFoundException('It was not possible to update comment')
        }
    }

    async delete(id: number): Promise<Comment> {
        try {
            return await this.prisma.comment.delete({ where: { id } })
        } catch (error) {
            throw new NotFoundException(
                'The comment could not be deleted. It has possibly already been deleted',
            )
        }
    }
}
