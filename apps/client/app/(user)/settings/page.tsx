'use client'

import FormError from '@/components/formError/formError'
import { useAuth } from '@/context/AuthContext'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { getErrorMessage } from '@/lib/api'
import { deleteAccount } from '@/lib/auth'
import { updateAccount } from '@/lib/user'
import { validateUpdateAccount } from '@/lib/validation'
import {
    ArrowLeftIcon,
    LockIcon,
    MailIcon,
    Trash2Icon,
    Upload,
    UserIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function Page() {
    useRequireAuth()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [updateError, setUpdateError] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [updateLoading, setUpdateLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const router = useRouter()

    const { user, setUser, logout } = useAuth()

    if (!user) return null

    const { name: currentName, email: currentEmail } = user

    async function handleUpdate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const data = {
            ...(name.trim() && { name: name.trim() }),
            ...(email.trim() && { email: email.trim() }),
            ...(password && { password }),
        }

        const validationError = validateUpdateAccount(
            data,
            password,
            confirmPassword,
        )
        if (validationError) {
            setUpdateError(validationError)
            return
        }

        setUpdateError('')
        setUpdateLoading(true)

        try {
            const updatedUser = await updateAccount(data)

            setUser(updatedUser)
            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        } catch (err: unknown) {
            setUpdateError(getErrorMessage(err, 'Failed to update account'))
        } finally {
            setUpdateLoading(false)
        }
    }

    async function handleDelete(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setDeleteError('')
        setDeleteLoading(true)

        try {
            await deleteAccount()

            logout()
            router.push('/')
        } catch (err: unknown) {
            setDeleteError(getErrorMessage(err, 'Failed to delete account'))
        } finally {
            setDeleteLoading(false)
        }
    }

    return (
        <div className="mx-auto h-full w-full min-w-0 max-w-md px-6 pb-12 sm:px-0">
            <div className="py-8 md:py-12">
                <Link href="/">
                    <button
                        type="button"
                        className="group flex cursor-pointer items-center gap-3 text-sm font-medium text-default/60 transition hover:text-default"
                    >
                        <ArrowLeftIcon
                            className="text-default/60 group-hover:scale-105 group-hover:text-default"
                            width={18}
                        />
                        Back
                    </button>
                </Link>
            </div>

            <div className="flex min-w-0 flex-col">
                <div className="flex flex-col gap-2">
                    <h1 className="font-display text-2xl text-default md:text-3xl">
                        Account Settings
                    </h1>
                    <span className="text-sm tracking-wide text-default/60">
                        Manage your account information and preferences
                    </span>
                </div>

                <form onSubmit={handleUpdate} className="py-6 md:py-8">
                    <div className="border-b border-default/10 pb-6 md:pb-8">
                        <label className="mb-2 flex items-center gap-2 text-xs text-default/60">
                            <UserIcon width={12} /> NAME
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder={currentName}
                            className="w-full border border-default/10 px-4 py-3 font-display text-sm text-default outline-0 placeholder:text-default/60"
                        />
                    </div>

                    <div className="border-b border-default/10 pb-6 pt-6 md:pb-8 md:pt-8">
                        <label className="mb-2 flex items-center gap-2 text-xs text-default/60">
                            <MailIcon width={12} /> EMAIL
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder={currentEmail}
                            className="w-full border border-default/10 px-4 py-3 font-display text-sm text-default outline-0 placeholder:text-default/60"
                        />
                    </div>

                    <div className="border-b border-default/10 pb-6 pt-6 md:pb-8 md:pt-8">
                        <label className="mb-2 flex items-center gap-2 text-xs text-default/60">
                            <LockIcon width={12} /> CHANGE PASSWORD
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="••••••"
                            className="mb-4 w-full border border-default/10 px-4 py-3 font-display text-sm text-default outline-0 placeholder:text-default/60"
                        />
                        <label className="mb-2 flex items-center gap-2 text-xs text-default/60">
                            <LockIcon width={12} /> CONFIRM PASSWORD
                        </label>
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder="••••••"
                            className="w-full border border-default/10 px-4 py-3 font-display text-sm text-default outline-0 placeholder:text-default/60"
                        />
                    </div>

                    <FormError message={updateError} align="start" />

                    <div className="pt-4 md:pt-6">
                        <button
                            type="submit"
                            disabled={updateLoading}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 border border-default/10 px-6 py-4 text-sm tracking-wide text-default transition hover:bg-default hover:text-default-foreground disabled:opacity-60 sm:w-auto sm:justify-start"
                        >
                            <Upload width={12} />
                            {updateLoading ? 'SAVING...' : 'SAVE CHANGES'}
                        </button>
                    </div>
                </form>

                <form
                    onSubmit={handleDelete}
                    className="flex flex-col gap-2 border-t border-default/10 pt-8 md:mb-16"
                >
                    <h2 className="font-display text-lg tracking-wide text-default md:text-xl">
                        Danger Zone
                    </h2>
                    <span className="text-sm tracking-wide text-default/60">
                        Permanently delete your account and all associated data
                    </span>

                    <FormError message={deleteError} align="start" />

                    <div className="pt-4 md:pt-6">
                        <button
                            type="submit"
                            disabled={deleteLoading}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 border border-default/10 px-6 py-4 text-sm tracking-wide text-default transition hover:bg-default hover:text-default-foreground disabled:opacity-60 sm:w-auto sm:justify-start"
                        >
                            <Trash2Icon width={12} />
                            {deleteLoading ? 'DELETING...' : 'DELETE ACCOUNT'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
