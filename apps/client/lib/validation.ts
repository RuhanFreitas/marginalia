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
