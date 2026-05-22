export type ApiErrorBody = {
    message?: string | string[]
    statusCode?: number
}

export function getErrorMessage(err: unknown, fallback: string): string {
    if (err instanceof Error && err.message) return err.message
    return fallback
}

export function parseApiErrorMessage(
    data: ApiErrorBody,
    fallback: string,
): string {
    const { message } = data
    if (Array.isArray(message)) return message[0] ?? fallback
    if (typeof message === 'string' && message) return message
    return fallback
}

export async function parseApiError(
    res: Response,
    fallback: string,
): Promise<string> {
    try {
        const data = (await res.json()) as ApiErrorBody
        return parseApiErrorMessage(data, fallback)
    } catch {
        return fallback
    }
}

export async function handleJsonResponse<T>(
    res: Response,
    fallback: string,
): Promise<T> {
    if (!res.ok) {
        throw new Error(await parseApiError(res, fallback))
    }

    return res.json() as Promise<T>
}
