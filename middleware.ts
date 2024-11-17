import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoggedIn = request.cookies.has('auth_token') // Asumimos que usamos una cookie para el token de autenticación

  // Redirige a los usuarios no autenticados al login
  if (!isLoggedIn && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirige a los usuarios autenticados al dashboard si intentan acceder a la página de login
  if (isLoggedIn && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
}
