export type TextSelection = {
    start: number
    end: number
}

type WrapFormat = {
    before: string
    after: string
    placeholder?: string
}

/** Inline formats supported by the server markdownToHtml helper. */
export const MARKDOWN_WRAP = {
    bold: { before: '**', after: '**' },
    italic: { before: '*', after: '*' },
    strikethrough: { before: '~~', after: '~~' },
    code: { before: '`', after: '`' },
    link: { before: '[', after: '](url)', placeholder: 'text' },
    image: { before: '![', after: '](url)', placeholder: 'alt' },
} as const satisfies Record<string, WrapFormat>

/** Block prefixes supported by the server markdownToHtml helper. */
export const MARKDOWN_BLOCK = {
    orderedList: '1. ',
    bulletList: '- ',
    quote: '> ',
} as const satisfies Record<string, string>

export type MarkdownWrapAction = keyof typeof MARKDOWN_WRAP
export type MarkdownBlockAction = keyof typeof MARKDOWN_BLOCK

export function wrapSelection(
    text: string,
    selection: TextSelection,
    format: WrapFormat,
): { text: string; selection: TextSelection } {
    const { start, end } = selection
    const hasSelection = start !== end
    const selected = hasSelection
        ? text.slice(start, end)
        : (format.placeholder ?? '')

    const newText =
        text.slice(0, start) +
        format.before +
        selected +
        format.after +
        text.slice(end)

    const selectionStart = start + format.before.length
    const selectionEnd = selectionStart + selected.length

    return {
        text: newText,
        selection: { start: selectionStart, end: selectionEnd },
    }
}

export function prefixLine(
    text: string,
    selection: TextSelection,
    prefix: string,
): { text: string; selection: TextSelection } {
    const { start } = selection
    const lineStart = text.lastIndexOf('\n', start - 1) + 1
    const needsLeadingNewline = start > lineStart

    const insertAt = needsLeadingNewline ? start : lineStart
    const insertion = needsLeadingNewline ? `\n${prefix}` : prefix

    const newText =
        text.slice(0, insertAt) + insertion + text.slice(insertAt)

    const cursor = insertAt + insertion.length

    return {
        text: newText,
        selection: { start: cursor, end: cursor },
    }
}

export function insertLineBreak(
    text: string,
    selection: TextSelection,
): { text: string; selection: TextSelection } {
    const { start, end } = selection
    const newText = `${text.slice(0, start)}\n${text.slice(end)}`
    const cursor = start + 1

    return {
        text: newText,
        selection: { start: cursor, end: cursor },
    }
}
