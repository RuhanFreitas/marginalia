import { getAuthHeaders, handleJsonResponse } from '@/lib/api'
import { API_BASE_URL } from '@/lib/config'
import type { CreateMarginaliaBody, Marginalia } from '@/types/api/marginalia'

const MARGINALIA_PATH = '/marginalia'

export async function getAllMarginalias(): Promise<Marginalia[]> {
    const res = await fetch(`${API_BASE_URL}${MARGINALIA_PATH}/all`)

    return handleJsonResponse<Marginalia[]>(res, 'Failed to load entries')
}

export async function getMarginalia(id: string): Promise<Marginalia> {
    const res = await fetch(`${API_BASE_URL}${MARGINALIA_PATH}/${id}`)

    return handleJsonResponse<Marginalia>(res, 'Entry not found')
}

export async function createMarginalia(
    body: CreateMarginaliaBody,
    token: string,
): Promise<Marginalia> {
    const res = await fetch(`${API_BASE_URL}${MARGINALIA_PATH}`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(body),
    })

    return handleJsonResponse<Marginalia>(res, 'Failed to publish marginalia')
}
