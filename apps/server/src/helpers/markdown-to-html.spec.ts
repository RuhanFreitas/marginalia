import { markdownToHtml } from './markdown-to-html'

describe('markdownToHtml', () => {
    it('should convert bold markdown', () => {
        const input = 'This is **bold** text'
        const output = markdownToHtml(input)
        expect(output).toContain('<strong>bold</strong>')
    })

    it('should convert italic markdown', () => {
        const input = 'This is *italic* text'
        const output = markdownToHtml(input)
        expect(output).toContain('<em>italic</em>')
    })

    it('should convert strikethrough markdown', () => {
        const input = 'This is ~~strikethrough~~ text'
        const output = markdownToHtml(input)
        expect(output).toContain('<del>strikethrough</del>')
    })

    it('should convert inline code markdown', () => {
        const input = 'This is `code` text'
        const output = markdownToHtml(input)
        expect(output).toContain('<code>code</code>')
    })

    it('should convert links', () => {
        const input = 'This is a [link](https://example.com)'
        const output = markdownToHtml(input)
        expect(output).toContain('<a href="https://example.com"')
    })

    it('should convert images', () => {
        const input = 'This is an ![image](https://example.com/image.jpg)'
        const output = markdownToHtml(input)
        expect(output).toContain('<img src="https://example.com/image.jpg"')
    })

    it('should convert bullet lists', () => {
        const input = '- Item 1\n- Item 2'
        const output = markdownToHtml(input)
        expect(output).toContain('<ul>')
        expect(output).toContain('<li>Item 1</li>')
        expect(output).toContain('<li>Item 2</li>')
    })

    it('should convert ordered lists', () => {
        const input = '1. Item 1\n2. Item 2'
        const output = markdownToHtml(input)
        expect(output).toContain('<ul>')
        expect(output).toContain('<li>Item 1</li>')
        expect(output).toContain('<li>Item 2</li>')
    })

    it('should convert blockquotes', () => {
        const input = '> This is a quote'
        const output = markdownToHtml(input)
        expect(output).toContain('This is a quote')
    })

    it('should handle underline tags', () => {
        const input = 'This is <u>underlined</u> text'
        const output = markdownToHtml(input)
        expect(output).toContain('<u>underlined</u>')
    })
})
