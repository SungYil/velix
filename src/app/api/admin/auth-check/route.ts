import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const authCookie = req.cookies.get('velix_admin_auth');
  if (authCookie && authCookie.value === 'authenticated_token_velix_2026') {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
