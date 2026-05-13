import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMarginaliaDTO } from './dto/create-marginalia.dto'
import { MarginaliaRepository } from './marginalia.repository'
import { UpdateMarginaliaDTO } from './dto/update-marginalia.dto'
import { buildCommentTree } from '../helpers/build-comment-tree'

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
        const res = await this.marginaliaRepository.findById(id)

        if (!res) {
            throw new NotFoundException('Marginalia not found')
        }

        return {
            ...res,
            comments: buildCommentTree(res.comments),
        }
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
