import type { User } from '@/types/api/user'

export function createUser(overrides: Partial<User> = {}): User {
    return {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'USER',
        ...overrides,
    }
}
