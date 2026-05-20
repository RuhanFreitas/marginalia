import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'

import { Marginalia, Prisma } from '../generated/prisma/client'

import { PrismaService } from '../prisma/prisma.service'
import { CreateMarginaliaDTO } from './dto/create-marginalia.dto'
import { UpdateMarginaliaDTO } from './dto/update-marginalia.dto'
import { MarginaliaWithComments } from '../types/marginalia'

@Injectable()
export class MarginaliaRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(
        createMarginaliaDTO: CreateMarginaliaDTO,
        id: number,
    ): Promise<Marginalia> {
        try {
            return await this.prisma.marginalia.create({
                data: {
                    cover: createMarginaliaDTO.cover,
                    title: createMarginaliaDTO.title,
                    description: createMarginaliaDTO.description,
                    author: createMarginaliaDTO.author,
                    book: createMarginaliaDTO.book,
                    contentEn: createMarginaliaDTO.contentEn,
                    user: {
                        connect: {
                            id,
                        },
                    },
                },
                include: {
                    comments: true,
                },
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new BadRequestException('Invalid user id')
                }

                console.log(error.message)
                throw new BadRequestException('Failed to create marginalia')
            }

            throw error
        }
    }

    async findAll(): Promise<Marginalia[]> {
        return await this.prisma.marginalia.findMany({
            orderBy: { id: 'desc' },
            include: {
                comments: true,
            },
        })
    }

    async findById(id: number): Promise<MarginaliaWithComments | null> {
        return await this.prisma.marginalia.findUnique({
            where: { id },
            include: {
                comments: true,
            },
        })
    }

    async updateById(
        updateMarginaliaDTO: UpdateMarginaliaDTO,
        id: number,
    ): Promise<Marginalia> {
        try {
            return await this.prisma.marginalia.update({
                data: {
                    cover: updateMarginaliaDTO.cover,
                    author: updateMarginaliaDTO.author,
                    book: updateMarginaliaDTO.book,
                    contentEn: updateMarginaliaDTO.contentEn,
                },
                where: { id },
                include: {
                    comments: true,
                },
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Marginalia not found')
                }

                throw new BadRequestException('Failed to update marginalia')
            }

            throw error
        }
    }

    async delete(id: number): Promise<Marginalia> {
        try {
            return await this.prisma.marginalia.delete({
                where: { id },
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Record not found
                if (error.code === 'P2025') {
                    throw new NotFoundException('Marginalia not found')
                }

                throw new BadRequestException('Failed to delete marginalia')
            }

            throw error
        }
    }
}
