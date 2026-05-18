import { IsString } from 'class-validator'

export class UpdateCommentDTO {
    @IsString({ message: 'Please, enter a valid comment' })
    content: string
}
