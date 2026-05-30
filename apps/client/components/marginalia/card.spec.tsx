import { render, screen } from '@testing-library/react'

import Card from './card'

describe('Marginalia Card', () => {
    const props = {
        order: 1,
        book: 'The Book',
        author: 'Author Name',
        cover: 'https://example.com/cover.jpg',
        title: 'Chapter One',
        description: 'A short description',
        createdAt: '2024-06-15T12:00:00.000Z',
    }

    it('renders marginalia metadata', () => {
        render(<Card {...props} />)

        expect(screen.getByText('Chapter One')).toBeInTheDocument()
        expect(screen.getByText('A short description')).toBeInTheDocument()
        expect(screen.getByText('The Book')).toBeInTheDocument()
        expect(screen.getByText('Author Name')).toBeInTheDocument()
        expect(screen.getByText('01')).toBeInTheDocument()
    })

    it('formats created date', () => {
        render(<Card {...props} />)
        expect(screen.getByText('6/15/2024')).toBeInTheDocument()
    })
})
