import { Test, TestingModule } from '@nestjs/testing'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { JwtRequest } from '../types/jwt-request'

describe('CommentController', () => {
    let controller: CommentController

    const mockCommentService = {
        create: jest.fn(),
        updateById: jest.fn(),
        delete: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CommentController],
            providers: [
                {
                    provide: CommentService,
                    useValue: mockCommentService,
                },
            ],
        }).compile()

        controller = module.get<CommentController>(CommentController)

        jest.clearAllMocks()
    })

    describe('create', () => {
        it('should create a comment', async () => {
            const createCommentDTO = {
                content: 'Test comment',
                marginaliaId: 1,
            }

            const req = {
                user: {
                    sub: 10,
                    role: 'USER',
                },
            } as JwtRequest

            const createdComment = {
                id: 1,
                content: 'Test comment',
                marginaliaId: 1,
                userId: 10,
            }

            mockCommentService.create.mockResolvedValue(createdComment)

            const result = await controller.create(createCommentDTO, req)

            expect(mockCommentService.create).toHaveBeenCalledWith(
                createCommentDTO,
                req.user.sub,
            )

            expect(result).toEqual(createdComment)
        })
    })

    describe('updateById', () => {
        it('should update a comment by id', async () => {
            const updateCommentDTO = {
                content: 'Updated comment',
            }

            const req = {
                user: {
                    sub: 10,
                    role: 'USER',
                },
            } as JwtRequest

            const updatedComment = {
                id: 1,
                content: 'Updated comment',
                userId: 10,
            }

            mockCommentService.updateById.mockResolvedValue(updatedComment)

            const result = await controller.updateById(1, updateCommentDTO, req)

            expect(mockCommentService.updateById).toHaveBeenCalledWith(
                updateCommentDTO,
                1,
                req.user.sub,
            )

            expect(result).toEqual(updatedComment)
        })
    })

    describe('delete', () => {
        it('should delete a comment', async () => {
            const req = {
                user: {
                    sub: 10,
                    role: 'USER',
                },
            } as JwtRequest

            const deletedComment = {
                id: 1,
                content: 'Deleted comment',
                userId: 10,
            }

            mockCommentService.delete.mockResolvedValue(deletedComment)

            const result = await controller.delete(1, req)

            expect(mockCommentService.delete).toHaveBeenCalledWith(
                1,
                req.user.sub,
            )

            expect(result).toEqual(deletedComment)
        })
    })
})
