import { Test, TestingModule } from '@nestjs/testing'

import { MarginaliaController } from './marginalia.controller'
import { MarginaliaService } from './marginalia.service'
import { createJwtRequest } from '../../../test/helpers'

describe('MarginaliaController', () => {
    let controller: MarginaliaController

    const mockMarginaliaService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        updateById: jest.fn(),
        delete: jest.fn(),
    }

    const createMarginaliaDTO = {
        book: 'Book',
        title: 'Title',
        description: 'Description',
        cover: 'cover.jpg',
        author: 'Author',
        contentEn: 'Content',
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MarginaliaController],
            providers: [
                {
                    provide: MarginaliaService,
                    useValue: mockMarginaliaService,
                },
            ],
        }).compile()

        controller = module.get<MarginaliaController>(MarginaliaController)
        jest.clearAllMocks()
    })

    describe('create', () => {
        it('should create marginalia for the authenticated admin', async () => {
            const req = createJwtRequest(5)
            const created = { id: 1, ...createMarginaliaDTO }

            mockMarginaliaService.create.mockResolvedValue(created)

            const result = await controller.create(createMarginaliaDTO, req)

            expect(mockMarginaliaService.create).toHaveBeenCalledWith(
                createMarginaliaDTO,
                req.user.sub,
            )
            expect(result).toEqual(created)
        })
    })

    describe('findAll', () => {
        it('should return all marginalias', async () => {
            const list = [{ id: 1, title: 'One' }]

            mockMarginaliaService.findAll.mockResolvedValue(list)

            const result = await controller.findAll()

            expect(mockMarginaliaService.findAll).toHaveBeenCalled()
            expect(result).toEqual(list)
        })
    })

    describe('findById', () => {
        it('should return marginalia by id', async () => {
            const marginalia = { id: 1, title: 'One', comments: [] }

            mockMarginaliaService.findById.mockResolvedValue(marginalia)

            const result = await controller.findById(1)

            expect(mockMarginaliaService.findById).toHaveBeenCalledWith(1)
            expect(result).toEqual(marginalia)
        })
    })

    describe('updateById', () => {
        it('should update marginalia by id', async () => {
            const updateDTO = { title: 'Updated' }
            const updated = { id: 1, title: 'Updated' }

            mockMarginaliaService.updateById.mockResolvedValue(updated)

            const result = await controller.updateById(1, updateDTO)

            expect(mockMarginaliaService.updateById).toHaveBeenCalledWith(
                updateDTO,
                1,
            )
            expect(result).toEqual(updated)
        })
    })

    describe('delete', () => {
        it('should delete marginalia by id', async () => {
            const deleted = { id: 1, title: 'One' }

            mockMarginaliaService.delete.mockResolvedValue(deleted)

            const result = await controller.delete(1)

            expect(mockMarginaliaService.delete).toHaveBeenCalledWith(1)
            expect(result).toEqual(deleted)
        })
    })
})
