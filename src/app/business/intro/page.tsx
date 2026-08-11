'use client';

import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { ArrowRight, Video, ShoppingBag, TrendingUp, MonitorPlay, Sparkles } from 'lucide-react';

export default function BusinessIntroPage() {
  const businessSections = [
    {
      num: '01',
      title: 'LIVE MCN & STREAMING',
      subtitle: '라이브 방송 매니지먼트 및 아티스트 육성',
      description: '틱톡, SOOP, 유튜브 등 국내외 메이저 플랫폼에서 1인 스트리머의 고화질 방송 환경 및 브랜딩 전략을 기획합니다.',
      tags: ['라이브 스트리밍', '아티스트 관리', '채널 가속화'],
      image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '02',
      title: 'BRAND COMMERCE & MARKETING',
      subtitle: '브랜드 가치 극대화를 위한 맞춤형 콜라보 세일즈',
      description: '브랜드와 크리에이터의 정교한 시너지를 통해 획기적인 세일즈 퍼포먼스를 도출합니다. PPL, 단독 공구, 커머스 라이브 방송을 통합 운영합니다.',
      tags: ['브랜드 PPL', '라이브 커머스', '타깃 타깃팅'],
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '03',
      title: 'SHORT-FORM CONTENT PRODUCTION',
      subtitle: '틱톡 · 릴스 · 숏츠 트렌드 바이럴 영상 기획',
      description: '초단기 몰입감을 주는 숏폼 바이럴 콘텐츠 제작 전문 팀이 상주하여 핵심 소구점을 공략하는 고효율 영상 마케팅을 집행합니다.',
      tags: ['숏폼 바이럴', '유튜브 숏츠', '릴스 기획'],
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            Business Scope
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            VelixENT <span className="gradient-text">사업 소개</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300">
            미디어 크리에이터 에코시스템 전반을 아우르는 벨릭스엔터테인먼트의 주요 사업 영역입니다.
          </p>
        </ScrollReveal>
      </div>

      {/* Sequential Animated Cards (Drag/Scroll Reveal Animations) */}
      <div className="space-y-16">
        {businessSections.map((sec, idx) => {
          const isReverse = idx % 2 !== 0;
          return (
            <ScrollReveal
              key={sec.num}
              direction={isReverse ? 'right' : 'left'}
              delay={0.1}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-8 sm:p-12 glass-panel border border-white/15 hover:border-cyan-500/40 transition-all duration-500 shadow-2xl">
                {/* Content Column */}
                <div className={`space-y-4 ${isReverse ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'}`}>
                  <div className="text-3xl font-black text-cyan-400 opacity-60">
                    {sec.num}
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    {sec.title}
                  </h2>
                  <h3 className="text-base sm:text-lg font-bold text-cyan-300">
                    {sec.subtitle}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line pt-2">
                    {sec.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-3">
                    {sec.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Photo Column */}
                <div className={`lg:col-span-5 ${isReverse ? 'lg:order-1' : ''}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-xl group">
                    <img
                      src={sec.image}
                      alt={sec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* CTA Box */}
      <ScrollReveal direction="up">
        <div className="rounded-3xl p-12 glass-panel border border-cyan-500/30 text-center space-y-6 bg-gradient-to-r from-cyan-950/30 to-purple-950/30">
          <h2 className="text-3xl font-black text-white">비즈니스 제휴 및 광고요청 문의하기</h2>
          <p className="text-gray-300 text-sm max-w-md mx-auto">
            벨릭스엔터테인먼트의 소속 아티스트와 차별화된 마케팅 캠페인을 진행해보세요.
          </p>
          <Link
            href="/business/inquire"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black shadow-xl hover:scale-105 transition-all"
          >
            <span>비즈니스 문의 작성하기</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
