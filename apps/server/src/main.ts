import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import {
    PrismaExceptionFilter,
    PrismaValidationExceptionFilter,
} from './helpers/prisma-exception.filter'
import cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.use(cookieParser())

    app.useGlobalPipes(new ValidationPipe())

    app.useGlobalFilters(
        new PrismaExceptionFilter(),
        new PrismaValidationExceptionFilter(),
    )

    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    })

    await app.listen(process.env.PORT ?? 3001)
}
bootstrap()
