import { Injectable } from '@nestjs/common'

import { User } from '../../generated/prisma/client'

import { handlePrismaError } from '../../common/database/prisma-error.helper'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

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
            handlePrismaError(error, 'Failed to create user')
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
            handlePrismaError(error, 'Failed to update user')
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
            handlePrismaError(error, 'Failed to delete user')
        }
    }
}
