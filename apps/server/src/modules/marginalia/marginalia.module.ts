import { Module } from '@nestjs/common'
import { MarginaliaController } from './marginalia.controller'
import { MarginaliaService } from './marginalia.service'
import { MarginaliaRepository } from './marginalia.repository'

@Module({
    imports: [],
    exports: [],
    controllers: [MarginaliaController],
    providers: [MarginaliaService, MarginaliaRepository],
})
export class MarginaliaModule {}
