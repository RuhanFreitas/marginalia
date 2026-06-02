'use client'

import MarginaliaFormFields from './marginalia-form-fields'
import { FormError } from '@/components/ui'
import { useCreateMarginalia, useUpdateMarginalia } from '@/hooks/marginalia'
import { marginaliaToFormValues } from '@/lib/marginalia'
import { isMarginaliaFormComplete } from '@/lib/validation'
import type { Marginalia } from '@/types/api/marginalia'
import {
    EMPTY_MARGINALIA_FORM,
    type MarginaliaFormValues,
} from '@/types/forms/marginaliaForm'
import { X } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'

type MarginaliaModalMode = 'create' | 'edit'

type MarginaliaModalProps = {
    open: boolean
    onClose: () => void
} & (
    | { mode: 'create' }
    | { mode: 'edit'; marginalia: Marginalia }
)

const MODAL_COPY = {
    create: {
        title: 'Create New Marginalia',
        subtitle: 'Publish a new philosophical reflection',
        submitIdle: 'PUBLISH',
        submitLoading: 'PUBLISHING...',
        incompleteHint: 'Fill all fields to publish',
    },
    edit: {
        title: 'Edit Marginalia',
        subtitle: 'Update this philosophical reflection',
        submitIdle: 'SAVE CHANGES',
        submitLoading: 'SAVING...',
        incompleteHint: 'Fill all fields to save',
    },
} as const

export default function MarginaliaModal(props: MarginaliaModalProps) {
    const { open, onClose, mode } = props
    const copy = MODAL_COPY[mode]

    const [form, setForm] = useState<MarginaliaFormValues>(
        EMPTY_MARGINALIA_FORM,
    )
    const [coverPreviewError, setCoverPreviewError] = useState(false)

    const resetForm = () => {
        setForm(EMPTY_MARGINALIA_FORM)
        setCoverPreviewError(false)
    }

    const handleSuccess = () => {
        resetForm()
        onClose()
    }

    const createMutation = useCreateMarginalia(handleSuccess)
    const updateMutation = useUpdateMarginalia(
        mode === 'edit' ? props.marginalia.id : 0,
        handleSuccess,
    )

    const { loading, error, clearError } =
        mode === 'create' ? createMutation : updateMutation

    const isComplete = isMarginaliaFormComplete(form)

    useEffect(() => {
        if (!open) return

        if (mode === 'edit') {
            setForm(marginaliaToFormValues(props.marginalia))
        } else {
            setForm(EMPTY_MARGINALIA_FORM)
        }

        setCoverPreviewError(false)
        createMutation.clearError()
        updateMutation.clearError()
        // eslint-disable-next-line react-hooks/exhaustive-deps -- reset form when modal opens
    }, [open, mode, mode === 'edit' ? props.marginalia.id : null])

    useEffect(() => {
        if (!open) return

        document.body.style.overflow = 'hidden'

        function handleEscape(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose()
        }

        window.addEventListener('keydown', handleEscape)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleEscape)
        }
    }, [open, onClose])

    useEffect(() => {
        const timer = setTimeout(() => {
            setCoverPreviewError(false)
        }, 0)
        return () => clearTimeout(timer)
    }, [form.cover])

    function updateField<K extends keyof MarginaliaFormValues>(
        field: K,
        value: MarginaliaFormValues[K],
    ) {
        setForm((prev) => ({ ...prev, [field]: value }))
        if (error) clearError()
    }

    function handleClose() {
        resetForm()
        clearError()
        onClose()
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (mode === 'create') {
            await createMutation.publish(form)
            return
        }

        await updateMutation.save(form)
    }

    if (!open) return null

    const titleId =
        mode === 'create' ? 'create-marginalia-title' : 'edit-marginalia-title'

    return (
        <div
            className="fixed inset-0 z-[200] flex h-dvh w-full flex-col overflow-hidden bg-background/80 backdrop-blur-[3px]"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
        >
            <form
                onSubmit={handleSubmit}
                className="flex h-full min-h-0 flex-col"
            >
                <header className="shrink-0 flex items-start justify-between gap-6 border-b border-default/10 px-8 py-8">
                    <div className="flex flex-col gap-2">
                        <h2
                            id={titleId}
                            className="font-display text-3xl text-default tracking-wide"
                        >
                            {copy.title}
                        </h2>
                        <p className="text-sm text-default/60 tracking-wide">
                            {copy.subtitle}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="text-default/60 hover:text-default transition cursor-pointer p-1"
                        aria-label="Close"
                    >
                        <X width={20} height={20} />
                    </button>
                </header>

                <MarginaliaFormFields
                    form={form}
                    onFieldChange={updateField}
                    coverPreviewError={coverPreviewError}
                    onCoverPreviewError={() => setCoverPreviewError(true)}
                />

                <footer className="shrink-0 flex flex-col gap-4 border-t border-default/10 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="text-xs font-medium tracking-widest text-default/60 hover:text-default transition cursor-pointer w-fit"
                    >
                        CANCEL
                    </button>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                        <FormError message={error} align="start" />

                        {!error && !isComplete && (
                            <span className="text-xs text-default/40 tracking-wide">
                                {copy.incompleteHint}
                            </span>
                        )}

                        <button
                            type="submit"
                            disabled={!isComplete || loading}
                            className="px-8 py-3 text-xs font-medium tracking-widest bg-default text-default-foreground transition disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 w-fit sm:ml-auto"
                        >
                            {loading ? copy.submitLoading : copy.submitIdle}
                        </button>
                    </div>
                </footer>
            </form>
        </div>
    )
}
