import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Redirect root path to default locale
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/tr';
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};


