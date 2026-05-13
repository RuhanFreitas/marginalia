import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptService {
    saltOrRounds = 10

    async hash(password: string) {
        return await bcrypt.hash(password, this.saltOrRounds)
    }

    async compare(password: string, hash: string) {
        return await bcrypt.compare(password, hash)
    }
}
