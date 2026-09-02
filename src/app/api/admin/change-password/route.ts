import { NextRequest, NextResponse } from 'next/server';
import { getAdminPassword, setAdminPassword } from '@/lib/auth';

function isAuthenticated(req: NextRequest) {
  const authCookie = req.cookies.get('velix_admin_auth');
  return authCookie && authCookie.value === 'authenticated_token_velix_2026';
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: '현재 비밀번호와 변경할 새 비밀번호를 모두 입력해 주세요.' }, { status: 400 });
    }

    if (newPassword.length < 4) {
      return NextResponse.json({ error: '새 비밀번호는 최소 4자리 이상이어야 합니다.' }, { status: 400 });
    }

    const actualCurrentPass = getAdminPassword();
    if (currentPassword !== actualCurrentPass) {
      return NextResponse.json({ error: '현재 비밀번호가 일치하지 않습니다.' }, { status: 400 });
    }

    const success = setAdminPassword(newPassword);
    if (!success) {
      return NextResponse.json({ error: '비밀번호 저장 중 서버 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: '관리자 비밀번호가 성공적으로 변경되었습니다!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '비밀번호 변경 처리 실패' }, { status: 500 });
  }
}
