import { Request } from 'express'
import { JwtUser } from './jwt-user'

export interface JwtRequest extends Request {
    user: JwtUser
}
