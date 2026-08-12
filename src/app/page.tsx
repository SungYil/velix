'use client';

import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { Sparkles, ArrowRight, Video, Users, Award, ShieldCheck, PlayCircle, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12">
        {/* Ambient Glowing Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-4 bg-[#080e1e]/80">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
              <span>Next Generation Creator MCN Group</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] text-white">
              "크리에이터의 가능성을 현실로, <br />
              <span className="gradient-text">라이브의 새로운 기준을 만듭니다."</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-gray-300 font-light leading-relaxed">
              VELIX MEDIA는 라이브 크리에이터와 함께 성장하며 체계적인 매니지먼트와 맞춤형 지원으로
              당신의 가능성을 더 큰 기회로 만들어갑니다.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/creator/apply"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-base shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 group border border-cyan-400/30"
              >
                <span>BJ / 크리에이터 지원하기</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/velixent/about"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel hover:bg-white/10 text-gray-200 font-bold text-base border border-cyan-500/30 transition-all flex items-center justify-center gap-2"
              >
                <span>회사소개 자세히 보기</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 sm:p-10 rounded-3xl glass-panel border border-cyan-500/20 bg-[#080e1e]/60 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="text-center space-y-1 py-2 sm:py-0">
              <div className="text-3xl sm:text-5xl font-black gradient-text">100+</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-400">소속 크리에이터</div>
            </div>
            <div className="text-center space-y-1 py-2 sm:py-0">
              <div className="text-3xl sm:text-5xl font-black text-cyan-400">3,500만+</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-400">총 누적 구독자</div>
            </div>
            <div className="text-center space-y-1 py-2 sm:py-0">
              <div className="text-3xl sm:text-5xl font-black text-emerald-400">98.5%</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-400">크리에이터 만족도</div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4 Main Divisions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            EXPLORE <span className="gradient-text">VELIX MEDIA</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">원하시는 영역으로 바로 이동하여 자세한 정보를 확인하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: VelixENT */}
          <ScrollReveal direction="up" delay={0.1}>
            <Link
              href="/velixent/about"
              className="group block p-8 rounded-3xl glass-panel glass-panel-hover border border-blue-500/20 relative overflow-hidden h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                VELIX ENT
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                회사소개, 대표 인삿말, 조직도 및 오시는 길 카카오맵 정보를 제공합니다.
              </p>
              <div className="flex items-center text-xs font-bold text-cyan-400 gap-1 group-hover:translate-x-2 transition-transform">
                <span>회사 둘러보기</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 2: Creator */}
          <ScrollReveal direction="up" delay={0.2}>
            <Link
              href="/creator/benefits"
              className="group block p-8 rounded-3xl glass-panel glass-panel-hover border border-cyan-500/20 relative overflow-hidden h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                크리에이터
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                최신 장비 지원 혜택 및 미디어 크리에이터 공채 지원하기 양식.
              </p>
              <div className="flex items-center text-xs font-bold text-cyan-400 gap-1 group-hover:translate-x-2 transition-transform">
                <span>지원혜택 & 지원하기</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 3: Business */}
          <ScrollReveal direction="up" delay={0.3}>
            <Link
              href="/business/intro"
              className="group block p-8 rounded-3xl glass-panel glass-panel-hover border border-blue-500/20 relative overflow-hidden h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                사업영역
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                라이브 커머스, 브랜드 컬래버레이션 및 1:1 비즈니스 제휴 문의.
              </p>
              <div className="flex items-center text-xs font-bold text-cyan-400 gap-1 group-hover:translate-x-2 transition-transform">
                <span>사업소개 & 비즈니스 문의</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 4: Community */}
          <ScrollReveal direction="up" delay={0.4}>
            <Link
              href="/community/insights"
              className="group block p-8 rounded-3xl glass-panel glass-panel-hover border border-cyan-500/20 relative overflow-hidden h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                커뮤니티
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                트렌드 인사이트 칼럼, 주요 공지사항 및 자주묻는질문(FAQ) 아코디언.
              </p>
              <div className="flex items-center text-xs font-bold text-cyan-400 gap-1 group-hover:translate-x-2 transition-transform">
                <span>인사이트 & FAQ</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Creator Apply CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="relative rounded-3xl p-10 md:p-16 overflow-hidden glass-panel border border-cyan-500/40 bg-gradient-to-r from-blue-950/60 via-slate-900/60 to-cyan-950/60 text-center space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              당신의 특별한 개성을 <br className="sm:hidden" />
              <span className="gradient-text">VELIX MEDIA</span>에서 펼치세요!
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-300">
              초보 BJ부터 정통 크리에이터까지 방송 장비, 개인 퍼스널 브랜딩 솔루션을 전폭 지원합니다.
            </p>
            <div className="pt-4">
              <Link
                href="/creator/apply"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-base hover:from-blue-500 hover:to-cyan-400 transition-all shadow-xl hover:scale-105 border border-cyan-300/40"
              >
                <span>지금 바로 크리에이터 지원하기</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
