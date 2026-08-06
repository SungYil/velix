'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, BookOpen, UserPlus, ChevronUp, Camera } from 'lucide-react';

export default function FloatingMenu() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      {/* Floating Button Group */}
      <div className="flex flex-col gap-2.5 p-2 rounded-2xl glass-panel border border-purple-500/20 shadow-2xl backdrop-blur-xl animate-bounce-subtle">
        {/* KakaoTalk Consultation */}
        <a
          href="https://pf.kakao.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-xs transition-all shadow-md group hover:scale-105"
          title="카카오톡 상담하기"
        >
          <MessageCircle className="w-4 h-4 fill-[#191919] text-[#191919] group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">카톡 상담</span>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white font-bold text-xs transition-all shadow-md group hover:scale-105"
          title="인스타그램 방문하기"
        >
          <Camera className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">인스타그램</span>
        </a>

        {/* Naver Blog */}
        <a
          href="https://blog.naver.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white font-bold text-xs transition-all shadow-md group hover:scale-105"
          title="공식 블로그"
        >
          <BookOpen className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">블로그</span>
        </a>

        {/* Creator / BJ Apply */}
        <Link
          href="/creator/apply"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs transition-all shadow-lg group hover:scale-105 border border-purple-400/40"
          title="BJ / 크리에이터 지원하기"
        >
          <UserPlus className="w-4 h-4 text-yellow-300 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">BJ / 크리에이터 지원</span>
        </Link>
      </div>

      {/* Top Scroll Button */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-500/50 transition-all shadow-lg hover:scale-110"
        title="맨 위로"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}
