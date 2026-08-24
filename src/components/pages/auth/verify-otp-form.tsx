'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/backend/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function VerifyOtpPage() {
    const searchParams = useSearchParams()
    const email = searchParams.get('email') || ''
    const router = useRouter()
    const supabase = supabaseClient()

    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error: verifyError } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'signup',
        })

        if (verifyError) {
            setError(verifyError.message)
            setLoading(false)
            return
        }

        router.push('/dashboard')
    }

    return (
        <Card className="w-full max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Verify Your Email</CardTitle>
                <CardDescription>
                    Enter the OTP code sent to <strong>{email}</strong>.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleVerify} className="space-y-4">
                    {error && <p className="text-xs text-destructive">{error}</p>}
                    <div>
                        <label className="text-sm font-medium">OTP Code</label>
                        <Input
                            type="text"
                            placeholder="123456"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify & Continue'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}