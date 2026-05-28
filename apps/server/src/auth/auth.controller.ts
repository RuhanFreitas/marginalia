import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDTO } from './dto/login.dto'
import { RegisterDTO } from './dto/register.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDTO: LoginDTO, @Res() res: Response) {
        const data = await this.authService.login(loginDTO)

        const { token } = data

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 30,
        })

        return res.json(data)
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() registerDTO: RegisterDTO, @Res() res: Response) {
        const data = await this.authService.register(registerDTO)

        const { token } = data

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 30,
        })

        return res.json(data)
    }
}
