import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    // Default admin password for VelixENT
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'velix1234';

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true, message: '로그인 성공' });
      response.cookies.set('velix_admin_auth', 'authenticated_token_velix_2026', {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      return response;
    } else {
      return NextResponse.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: '로그인 처리 중 오류 발생' }, { status: 500 });
  }
}
