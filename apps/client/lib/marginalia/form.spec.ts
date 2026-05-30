import { toCreateMarginaliaBody } from './form'
import type { MarginaliaFormValues } from '@/types/forms/marginaliaForm'

describe('toCreateMarginaliaBody', () => {
    it('trims all form fields', () => {
        const form: MarginaliaFormValues = {
            title: '  Title  ',
            book: '  Book  ',
            author: '  Author  ',
            description: '  Desc  ',
            cover: '  https://example.com/c.jpg  ',
            contentEn: '  Content  ',
        }

        expect(toCreateMarginaliaBody(form)).toEqual({
            title: 'Title',
            book: 'Book',
            author: 'Author',
            description: 'Desc',
            cover: 'https://example.com/c.jpg',
            contentEn: 'Content',
        })
    })
})
