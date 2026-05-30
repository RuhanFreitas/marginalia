import type { Response } from 'express'

export function createMockResponse(): Response {
    const res = {
        cookie: jest.fn().mockReturnThis(),
        json: jest.fn().mockImplementation(function (this: Response, body) {
            return body
        }),
    } as unknown as Response

    return res
}
