import {
    isMarginaliaCoverUrlValid,
    isMarginaliaFormComplete,
    validateComment,
    validateLogin,
    validateMarginaliaForm,
    validateRegister,
    validateUpdateAccount,
} from './validation'

describe('validateLogin', () => {
    it('requires email and password', () => {
        expect(validateLogin('', 'secret')).toBe('Please, enter your email')
        expect(validateLogin('a@b.com', '')).toBe('Please, enter your password')
        expect(validateLogin('a@b.com', 'secret')).toBeNull()
    })
})

describe('validateRegister', () => {
    it('validates all fields', () => {
        expect(validateRegister('', 'Name', '123456')).toBe(
            'Please, enter your email',
        )
        expect(validateRegister('a@b.com', '', '123456')).toBe(
            'Please, enter your name',
        )
        expect(validateRegister('a@b.com', 'ab', '123456')).toBe(
            'Your username needs to have at least 3 characters',
        )
        expect(validateRegister('a@b.com', 'Valid', '12345')).toBe(
            'Your password needs to have at least 6 characters',
        )
        expect(validateRegister('a@b.com', 'Valid', '123456')).toBeNull()
    })
})

describe('validateUpdateAccount', () => {
    it('requires at least one field change', () => {
        expect(validateUpdateAccount({}, '', '')).toBe(
            'Change at least one field before saving',
        )
    })

    it('validates password confirmation', () => {
        expect(
            validateUpdateAccount({ password: '123456' }, '123456', '654321'),
        ).toBe('Passwords do not match')
        expect(
            validateUpdateAccount({ password: '12345' }, '12345', '12345'),
        ).toBe('Your password needs to have at least 6 characters')
        expect(
            validateUpdateAccount({ name: 'New' }, '123456', '123456'),
        ).toBeNull()
    })
})

describe('validateComment', () => {
    it('requires non-empty content', () => {
        expect(validateComment('   ')).toBe('Please, enter a comment')
        expect(validateComment('Hello')).toBeNull()
    })
})

describe('marginalia validation', () => {
    const validForm = {
        title: 'Title',
        book: 'Book',
        author: 'Author',
        description: 'Description',
        cover: 'https://example.com/cover.jpg',
        contentEn: 'Content',
    }

    it('validates complete form', () => {
        expect(validateMarginaliaForm(validForm)).toBeNull()
        expect(validateMarginaliaForm({ ...validForm, title: '' })).toBe(
            'Please, enter a valid title',
        )
        expect(
            validateMarginaliaForm({ ...validForm, cover: 'not-a-url' }),
        ).toBe('Please, enter a valid cover URL (http or https)')
    })

    it('checks cover URL validity', () => {
        expect(isMarginaliaCoverUrlValid('https://example.com/a.jpg')).toBe(
            true,
        )
        expect(isMarginaliaCoverUrlValid('ftp://example.com/a.jpg')).toBe(false)
        expect(isMarginaliaCoverUrlValid('')).toBe(false)
    })

    it('checks form completeness', () => {
        expect(isMarginaliaFormComplete(validForm)).toBe(true)
        expect(isMarginaliaFormComplete({ ...validForm, book: '  ' })).toBe(
            false,
        )
    })
})
