import { sanitizeContentHtml } from './sanitize-html-content'

export function markdownToHtml(markdown: string): string {
    let html = markdown

    // Bold: **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

    // Italic: *text* -> <em>text</em>
    // Only replace if not already part of bold
    html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')

    // Strikethrough: ~~text~~ -> <del>text</del>
    html = html.replace(/~~(.+?)~~/g, '<del>$1</del>')

    // Inline code: `text` -> <code>text</code>
    html = html.replace(/`(.+?)`/g, '<code>$1</code>')

    // Links: [text](url) -> <a href="url">text</a>
    html = html.replace(
        /\[(.+?)\]\((.+?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    )

    // Images: ![alt](url) -> <img src="url" alt="alt">
    html = html.replace(
        /!\[(.+?)\]\((.+?)\)/g,
        '<img src="$2" alt="$1" style="max-width: 100%; height: auto;">',
    )

    // Split into lines for block-level processing
    const lines = html.split('\n')
    const processedLines: string[] = []
    let inList = false
    let inBlockquote = false
    let listItems: string[] = []
    let blockquoteItems: string[] = []

    for (const line of lines) {
        const trimmedLine = line.trim()

        // Ordered lists: 1. text -> <li>text</li>
        if (/^\d+\.\s/.test(trimmedLine)) {
            if (!inList) {
                inList = true
                listItems = []
            }
            listItems.push(
                '<li>' + trimmedLine.replace(/^\d+\.\s/, '') + '</li>',
            )
        }
        // Bullet lists: - text -> <li>text</li>
        else if (/^-\s/.test(trimmedLine)) {
            if (!inList) {
                inList = true
                listItems = []
            }
            listItems.push('<li>' + trimmedLine.replace(/^-\s/, '') + '</li>')
        }
        // Blockquotes: > text -> <blockquote>text</blockquote>
        else if (/^>\s/.test(trimmedLine)) {
            if (inList) {
                processedLines.push('<ul>' + listItems.join('') + '</ul>')
                inList = false
                listItems = []
            }
            if (!inBlockquote) {
                inBlockquote = true
                blockquoteItems = []
            }
            blockquoteItems.push(trimmedLine.replace(/^>\s/, ''))
        } else {
            if (inList) {
                processedLines.push('<ul>' + listItems.join('') + '</ul>')
                inList = false
                listItems = []
            }
            if (inBlockquote) {
                processedLines.push(
                    '<div style="border-left: 3px solid #ccc; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #666;">' +
                        blockquoteItems.join('<br>') +
                        '</div>',
                )
                inBlockquote = false
                blockquoteItems = []
            }
            if (trimmedLine) {
                processedLines.push(line)
            }
        }
    }

    // Flush remaining list items
    if (inList) {
        processedLines.push('<ul>' + listItems.join('') + '</ul>')
    }
    // Flush remaining blockquotes
    if (inBlockquote) {
        processedLines.push(
            '<div style="border-left: 3px solid #ccc; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #666;">' +
                blockquoteItems.join('<br>') +
                '</div>',
        )
    }

    return sanitizeContentHtml(processedLines.join('<br>'))
}
