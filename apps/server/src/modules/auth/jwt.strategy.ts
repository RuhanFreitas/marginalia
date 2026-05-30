import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import type { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        const SECRET = configService.get<string>('JWT_SECRET')

        if (!SECRET) {
            throw new InternalServerErrorException(
                'Important key values are missing',
            )
        }

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                (req: Request) => {
                    return req?.cookies?.token
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: SECRET,
        })
    }

    async validate(payload: any): Promise<unknown> {
        return {
            sub: payload.sub,
            role: payload.role,
        }
    }
}
