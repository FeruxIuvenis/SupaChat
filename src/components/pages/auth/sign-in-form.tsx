'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/backend/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info, Loader2 } from 'lucide-react'
import Link from 'next/link'

const SignInForm = () => {
    const router = useRouter()
    const supabase = supabaseClient()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setErrorMessage(error.message)
            setLoading(false)
            return
        }

        router.push('/')
    }

    return (
        <TooltipProvider>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>
                        Welcome back! Enter your credentials to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignIn} className="space-y-4">
                        {errorMessage && (
                            <div className="p-2 text-xs font-medium text-destructive bg-destructive/10 rounded">
                                {errorMessage}
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <div className="flex items-center gap-1 w-fit mb-1">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <Tooltip>
                                    <TooltipTrigger type="button">
                                        <Info className="h-4 w-4 text-muted-foreground" />
                                        <span className="sr-only">Email info</span>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs">
                                        <p className="text-xs">
                                            Enter the email address associated with your registered account.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@example.com"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1 w-fit">
                                    <label htmlFor="password" className="text-sm font-medium">
                                        Password
                                    </label>
                                    <Tooltip>
                                        <TooltipTrigger type="button">
                                            <Info className="h-4 w-4 text-muted-foreground" />
                                            <span className="sr-only">Password info</span>
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-xs">
                                            <p className="text-xs">
                                                Passwords are case-sensitive. If you forgot your password, click the recovery link.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs underline text-muted-foreground hover:text-primary"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
                            </Button>
                        </div>

                        <div className="text-sm text-center">
                            Don&apos;t have an account?{' '}
                            <Link href="/sign-up" className="underline font-medium">
                                Sign Up
                            </Link>
                        </div>

                        <div>
                            <p className="text-xs text-center text-muted-foreground">
                                By signing in, you agree to our{' '}
                                <Link href="/terms-of-service" className="underline font-medium">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy-policy" className="underline font-medium">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </TooltipProvider>
    )
}

export default SignInForm