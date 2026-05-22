'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type User = {
    id: string
    name: string
    email: string
    role: string
}

type AuthContextType = {
    user: User | null
    setUser: (u: User | null) => void
    login: (user: User, token: string) => void
    logout: () => void
    clear: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')

        if (!storedUser || storedUser === 'undefined') return

        try {
            setUser(JSON.parse(storedUser))
        } catch {
            localStorage.removeItem('user')
        }
    }, [])

    function login(user: User, token: string) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        setUser(user)
    }

    function logout() {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
    }

    function clear() {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, clear }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}
