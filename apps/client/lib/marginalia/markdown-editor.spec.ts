import {
    insertLineBreak,
    MARKDOWN_WRAP,
    prefixLine,
    wrapSelection,
} from './markdown-editor'

describe('wrapSelection', () => {
    it('wraps selected text with format markers', () => {
        const result = wrapSelection(
            'hello world',
            { start: 6, end: 11 },
            MARKDOWN_WRAP.bold,
        )

        expect(result.text).toBe('hello **world**')
        expect(result.selection).toEqual({ start: 8, end: 13 })
    })

    it('inserts placeholder when selection is empty', () => {
        const result = wrapSelection(
            'hello',
            { start: 5, end: 5 },
            MARKDOWN_WRAP.link,
        )

        expect(result.text).toBe('hello[text](url)')
    })
})

describe('prefixLine', () => {
    it('prefixes the current line with block marker', () => {
        const result = prefixLine('one\ntwo', { start: 4, end: 4 }, '- ')

        expect(result.text).toBe('one\n- two')
    })
})

describe('insertLineBreak', () => {
    it('inserts a newline at the cursor', () => {
        const result = insertLineBreak('ab', { start: 1, end: 1 })

        expect(result.text).toBe('a\nb')
        expect(result.selection).toEqual({ start: 2, end: 2 })
    })
})
