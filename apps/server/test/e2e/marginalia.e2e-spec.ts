import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { Role } from '../../src/generated/prisma/enums'
import { PrismaService } from '../../src/prisma/prisma.service'

import { createE2eApp } from '../helpers/e2e-app.factory'
import { resetDatabase } from '../helpers/e2e-db.helper'

const describeE2e =
    process.env.E2E_DB_READY === 'true' ? describe : describe.skip

describeE2e('Marginalia (e2e)', () => {
    let app: INestApplication
    let prisma: PrismaService
    let adminAgent: ReturnType<typeof request.agent>

    const marginaliaPayload = {
        book: 'The Book',
        title: 'Chapter One',
        description: 'A short description',
        cover: 'https://example.com/cover.jpg',
        author: 'Author Name',
        contentEn: '**Hello** world',
    }

    beforeAll(async () => {
        app = await createE2eApp()
        prisma = app.get(PrismaService)
    })

    beforeEach(async () => {
        await resetDatabase(prisma)
        adminAgent = request.agent(app.getHttpServer())

        const register = await adminAgent.post('/auth/register').send({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
        })

        await prisma.user.update({
            where: { id: register.body.user.id },
            data: { role: Role.ADMIN },
        })

        await adminAgent.post('/auth/login').send({
            email: 'admin@example.com',
            password: 'password123',
        })
    })

    afterAll(async () => {
        await app.close()
    })

    it('GET /marginalia/all returns empty list initially', async () => {
        const response = await request(app.getHttpServer())
            .get('/marginalia/all')
            .expect(200)

        expect(response.body).toEqual([])
    })

    it('POST /marginalia requires authentication', async () => {
        await request(app.getHttpServer())
            .post('/marginalia')
            .send(marginaliaPayload)
            .expect(401)
    })

    it('admin can create, read, update and delete marginalia', async () => {
        const created = await adminAgent
            .post('/marginalia')
            .send(marginaliaPayload)
            .expect(200)

        expect(created.body.title).toBe(marginaliaPayload.title)

        const listed = await request(app.getHttpServer())
            .get('/marginalia/all')
            .expect(200)

        expect(listed.body).toHaveLength(1)

        const byId = await request(app.getHttpServer())
            .get(`/marginalia/${created.body.id}`)
            .expect(200)

        expect(byId.body.id).toBe(created.body.id)
        expect(byId.body.comments).toEqual([])

        await adminAgent
            .patch(`/marginalia/${created.body.id}`)
            .send({ title: 'Updated title' })
            .expect(200)

        await adminAgent
            .delete(`/marginalia/${created.body.id}`)
            .expect(200)

        const afterDelete = await request(app.getHttpServer())
            .get('/marginalia/all')
            .expect(200)

        expect(afterDelete.body).toEqual([])
    })
})
