import { handleJsonResponse } from '@/lib/api'
import type { Marginalia } from '@/types/api/marginalia'

export async function getAllMarginalias(): Promise<Marginalia[]> {
    const res = await fetch(`http://localhost:3001/marginalia/all`)

    return handleJsonResponse<Marginalia[]>(res, 'Failed to load entries')
}

export async function getMarginalia(id: string): Promise<Marginalia> {
    const res = await fetch(`http://localhost:3001/marginalia/${id}`)

    return handleJsonResponse<Marginalia>(res, 'Entry not found')
}
