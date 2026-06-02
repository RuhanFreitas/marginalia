'use client'

import MarginaliaModal from './marginalia-modal'

type CreateMarginaliaModalProps = {
    open: boolean
    onClose: () => void
}

export default function CreateMarginaliaModal({
    open,
    onClose,
}: CreateMarginaliaModalProps) {
    return <MarginaliaModal mode="create" open={open} onClose={onClose} />
}
