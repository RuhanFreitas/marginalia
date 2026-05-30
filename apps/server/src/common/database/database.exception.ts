import {
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common'

/**
 * Exceção levantada quando um registro não é encontrado no banco de dados
 */
export class RecordNotFoundError extends BadRequestException {
    constructor(message: string = 'Record not found') {
        super(message)
        this.name = 'RecordNotFoundError'
    }
}

/**
 * Exceção levantada quando há violação de constraint de unicidade
 */
export class UniqueConstraintError extends BadRequestException {
    constructor(message: string = 'This record already exists') {
        super(message)
        this.name = 'UniqueConstraintError'
    }
}

/**
 * Exceção levantada quando há violação de constraint de chave estrangeira
 */
export class ForeignKeyConstraintError extends BadRequestException {
    constructor(
        message: string = 'Related record not found or invalid reference',
    ) {
        super(message)
        this.name = 'ForeignKeyConstraintError'
    }
}

/**
 * Exceção genérica para erros de banco de dados não mapeados
 */
export class DatabaseException extends InternalServerErrorException {
    constructor(
        message: string = 'Database operation failed',
        details?: unknown,
    ) {
        super({
            message,
            error: 'DatabaseException',
        })
        this.name = 'DatabaseException'
    }
}
