import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'

import { Comment, Prisma } from '../generated/prisma/client'

import { CreateCommentDTO } from './dto/create-comment.dto'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateCommentDTO } from './dto/update-comment.dto'

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
                            id,
                        },
                    },

                    ...(createCommentDTO.parentId && {
                        parent: {
                            connect: {
                                id: createCommentDTO.parentId,
                            },
                        },
                    }),
                },
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Foreign key constraint
                if (error.code === 'P2003') {
                    throw new BadRequestException(
                        'Invalid marginalia id, user id, or parent comment id',
                    )
                }

                // Record not found during connect
                if (error.code === 'P2025') {
                    throw new NotFoundException('Related record not found')
                }

                throw new BadRequestException('Failed to create comment')
            }

            throw error
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
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Record not found
                if (error.code === 'P2025') {
                    throw new NotFoundException('Comment not found')
                }

                throw new BadRequestException('Failed to update comment')
            }

            throw error
        }
    }

    async delete(id: number): Promise<Comment> {
        try {
            return await this.prisma.comment.delete({
                where: { id },
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Record not found
                if (error.code === 'P2025') {
                    throw new NotFoundException('Comment not found')
                }

                throw new BadRequestException('Failed to delete comment')
            }

            throw error
        }
    }
}
