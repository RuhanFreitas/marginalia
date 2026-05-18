import { IsEmail, IsString } from 'class-validator'

export class LoginDTO {
    @IsEmail({}, { message: 'Please, enter a valid email' })
    email: string

    @IsString({ message: 'Please, enter a valid format of password' })
    password: string
}
