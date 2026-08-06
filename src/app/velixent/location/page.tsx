'use client';

import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import KakaoMap from '@/components/KakaoMap';

export default function LocationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            Location & Map
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            VelixENT <span className="gradient-text">오시는 길</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-base text-gray-300">
            벨릭스엔터테인먼트 강남 본사 타워 및 대화형 지도 안내입니다.
          </p>
        </ScrollReveal>
      </div>

      {/* KakaoMap Component */}
      <ScrollReveal direction="up" delay={0.3}>
        <KakaoMap />
      </ScrollReveal>
    </div>
  );
}
