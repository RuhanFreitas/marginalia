import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'

import { UserService } from './user.service'
import { UserRepository } from './user.repository'

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
                {
                    provide: UserRepository,
                    useValue: mockUserRepository,
                },
            ],
        }).compile()

        service = module.get<UserService>(UserService)

        jest.clearAllMocks()
    })

    describe('findMyself', () => {
        it('should return the authenticated user', async () => {
            const user = {
                id: 1,
                name: 'Ruhan',
                email: 'ruhan@email.com',
                password: 'hashed-password',
            }

            mockUserRepository.findById.mockResolvedValue(user)

            const result = await service.findMyself(1)

            expect(mockUserRepository.findById).toHaveBeenCalledWith(1)

            expect(result).toEqual({
                id: user.id,
                name: user.name,
                email: user.email,
            })
        })

        it('should throw NotFoundException if user does not exist', async () => {
            mockUserRepository.findById.mockResolvedValue(null)

            await expect(service.findMyself(1)).rejects.toThrow(
                NotFoundException,
            )

            expect(mockUserRepository.findById).toHaveBeenCalledWith(1)
        })
    })

    describe('updateMyself', () => {
        it('should update and return the authenticated user', async () => {
            const updateUserDTO = {
                name: 'Updated Name',
                email: 'updated@email.com',
            }

            const updatedUser = {
                id: 1,
                name: 'Updated Name',
                email: 'updated@email.com',
                password: 'hashed-password',
            }

            mockUserRepository.updateById.mockResolvedValue(updatedUser)

            const result = await service.updateMyself(1, updateUserDTO)

            expect(mockUserRepository.updateById).toHaveBeenCalledWith(
                1,
                updateUserDTO,
            )

            expect(result).toEqual({
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
            })
        })

        it('should throw NotFoundException if user does not exist', async () => {
            const updateUserDTO = {
                name: 'Updated Name',
            }

            mockUserRepository.updateById.mockResolvedValue(null)

            await expect(
                service.updateMyself(1, updateUserDTO),
            ).rejects.toThrow(NotFoundException)

            expect(mockUserRepository.updateById).toHaveBeenCalledWith(
                1,
                updateUserDTO,
            )
        })
    })

    describe('delete', () => {
        it('should delete and return the authenticated user', async () => {
            const deletedUser = {
                id: 1,
                name: 'Ruhan',
                email: 'ruhan@email.com',
                password: 'hashed-password',
            }

            mockUserRepository.delete.mockResolvedValue(deletedUser)

            const result = await service.delete(1)

            expect(mockUserRepository.delete).toHaveBeenCalledWith(1)

            expect(result).toEqual({
                id: deletedUser.id,
                name: deletedUser.name,
                email: deletedUser.email,
            })
        })

        it('should throw NotFoundException if user does not exist', async () => {
            mockUserRepository.delete.mockResolvedValue(null)

            await expect(service.delete(1)).rejects.toThrow(NotFoundException)

            expect(mockUserRepository.delete).toHaveBeenCalledWith(1)
        })
    })
})
