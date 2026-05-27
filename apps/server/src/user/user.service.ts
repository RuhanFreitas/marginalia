import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UserRepository } from './user.repository'
import { UpdateUserDTO } from './dto/update-user.dto'
import { User } from '../generated/prisma/client'
import { ResponseUserDTO } from './dto/response/response-user.dto'

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findMyself(id: number): Promise<ResponseUserDTO> {
        const user = await this.userRepository.findById(id)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return new ResponseUserDTO(user)
    }

    async updateMyself(
        id: number,
        updateUserDTO: UpdateUserDTO,
    ): Promise<ResponseUserDTO> {
        const user = await this.userRepository.updateById(id, updateUserDTO)
        return new ResponseUserDTO(user)
    }

    async delete(id: number): Promise<ResponseUserDTO> {
        const user = await this.userRepository.delete(id)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return new ResponseUserDTO(user)
    }
}
