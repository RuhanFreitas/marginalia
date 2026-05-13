import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const SECRET = process.env.JWT_SECRET

        if (!SECRET) {
            throw new InternalServerErrorException(
                'Important key values are missing',
            )
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SECRET,
        })
    }

    async validate(payload: any): Promise<unknown> {
        return { userId: payload.sub }
    }
}
