import { Test, TestingModule } from '@nestjs/testing'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { createMockResponse } from '../../../test/helpers'

describe('AuthController', () => {
    let controller: AuthController

    const mockAuthService = {
        login: jest.fn(),
        register: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: AuthService, useValue: mockAuthService }],
        }).compile()

        controller = module.get<AuthController>(AuthController)
        jest.clearAllMocks()
    })

    describe('register', () => {
        it('should set auth cookie and return user payload', async () => {
            const registerDTO = {
                name: 'John Doe',
                email: 'john@example.com',
                password: '123456789',
            }
            const expectedResponse = {
                token: 'jwt-token',
                user: { id: 1, name: 'John Doe', email: 'john@example.com' },
            }
            const res = createMockResponse()

            mockAuthService.register.mockResolvedValue(expectedResponse)

            await controller.register(registerDTO, res)

            expect(mockAuthService.register).toHaveBeenCalledWith(registerDTO)
            expect(res.cookie).toHaveBeenCalledWith(
                'token',
                'jwt-token',
                expect.objectContaining({ httpOnly: true }),
            )
            expect(res.json).toHaveBeenCalledWith(expectedResponse)
        })
    })

    describe('login', () => {
        it('should set auth cookie and return user payload', async () => {
            const loginDTO = {
                email: 'john@example.com',
                password: '123456789',
            }
            const expectedResponse = {
                token: 'jwt-token',
                user: { id: 1, name: 'John Doe', email: 'john@example.com' },
            }
            const res = createMockResponse()

            mockAuthService.login.mockResolvedValue(expectedResponse)

            await controller.login(loginDTO, res)

            expect(mockAuthService.login).toHaveBeenCalledWith(loginDTO)
            expect(res.cookie).toHaveBeenCalledWith(
                'token',
                'jwt-token',
                expect.objectContaining({ httpOnly: true }),
            )
            expect(res.json).toHaveBeenCalledWith(expectedResponse)
        })
    })

    describe('logout', () => {
        it('should clear auth cookie', async () => {
            const res = createMockResponse()

            await controller.logout(res)

            expect(res.cookie).toHaveBeenCalledWith(
                'token',
                '',
                expect.objectContaining({ maxAge: 0 }),
            )
            expect(res.json).toHaveBeenCalledWith({
                message: 'Logged out successfully',
            })
        })
    })
})
