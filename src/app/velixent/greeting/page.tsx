'use client';

import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Quote, Sparkles } from 'lucide-react';

export default function GreetingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            CEO Greeting
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            대표이사 <span className="gradient-text">인삿말</span>
          </h1>
        </ScrollReveal>
      </div>

      {/* Greeting Layout: Photo Next to Text with Scroll Reveal Animations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Photo Column */}
        <div className="lg:col-span-5">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-2xl group">
              <div className="aspect-[3/4] relative w-full overflow-hidden">
                <img
                  src="/ceo.jpg"
                  alt="VELIX MEDIA 대표이사 김태현"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="text-xl font-black text-white">김태현</div>
                <div className="text-xs font-semibold text-cyan-400">VELIX MEDIA 대표이사 / CEO</div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Text Column with Staggered Scroll Reveal Animations */}
        <div className="lg:col-span-7 space-y-6">
          <ScrollReveal direction="right" delay={0.3}>
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-4">
              <Quote className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              "크리에이터의 빛나는 가능성이 <br />
              세계 무대의 인스피레이션이 되는 순간"
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.4}>
            <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed font-light">
              <p>
                안녕하십니까, (주)벨릭스미디어 대표이사 김태현입니다.
              </p>
              <p>
                디지털 미디어 환경은 매 순간 급격하게 변화하고 있습니다. 1인 방송과 라이브 스트리밍은 단순한 엔터테인먼트를 넘어 대중과 가장 밀접하게 소통하는 새로운 시대의 문화적 흐름으로 자리 잡았습니다.
              </p>
              <p>
                VELIX MEDIA는 단순히 크리에이터의 영입에 그치지 않고, 각 개인의 독창적인 브랜드 가치를 발굴하고 안정적인 체계 속에서 최고의 기량을 펼칠 수 있도록 1:1 전담 매니지먼트와 전폭적인 방송 장비 인프라를 제공합니다.
              </p>
              <p>
                크리에이터의 성장이 곧 회사의 성장이라는 확고한 철학 아래, 끊임없는 혁신과 지원으로 글로벌 미디어 시장을 선도하는 든든한 파트너가 될 것을 약속드립니다.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.5}>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">(주)벨릭스미디어 대표이사</div>
                <div className="text-xs text-gray-400">VELIX MEDIA Executive Management</div>
              </div>
              <div className="font-serif italic text-cyan-400 text-lg font-bold">
                Kim Tae Hyun
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
