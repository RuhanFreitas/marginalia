import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'

import { UserService } from './user.service'
import { UserRepository } from './user.repository'
import { UpdateUserDTO } from './dto/update-user.dto'
import { createMockUser } from '../../../test/helpers'

describe('UserService', () => {
    let service: UserService

    const mockUserRepository = {
        findById: jest.fn(),
        updateById: jest.fn(),
        delete: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: UserRepository, useValue: mockUserRepository },
            ],
        }).compile()

        service = module.get<UserService>(UserService)
        jest.clearAllMocks()
    })

    describe('findMyself', () => {
        it('should return the authenticated user without password', async () => {
            const user = createMockUser()

            mockUserRepository.findById.mockResolvedValue(user)

            const result = await service.findMyself(user.id)

            expect(mockUserRepository.findById).toHaveBeenCalledWith(user.id)
            expect(result).toMatchObject({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            })
        })

        it('should throw NotFoundException when user does not exist', async () => {
            mockUserRepository.findById.mockResolvedValue(null)

            await expect(service.findMyself(999)).rejects.toThrow(
                NotFoundException,
            )
        })
    })

    describe('updateMyself', () => {
        it('should update and return the authenticated user', async () => {
            const updateUserDTO = {
                name: 'Updated Name',
                email: 'updated@email.com',
            } as UpdateUserDTO
            const updatedUser = createMockUser(updateUserDTO)

            mockUserRepository.updateById.mockResolvedValue(updatedUser)

            const result = await service.updateMyself(1, updateUserDTO)

            expect(mockUserRepository.updateById).toHaveBeenCalledWith(
                1,
                updateUserDTO,
            )
            expect(result).toMatchObject({
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
            })
        })
    })

    describe('delete', () => {
        it('should delete and return the authenticated user', async () => {
            const deletedUser = createMockUser()

            mockUserRepository.delete.mockResolvedValue(deletedUser)

            const result = await service.delete(deletedUser.id)

            expect(mockUserRepository.delete).toHaveBeenCalledWith(
                deletedUser.id,
            )
            expect(result).toMatchObject({
                id: deletedUser.id,
                email: deletedUser.email,
            })
        })

        it('should throw NotFoundException when user does not exist', async () => {
            mockUserRepository.delete.mockResolvedValue(null)

            await expect(service.delete(999)).rejects.toThrow(
                NotFoundException,
            )
        })
    })
})
