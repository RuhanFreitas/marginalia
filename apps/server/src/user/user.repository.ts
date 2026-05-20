import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'

import { Prisma, User } from '../generated/prisma/client'

import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createAdmin() {
        return await this.prisma.user.create({
            data: {
                role: 'ADMIN',
                name: 'Ruhan Freitas',
                email: 'maskmfgjsakj@gmail.com',
                password: '123456789',
            },
        })
    }

    async create(createUserDTO: CreateUserDTO): Promise<User> {
        try {
            return await this.prisma.user.create({
                data: {
                    name: createUserDTO.name,
                    email: createUserDTO.email,
                    password: createUserDTO.password,
                },
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Email already exists')
                }

                throw new BadRequestException('Failed to create user')
            }

            throw error
        }
    }

    async findById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { id },
        })
    }

    async updateById(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
        try {
            return await this.prisma.user.update({
                where: { id },
                data: {
                    name: updateUserDTO.name,
                    email: updateUserDTO.email,
                    ...(updateUserDTO.password && {
                        password: updateUserDTO.password,
                    }),
                },
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('User not found')
                }

                if (error.code === 'P2002') {
                    throw new ConflictException('Email already exists')
                }

                throw new BadRequestException('Failed to update user')
            }

            throw error
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: { email },
        })
    }

    async delete(id: number): Promise<User | null> {
        try {
            return await this.prisma.user.delete({
                where: { id },
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('User not found')
                }

                throw new BadRequestException('Failed to delete user')
            }

            throw error
        }
    }
}
