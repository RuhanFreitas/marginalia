import { IsString } from 'class-validator'

export class CreateMarginaliaDTO {
    @IsString({ message: 'Please, enter a valid book title' })
    book: string

    @IsString({ message: 'Please, enter a valid cover format' })
    cover: string

    @IsString({ message: 'Please, enter a valid author name' })
    author: string

    @IsString({ message: 'Please, enter a valid content format in english' })
    contentEn: string

    @IsString({ message: 'Please, enter a valid content format in portuguese' })
    contentPt: string
}
