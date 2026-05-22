type FormErrorProps = {
    message?: string
    align?: 'center' | 'start'
}

export default function FormError({
    message,
    align = 'center',
}: FormErrorProps) {
    if (!message) return null

    return (
        <p
            className={`font-display text-default/60 text-xs ${align === 'center' ? 'text-center' : ''}`}
        >
            {message}
        </p>
    )
}
