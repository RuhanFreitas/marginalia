'use client'

import { login } from '@/lib/auth'
import { LockIcon, MailIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRedirectIfAuth } from '@/hooks/useRedirectIfAuth'

export default function Page() {
    useRedirectIfAuth()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login: loginUser, user } = useAuth()

    const router = useRouter()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setError('')
        setLoading(true)

        try {
            const res = await login({ email, password })

            loginUser(res.user, res.token)

            router.push('/')
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="absolute min-w-sm top-40 mx-auto flex flex-col justify-center items-center gap-12">
                <div className="flex flex-col gap-3 items-center justify-center">
                    <h1 className="text-default font-display text-3xl">
                        Welcome Back
                    </h1>
                    <span className="text-sm text-default/60 tracking-wide">
                        Sign in to your account to continue
                    </span>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-6"
                >
                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2">
                            <MailIcon width={14} className="text-default/60" />
                            <span className="text-default/60 tracking-widest text-xs font-medium">
                                EMAIL
                            </span>
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="py-3 px-4 text-default/60 font-display text-sm focus:outline-0 focus:border border border-foreground/20 focus:border-foreground"
                            type="text"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2">
                            <LockIcon width={14} className="text-default/60" />
                            <span className="text-default/60 tracking-widest text-xs font-medium">
                                PASSWORD
                            </span>
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="py-3 px-4 text-default/60 font-display text-sm focus:outline-0 focus:border border border-foreground/20 focus:border-foreground"
                            type="password"
                            placeholder="••••••"
                        />
                    </div>

                    {error && (
                        <p className="font-display text-default/60 text-xs text-center">
                            {error}.
                        </p>
                    )}
                    <button
                        disabled={loading}
                        className="bg-foreground py-3 text-default-foreground tracking-wider text-xs font-medium"
                    >
                        {loading ? 'Logging in...' : 'LOGIN'}
                    </button>
                    <span className="mx-auto text-xs font-display tracking-wider font-medium text-default/60">
                        Don't have an account?{' '}
                        <Link className="text-default" href="/register">
                            Register
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    )
}
