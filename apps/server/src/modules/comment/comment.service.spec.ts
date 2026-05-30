import { Test, TestingModule } from '@nestjs/testing'
import { CommentService } from './comment.service'
import { CommentRepository } from './comment.repository'

describe('CommentService', () => {
    let service: CommentService

    const mockCommentRepository = {
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

    describe('create', () => {
        it('should create a comment', async () => {
            const createCommentDTO = {
                content: 'Test comment',
                marginaliaId: 1,
            }

            const createdComment = {
                id: 1,
                content: 'Test comment',
                marginaliaId: 1,
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
            const updateCommentDTO = {
                content: 'Updated comment',
            }

            const updatedComment = {
                id: 1,
                content: 'Updated comment',
                userId: 10,
            }

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
            const deletedComment = {
                id: 1,
                content: 'Deleted comment',
                userId: 10,
            }

            mockCommentRepository.delete.mockResolvedValue(deletedComment)

            const result = await service.delete(1, 10)

            expect(mockCommentRepository.delete).toHaveBeenCalledWith(1, 10)

            expect(result).toEqual(deletedComment)
        })
    })
})
