import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UserRepository } from '../user/user.repository'
import { JwtService } from '@nestjs/jwt'
import { HashService } from '../hash/hash.service'

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
                {
                    provide: UserRepository,
                    useValue: mockUserRepository,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
                {
                    provide: HashService,
                    useValue: mockHashService,
                },
            ],
        }).compile()

        service = module.get<AuthService>(AuthService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('register', () => {
        it('should register user and return token + user', async () => {
            const registerUserDTO = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456789',
            }

            const expectedResponse = {
                token: 'jwt-token',
                user: {
                    id: '1',
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    role: 'USER',
                },
            }

            mockHashService.hash.mockResolvedValue('hashed-password')

            mockUserRepository.create.mockResolvedValue({
                id: '1',
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'hashed-password',
                role: 'USER',
            })

            mockJwtService.sign.mockReturnValue('jwt-token')

            const response = await service.register(registerUserDTO)

            expect(mockHashService.hash).toHaveBeenCalledWith('123456789')

            expect(mockJwtService.sign).toHaveBeenCalledWith({
                sub: '1',
                role: 'USER',
            })

            expect(mockUserRepository.create).toHaveBeenCalledWith({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'hashed-password',
            })

            expect(response).toEqual(expectedResponse)
        })
    })

    describe('login', () => {
        it('should login user and return token + user', async () => {
            const loginUserDTO = {
                email: 'johndoe@example.com',
                password: '123456789',
            }

            const mockedResponse = {
                token: 'jwt-token',
                user: {
                    id: '1',
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    role: 'USER',
                },
            }

            mockHashService.compare.mockResolvedValue(true)

            mockUserRepository.findByEmail.mockResolvedValue({
                id: '1',
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'hashed-password',
                role: 'USER',
            })

            mockJwtService.sign.mockReturnValue('jwt-token')

            const response = await service.login(loginUserDTO)

            expect(mockHashService.compare).toHaveBeenCalledWith(
                '123456789',
                'hashed-password',
            )

            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
                'johndoe@example.com',
            )

            expect(mockJwtService.sign).toHaveBeenCalledWith({
                sub: '1',
                role: 'USER',
            })

            expect(response).toEqual(mockedResponse)
        })
    })
})
