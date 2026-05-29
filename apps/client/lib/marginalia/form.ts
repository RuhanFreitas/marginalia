import type { CreateMarginaliaBody } from '@/types/api/marginalia'
import type { MarginaliaFormValues } from '@/types/forms/marginaliaForm'

export function toCreateMarginaliaBody(
    form: MarginaliaFormValues,
): CreateMarginaliaBody {
    return {
        title: form.title.trim(),
        book: form.book.trim(),
        author: form.author.trim(),
        description: form.description.trim(),
        cover: form.cover.trim(),
        contentEn: form.contentEn.trim(),
    }
}
