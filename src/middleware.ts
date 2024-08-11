import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/api/:groups*',
}

export async function middleware(req: NextRequest) {
  //get wallet id from session
  const token = await getToken({ req })

  if (!token) {
    return NextResponse.json({ success: false, message: 'Authentication failed' }, { status: 401 })
  }

  //get wallet id from session token
  const [, chainId, address] = token.sub.split(':')

  // set user wallet address in the request headers
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('wallet-address', address)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
