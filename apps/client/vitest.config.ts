import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./test/setup.tsx'],
        include: ['**/*.{spec,test}.{ts,tsx}'],
        exclude: ['node_modules', '.next'],
        globals: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            exclude: ['**/*.spec.{ts,tsx}', '**/*.test.{ts,tsx}', 'test/**'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
        },
    },
})
