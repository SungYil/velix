'use client';

import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Users, Layers, ShieldCheck, HeartHandshake, Film } from 'lucide-react';

export default function OrgPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            Organization Chart
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            VelixENT <span className="gradient-text">조직도</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-base text-gray-300">
            각 분야 최고의 전문 인력들로 구성된 벨릭스엔터테인먼트 조직 체계를 소개합니다.
          </p>
        </ScrollReveal>
      </div>

      {/* Main Organization Chart Photo / Visual Container */}
      <ScrollReveal direction="up" delay={0.3}>
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 p-6 sm:p-10 shadow-2xl space-y-10">
          {/* Org Chart Image Presentation */}
          <div className="relative rounded-2xl overflow-hidden bg-black/40 p-4 sm:p-8 flex items-center justify-center border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1542744801-30d09c6ff2ef?auto=format&fit=crop&w=1600&q=80"
              alt="VelixENT 조직도 차트 이미지"
              className="w-full max-h-[600px] object-cover rounded-xl shadow-2xl filter brightness-95 hover:brightness-100 transition-all"
            />
          </div>

          {/* Org Departments Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-purple-400 font-bold text-sm flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>크리에이터 매니지먼트 팀</span>
              </div>
              <p className="text-xs text-gray-400">1:1 모니터링, 방송 스케줄 관리 및 개인 퍼스널 브랜딩 전담.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-pink-400 font-bold text-sm flex items-center gap-2">
                <Film className="w-4 h-4" />
                <span>미디어 미디어 제작 스튜디오</span>
              </div>
              <p className="text-xs text-gray-400">초고화질 캡처, 조명, 음향 엔지니어링 및 스튜디오 예약 운용.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
                <HeartHandshake className="w-4 h-4" />
                <span>비즈니스 제휴 및 커머스 팀</span>
              </div>
              <p className="text-xs text-gray-400">기업 광고, 브랜드 파트너십 및 라이브 커머스 세일즈 기획.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>법률 및 정산 케어 센터</span>
              </div>
              <p className="text-xs text-gray-400">계약서 검토, 아티스트 법적 보호, 세무 및 정산 컨설팅 제공.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
