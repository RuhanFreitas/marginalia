'use client'

import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useRedirectIfAuth() {
    const router = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            router.replace('/')
        }
    }, [router, user])
}
