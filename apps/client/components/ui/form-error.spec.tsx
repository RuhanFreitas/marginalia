import { render, screen } from '@testing-library/react'

import FormError from './form-error'

describe('FormError', () => {
    it('renders nothing when message is empty', () => {
        const { container } = render(<FormError />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders error message', () => {
        render(<FormError message="Invalid email" />)
        expect(screen.getByText('Invalid email')).toBeInTheDocument()
    })

    it('aligns text to start when requested', () => {
        render(<FormError message="Error" align="start" />)
        const el = screen.getByText('Error')
        expect(el.className).not.toContain('text-center')
    })
})
