import { User } from '../../../generated/prisma/client'

export class ResponseUserDTO {
    id: number
    email: string
    name: string
    role: string

    constructor(user: User) {
        ;((this.id = user.id),
            (this.email = user.email),
            (this.name = user.name),
            (this.role = user.role))
    }
}
