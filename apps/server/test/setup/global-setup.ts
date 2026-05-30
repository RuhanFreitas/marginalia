import { execSync } from 'node:child_process'
import { resolve } from 'node:path'

import { config } from 'dotenv'

export default async function globalSetup(): Promise<void> {
    config({ path: resolve(__dirname, '../../.env') })

    if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
        process.env.E2E_DB_READY = 'false'
        console.warn(
            'E2E tests skipped: set DATABASE_URL and JWT_SECRET in .env',
        )
        return
    }

    try {
        execSync('npx prisma migrate deploy', {
            cwd: resolve(__dirname, '../..'),
            stdio: 'pipe',
            env: process.env,
        })
        process.env.E2E_DB_READY = 'true'
    } catch {
        process.env.E2E_DB_READY = 'false'
        console.warn(
            'E2E tests skipped: database is unreachable or migrations failed',
        )
    }
}
