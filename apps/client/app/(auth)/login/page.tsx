import { Link, LockIcon, MailIcon, User2Icon } from 'lucide-react'

export default async function Page() {
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
                <form className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2">
                            <MailIcon width={14} className="text-default/60" />
                            <span className="text-default/60 tracking-widest text-xs font-medium">
                                EMAIL
                            </span>
                        </label>
                        <input
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
                            className="py-3 px-4 text-default/60 font-display text-sm focus:outline-0 focus:border border border-foreground/20 focus:border-foreground"
                            type="password"
                            placeholder="••••••"
                        />
                    </div>
                    <button className="bg-foreground py-3 text-default-foreground tracking-wider text-xs font-medium">
                        <span>LOGIN</span>
                    </button>
                    <span className="mx-auto text-xs font-display tracking-wider font-medium text-default/60">
                        Already have an account? Log In
                    </span>
                </form>
            </div>
        </div>
    )
}
