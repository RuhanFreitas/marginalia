import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import {
    PrismaExceptionFilter,
    PrismaValidationExceptionFilter,
} from './common/filters'
import cookieParser from 'cookie-parser'

function configureCors(app: Awaited<ReturnType<typeof NestFactory.create>>) {
    const corsOrigin = process.env.CORS_ORIGIN

    if (corsOrigin) {
        app.enableCors({
            origin: corsOrigin.split(',').map((origin) => origin.trim()),
            credentials: true,
        })
        return
    }

    if (process.env.NODE_ENV !== 'production') {
        app.enableCors({
            origin: 'http://localhost:3000',
            credentials: true,
        })
    }
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    if (process.env.TRUST_PROXY === 'true') {
        app.getHttpAdapter().getInstance().set('trust proxy', 1)
    }

    app.use(cookieParser())

    app.useGlobalPipes(new ValidationPipe())

    app.useGlobalFilters(
        new PrismaExceptionFilter(),
        new PrismaValidationExceptionFilter(),
    )

    configureCors(app)

    await app.listen(process.env.PORT ?? 3001, '0.0.0.0')
}
bootstrap()
