export type UserRole = 'ADMIN' | 'USER'

export type User = {
    id: number
    name: string
    email: string
    role: UserRole
}

export type UpdateUserBody = {
    name?: string
    email?: string
    password?: string
}
