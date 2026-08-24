import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set({ name, value, ...options })
          )

          supabaseResponse = NextResponse.next({
            request,
          })

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  if (!user) {
    const allowedPaths = ['/sign-up', '/sign-in', '/about', '/verify-otp']
    const isAllowed = allowedPaths.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    )

    if (!isAllowed) {
      const url = request.nextUrl.clone()
      console.log('Use redirect to /sign-in')
      url.pathname = '/sign-in'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}