'use client';

import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { ArrowRight, Star, Video, Zap, Shield, Gift, Sparkles } from 'lucide-react';

export default function CreatorBenefitsPage() {
  const benefits = [
    {
      id: 1,
      title: '고성능 장비 지원',
      subtitle: '캠, 마이크, 조명부터 최고사양 PC 세팅까지 지원',
      description: 'VELIX MEDIA 본사 매니저진들과 함께 초고화질 방송 진행을 위한 최첨단 방송 장비를 풀세트로 지원합니다.',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=80',
      tag: '장비',
    },
    {
      id: 2,
      title: '1:1 맞춤형 전담 방송 매니저 케어',
      subtitle: '방송 모니터링, 방송 콘텐츠 기획 및 멘토링 프로그램',
      description: '경력 10년 이상의 베테랑 MCN 매니저진이 1:1로 밀착 배정되어 방송 리액션, 팬 소통 및 콘텐츠 기획을 함께 다듬어 드립니다.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
      tag: '멘토링 / 케어',
    },
    {
      id: 3,
      title: '퍼스널 브랜딩 및 숏폼 마케팅',
      subtitle: '유튜브, 인스타그램, 틱톡 채널 브랜딩 & 편집자 연결',
      description: '라이브 방송 하이라이트를 숏폼 및 전용 유튜브 영상으로 재가공하여 빠른 구독자 팬덤 형성을 촉진합니다.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80',
      tag: '마케팅 / 숏폼',
    },
    {
      id: 4,
      title: '기업 광고 제휴 & 커머스 협찬 지원',
      subtitle: '안정적 추가 수익 창출을 위한 브랜드 파트너십 매칭',
      description: '국내외 유수의 브랜드 협찬 및 커머스 라이브 방송 프로젝트 연계를 통해 방송 외 추가 수익원을 창출합니다.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
      tag: '수익 / 협찬',
    },
    {
      id: 5,
      title: '법률 및 세무 자문 컨설팅',
      subtitle: '크리에이터 권익 보호 및 투명한 일일/주간 정산 시스템',
      description: '악성 악플러 법적 대응부터 저작권 보호, 전문 세무사의 1:1 절세 컨설팅 및 정확한 일일 정산을 제공합니다.',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
      tag: '법률 / 정산',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            Creator Benefits
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            VELIX MEDIA 크리에이터 <span className="gradient-text">지원 혜택</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300">
            오직 벨릭스미디어 소속 크리에이터만을 위해 준비된 압도적인 전폭 지원 시스템입니다.
          </p>
        </ScrollReveal>
      </div>

      {/* Benefits List */}
      <div className="space-y-16">
        {benefits.map((b, index) => {
          const isEven = index % 2 === 0;
          return (
            <ScrollReveal
              key={b.id}
              direction={isEven ? 'left' : 'right'}
              delay={0.1}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-8 sm:p-12 glass-panel border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 shadow-2xl`}>
                {/* Text Content */}
                <div className={`space-y-4 ${isEven ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-2'}`}>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-md inline-block border border-cyan-500/30">
                    {b.tag}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white leading-snug">
                    {b.title}
                  </h3>
                  <h4 className="text-base sm:text-lg font-bold text-cyan-400">
                    {b.subtitle}
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line pt-2">
                    {b.description}
                  </p>
                </div>

                {/* Photo Content */}
                <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-xl group">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* CTA Section */}
      <ScrollReveal direction="up">
        <div className="text-center p-12 rounded-3xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-blue-950/50 to-cyan-950/50 space-y-6">
          <h2 className="text-3xl font-black text-white">망설이지 마시고 지금 지원해보세요!</h2>
          <p className="text-gray-300 text-sm max-w-md mx-auto">
            경력 유무에 상관없이 여러분의 가치를 알아보고 아낌없이 지원해드립니다.
          </p>
          <Link
            href="/creator/apply"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-black hover:opacity-90 shadow-xl hover:scale-105 transition-all border border-cyan-400/40"
          >
            <span>크리에이터 지원서 작성하기</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
