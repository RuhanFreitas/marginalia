import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateMarginaliaDTO } from './dto/create-marginalia.dto'
import { Marginalia } from '../generated/prisma/client'
import { UpdateMarginaliaDTO } from './dto/update-marginalia.dto'

// have to create a tree with the comments

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
                    author: createMarginaliaDTO.author,
                    book: createMarginaliaDTO.book,
                    contentEn: createMarginaliaDTO.contentEn,
                    contentPt: createMarginaliaDTO.contentPt,
                    user: {
                        connect: {
                            id: id,
                        },
                    },
                },
                include: {
                    comments: true,
                },
            })
        } catch (error) {
            throw new InternalServerErrorException('Marginalia not created')
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

    async findById(id: number): Promise<Marginalia | null> {
        return await this.prisma.marginalia.findUnique({
            where: { id },
            include: { comments: true },
        })
    }

    async updateById(
        updateMarginaliaDTO: UpdateMarginaliaDTO,
        id: number,
    ): Promise<Marginalia> {
        try {
            return await this.prisma.marginalia.update({
                data: {
                    author: updateMarginaliaDTO.author,
                    book: updateMarginaliaDTO.book,
                    contentEn: updateMarginaliaDTO.contentEn,
                    contentPt: updateMarginaliaDTO.contentPt,
                },
                where: { id },
                include: {
                    comments: true,
                },
            })
        } catch (error) {
            throw new NotFoundException(
                'It was not possible to update marginalia',
            )
        }
    }

    async delete(id: number) {
        try {
            return await this.prisma.marginalia.delete({
                where: { id },
            })
        } catch (error) {
            throw new NotFoundException('The entity could not be deleted')
        }
    }
}
