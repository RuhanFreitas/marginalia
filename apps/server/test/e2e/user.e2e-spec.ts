import { INestApplication } from '@nestjs/common'
import request from 'supertest'

import { createE2eApp } from '../helpers/e2e-app.factory'
import { resetDatabase } from '../helpers/e2e-db.helper'
import { PrismaService } from '../../src/prisma/prisma.service'

const describeE2e =
    process.env.E2E_DB_READY === 'true' ? describe : describe.skip

describeE2e('User (e2e)', () => {
    let app: INestApplication
    let prisma: PrismaService
    let authAgent: ReturnType<typeof request.agent>

    beforeAll(async () => {
        app = await createE2eApp()
        prisma = app.get(PrismaService)
    })

    beforeEach(async () => {
        await resetDatabase(prisma)
        authAgent = request.agent(app.getHttpServer())

        await authAgent.post('/auth/register').send({
            name: 'Profile User',
            email: 'profile@example.com',
            password: 'password123',
        })
    })

    afterAll(async () => {
        await app.close()
    })

    it('GET /user returns authenticated profile', async () => {
        const response = await authAgent.get('/user').expect(200)

        expect(response.body.email).toBe('profile@example.com')
        expect(response.body.password).toBeUndefined()
    })

    it('PATCH /user updates profile', async () => {
        const response = await authAgent
            .patch('/user')
            .send({ name: 'Updated Name' })
            .expect(200)

        expect(response.body.name).toBe('Updated Name')
    })

    it('GET /user rejects unauthenticated requests', async () => {
        await request(app.getHttpServer()).get('/user').expect(401)
    })
})
