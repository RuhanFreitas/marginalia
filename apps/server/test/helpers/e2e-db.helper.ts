import { resolve } from 'node:path'
import { config } from 'dotenv'

import { PrismaService } from '../../src/prisma/prisma.service'

config({ path: resolve(__dirname, '../../.env') })

export async function resetDatabase(prisma: PrismaService): Promise<void> {
    await prisma.comment.deleteMany()
    await prisma.marginalia.deleteMany()
    await prisma.user.deleteMany()
}

export function isE2eRunnable(): boolean {
    return process.env.E2E_DB_READY === 'true'
}
