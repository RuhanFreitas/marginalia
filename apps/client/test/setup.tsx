import '@testing-library/jest-dom/vitest'
import { createElement } from 'react'
import { vi } from 'vitest'

vi.mock('next/image', () => ({
    default: (props: { src: string; alt: string }) =>
        createElement('img', props),
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        refresh: vi.fn(),
        back: vi.fn(),
        prefetch: vi.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}))
