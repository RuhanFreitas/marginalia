import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'

import { MarginaliaService } from './marginalia.service'
import { MarginaliaRepository } from './marginalia.repository'

jest.mock('../../common/markdown/markdown-to-html', () => ({
    markdownToHtml: jest.fn((value: string) => `<p>${value}</p>`),
}))

describe('MarginaliaService', () => {
    let service: MarginaliaService

    const mockMarginaliaRepository = {
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
        contentEn: '**Hello**',
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MarginaliaService,
                {
                    provide: MarginaliaRepository,
                    useValue: mockMarginaliaRepository,
                },
            ],
        }).compile()

        service = module.get<MarginaliaService>(MarginaliaService)
        jest.clearAllMocks()
    })

    describe('create', () => {
        it('should convert markdown content and create marginalia', async () => {
            const created = { id: 1, ...createMarginaliaDTO, contentEn: '<p>**Hello**</p>' }

            mockMarginaliaRepository.create.mockResolvedValue(created)

            const result = await service.create(createMarginaliaDTO, 1)

            expect(mockMarginaliaRepository.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    contentEn: '<p>**Hello**</p>',
                }),
                1,
            )
            expect(result).toEqual(created)
        })
    })

    describe('findAll', () => {
        it('should return all marginalias', async () => {
            const list = [{ id: 1, title: 'One' }]

            mockMarginaliaRepository.findAll.mockResolvedValue(list)

            const result = await service.findAll()

            expect(mockMarginaliaRepository.findAll).toHaveBeenCalled()
            expect(result).toEqual(list)
        })
    })

    describe('findById', () => {
        it('should return marginalia with nested comments', async () => {
            const marginalia = {
                id: 1,
                title: 'One',
                comments: [
                    { id: 1, parentId: null, content: 'Root' },
                    { id: 2, parentId: 1, content: 'Reply' },
                ],
            }

            mockMarginaliaRepository.findById.mockResolvedValue(marginalia)

            const result = await service.findById(1)

            expect(result.comments).toHaveLength(1)
            expect(result.comments[0].replies).toHaveLength(1)
        })

        it('should throw NotFoundException when marginalia does not exist', async () => {
            mockMarginaliaRepository.findById.mockResolvedValue(null)

            await expect(service.findById(999)).rejects.toThrow(
                NotFoundException,
            )
        })
    })

    describe('updateById', () => {
        it('should convert markdown when contentEn is provided', async () => {
            const updateDTO = { contentEn: '**Updated**' }
            const updated = { id: 1, contentEn: '<p>**Updated**</p>' }

            mockMarginaliaRepository.updateById.mockResolvedValue(updated)

            const result = await service.updateById(updateDTO, 1)

            expect(mockMarginaliaRepository.updateById).toHaveBeenCalledWith(
                { contentEn: '<p>**Updated**</p>' },
                1,
            )
            expect(result).toEqual(updated)
        })
    })

    describe('delete', () => {
        it('should delete marginalia', async () => {
            const deleted = { id: 1, title: 'One' }

            mockMarginaliaRepository.delete.mockResolvedValue(deleted)

            const result = await service.delete(1)

            expect(mockMarginaliaRepository.delete).toHaveBeenCalledWith(1)
            expect(result).toEqual(deleted)
        })
    })
})
