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
      subtitle: '크리에이터의 성공을 위한 파트너',
      details: `우리는 크리에이터와 함께하는 파트너로서, 그들의 꿈과 목표를 실현시킬 수 있도록 끊임없이 도전하고 지원합니다. 크리에이터가 자신의 가능성을 최대한 발휘할 수 있는 환경을 만들어가며, 지속 가능한 성장을 위한 전략을 제공합니다.

우리는 각 크리에이터가 자신의 아이덴티티를 확립하고, 그들의 고유한 브랜드를 세상에 알릴 수 있도록 지원하며, 그 과정에서 함께 성장합니다. 빠르게 변화하는 디지털 세계에서 (주) 노크 엔터테인먼트는 크리에이터의 성공을 이끌어가는 든든한 파트너입니다.`,
    },
    {
      id: 2,
      title: 'SUSTAINABLE GROWTH',
      subtitle: '크리에이터 맞춤형 지원 시스템',
      details: `Velix Entertainment는 크리에이터 개개인의 특징과 목표에 맞춘 맞춤형 지원을 제공합니다. 각 크리에이터에게 전담 매니저를 배정하여, 그들이 효율적으로 콘텐츠를 생산하고 팬들과 소통할 수 있도록 지속적으로 관리합니다.

1) 콘텐츠 기획 및 제작 지원
우리는 콘텐츠의 품질이 성공에 큰 영향을 미친다고 믿습니다. 크리에이터와 협력하여 차별화된 콘텐츠 기획을 진행하고, 최신 트렌드와 기술을 반영하여 고품질 콘텐츠를 제작할 수 있도록 지원합니다. 이 과정에서 크리에이터가 가진 독창성을 존중하며, 그들의 스타일에 맞는 맞춤형 콘텐츠 전략을 수립합니다.

2) 팬 관리 및 소통
크리에이터와 팬의 관계는 그들의 성공에 큰 영향을 미칩니다. Velix Ent는 팬들이 크리에이터와 더 가까워지고, 지속적으로 참여할 수 있는 환경을 제공합니다. 팬들의 반응을 실시간으로 분석하고, 팬 맞춤형 콘텐츠를 통해 그들의 관심을 끌어내며, 충성도 높은 팬층을 구축하는 데 중점을 둡니다.

3) 데이터 분석 및 최적화
크리에이터의 성장을 가속화하기 위해 데이터 분석을 활용합니다. 각종 분석 도구를 통해 팬들의 반응과 콘텐츠의 성과를 실시간으로 추적하고, 그에 따라 콘텐츠 전략을 최적화하여, 최상의 결과를 얻을 수 있도록 돕습니다. 또한, 크리에이터에게 성장 지표와 목표 달성을 위한 피드백을 제공하여 그들이 점진적으로 더 나은 방향으로 나아갈 수 있도록 지원합니다.`,
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
                  className={`p-6 sm:p-8 rounded-3xl cursor-pointer transition-all duration-300 border ${isExpanded
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
                    <div className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center text-cyan-300 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180 bg-blue-600 text-white' : ''
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
