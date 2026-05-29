'use client'

import FormError from '@/components/formError/formError'
import MarkdownEditor from '@/components/markdownEditor/markdownEditor'
import { useCreateMarginalia } from '@/hooks/useCreateMarginalia'
import { isMarginaliaFormComplete } from '@/lib/validation'
import {
    EMPTY_MARGINALIA_FORM,
    type MarginaliaFormValues,
} from '@/types/forms/marginaliaForm'
import { BookOpen, FileText, ImageIcon, List, User, X } from 'lucide-react'
import Image from 'next/image'
import React, { FormEvent, useEffect, useState } from 'react'

type CreateMarginaliaModalProps = {
    open: boolean
    onClose: () => void
}

type FieldLabelProps = {
    icon: React.ReactNode
    label: string
    hint?: string
}

function FieldLabel({ icon, label, hint }: FieldLabelProps) {
    return (
        <div className="flex flex-col gap-1 mb-2">
            <span className="flex items-center gap-2 text-default/60 tracking-widest text-xs font-medium">
                {icon}
                {label}
            </span>
            {hint && (
                <span className="text-default/40 text-xs tracking-wide">
                    {hint}
                </span>
            )}
        </div>
    )
}

const inputClassName =
    'w-full py-3 px-4 text-default font-display text-sm outline-0 border border-default/10 bg-background placeholder:text-default/40 focus:border-default/30'

export default function CreateMarginaliaModal({
    open,
    onClose,
}: CreateMarginaliaModalProps) {
    const [form, setForm] = useState<MarginaliaFormValues>(
        EMPTY_MARGINALIA_FORM,
    )
    const [coverPreviewError, setCoverPreviewError] = useState(false)

    const { publish, loading, error, clearError } = useCreateMarginalia(() => {
        setForm(EMPTY_MARGINALIA_FORM)
        setCoverPreviewError(false)
        onClose()
    })

    const isComplete = isMarginaliaFormComplete(form)

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
        setForm(EMPTY_MARGINALIA_FORM)
        clearError()
        setCoverPreviewError(false)
        onClose()
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        await publish(form)
    }

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-[200] flex h-dvh w-full flex-col overflow-hidden bg-background/80 backdrop-blur-[3px]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-marginalia-title"
        >
            <form
                onSubmit={handleSubmit}
                className="flex h-full min-h-0 flex-col"
            >
                <header className="shrink-0 flex items-start justify-between gap-6 border-b border-default/10 px-8 py-8">
                    <div className="flex flex-col gap-2">
                        <h2
                            id="create-marginalia-title"
                            className="font-display text-3xl text-default tracking-wide"
                        >
                            Create New Marginalia
                        </h2>
                        <p className="text-sm text-default/60 tracking-wide">
                            Publish a new philosophical reflection
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

                <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[1fr_260px]">
                    <div className="flex flex-col gap-8 px-8 py-8 lg:border-r lg:border-default/10">
                        <div>
                            <FieldLabel
                                icon={<FileText width={12} />}
                                label="MARGINALIA TITLE"
                            />
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) =>
                                    updateField('title', e.target.value)
                                }
                                placeholder="On the weight of being thrown"
                                className={inputClassName}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <FieldLabel
                                    icon={<BookOpen width={12} />}
                                    label="BOOK TITLE"
                                />
                                <input
                                    type="text"
                                    value={form.book}
                                    onChange={(e) =>
                                        updateField('book', e.target.value)
                                    }
                                    placeholder="Being and Time"
                                    className={inputClassName}
                                />
                            </div>
                            <div>
                                <FieldLabel
                                    icon={<User width={12} />}
                                    label="AUTHOR"
                                />
                                <input
                                    type="text"
                                    value={form.author}
                                    onChange={(e) =>
                                        updateField('author', e.target.value)
                                    }
                                    placeholder="Martin Heidegger"
                                    className={inputClassName}
                                />
                            </div>
                        </div>

                        <div>
                            <FieldLabel
                                icon={<List width={12} />}
                                label="EXCERPT"
                            />
                            <textarea
                                value={form.description}
                                onChange={(e) =>
                                    updateField('description', e.target.value)
                                }
                                placeholder="A brief excerpt that appears on the main page..."
                                rows={4}
                                className={`${inputClassName} resize-none min-h-[100px]`}
                            />
                            <p className="mt-2 text-xs text-default/40 tracking-wide">
                                This will be displayed as the preview on the
                                main page
                            </p>
                        </div>

                        <div>
                            <FieldLabel
                                icon={<FileText width={12} />}
                                label="CONTENT"
                                hint="Markdown supported: bold, italic, lists, links, and more"
                            />
                            <MarkdownEditor
                                value={form.contentEn}
                                onChange={(contentEn) =>
                                    updateField('contentEn', contentEn)
                                }
                                placeholder="Write your philosophical reflection here..."
                            />
                        </div>
                    </div>

                    <aside className="flex flex-col gap-4 px-8 py-8">
                        <FieldLabel
                            icon={<ImageIcon width={12} />}
                            label="BOOK COVER"
                        />
                        <input
                            type="url"
                            value={form.cover}
                            onChange={(e) =>
                                updateField('cover', e.target.value)
                            }
                            placeholder="https://..."
                            className={inputClassName}
                        />
                        <div className="relative mt-2 aspect-[3/4] w-full overflow-hidden border border-default/10 bg-default/5">
                            {form.cover.trim() && !coverPreviewError ? (
                                <Image
                                    src={form.cover.trim()}
                                    alt="Cover preview"
                                    fill
                                    className="object-cover grayscale"
                                    onError={() => setCoverPreviewError(true)}
                                    unoptimized
                                />
                            ) : (
                                <div className="flex h-full min-h-[220px] items-center justify-center">
                                    <span className="text-sm text-default/40 font-display">
                                        Cover preview
                                    </span>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>

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
                                Fill all fields to publish
                            </span>
                        )}

                        <button
                            type="submit"
                            disabled={!isComplete || loading}
                            className="px-8 py-3 text-xs font-medium tracking-widest bg-default text-default-foreground transition disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 w-fit sm:ml-auto"
                        >
                            {loading ? 'PUBLISHING...' : 'PUBLISH'}
                        </button>
                    </div>
                </footer>
            </form>
        </div>
    )
}
