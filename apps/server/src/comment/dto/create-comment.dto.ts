import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateCommentDTO {
    @IsString({ message: 'Please, enter a valid comment' })
    content: string

    @IsOptional()
    @IsNumber({}, { message: 'Please, enter a valid parent identificator' })
    parentId?: number

    @IsNumber({}, { message: 'Please, enter a valid marginalia identificator' })
    marginaliaId: number
}
