'use client'

import { register } from '@/lib/auth'
import { LockIcon, MailIcon, User2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function Page() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const { login: loginUser } = useAuth()

    const router = useRouter()

    async function handleSubmit(e: any) {
        e.preventDefault()

        const body = {
            email,
            name,
            password,
        }

        const res = await register(body)

        loginUser(res.user, res.token)

        router.push('/')
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
                    <button className="bg-foreground py-3 text-default-foreground tracking-wider text-xs font-medium">
                        <span>REGISTER</span>
                    </button>
                    <span className="mx-auto text-xs font-display tracking-wider font-medium text-default/60">
                        Already have an account? Log In
                    </span>
                </form>
            </div>
        </div>
    )
}
