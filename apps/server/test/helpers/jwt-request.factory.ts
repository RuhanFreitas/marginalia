import type { JwtRequest } from '../../src/common/types/jwt-request'
import { Role } from '../../src/generated/prisma/enums'

export function createJwtRequest(
    sub = 1,
    role: Role = Role.USER,
): JwtRequest {
    return {
        user: { sub, role },
    } as JwtRequest
}
