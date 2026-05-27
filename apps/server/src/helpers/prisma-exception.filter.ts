import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    HttpStatus,
    Logger,
} from '@nestjs/common'
import { Response } from 'express'
import { Prisma } from '../generated/prisma/client'

/**
 * Exception Filter global que captura erros do Prisma
 * Permite log centralizado e formatação consistente de respostas de erro
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(PrismaExceptionFilter.name)

    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = HttpStatus.BAD_REQUEST

        // Log do erro para debugging
        this.logger.error(
            `Prisma Error [${exception.code}]: ${exception.message}`,
        )

        response.status(status).json({
            statusCode: status,
            message: 'Database operation failed',
            error: exception.code,
        })
    }
}

/**
 * Exception Filter para erros de validação do Prisma
 */
@Catch(Prisma.PrismaClientValidationError)
export class PrismaValidationExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(PrismaValidationExceptionFilter.name)

    catch(exception: Prisma.PrismaClientValidationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = HttpStatus.UNPROCESSABLE_ENTITY

        this.logger.error(`Prisma Validation Error: ${exception.message}`)

        response.status(status).json({
            statusCode: status,
            message: 'Invalid data provided',
            error: 'ValidationError',
        })
    }
}
