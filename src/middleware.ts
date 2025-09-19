import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_TK = process.env.COOKIE_TK || ''
const publicPaths = ['/', '/signin', '/register']
const redirectIfAuthenticated = ['/signin', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(COOKIE_TK)?.value

  // Caso não esteja logado
  if (!token) {
    // Se for rota pública → pode acessar
    if (publicPaths.includes(pathname)) {
      return NextResponse.next()
    }

    // Se for rota protegida → redireciona para signin
    const url = new URL('/signin', request.url)
    url.searchParams.set('requested', pathname)
    return NextResponse.redirect(url)
  }

  // 🔹 Caso esteja logado
  if (redirectIfAuthenticated.includes(pathname)) {
    const url = new URL('/dashboard', request.url)
    return NextResponse.redirect(url)
  }

  // Pode prosseguir normalmente
  return NextResponse.next()
}

// Aplica o middleware a todas as rotas, exceto arquivos estáticos e API
export const config = {
  matcher: [
    '/((?!api|_next/static|favicon.ico|sw.js|manifest.webmanifest|imgs).*)',
  ],
}
