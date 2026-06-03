import path from 'path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'standalone',
    outputFileTracingRoot: path.join(__dirname, '../..'),
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
    turbopack: {},
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
}

export default nextConfig
