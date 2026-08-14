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

const SignUpForm = () => {
    return (
        <TooltipProvider>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Create a new account to start chatting privately!
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
                                    <TooltipTrigger>
                                        <Info className="h-4 w-4" />
                                        <span className="sr-only">Email info</span>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs">
                                        <p className="text-xs">
                                            We&apos;ll send an OTP token to the given email address.
                                            The OTP token is only legit for 5 minutes. After that, a
                                            new token must be created, with the &quot;Resend
                                            OTP&quot; button.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@example.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center gap-1 w-fit mb-1">
                                <label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </label>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="h-4 w-4" />
                                        <span className="sr-only">Password info</span>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs">
                                        <p className="text-xs">
                                            You need to create a strong password. minimum
                                            requirements are: 8-24 letter long, at least one lowercase
                                            letter, at least one uppercase letter, at least one number
                                            and a special symbol.{' '}
                                            <Link
                                                href="/user-guidance"
                                                className="underline font-medium"
                                            >
                                                Learn more here
                                            </Link>
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <Input id="password" type="password" placeholder="••••••••" />
                        </div>
                        <div>
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                        </div>
                        <div className="text-sm">
                            Already have an account?{' '}
                            <Link href="/sign-in" className="underline font-medium">
                                Sign In
                            </Link>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                By signing up, you agree to our{' '}
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

export default SignUpForm