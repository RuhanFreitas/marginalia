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
        const res = await this.userRepository.findById(id)

        if (!res) {
            throw new NotFoundException('User not found')
        }

        return new ResponseUserDTO(res)
    }

    async updateMyself(
        id: number,
        updateUserDTO: UpdateUserDTO,
    ): Promise<ResponseUserDTO> {
        const res = await this.userRepository.updateById(id, updateUserDTO)

        if (!res) {
            throw new NotFoundException('User not found')
        }

        return new ResponseUserDTO(res)
    }

    async delete(id: number): Promise<ResponseUserDTO> {
        const res = await this.userRepository.delete(id)

        if (!res) {
            throw new NotFoundException('User not found')
        }

        return new ResponseUserDTO(res)
    }
}
