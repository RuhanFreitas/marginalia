import { Role } from '../../src/generated/prisma/enums'
import type { User } from '../../src/generated/prisma/client'

export function createMockUser(overrides: Partial<User> = {}): User {
    return {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed-password',
        role: Role.USER,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        ...overrides,
    }
}
