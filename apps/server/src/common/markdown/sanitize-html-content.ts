import sanitizeHtml from 'sanitize-html'

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
    allowedTags: [
        'strong',
        'em',
        'del',
        'code',
        'a',
        'img',
        'ul',
        'ol',
        'li',
        'br',
        'div',
    ],
    allowedAttributes: {
        a: ['href', 'target', 'rel'],
        img: ['src', 'alt', 'style'],
        div: ['style'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
        img: ['http', 'https'],
    },
    allowedStyles: {
        div: {
            'border-left': [/^3px solid #ccc$/i],
            'padding-left': [/^1rem$/i],
            margin: [/^1rem 0$/i],
            'font-style': [/^italic$/i],
            color: [/^#666$/i],
        },
        img: {
            'max-width': [/^100%$/i],
            height: [/^auto$/i],
        },
    },
    transformTags: {
        a: (
            _tagName: string,
            attribs: sanitizeHtml.Attributes,
        ): sanitizeHtml.Tag => ({
            tagName: 'a',
            attribs: {
                href: attribs.href,
                target: '_blank',
                rel: 'noopener noreferrer',
            },
        }),
    },
}

export function sanitizeContentHtml(html: string): string {
    return sanitizeHtml(html, SANITIZE_OPTIONS)
}
