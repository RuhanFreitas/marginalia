import { handleJsonResponse } from '@/lib/api'
import { API_BASE_URL } from '@/lib/api'
import type { CreateMarginaliaBody, Marginalia } from '@/types/api/marginalia'

const MARGINALIA_PATH = '/marginalia'

export async function getAllMarginalias(): Promise<Marginalia[]> {
    const res = await fetch(`${API_BASE_URL}${MARGINALIA_PATH}/all`, {
        credentials: 'include',
    })

    return handleJsonResponse<Marginalia[]>(res, 'Failed to load entries')
}

export async function getMarginalia(id: string): Promise<Marginalia> {
    const res = await fetch(`${API_BASE_URL}${MARGINALIA_PATH}/${id}`, {
        credentials: 'include',
    })

    return handleJsonResponse<Marginalia>(res, 'Entry not found')
}

export async function createMarginalia(
    body: CreateMarginaliaBody,
): Promise<Marginalia> {
    const res = await fetch(`${API_BASE_URL}${MARGINALIA_PATH}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    })

    return handleJsonResponse<Marginalia>(res, 'Failed to publish marginalia')
}
