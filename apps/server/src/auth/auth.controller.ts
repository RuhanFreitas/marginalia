import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDTO } from './dto/login.dto'
import { RegisterDTO } from './dto/register.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('admin')
    async createAdmin() {
        return await this.authService.createAdmin()
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDTO: LoginDTO) {
        return await this.authService.login(loginDTO)
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() registerDTO: RegisterDTO) {
        return await this.authService.register(registerDTO)
    }
}
