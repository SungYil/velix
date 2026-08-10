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
      subtitle: 'Velix Media의 핵심 가치',
      details: `1) 빠른 성장
우리는 크리에이터들이 그들의 콘텐츠와 커리어에서 즉각적인 성과를 낼 수 있도록 돕습니다. Velix Media는 전문적인 콘텐츠 전략과 마케팅 지원을 통해 크리에이터들이 보다 효율적으로 성장할 수 있는 최적의 환경을 제공합니다. 이를 통해 크리에이터는 짧은 시간 내에 더 큰 성공을 거두게 됩니다.

2) 높은 수익
Velix Media는 크리에이터들이 수익을 극대화할 수 있도록 다양한 채널과 방법을 제공합니다. 광고 수익, 브랜드 협찬, 상품 판매 등 다양한 수익 모델을 통해 크리에이터의 수익을 더욱 안정적이고 지속적으로 만들어갑니다. 수익 창출의 기회를 제공하는 것에 그치지 않고, 그 이상의 가능성을 열어드리고 있습니다.

3) 혁신적이고 창의적인 지원
우리는 크리에이터들에게 단순히 지원을 넘어서 혁신적이고 창의적인 방법으로 가치를 더해줍니다. 맞춤형 콘텐츠 제작, 팬과의 소통을 강화하는 전략, 디지털 마케팅 등 다양한 요소를 세심하게 관리하여, 크리에이터들이 최고의 결과를 얻을 수 있도록 합니다.`,
    },
    {
      id: 1,
      title: 'GLOBAL FAN DOMAIN',
      subtitle: '국내를 넘어 글로벌 시장으로 확장되는 팬덤 생태계',
      details: `아시아 및 글로벌 메이저 플랫폼과의 제휴를 통해 해외 진출 및 다국어 자막/번역 시스템을 전폭 지원합니다. 국내를 넘어 전 세계 시청자와 소통할 수 있는 인프라를 제공합니다.`,
    },
    {
      id: 2,
      title: 'SUSTAINABLE GROWTH',
      subtitle: '크리에이터와 기업이 동반 성장하는 공생 파트너십',
      details: `단기적 수익창출에 그치지 않고 장기적 라이프사이클 관리를 통해 크리에이터의 퍼스널 브랜드 가치를 극대화합니다. 법률 자문, 정산 투명화, 세무 컨설팅까지 다각도 종합 케어를 제공합니다.`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            VelixMEDIA About Us
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            미디어의 미래를 만드는 <br />
            <span className="gradient-text">VelixMEDIA 브랜드 핵심가치</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 font-light">
            차세대 라이브 크리에이터 MCN 그룹 VelixMEDIA의 핵심 미션과 체계적인 크리에이터 케어 솔루션입니다.
          </p>
        </ScrollReveal>
      </div>

      {/* Accordion / Statement Cards */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          {statements.map((st) => {
            const isExpanded = expandedStatement === st.id;
            return (
              <ScrollReveal key={st.id} direction="up" delay={st.id * 0.1}>
                <div
                  onClick={() => setExpandedStatement(isExpanded ? null : st.id)}
                  className={`p-6 sm:p-8 rounded-3xl cursor-pointer transition-all duration-300 border ${
                    isExpanded
                      ? 'glass-panel border-cyan-500/50 shadow-2xl shadow-cyan-500/10 bg-[#0d1424]/90'
                      : 'glass-panel border-white/10 hover:border-white/20 bg-[#080e1e]/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                        VALUE STATEMENT #{st.id + 1}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                        {st.title}
                      </h3>
                      <p className="text-sm sm:text-lg text-gray-300 font-medium mt-2">{st.subtitle}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center text-cyan-300 transition-transform duration-300 shrink-0 ${
                      isExpanded ? 'rotate-180 bg-blue-600 text-white' : ''
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
                        <div className="mt-8 pt-6 border-t border-white/10 text-base sm:text-lg text-gray-200 leading-relaxed font-light whitespace-pre-line bg-black/30 p-6 sm:p-8 rounded-2xl border border-white/5">
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
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
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
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
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
            <div className="w-12 h-12 rounded-2xl bg-teal-600/20 text-teal-400 flex items-center justify-center">
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
