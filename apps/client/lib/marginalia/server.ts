import 'server-only'

import { handleJsonResponse } from '@/lib/api'
import { getServerApiBaseUrl } from '@/lib/api/server-api-url'
import type { Marginalia } from '@/types/api/marginalia'

const MARGINALIA_PATH = '/marginalia'

export async function getAllMarginalias(): Promise<Marginalia[]> {
    const base = getServerApiBaseUrl()
    const res = await fetch(`${base}${MARGINALIA_PATH}/all`, {
        cache: 'no-store',
    })

    return handleJsonResponse<Marginalia[]>(res, 'Failed to load entries')
}

export async function getMarginalia(id: string): Promise<Marginalia> {
    const base = getServerApiBaseUrl()
    const res = await fetch(`${base}${MARGINALIA_PATH}/${id}`, {
        cache: 'no-store',
    })

    return handleJsonResponse<Marginalia>(res, 'Entry not found')
}
