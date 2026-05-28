'use client'

import type { User } from '@/types/api/user'
import { createContext, useContext, useState } from 'react'

type AuthContextType = {
    user: User | null
    setUser: (u: User | null) => void
    login: (user: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    function login(user: User) {
        setUser(user)
    }

    function logout() {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}
