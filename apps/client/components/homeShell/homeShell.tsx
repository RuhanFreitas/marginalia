'use client'

import CreateMarginaliaModal from '@/components/createMarginaliaModal/createMarginaliaModal'
import { useAuth } from '@/context/AuthContext'
import { SquarePen } from 'lucide-react'
import { useState } from 'react'

type HomeShellProps = {
    children: React.ReactNode
}

export default function HomeShell({ children }: HomeShellProps) {
    const { user } = useAuth()
    const [modalOpen, setModalOpen] = useState(false)

    const isAdmin = user?.role === 'ADMIN'

    return (
        <>
            {isAdmin && (
                <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    aria-label="Create new marginalia"
                    className="fixed bottom-8 right-8 z-50 flex h-10 w-10 cursor-pointer items-center justify-center bg-default text-default-foreground transition hover:opacity-90"
                >
                    <SquarePen width={16} height={16} />
                </button>
            )}

            <CreateMarginaliaModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />

            {children}
        </>
    )
}
