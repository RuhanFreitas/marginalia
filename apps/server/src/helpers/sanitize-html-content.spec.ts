import { sanitizeContentHtml } from './sanitize-html-content'

describe('sanitizeContentHtml', () => {
    it('should strip script tags', () => {
        const output = sanitizeContentHtml(
            '<p>Hello</p><script>alert("xss")</script>',
        )
        expect(output).not.toContain('<script')
        expect(output).not.toContain('alert')
    })

    it('should strip event handlers from anchors', () => {
        const output = sanitizeContentHtml(
            '<a href="https://example.com" onclick="alert(1)">link</a>',
        )
        expect(output).toContain('<a href="https://example.com"')
        expect(output).not.toContain('onclick')
    })

    it('should block javascript: URLs', () => {
        const output = sanitizeContentHtml(
            '<a href="javascript:alert(1)">bad</a>',
        )
        expect(output).not.toContain('javascript:')
    })

    it('should strip unsupported tags like underline', () => {
        const output = sanitizeContentHtml('This is <u>underlined</u> text')
        expect(output).not.toContain('<u>')
        expect(output).toContain('underlined')
    })

    it('should preserve allowed formatting tags', () => {
        const output = sanitizeContentHtml(
            '<strong>bold</strong> <em>italic</em> <code>code</code>',
        )
        expect(output).toContain('<strong>bold</strong>')
        expect(output).toContain('<em>italic</em>')
        expect(output).toContain('<code>code</code>')
    })
})
