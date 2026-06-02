const BLOCKQUOTE_DIV =
    /<div style="border-left: 3px solid #ccc; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #666;">([\s\S]*?)<\/div>/gi

const UNORDERED_LIST = /<ul>([\s\S]*?)<\/ul>/gi
const LIST_ITEM = /<li>([\s\S]*?)<\/li>/gi

const INLINE_RULES: [RegExp, string][] = [
    [/<img src="([^"]*)" alt="([^"]*)"[^>]*>/gi, '![$2]($1)'],
    [/<a href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)'],
    [/<strong>([\s\S]*?)<\/strong>/gi, '**$1**'],
    [/<em>([\s\S]*?)<\/em>/gi, '*$1*'],
    [/<del>([\s\S]*?)<\/del>/gi, '~~$1~~'],
    [/<code>([\s\S]*?)<\/code>/gi, '`$1`'],
]

function decodeInline(html: string): string {
    let result = html

    let previous = ''
    while (previous !== result) {
        previous = result
        for (const [pattern, replacement] of INLINE_RULES) {
            result = result.replace(pattern, replacement)
        }
    }

    return result
}

function splitByLineBreaks(html: string): string[] {
    return html.split(/<br\s*\/?>/gi)
}

function listItemsToMarkdown(itemsHtml: string): string {
    const items: string[] = []

    for (const match of itemsHtml.matchAll(LIST_ITEM)) {
        items.push(`- ${decodeInline(match[1].trim())}`)
    }

    return items.join('\n')
}

function blockquoteToMarkdown(content: string): string {
    return splitByLineBreaks(content)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => `> ${decodeInline(line)}`)
        .join('\n')
}

function plainSegmentsToMarkdown(html: string): string[] {
    return splitByLineBreaks(html)
        .map((line) => line.trim())
        .filter(Boolean)
        .map(decodeInline)
}

type BlockMatch = {
    index: number
    length: number
    markdown: string
}

function collectBlockMatches(html: string): BlockMatch[] {
    const matches: BlockMatch[] = []

    for (const match of html.matchAll(BLOCKQUOTE_DIV)) {
        if (match.index === undefined) continue
        matches.push({
            index: match.index,
            length: match[0].length,
            markdown: blockquoteToMarkdown(match[1]),
        })
    }

    for (const match of html.matchAll(UNORDERED_LIST)) {
        if (match.index === undefined) continue
        matches.push({
            index: match.index,
            length: match[0].length,
            markdown: listItemsToMarkdown(match[1]),
        })
    }

    return matches.sort((a, b) => a.index - b.index)
}

export function htmlToMarkdown(html: string): string {
    if (!html.trim()) return ''

    const blockMatches = collectBlockMatches(html)

    if (blockMatches.length === 0) {
        return plainSegmentsToMarkdown(html).join('\n')
    }

    const blocks: string[] = []
    let cursor = 0

    for (const block of blockMatches) {
        const before = html.slice(cursor, block.index).trim()
        if (before) {
            blocks.push(...plainSegmentsToMarkdown(before))
        }

        blocks.push(block.markdown)
        cursor = block.index + block.length
    }

    const tail = html.slice(cursor).trim()
    if (tail) {
        blocks.push(...plainSegmentsToMarkdown(tail))
    }

    return blocks.join('\n')
}
