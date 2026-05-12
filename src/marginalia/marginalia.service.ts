import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMarginaliaDTO } from './dto/create-marginalia.dto'
import { MarginaliaRepository } from './marginalia.repository'
import { UpdateMarginaliaDTO } from './dto/update-marginalia.dto'

@Injectable()
export class MarginaliaService {
    constructor(private readonly marginaliaRepository: MarginaliaRepository) {}

    async create(createMarginaliaDTO: CreateMarginaliaDTO, id: number) {
        return await this.marginaliaRepository.create(createMarginaliaDTO, id)
    }

    async findAll() {
        return await this.marginaliaRepository.findAll()
    }

    async findById(id: number) {
        return await this.marginaliaRepository.findById(id)
    }

    async updateById(updateMarginaliaDTO: UpdateMarginaliaDTO, id: number) {
        return await this.marginaliaRepository.updateById(
            updateMarginaliaDTO,
            id,
        )
    }

    async delete(id: number) {
        const res = await this.marginaliaRepository.delete(id)

        return res
    }
}
