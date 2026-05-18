import { Module } from '@nestjs/common'
import { HashService } from './hash.service'
import { BcryptService } from './bcrypt/bcrypt.service'

@Module({
    providers: [HashService, BcryptService],
    exports: [HashService],
})
export class HashModule {}
