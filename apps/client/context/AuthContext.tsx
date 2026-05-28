'use client'

import type { User } from '@/types/api/user'
import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser } from '@/lib/auth'

type AuthContextType = {
    user: User | null
    setUser: (u: User | null) => void
    login: (user: User) => void
    logout: () => void
    loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function checkSession() {
            try {
                const currentUser = await getCurrentUser()
                setUser(currentUser)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        checkSession()
    }, [])

    useEffect(() => {
        function handleAuthExpired() {
            setUser(null)
        }

        window.addEventListener('auth-expired', handleAuthExpired)
        return () => {
            window.removeEventListener('auth-expired', handleAuthExpired)
        }
    }, [])

    function login(user: User) {
        setUser(user)
    }

    function logout() {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}
