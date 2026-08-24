'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/backend/supabase/client'
import { generateUsernameFromEmail } from '@/utils/username'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

export default function SignUpForm() {
    const router = useRouter()
    const supabase = supabaseClient()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage(null)

        const defaultUsername = generateUsernameFromEmail(email)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: defaultUsername,
                    display_name: email.split('@')[0], // Optional initial display name
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            setErrorMessage(error.message)
            setLoading(false)
            return
        }

        router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create a new account to start chatting privately!</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                    {errorMessage && (
                        <div className="p-2 text-xs font-medium text-destructive bg-destructive/10 rounded">
                            {errorMessage}
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign Up'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}