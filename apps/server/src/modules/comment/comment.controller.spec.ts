import { Test, TestingModule } from '@nestjs/testing'

import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { createJwtRequest } from '../../../test/helpers'

describe('CommentController', () => {
    let controller: CommentController

    const mockCommentService = {
        getComments: jest.fn(),
        create: jest.fn(),
        updateById: jest.fn(),
        delete: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CommentController],
            providers: [
                { provide: CommentService, useValue: mockCommentService },
            ],
        }).compile()

        controller = module.get<CommentController>(CommentController)
        jest.clearAllMocks()
    })

    describe('getComments', () => {
        it('should return comments for a marginalia', async () => {
            const comments = [{ id: 1, content: 'Hello', replies: [] }]

            mockCommentService.getComments.mockResolvedValue(comments)

            const result = await controller.getComments(1)

            expect(mockCommentService.getComments).toHaveBeenCalledWith(1)
            expect(result).toEqual(comments)
        })
    })

    describe('create', () => {
        it('should create a comment for the authenticated user', async () => {
            const createCommentDTO = {
                content: 'Test comment',
                marginaliaId: 1,
            }
            const req = createJwtRequest(10)
            const createdComment = { id: 1, ...createCommentDTO, userId: 10 }

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
            const updateCommentDTO = { content: 'Updated comment' }
            const req = createJwtRequest(10)
            const updatedComment = { id: 1, content: 'Updated comment' }

            mockCommentService.updateById.mockResolvedValue(updatedComment)

            const result = await controller.updateById(
                1,
                updateCommentDTO,
                req,
            )

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
            const req = createJwtRequest(10)
            const deletedComment = { id: 1, content: 'Deleted' }

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
