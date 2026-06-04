import { handleJsonResponse, getApiBaseUrl } from '@/lib/api'
import type {
    CreateMarginaliaBody,
    Marginalia,
    UpdateMarginaliaBody,
} from '@/types/api/marginalia'

const MARGINALIA_PATH = '/marginalia'

export async function createMarginalia(
    body: CreateMarginaliaBody,
): Promise<Marginalia> {
    const res = await fetch(`${getApiBaseUrl()}${MARGINALIA_PATH}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    })

    return handleJsonResponse<Marginalia>(res, 'Failed to publish marginalia')
}

export async function updateMarginalia(
    id: number,
    body: UpdateMarginaliaBody,
): Promise<Marginalia> {
    const res = await fetch(`${getApiBaseUrl()}${MARGINALIA_PATH}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    })

    return handleJsonResponse<Marginalia>(res, 'Failed to update marginalia')
}
