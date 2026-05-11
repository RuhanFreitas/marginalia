import { Injectable } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UserRepository } from './user.repository'
import { UpdateUserDTO } from './dto/update-user.dto'
import { User } from '../generated/prisma/client'

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDTO: CreateUserDTO): Promise<User | null> {
        return await this.userRepository.create(createUserDTO)
    }

    async findById(id: number): Promise<User | null> {
        return await this.userRepository.findById(id)
    }

    async updateById(
        id: number,
        updateUserDTO: UpdateUserDTO,
    ): Promise<User | null> {
        return await this.userRepository.updateById(id, updateUserDTO)
    }

    async delete(id: number): Promise<User | null> {
        return await this.userRepository.delete(id)
    }
}
