'use client'

import { useAuth } from '@/providers'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useRequireAuth() {
    const router = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        if (!user) {
            router.replace('/login')
        }
    }, [router, user])
}
