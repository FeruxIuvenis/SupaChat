import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import Link from 'next/link'

const SignInForm = () => {
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
                    <form className="space-y-4">
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
                            <Input id="password" type="password" placeholder="••••••••" required />
                        </div>

                        <div>
                            <Button type="submit" className="w-full">
                                Sign In
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
                                </Link>
                                {' '}and{' '}
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