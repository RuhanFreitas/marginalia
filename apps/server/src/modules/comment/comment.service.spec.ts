import { Test, TestingModule } from '@nestjs/testing'

import { CommentService } from './comment.service'
import { CommentRepository } from './comment.repository'

describe('CommentService', () => {
    let service: CommentService

    const mockCommentRepository = {
        findByMarginaliaId: jest.fn(),
        create: jest.fn(),
        updateById: jest.fn(),
        delete: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommentService,
                {
                    provide: CommentRepository,
                    useValue: mockCommentRepository,
                },
            ],
        }).compile()

        service = module.get<CommentService>(CommentService)
        jest.clearAllMocks()
    })

    describe('getComments', () => {
        it('should return a comment tree for a marginalia', async () => {
            const flatComments = [
                { id: 1, parentId: null, content: 'Root', marginaliaId: 1 },
                { id: 2, parentId: 1, content: 'Reply', marginaliaId: 1 },
            ]

            mockCommentRepository.findByMarginaliaId.mockResolvedValue(
                flatComments,
            )

            const result = await service.getComments(1)

            expect(
                mockCommentRepository.findByMarginaliaId,
            ).toHaveBeenCalledWith(1)
            expect(result).toHaveLength(1)
            expect(result[0].replies).toHaveLength(1)
            expect(result[0].replies![0].content).toBe('Reply')
        })
    })

    describe('create', () => {
        it('should create a comment', async () => {
            const createCommentDTO = {
                content: 'Test comment',
                marginaliaId: 1,
            }
            const createdComment = {
                id: 1,
                ...createCommentDTO,
                userId: 10,
            }

            mockCommentRepository.create.mockResolvedValue(createdComment)

            const result = await service.create(createCommentDTO, 10)

            expect(mockCommentRepository.create).toHaveBeenCalledWith(
                createCommentDTO,
                10,
            )
            expect(result).toEqual(createdComment)
        })
    })

    describe('updateById', () => {
        it('should update a comment', async () => {
            const updateCommentDTO = { content: 'Updated comment' }
            const updatedComment = { id: 1, content: 'Updated comment' }

            mockCommentRepository.updateById.mockResolvedValue(updatedComment)

            const result = await service.updateById(updateCommentDTO, 1, 10)

            expect(mockCommentRepository.updateById).toHaveBeenCalledWith(
                updateCommentDTO,
                1,
                10,
            )
            expect(result).toEqual(updatedComment)
        })
    })

    describe('delete', () => {
        it('should delete a comment', async () => {
            const deletedComment = { id: 1, content: 'Deleted' }

            mockCommentRepository.delete.mockResolvedValue(deletedComment)

            const result = await service.delete(1, 10)

            expect(mockCommentRepository.delete).toHaveBeenCalledWith(1, 10)
            expect(result).toEqual(deletedComment)
        })
    })
})
