import 'server-only'

import { handleJsonResponse } from '@/lib/api'
import { getServerApiBaseUrl } from '@/lib/api/server-api-url'
import type { Comment } from '@/types/api/comment'

export async function getComments(slug: string): Promise<Comment[]> {
    const base = await getServerApiBaseUrl()
    const res = await fetch(`${base}/comment/${slug}/comments`, {
        cache: 'no-store',
    })

    return handleJsonResponse<Comment[]>(res, 'Failed to load comments')
}
