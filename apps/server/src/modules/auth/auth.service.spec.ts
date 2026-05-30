import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { UnauthorizedException } from '@nestjs/common'

import { AuthService } from './auth.service'
import { UserRepository } from '../user/user.repository'
import { HashService } from '../../hash/hash.service'
import { createMockUser } from '../../../test/helpers'

describe('AuthService', () => {
    let service: AuthService

    const mockUserRepository = {
        create: jest.fn(),
        findByEmail: jest.fn(),
    }

    const mockJwtService = {
        sign: jest.fn(),
    }

    const mockHashService = {
        hash: jest.fn(),
        compare: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UserRepository, useValue: mockUserRepository },
                { provide: JwtService, useValue: mockJwtService },
                { provide: HashService, useValue: mockHashService },
            ],
        }).compile()

        service = module.get<AuthService>(AuthService)
        jest.clearAllMocks()
    })

    describe('register', () => {
        it('should hash password, create user and return token with user', async () => {
            const registerDTO = {
                name: 'John Doe',
                email: 'john@example.com',
                password: '123456789',
            }
            const user = createMockUser({
                name: registerDTO.name,
                email: registerDTO.email,
            })

            mockHashService.hash.mockResolvedValue('hashed-password')
            mockUserRepository.create.mockResolvedValue(user)
            mockJwtService.sign.mockReturnValue('jwt-token')

            const response = await service.register(registerDTO)

            expect(mockHashService.hash).toHaveBeenCalledWith('123456789')
            expect(mockUserRepository.create).toHaveBeenCalledWith({
                name: registerDTO.name,
                email: registerDTO.email,
                password: 'hashed-password',
            })
            expect(mockJwtService.sign).toHaveBeenCalledWith({
                sub: user.id,
                role: user.role,
            })
            expect(response.token).toBe('jwt-token')
            expect(response.user).toMatchObject({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            })
        })
    })

    describe('login', () => {
        const loginDTO = {
            email: 'john@example.com',
            password: '123456789',
        }

        it('should return token and user when credentials are valid', async () => {
            const user = createMockUser({ email: loginDTO.email })

            mockUserRepository.findByEmail.mockResolvedValue(user)
            mockHashService.compare.mockResolvedValue(true)
            mockJwtService.sign.mockReturnValue('jwt-token')

            const response = await service.login(loginDTO)

            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
                loginDTO.email,
            )
            expect(mockHashService.compare).toHaveBeenCalledWith(
                loginDTO.password,
                user.password,
            )
            expect(response.token).toBe('jwt-token')
            expect(response.user.email).toBe(user.email)
        })

        it('should throw when user is not found', async () => {
            mockUserRepository.findByEmail.mockResolvedValue(null)

            await expect(service.login(loginDTO)).rejects.toThrow(
                UnauthorizedException,
            )
        })

        it('should throw when password does not match', async () => {
            mockUserRepository.findByEmail.mockResolvedValue(createMockUser())
            mockHashService.compare.mockResolvedValue(false)

            await expect(service.login(loginDTO)).rejects.toThrow(
                UnauthorizedException,
            )
        })
    })
})
