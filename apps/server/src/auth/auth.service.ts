import {
    HttpCode,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { UserRepository } from '../user/user.repository'
import { JwtService } from '@nestjs/jwt'
import { LoginDTO } from './dto/login.dto'
import { HashService } from '../hash/hash.service'
import { RegisterDTO } from './dto/register.dto'
import { ResponseUserDTO } from '../user/dto/response/response-user.dto'

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly JwtService: JwtService,
        private readonly hashService: HashService,
    ) {}

    @HttpCode(HttpStatus.OK)
    async login(loginDTO: LoginDTO) {
        const user = await this.userRepository.findByEmail(loginDTO.email)

        if (!user) {
            throw new UnauthorizedException('Authentication failed')
        }

        const isMatch = await this.hashService.compare(
            loginDTO.password,
            user.password,
        )

        if (!isMatch) {
            throw new UnauthorizedException('E-mail or password incorrect')
        }

        const payload = { sub: user.id, role: user.role }

        const userRes = new ResponseUserDTO(user)

        return { token: this.JwtService.sign(payload), user: userRes }
    }

    @HttpCode(HttpStatus.CREATED)
    async register(registerDTO: RegisterDTO) {
        const hash = await this.hashService.hash(registerDTO.password)

        registerDTO = {
            ...registerDTO,
            password: hash,
        }

        const user = await this.userRepository.create(registerDTO)

        const payload = { sub: user.id, role: user.role }

        const userRes = new ResponseUserDTO(user)

        return { token: this.JwtService.sign(payload), user: userRes }
    }
}
