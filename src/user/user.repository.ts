import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { User } from '../generated/prisma/client'

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDTO: CreateUserDTO): Promise<User> {
        return await this.prisma.user.create({
            data: {
                name: createUserDTO.name,
                email: createUserDTO.email,
                password: createUserDTO.password,
            },
        })
    }

    async findById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({ where: { id } })
    }

    async updateById(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
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
    }

    async delete(id: number): Promise<User | null> {
        return await this.prisma.user.delete({
            where: { id },
        })
    }
}
