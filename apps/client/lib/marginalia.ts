import { handleJsonResponse } from '@/lib/api'
import type { CreateMarginaliaBody, Marginalia } from '@/types/api/marginalia'

export async function getAllMarginalias(): Promise<Marginalia[]> {
    const res = await fetch(`http://localhost:3001/marginalia/all`)

    return handleJsonResponse<Marginalia[]>(res, 'Failed to load entries')
}

export async function getMarginalia(id: string): Promise<Marginalia> {
    const res = await fetch(`http://localhost:3001/marginalia/${id}`)

    return handleJsonResponse<Marginalia>(res, 'Entry not found')
}

export async function createMarginalia(
    body: CreateMarginaliaBody,
    token: string,
): Promise<Marginalia> {
    const res = await fetch('http://localhost:3001/marginalia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })

    return handleJsonResponse<Marginalia>(res, 'Failed to publish marginalia')
}
