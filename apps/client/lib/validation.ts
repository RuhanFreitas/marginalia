export function validateLogin(email: string, password: string): string | null {
    if (!email.trim()) return 'Please, enter your email'
    if (!password) return 'Please, enter your password'
    return null
}

export function validateRegister(
    email: string,
    name: string,
    password: string,
): string | null {
    if (!email.trim()) return 'Please, enter your email'
    if (!name.trim()) return 'Please, enter your name'
    if (name.trim().length < 3) {
        return 'Your username needs to have at least 3 characters'
    }
    if (!password) return 'Please, enter your password'
    if (password.length < 6) {
        return 'Your password needs to have at least 6 characters'
    }
    return null
}

export function validateUpdateAccount(
    fields: { name?: string; email?: string; password?: string },
    password: string,
    confirmPassword: string,
): string | null {
    const hasChanges =
        Boolean(fields.name) ||
        Boolean(fields.email) ||
        Boolean(fields.password)

    if (!hasChanges) return 'Change at least one field before saving'

    if (password || confirmPassword) {
        if (password !== confirmPassword) return 'Passwords do not match'
        if (password.length < 6) {
            return 'Your password needs to have at least 6 characters'
        }
    }

    return null
}

export function validateComment(content: string): string | null {
    if (!content.trim()) return 'Please, enter a comment'
    return null
}

export function isMarginaliaFormComplete(
    values: Record<string, string>,
): boolean {
    const requiredFields = [
        'title',
        'book',
        'author',
        'description',
        'contentEn',
    ] as const

    const allTextFilled = requiredFields.every(
        (field) => values[field]?.trim().length > 0,
    )

    return allTextFilled && isMarginaliaCoverUrlValid(values.cover ?? '')
}

export function isMarginaliaCoverUrlValid(cover: string): boolean {
    return cover.trim().length > 0 && isValidUrl(cover.trim())
}

function isValidUrl(value: string): boolean {
    try {
        const url = new URL(value)
        return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
        return false
    }
}

export function validateMarginaliaForm(
    values: Record<string, string>,
): string | null {
    if (!values.title?.trim()) return 'Please, enter a valid title'
    if (!values.book?.trim()) return 'Please, enter a valid book title'
    if (!values.author?.trim()) return 'Please, enter a valid author name'
    if (!values.description?.trim()) return 'Please, enter a valid description'
    if (!values.cover?.trim()) return 'Please, enter a valid cover format'
    if (!isValidUrl(values.cover.trim())) {
        return 'Please, enter a valid cover URL (http or https)'
    }
    if (!values.contentEn?.trim()) {
        return 'Please, enter a valid content format in english'
    }
    return null
}
