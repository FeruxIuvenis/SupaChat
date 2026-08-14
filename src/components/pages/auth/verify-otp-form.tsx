"use client";

import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { useSearchParams } from "next/navigation";

export const VerifyOTPForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <Card>
        <CardHeader>
            <h1 className='text-2xl font-bold'>Verify OTP</h1>
            <p className='text-sm text-muted-foreground'>Please enter the OTP sent to <i>{email}</i>.</p>
        </CardHeader>
        <form className='flex flex-col gap-4 p-4'>
            <Input type="text" placeholder='Enter OTP' />
            <Button type="submit">Verify</Button>
        </form>
    </Card>
  )
}

export default VerifyOTPForm