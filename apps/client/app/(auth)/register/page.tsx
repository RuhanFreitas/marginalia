'use client'

import FormError from '@/components/formError/formError'
import { getErrorMessage } from '@/lib/api'
import { register } from '@/lib/auth'
import { validateRegister } from '@/lib/validation'
import { LockIcon, MailIcon, User2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRedirectIfAuth } from '@/hooks/useRedirectIfAuth'
import Link from 'next/link'

export default function Page() {
    useRedirectIfAuth()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const { login: loginUser } = useAuth()

    const router = useRouter()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const validationError = validateRegister(email, name, password)
        if (validationError) {
            setError(validationError)
            return
        }

        setError('')
        setLoading(true)

        try {
            const res = await register({
                email: email.trim(),
                name: name.trim(),
                password,
            })

            loginUser(res.user, res.token)

            router.push('/')
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Registration failed'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="absolute min-w-sm top-40 mx-auto flex flex-col justify-center items-center gap-12">
                <div className="flex flex-col gap-3 items-center justify-center">
                    <h1 className="text-default font-display text-3xl">
                        Create account
                    </h1>
                    <span className="text-sm text-default/60 tracking-wide">
                        Join the conversation around philosophical thoughts
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
                            <User2Icon width={14} className="text-default/60" />
                            <span className="text-default/60 tracking-widest text-xs font-medium">
                                NAME
                            </span>
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className="py-3 px-4 text-default/60 font-display text-sm focus:outline-0 focus:border border border-foreground/20 focus:border-foreground"
                            type="text"
                            placeholder="Sophia"
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
                    <FormError message={error} />
                    <button
                        disabled={loading}
                        className="bg-foreground py-3 text-default-foreground tracking-wider text-xs font-medium"
                    >
                        {loading ? 'Creating account...' : 'REGISTER'}
                    </button>
                    <span className="mx-auto text-xs font-display tracking-wider font-medium text-default/60">
                        Already have an account?{' '}
                        <Link className="text-default" href="/login">
                            Login
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    )
}
