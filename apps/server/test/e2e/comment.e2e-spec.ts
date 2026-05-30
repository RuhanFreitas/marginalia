import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { Role } from '../../src/generated/prisma/enums'
import { PrismaService } from '../../src/prisma/prisma.service'

import { createE2eApp } from '../helpers/e2e-app.factory'
import { resetDatabase } from '../helpers/e2e-db.helper'

const describeE2e =
    process.env.E2E_DB_READY === 'true' ? describe : describe.skip

describeE2e('Comment (e2e)', () => {
    let app: INestApplication
    let prisma: PrismaService
    let userAgent: ReturnType<typeof request.agent>
    let marginaliaId: number
    let userId: number

    beforeAll(async () => {
        app = await createE2eApp()
        prisma = app.get(PrismaService)
    })

    beforeEach(async () => {
        await resetDatabase(prisma)
        userAgent = request.agent(app.getHttpServer())

        const register = await userAgent.post('/auth/register').send({
            name: 'Commenter',
            email: 'commenter@example.com',
            password: 'password123',
        })

        userId = register.body.user.id

        await prisma.user.update({
            where: { id: userId },
            data: { role: Role.ADMIN },
        })

        await userAgent.post('/auth/login').send({
            email: 'commenter@example.com',
            password: 'password123',
        })

        const marginalia = await userAgent.post('/marginalia').send({
            book: 'Book',
            title: 'Title',
            description: 'Desc',
            cover: 'cover.jpg',
            author: 'Author',
            contentEn: 'Content',
        })

        marginaliaId = marginalia.body.id

        await prisma.user.update({
            where: { id: userId },
            data: { role: Role.USER },
        })

        await userAgent.post('/auth/login').send({
            email: 'commenter@example.com',
            password: 'password123',
        })
    })

    afterAll(async () => {
        await app.close()
    })

    it('POST /comment creates comment and GET returns tree', async () => {
        const created = await userAgent
            .post('/comment')
            .send({
                content: 'Root comment',
                marginaliaId,
            })
            .expect(200)

        expect(created.body.content).toBe('Root comment')

        await userAgent
            .post('/comment')
            .send({
                content: 'Nested reply',
                marginaliaId,
                parentId: created.body.id,
            })
            .expect(200)

        const comments = await request(app.getHttpServer())
            .get(`/comment/${marginaliaId}/comments`)
            .expect(200)

        expect(comments.body).toHaveLength(1)
        expect(comments.body[0].replies).toHaveLength(1)
    })

    it('PATCH /comment updates own comment', async () => {
        const created = await userAgent.post('/comment').send({
            content: 'Original',
            marginaliaId,
        })

        const updated = await userAgent
            .patch(`/comment/${created.body.id}`)
            .send({ content: 'Edited' })
            .expect(200)

        expect(updated.body.content).toBe('Edited')
    })
})
