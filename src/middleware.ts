import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'MTOAIUSRCRTKN'
const publicPaths = ['/', '/signin', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }
  
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}

// Aplica o middleware a todas as rotas, exceto arquivos estáticos e API
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|sw.js|manifest.webmanifest|imgs).*)'],
}