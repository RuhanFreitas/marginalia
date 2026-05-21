import {
    ArrowLeftIcon,
    LockIcon,
    MailIcon,
    Trash2Icon,
    Upload,
    UserIcon,
} from 'lucide-react'
import Link from 'next/link'

export default function Page() {
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
                <form className="py-8">
                    <div className="border-b border-default/10 pb-8">
                        <label className="text-xs text-default/60 flex items-center gap-2 mb-2">
                            <UserIcon width={12} /> NAME
                        </label>
                        <input
                            type="text"
                            placeholder="Sophia"
                            className="text-default/60 font-display w-full text-sm outline-0 py-3 px-4 border border-default/10"
                        />
                    </div>
                    <div className="border-b border-default/10 pt-8 pb-8">
                        <label className="text-xs text-default/60 flex items-center gap-2 mb-2">
                            <MailIcon width={12} /> EMAIL
                        </label>
                        <input
                            type="text"
                            placeholder="your@email.com"
                            className="text-default/60 font-display w-full text-sm outline-0 py-3 px-4 border border-default/10"
                        />
                    </div>
                    <div className="border-b border-default/10 pt-8 pb-8">
                        <label className="text-xs text-default/60 flex items-center gap-2 mb-2">
                            <LockIcon width={12} /> CHANGE PASSWORD
                        </label>
                        <input
                            type="text"
                            placeholder="••••••"
                            className="mb-4 text-default/60 font-display w-full text-sm outline-0 py-3 px-4 border border-default/10"
                        />
                        <label className="text-xs text-default/60 flex items-center gap-2 mb-2">
                            <LockIcon width={12} /> CONFIRM PASSWORD
                        </label>
                        <input
                            type="text"
                            placeholder="••••••"
                            className="text-default/60 font-display w-full text-sm outline-0 py-3 px-4 border border-default/10"
                        />
                    </div>
                    <div className="pt-6">
                        <button className="text-default text-sm flex tracking-wide gap-2 items-center px-6 py-4 border border-default/10">
                            <Upload width={12} /> SAVE CHANGES
                        </button>
                    </div>
                </form>
                <form className="flex flex-col gap-2 mb-16">
                    <h1 className="font-display text-default tracking-wide text-xl">
                        Danger Zone
                    </h1>
                    <span className="text-default/60 tracking-wide text-sm">
                        Permanently delete your account and all associated data
                    </span>
                    <div className="pt-6">
                        <button className="text-default text-sm flex tracking-wide gap-2 items-center px-6 py-4 border border-default/10">
                            <Trash2Icon width={12} /> DELETE ACCOUNT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
