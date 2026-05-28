import type { User } from './user'

export type LoginBody = {
    email: string
    password: string
}

export type RegisterBody = {
    email: string
    name: string
    password: string
}

export type AuthResponse = {
    user: User
}
