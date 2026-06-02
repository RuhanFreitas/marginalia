'use client'

import { getErrorMessage } from '@/lib/api'
import { toUpdateMarginaliaBody, updateMarginalia } from '@/lib/marginalia'
import { validateMarginaliaForm } from '@/lib/validation'
import type { MarginaliaFormValues } from '@/types/forms/marginaliaForm'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function useUpdateMarginalia(
    marginaliaId: number,
    onSuccess?: () => void,
) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function save(form: MarginaliaFormValues): Promise<boolean> {
        const validationError = validateMarginaliaForm(form)
        if (validationError) {
            setError(validationError)
            return false
        }

        setError('')
        setLoading(true)

        try {
            await updateMarginalia(marginaliaId, toUpdateMarginaliaBody(form))
            onSuccess?.()
            router.refresh()
            return true
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Failed to update marginalia'))
            return false
        } finally {
            setLoading(false)
        }
    }

    function clearError() {
        setError('')
    }

    return { save, loading, error, clearError }
}
