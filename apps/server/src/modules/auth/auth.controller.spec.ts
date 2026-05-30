import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
    let controller: AuthController

    const mockAuthService = {
        login: jest.fn(),
        register: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile()

        controller = module.get<AuthController>(AuthController)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('register', () => {
        it('should call authService.register and return result', async () => {
            const registerUserDTO = {
                name: 'John Doe',
                email: 'Johndoe@example.com',
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

            mockAuthService.register.mockResolvedValue(expectedResponse)

            const response = await controller.register(registerUserDTO)

            expect(mockAuthService.register).toHaveBeenCalledWith(
                registerUserDTO,
            )

            expect(response).toEqual(expectedResponse)
        })
    })

    describe('login', () => {
        it('should call authService.login and return jwt token and user', async () => {
            const loginUserDTO = {
                email: 'Johndoe@example.com',
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

            mockAuthService.login.mockResolvedValue(expectedResponse)

            const response = await controller.login(loginUserDTO)

            expect(mockAuthService.login).toHaveBeenCalledWith(loginUserDTO)

            expect(response).toEqual(expectedResponse)
        })
    })
})
