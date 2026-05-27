import { Injectable } from '@nestjs/common'

import { Marginalia } from '../generated/prisma/client'

import { PrismaService } from '../prisma/prisma.service'
import { CreateMarginaliaDTO } from './dto/create-marginalia.dto'
import { UpdateMarginaliaDTO } from './dto/update-marginalia.dto'
import { MarginaliaWithComments } from '../types/marginalia'
import { handlePrismaError } from '../helpers/prisma-error.helper'

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
            handlePrismaError(error, 'Failed to create marginalia')
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
            handlePrismaError(error, 'Failed to update marginalia')
        }
    }

    async delete(id: number): Promise<Marginalia> {
        try {
            return await this.prisma.marginalia.delete({
                where: { id },
            })
        } catch (error) {
            handlePrismaError(error, 'Failed to delete marginalia')
        }
    }
}
