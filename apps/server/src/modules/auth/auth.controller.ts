import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { LoginDTO } from './dto/login.dto'
import { RegisterDTO } from './dto/register.dto'
import { Response } from 'express'
import { getAuthCookieOptions } from '../../common/auth/auth-cookie.options'

const AUTH_COOKIE_MAX_AGE_MS = 1000 * 60 * 60 * 30

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDTO: LoginDTO, @Res() res: Response) {
        const data = await this.authService.login(loginDTO)

        const { token } = data

        res.cookie('token', token, getAuthCookieOptions(AUTH_COOKIE_MAX_AGE_MS))

        return res.json(data)
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() registerDTO: RegisterDTO, @Res() res: Response) {
        const data = await this.authService.register(registerDTO)

        const { token } = data

        res.cookie('token', token, getAuthCookieOptions(AUTH_COOKIE_MAX_AGE_MS))

        return res.json(data)
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout(@Res() res: Response) {
        // Clear cookie unconditionally so logout works even if token is invalid/expired
        res.cookie('token', '', getAuthCookieOptions(0))
        return res.json({ message: 'Logged out successfully' })
    }
}
