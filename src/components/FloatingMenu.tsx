'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, UserCheck, UserPlus, ChevronUp, Camera } from 'lucide-react';

export default function FloatingMenu() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      {/* Floating Button Group */}
      <div className="flex flex-col gap-2.5 p-2 rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl backdrop-blur-xl bg-[#060913]/90">
        {/* KakaoTalk Consultation */}
        <a
          href="https://open.kakao.com/o/g3o55Cvi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-xs transition-all shadow-md group hover:scale-105"
          title="카카오톡 오픈채팅 상담"
        >
          <MessageCircle className="w-4 h-4 fill-[#191919] text-[#191919] group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">카톡 상담</span>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/velix_media0?igsh=ZWxvZ3NteWkybHJj&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-95 text-white font-bold text-xs transition-all shadow-md group hover:scale-105"
          title="공식 인스타그램"
        >
          <Camera className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">인스타그램</span>
        </a>

        {/* Agent Apply */}
        <Link
          href="/business/agent"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-md group hover:scale-105 border border-emerald-400/30"
          title="에이전트 모집 지원"
        >
          <UserCheck className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">에이전트 지원</span>
        </Link>

        {/* Creator / BJ Apply */}
        <Link
          href="/creator/apply"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs transition-all shadow-lg group hover:scale-105 border border-cyan-400/40"
          title="BJ / 크리에이터 지원하기"
        >
          <UserPlus className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">BJ / 크리에이터 지원</span>
        </Link>
      </div>

      {/* Top Scroll Button */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-lg hover:scale-110"
        title="맨 위로"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}
