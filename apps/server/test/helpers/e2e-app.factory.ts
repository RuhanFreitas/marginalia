import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import cookieParser from 'cookie-parser'

import { AppModule } from '../../src/app.module'
import {
    PrismaExceptionFilter,
    PrismaValidationExceptionFilter,
} from '../../src/common/filters'

export async function createE2eApp(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile()

    const app = moduleFixture.createNestApplication()

    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalFilters(
        new PrismaExceptionFilter(),
        new PrismaValidationExceptionFilter(),
    )

    await app.init()

    return app
}
