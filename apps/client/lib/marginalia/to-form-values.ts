import type { Marginalia } from '@/types/api/marginalia'
import type { MarginaliaFormValues } from '@/types/forms/marginaliaForm'
import { htmlToMarkdown } from './html-to-markdown'

export function marginaliaToFormValues(
    marginalia: Marginalia,
): MarginaliaFormValues {
    return {
        title: marginalia.title,
        book: marginalia.book,
        author: marginalia.author,
        description: marginalia.description,
        cover: marginalia.cover,
        contentEn: htmlToMarkdown(marginalia.contentEn),
    }
}
