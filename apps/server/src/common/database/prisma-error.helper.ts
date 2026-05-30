import { Prisma } from '../../generated/prisma/client'
import {
    RecordNotFoundError,
    UniqueConstraintError,
    ForeignKeyConstraintError,
    DatabaseException,
} from './database.exception'

/**
 * Mapeia erros do Prisma para exceções customizadas do NestJS
 * Centraliza a lógica de tratamento de erros de banco de dados
 *
 * Códigos Prisma mapeados:
 * P2002 - Unique constraint failed
 * P2003 - Foreign key constraint failed
 * P2025 - Record not found
 */
export function handlePrismaError(
    error: unknown,
    defaultMessage: string = 'Database operation failed',
): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002': {
                const field = (error.meta?.target as string[])?.[0] || 'field'
                throw new UniqueConstraintError(
                    `A record with this ${field} already exists`,
                )
            }

            case 'P2003': {
                throw new ForeignKeyConstraintError(
                    'Related record not found or invalid reference',
                )
            }

            case 'P2025': {
                throw new RecordNotFoundError(
                    'The requested record was not found',
                )
            }

            default:
                throw new DatabaseException(
                    `${defaultMessage} (Error: ${error.code})`,
                    error.meta,
                )
        }
    }

    // Se for um erro de validação do Prisma
    if (error instanceof Prisma.PrismaClientValidationError) {
        throw new DatabaseException(
            'Invalid data provided for database operation',
            error.message,
        )
    }

    // Se for um erro de inicialização
    if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new DatabaseException(
            'Failed to connect to the database',
            error.message,
        )
    }

    // Para qualquer outro erro não identificado, relança
    throw error
}
