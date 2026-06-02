'use client'

import MarginaliaModal from './marginalia-modal'
import { useAuth } from '@/providers'
import type { Marginalia } from '@/types/api/marginalia'
import { Pencil } from 'lucide-react'
import { useState } from 'react'

type EditMarginaliaButtonProps = {
    marginalia: Marginalia
}

export default function EditMarginaliaButton({
    marginalia,
}: EditMarginaliaButtonProps) {
    const { user } = useAuth()
    const [modalOpen, setModalOpen] = useState(false)

    if (user?.role !== 'ADMIN') {
        return null
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex cursor-pointer items-center gap-2 text-sm text-default/60 transition hover:text-default"
                aria-label="Edit marginalia"
            >
                <Pencil width={16} height={16} />
                Edit
            </button>

            <MarginaliaModal
                mode="edit"
                marginalia={marginalia}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    )
}
