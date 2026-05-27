import { Injectable } from '@nestjs/common'

import { Comment } from '../generated/prisma/client'

import { CreateCommentDTO } from './dto/create-comment.dto'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateCommentDTO } from './dto/update-comment.dto'
import { handlePrismaError } from '../helpers/prisma-error.helper'

@Injectable()
export class CommentRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByMarginaliaId(id: number) {
        return this.prisma.comment.findMany({
            where: { marginaliaId: id },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })
    }

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
            handlePrismaError(error, 'Failed to create comment')
        }
    }

    async updateById(
        updateCommentDTO: UpdateCommentDTO,
        id: number,
        userId: number,
    ): Promise<Comment> {
        try {
            return await this.prisma.comment.update({
                data: {
                    content: updateCommentDTO.content,
                },
                where: { id, userId },
            })
        } catch (error) {
            handlePrismaError(error, 'Failed to update comment')
        }
    }

    async delete(id: number, userId: number): Promise<Comment> {
        try {
            return await this.prisma.comment.delete({
                where: { id, userId },
            })
        } catch (error) {
            handlePrismaError(error, 'Failed to delete comment')
        }
    }
}
