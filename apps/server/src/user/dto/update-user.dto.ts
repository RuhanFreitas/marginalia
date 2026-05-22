import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUserDTO {
    @IsOptional()
    @IsEmail({}, { message: 'Please, use a valid email.' })
    email: string

    @IsOptional()
    @IsString({ message: 'Please, use a valid name.' })
    @MinLength(3, {
        message: 'Your username needs to have at least 3 characters.',
    })
    name: string

    @IsOptional()
    @IsString()
    @MinLength(6, {
        message: 'Your password needs to have at least 6 characters. ',
    })
    password: string
}
