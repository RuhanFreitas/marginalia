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

    const { user, clear, setUser } = useAuth()

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
            const token = localStorage.getItem('token')

            if (!token) {
                throw new Error('Session expired. Please sign in again')
            }

            const updatedUser = await updateAccount(data, token)

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
            const token = localStorage.getItem('token')

            if (!token) {
                throw new Error('Session expired. Please sign in again')
            }

            await deleteAccount(token)

            clear()
            router.push('/')
        } catch (err: unknown) {
            setDeleteError(getErrorMessage(err, 'Failed to delete account'))
        } finally {
            setDeleteLoading(false)
        }
    }

    return (
        <div className="h-full mx-auto max-w-md">
            <div className="py-12">
                <Link href="/">
                    <button className="flex group transition cursor-pointer hover:text-default items-center gap-3 text-sm font-medium text-default/60">
                        <ArrowLeftIcon
                            className="text-default/60 group-hover:scale-105 group-hover:text-default"
                            width={18}
                        />
                        Back
                    </button>
                </Link>
            </div>
            <div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-default font-display text-3xl">
                        Account Settings
                    </h1>
                    <span className="text-default/60 tracking-wide text-sm">
                        Manage your account information and preferences
                    </span>
                </div>
                <form onSubmit={handleUpdate} className="py-8">
                    <div className="border-b border-default/10 pb-8">
                        <label className="text-xs text-default/60 flex items-center gap-2 mb-2">
                            <UserIcon width={12} /> NAME
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder={currentName}
                            className="text-default/60 font-display w-full text-sm outline-0 py-3 px-4 border border-default/10"
                        />
                    </div>
                    <div className="border-b border-default/10 pt-8 pb-8">
                        <label className="text-xs text-default/60 flex items-center gap-2 mb-2">
                            <MailIcon width={12} /> EMAIL
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder={currentEmail}
                            className="text-default/60 font-display w-full text-sm outline-0 py-3 px-4 border border-default/10"
                        />
                    </div>
                    <div className="border-b border-default/10 pt-8 pb-8">
                        <label className="text-xs text-default/60 flex items-center gap-2 mb-2">
                            <LockIcon width={12} /> CHANGE PASSWORD
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="••••••"
                            className="mb-4 text-default/60 font-display w-full text-sm outline-0 py-3 px-4 border border-default/10"
                        />
                        <label className="text-xs text-default/60 flex items-center gap-2 mb-2">
                            <LockIcon width={12} /> CONFIRM PASSWORD
                        </label>
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder="••••••"
                            className="text-default/60 font-display w-full text-sm outline-0 py-3 px-4 border border-default/10"
                        />
                    </div>

                    <FormError message={updateError} align="start" />

                    <div className="pt-6">
                        <button
                            disabled={updateLoading}
                            className="text-default cursor-pointer hover:bg-default hover:text-default-foreground transition text-sm flex tracking-wide gap-2 items-center px-6 py-4 border border-default/10 disabled:opacity-60"
                        >
                            <Upload width={12} />{' '}
                            {updateLoading ? 'SAVING...' : 'SAVE CHANGES'}
                        </button>
                    </div>
                </form>
                <form
                    onSubmit={handleDelete}
                    className="flex flex-col gap-2 mb-16"
                >
                    <h1 className="font-display text-default tracking-wide text-xl">
                        Danger Zone
                    </h1>
                    <span className="text-default/60 tracking-wide text-sm">
                        Permanently delete your account and all associated data
                    </span>

                    <FormError message={deleteError} align="start" />

                    <div className="pt-6">
                        <button
                            disabled={deleteLoading}
                            className="text-default cursor-pointer hover:bg-default hover:text-default-foreground text-sm flex tracking-wide gap-2 items-center px-6 py-4 border border-default/10 disabled:opacity-60"
                        >
                            <Trash2Icon width={12} />{' '}
                            {deleteLoading ? 'DELETING...' : 'DELETE ACCOUNT'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
