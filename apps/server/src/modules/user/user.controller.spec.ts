import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { JwtRequest } from '../../common/types/jwt-request'

describe('UserController', () => {
    let controller: UserController

    const mockUserService = {
        findMyself: jest.fn(),
        updateMyself: jest.fn(),
        delete: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile()

        controller = module.get<UserController>(UserController)

        jest.clearAllMocks()
    })

    describe('findMyself', () => {
        it('should return the authenticated user', async () => {
            const req = {
                user: {
                    sub: 1,
                    role: 'USER',
                },
            } as JwtRequest

            const user = {
                id: 1,
                name: 'Ruhan',
                email: 'ruhan@email.com',
            }

            mockUserService.findMyself.mockResolvedValue(user)

            const result = await controller.findMyself(req)

            expect(mockUserService.findMyself).toHaveBeenCalledWith(
                req.user.sub,
            )

            expect(result).toEqual(user)
        })
    })

    describe('updateMyself', () => {
        it('should update the authenticated user', async () => {
            const req = {
                user: {
                    sub: 1,
                    role: 'USER',
                },
            } as JwtRequest

            const updateUserDTO = {
                name: 'Updated Name',
                email: 'updated@email.com',
            }

            const updatedUser = {
                id: 1,
                name: 'Updated Name',
                email: 'updated@email.com',
            }

            mockUserService.updateMyself.mockResolvedValue(updatedUser)

            const result = await controller.updateMyself(updateUserDTO, req)

            expect(mockUserService.updateMyself).toHaveBeenCalledWith(
                req.user.sub,
                updateUserDTO,
            )

            expect(result).toEqual(updatedUser)
        })
    })

    describe('delete', () => {
        it('should delete the authenticated user', async () => {
            const req = {
                user: {
                    sub: 1,
                    role: 'USER',
                },
            } as JwtRequest

            const deletedUser = {
                id: 1,
                name: 'Ruhan',
                email: 'ruhan@email.com',
            }

            mockUserService.delete.mockResolvedValue(deletedUser)

            const result = await controller.delete(req)

            expect(mockUserService.delete).toHaveBeenCalledWith(req.user.sub)

            expect(result).toEqual(deletedUser)
        })
    })
})
