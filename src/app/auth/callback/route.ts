import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.url.split('callback')[0]

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type: type as 'email',
      token_hash,
    })
    if (!error) {
      return NextResponse.redirect(`${redirectTo}${next.slice(1)}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${redirectTo}auth/auth-code-error`)
}