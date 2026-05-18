import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDTO {
    @IsEmail({}, { message: 'Please, use a valid email.' })
    email: string

    @IsString({ message: 'Please, use a valid name.' })
    @MinLength(3, {
        message: 'Your username needs to have at least 3 characters.',
    })
    name: string

    @IsString()
    @MinLength(6, {
        message: 'Your password needs to have at least 6 characters. ',
    })
    password: string
}
