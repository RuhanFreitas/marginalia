import { INestApplication } from '@nestjs/common'
import request from 'supertest'

import { createE2eApp } from '../helpers/e2e-app.factory'
import { resetDatabase } from '../helpers/e2e-db.helper'
import { PrismaService } from '../../src/prisma/prisma.service'

const describeE2e =
    process.env.E2E_DB_READY === 'true' ? describe : describe.skip

describeE2e('Auth (e2e)', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        app = await createE2eApp()
        prisma = app.get(PrismaService)
    })

    beforeEach(async () => {
        await resetDatabase(prisma)
    })

    afterAll(async () => {
        await app.close()
    })

    it('POST /auth/register creates user and sets cookie', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                name: 'E2E User',
                email: 'e2e@example.com',
                password: 'password123',
            })
            .expect(200)

        expect(response.body.token).toBeDefined()
        expect(response.body.user.email).toBe('e2e@example.com')
        expect(response.headers['set-cookie']).toEqual(
            expect.arrayContaining([
                expect.stringContaining('token='),
            ]),
        )
    })

    it('POST /auth/login rejects invalid credentials', async () => {
        await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                name: 'E2E User',
                email: 'e2e@example.com',
                password: 'password123',
            })

        await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'e2e@example.com',
                password: 'wrong-password',
            })
            .expect(401)
    })

    it('POST /auth/logout clears auth cookie', async () => {
        const agent = request.agent(app.getHttpServer())

        await agent.post('/auth/register').send({
            name: 'E2E User',
            email: 'e2e@example.com',
            password: 'password123',
        })

        const logout = await agent.post('/auth/logout').expect(200)

        expect(logout.body.message).toBe('Logged out successfully')
    })
})
