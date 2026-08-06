'use client';

import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Building2, Target, Award, Users } from 'lucide-react';

export default function AboutPage() {
  const [expandedStatement, setExpandedStatement] = useState<number | null>(0);

  const statements = [
    {
      id: 0,
      title: 'CREATIVE DISRUPTION',
      subtitle: '기존 미디어의 틀을 깨는 혁신적인 MCN 솔루션',
      details: 'VelixENT는 기존의 단순 방송 중계형 MCN에서 벗어나 크리에이터 개개인의 독창적인 브랜드 아이덴티티를 구축합니다. 전문 제작 PD 및 전담 데이터 분석팀이 상주하여 개별 방송 스타일 및 시청자 트렌드를 체계적으로 보조합니다.',
    },
    {
      id: 1,
      title: 'GLOBAL FAN DOMAIN',
      subtitle: '국내를 넘어 글로벌 시장으로 확장되는 팬덤 생태계',
      details: '아시아 및 글로벌 메이저 플랫폼과의 제휴를 통해 해외 진출 및 다국어 자막/번역 시스템을 전폭 지원합니다. 국내를 넘어 전 세계 시청자와 소통할 수 있는 인프라를 제공합니다.',
    },
    {
      id: 2,
      title: 'SUSTAINABLE GROWTH',
      subtitle: '크리에이터와 기업이 동반 성장하는 공생 파트너십',
      details: '단기적 수익창출에 그치지 않고 장기적 라이프사이클 관리를 통해 크리에이터의 퍼스널 브랜드 가치를 극대화합니다. 법률 자문, 정산 투명화, 세무 컨설팅까지 다각도 종합 케어를 제공합니다.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
            VelixENT About Us
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            혁신을 이끄는 <span className="gradient-text">벨릭스엔터테인먼트</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            (주)벨릭스엔터테인먼트는 크리에이터와 대중, 그리고 브랜드 간의 경계를 허무는 차세대 미디어 그룹입니다.
            콘텐츠에 관한 정교한 통찰력으로 시청자에게 진정한 감동을 전달합니다.
          </p>
        </ScrollReveal>
      </div>

      {/* Large Typography Interactive Statement Cards (Click to Expand Details) */}
      <section className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">비전 문구를 클릭하시면 자세한 내용이 공개됩니다</h2>
          <p className="text-xs text-purple-400">Click any statement to reveal deep inside strategy</p>
        </div>

        <div className="space-y-4">
          {statements.map((st) => {
            const isExpanded = expandedStatement === st.id;
            return (
              <ScrollReveal key={st.id} direction="up" delay={st.id * 0.1}>
                <div
                  onClick={() => setExpandedStatement(isExpanded ? null : st.id)}
                  className={`cursor-pointer rounded-3xl p-8 sm:p-10 glass-panel border transition-all duration-500 ${
                    isExpanded
                      ? 'border-purple-500/60 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-purple-900/30 shadow-2xl scale-[1.01]'
                      : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-black text-purple-400 tracking-widest mb-1">
                        MISSION 0{st.id + 1}
                      </div>
                      <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white group-hover:text-purple-300 transition-colors">
                        {st.title}
                      </h3>
                      <p className="text-sm sm:text-lg text-gray-300 font-medium mt-2">{st.subtitle}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center text-purple-300 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 bg-purple-600 text-white' : ''
                    }`}>
                      <ChevronDown className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-8 pt-6 border-t border-white/10 text-base sm:text-lg text-gray-200 leading-relaxed font-light whitespace-pre-line bg-black/20 p-6 rounded-2xl">
                          {st.details}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Core Strengths Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">최첨단 스튜디오</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              강남 본사 초고화질 방송 캡처, 조명, 방음 스튜디오 인프라 완비.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-600/20 text-pink-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">1:1 맞춤형 케어</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              전담 방송 매니저의 실시간 모니터링 및 멘토링 프로그램 운영.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">투명한 정산 체계</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              신뢰할 수 있는 투명한 실시간 대시보드 정산 및 세무 지원.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
