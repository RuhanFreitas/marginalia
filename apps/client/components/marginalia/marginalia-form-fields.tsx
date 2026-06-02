'use client'

import FieldLabel, { marginaliaInputClassName } from './field-label'
import MarkdownEditor from './markdown-editor'
import type { MarginaliaFormValues } from '@/types/forms/marginaliaForm'
import { BookOpen, FileText, ImageIcon, List, User } from 'lucide-react'
import Image from 'next/image'

type MarginaliaFormFieldsProps = {
    form: MarginaliaFormValues
    onFieldChange: <K extends keyof MarginaliaFormValues>(
        field: K,
        value: MarginaliaFormValues[K],
    ) => void
    coverPreviewError: boolean
    onCoverPreviewError: () => void
}

export default function MarginaliaFormFields({
    form,
    onFieldChange,
    coverPreviewError,
    onCoverPreviewError,
}: MarginaliaFormFieldsProps) {
    return (
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
                        onChange={(e) => onFieldChange('title', e.target.value)}
                        placeholder="On the weight of being thrown"
                        className={marginaliaInputClassName}
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
                                onFieldChange('book', e.target.value)
                            }
                            placeholder="Being and Time"
                            className={marginaliaInputClassName}
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
                                onFieldChange('author', e.target.value)
                            }
                            placeholder="Martin Heidegger"
                            className={marginaliaInputClassName}
                        />
                    </div>
                </div>

                <div>
                    <FieldLabel icon={<List width={12} />} label="EXCERPT" />
                    <textarea
                        value={form.description}
                        onChange={(e) =>
                            onFieldChange('description', e.target.value)
                        }
                        placeholder="A brief excerpt that appears on the main page..."
                        rows={4}
                        className={`${marginaliaInputClassName} resize-none min-h-[100px]`}
                    />
                    <p className="mt-2 text-xs text-default/40 tracking-wide">
                        This will be displayed as the preview on the main page
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
                            onFieldChange('contentEn', contentEn)
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
                    onChange={(e) => onFieldChange('cover', e.target.value)}
                    placeholder="https://..."
                    className={marginaliaInputClassName}
                />
                <div className="relative mt-2 aspect-[3/4] w-full overflow-hidden border border-default/10 bg-default/5">
                    {form.cover.trim() && !coverPreviewError ? (
                        <Image
                            src={form.cover.trim()}
                            alt="Cover preview"
                            fill
                            className="object-cover grayscale"
                            onError={onCoverPreviewError}
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
    )
}
