'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#040710] border-t border-cyan-500/20 pt-16 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Velix Media Logo"
                className="h-10 w-auto object-contain rounded-xl shadow-lg border border-cyan-500/30"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider text-white leading-none">
                  VELIX<span className="gradient-text font-black ml-1">MEDIA</span>
                </span>
                <span className="text-[9px] font-extrabold tracking-widest text-cyan-400/80 uppercase mt-0.5">
                  Entertainment Group
                </span>
              </div>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              차세대 1인 미디어 및 크리에이터 브랜딩을 선도하는 프리미엄 MCN 엔터테인먼트 그룹 (주)벨릭스미디어입니다.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">VelixENT</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/velixent/about" className="hover:text-cyan-400 transition-colors">회사소개</Link></li>
              <li><Link href="/velixent/greeting" className="hover:text-cyan-400 transition-colors">인삿말</Link></li>
              <li><Link href="/velixent/org" className="hover:text-cyan-400 transition-colors">조직도</Link></li>
              <li><Link href="/velixent/location" className="hover:text-cyan-400 transition-colors">오시는길</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">크리에이터 & 사업</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/creator/benefits" className="hover:text-cyan-400 transition-colors">크리에이터 지원혜택</Link></li>
              <li><Link href="/creator/apply" className="hover:text-cyan-400 transition-colors">BJ / 크리에이터 지원하기</Link></li>
              <li><Link href="/business/intro" className="hover:text-cyan-400 transition-colors">사업 영역 소개</Link></li>
              <li><Link href="/business/inquire" className="hover:text-cyan-400 transition-colors">비즈니스 문의하기</Link></li>
              <li><Link href="/business/agent" className="hover:text-cyan-400 transition-colors">에이전트 모집 지원</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">고객센터 & 위치</h4>
            <div className="space-y-1.5 text-xs leading-relaxed">
              <p><strong className="text-white">대표전화:</strong> 02-555-0199</p>
              <p><strong className="text-white">이메일:</strong> contact@velixent.com</p>
              <p><strong className="text-white">주소:</strong> 서울특별시 강남구 테헤란로 123 벨릭스타워 8층</p>
              <p><strong className="text-white">운영시간:</strong> 평일 10:00 - 19:00 (주말/공휴일 휴무)</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 (주)벨릭스미디어 (Velix Media Co., Ltd.). All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-gray-400 cursor-pointer">개인정보처리방침</span>
            <span className="hover:text-gray-400 cursor-pointer">이용약관</span>
            <Link href="/admin" className="hover:text-cyan-400">관리자 접속</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
