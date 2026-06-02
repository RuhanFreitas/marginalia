import { htmlToMarkdown } from './html-to-markdown'

describe('htmlToMarkdown', () => {
    it('converts inline formatting', () => {
        const html = 'This is <strong>bold</strong> and <em>italic</em>'
        expect(htmlToMarkdown(html)).toBe('This is **bold** and *italic*')
    })

    it('converts links and images', () => {
        const html =
            'A <a href="https://example.com" target="_blank" rel="noopener noreferrer">link</a> and <img src="https://example.com/i.jpg" alt="alt" style="max-width: 100%; height: auto;">'
        expect(htmlToMarkdown(html)).toBe(
            'A [link](https://example.com) and ![alt](https://example.com/i.jpg)',
        )
    })

    it('converts bullet lists', () => {
        const html = '<ul><li>Item 1</li><li>Item 2</li></ul>'
        expect(htmlToMarkdown(html)).toBe('- Item 1\n- Item 2')
    })

    it('converts blockquotes', () => {
        const html =
            '<div style="border-left: 3px solid #ccc; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #666;">This is a quote</div>'
        expect(htmlToMarkdown(html)).toBe('> This is a quote')
    })

    it('converts line breaks between paragraphs', () => {
        const html = 'First line<br>Second line'
        expect(htmlToMarkdown(html)).toBe('First line\nSecond line')
    })

    it('returns empty string for blank html', () => {
        expect(htmlToMarkdown('   ')).toBe('')
    })
})
