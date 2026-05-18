import { Injectable } from '@nestjs/common'
import { BcryptService } from './bcrypt/bcrypt.service'

@Injectable()
export class HashService {
    constructor(private readonly hashService: BcryptService) {}

    async hash(password: string) {
        return await this.hashService.hash(password)
    }

    async compare(password: string, hash: string) {
        return await this.hashService.compare(password, hash)
    }
}
