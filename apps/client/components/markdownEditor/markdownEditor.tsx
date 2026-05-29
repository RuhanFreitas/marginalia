'use client'

import {
    MARKDOWN_BLOCK,
    MARKDOWN_WRAP,
    insertLineBreak,
    prefixLine,
    type MarkdownBlockAction,
    type MarkdownWrapAction,
    type TextSelection,
    wrapSelection,
} from '@/lib/markdown-editor'
import {
    Bold,
    Code,
    ImageIcon,
    Italic,
    Link,
    List,
    ListOrdered,
    Pilcrow,
    Quote,
    Strikethrough,
} from 'lucide-react'
import {
    useLayoutEffect,
    useRef,
    type ComponentProps,
    type ReactNode,
} from 'react'

type MarkdownEditorProps = {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    rows?: number
    textareaClassName?: string
    id?: string
}

const toolbarButtonClassName =
    'p-1.5 text-default/60 hover:text-default transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed'

type ToolbarButtonProps = {
    label: string
    onClick: () => void
    children: ReactNode
    disabled?: boolean
}

function ToolbarButton({
    label,
    onClick,
    children,
    disabled,
}: ToolbarButtonProps) {
    return (
        <button
            type="button"
            className={toolbarButtonClassName}
            aria-label={label}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

function ToolbarDivider() {
    return <span className="mx-1 h-4 w-px bg-default/10" aria-hidden />
}

export default function MarkdownEditor({
    value,
    onChange,
    placeholder,
    rows = 12,
    textareaClassName = '',
    id,
}: MarkdownEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const pendingSelection = useRef<TextSelection | null>(null)

    useLayoutEffect(() => {
        const pending = pendingSelection.current
        const textarea = textareaRef.current
        if (!pending || !textarea) return

        textarea.focus()
        textarea.setSelectionRange(pending.start, pending.end)
        pendingSelection.current = null
    }, [value])

    function getSelection(): TextSelection | null {
        const textarea = textareaRef.current
        if (!textarea) return null

        return {
            start: textarea.selectionStart,
            end: textarea.selectionEnd,
        }
    }

    function applyEdit(
        edit: (text: string, selection: TextSelection) => {
            text: string
            selection: TextSelection
        },
    ) {
        const selection = getSelection()
        if (!selection) return

        const result = edit(value, selection)
        pendingSelection.current = result.selection
        onChange(result.text)
    }

    function applyWrap(action: MarkdownWrapAction) {
        applyEdit((text, selection) =>
            wrapSelection(text, selection, MARKDOWN_WRAP[action]),
        )
    }

    function applyBlock(action: MarkdownBlockAction) {
        applyEdit((text, selection) =>
            prefixLine(text, selection, MARKDOWN_BLOCK[action]),
        )
    }

    function applyLineBreak() {
        applyEdit(insertLineBreak)
    }

    const iconProps = { width: 14, height: 14 } satisfies ComponentProps<
        typeof Bold
    >

    return (
        <div className="border border-default/10">
            <div
                className="flex flex-wrap items-center gap-1 border-b border-default/10 px-3 py-2"
                role="toolbar"
                aria-label="Formatting"
            >
                <ToolbarButton
                    label="Bold"
                    onClick={() => applyWrap('bold')}
                >
                    <Bold {...iconProps} />
                </ToolbarButton>
                <ToolbarButton
                    label="Italic"
                    onClick={() => applyWrap('italic')}
                >
                    <Italic {...iconProps} />
                </ToolbarButton>
                <ToolbarButton
                    label="Strikethrough"
                    onClick={() => applyWrap('strikethrough')}
                >
                    <Strikethrough {...iconProps} />
                </ToolbarButton>
                <ToolbarDivider />
                <ToolbarButton
                    label="Line break"
                    onClick={applyLineBreak}
                >
                    <Pilcrow {...iconProps} />
                </ToolbarButton>
                <ToolbarButton
                    label="Ordered list"
                    onClick={() => applyBlock('orderedList')}
                >
                    <ListOrdered {...iconProps} />
                </ToolbarButton>
                <ToolbarButton
                    label="Bullet list"
                    onClick={() => applyBlock('bulletList')}
                >
                    <List {...iconProps} />
                </ToolbarButton>
                <ToolbarButton
                    label="Quote"
                    onClick={() => applyBlock('quote')}
                >
                    <Quote {...iconProps} />
                </ToolbarButton>
                <ToolbarButton
                    label="Code"
                    onClick={() => applyWrap('code')}
                >
                    <Code {...iconProps} />
                </ToolbarButton>
                <ToolbarDivider />
                <ToolbarButton
                    label="Link"
                    onClick={() => applyWrap('link')}
                >
                    <Link {...iconProps} />
                </ToolbarButton>
                <ToolbarButton
                    label="Image"
                    onClick={() => applyWrap('image')}
                >
                    <ImageIcon {...iconProps} />
                </ToolbarButton>
            </div>
            <textarea
                ref={textareaRef}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className={`w-full min-h-[360px] flex-1 resize-y bg-background px-4 py-4 font-display text-sm text-default outline-0 placeholder:text-default/40 ${textareaClassName}`}
            />
        </div>
    )
}
