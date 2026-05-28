'use client'

import { getErrorMessage } from '@/lib/api'
import { createMarginalia } from '@/lib/marginalia'
import { toCreateMarginaliaBody } from '@/lib/marginalia-form'
import { validateMarginaliaForm } from '@/lib/validation'
import type { MarginaliaFormValues } from '@/types/forms/marginaliaForm'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function useCreateMarginalia(onSuccess?: () => void) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function publish(form: MarginaliaFormValues): Promise<boolean> {
        const validationError = validateMarginaliaForm(form)
        if (validationError) {
            setError(validationError)
            return false
        }

        setError('')
        setLoading(true)

        try {
            await createMarginalia(toCreateMarginaliaBody(form))
            onSuccess?.()
            router.refresh()
            return true
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Failed to publish marginalia'))
            return false
        } finally {
            setLoading(false)
        }
    }

    function clearError() {
        setError('')
    }

    return { publish, loading, error, clearError }
}
