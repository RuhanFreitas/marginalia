import type { Marginalia } from '@/types/api/marginalia'

export function createMarginalia(
    overrides: Partial<Marginalia> = {},
): Marginalia {
    return {
        id: 1,
        title: 'Chapter One',
        book: 'The Book',
        author: 'Author Name',
        description: 'A short description',
        cover: 'https://example.com/cover.jpg',
        contentEn: '<p>Hello</p>',
        userId: 1,
        createdAt: '2024-01-15T00:00:00.000Z',
        updatedAt: '2024-01-15T00:00:00.000Z',
        comments: [],
        ...overrides,
    }
}
