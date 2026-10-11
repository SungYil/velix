'use client';

import React, { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { Sparkles, ArrowRight, Video, Radio, Flame, Award, Heart } from 'lucide-react';
import { CREATORS_DATA, CreatorItem } from '@/data/creators';

function getDisplayUrl(url: string) {
  if (!url) return '/creators/creator1.jpg';
  if (url.startsWith('/api/files') || url.startsWith('/uploads/') || url.startsWith('http://') || url.startsWith('https://')) {
    if (url.includes('s3.ap-northeast-2.amazonaws.com/')) {
      const key = url.split('amazonaws.com/')[1] || '';
      return `/api/files?key=${encodeURIComponent(key)}`;
    }
    return url;
  }
  return url;
}

export default function CreatorsPage() {
  const [creators, setCreators] = useState<CreatorItem[]>(CREATORS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    fetch('/api/creators')
      .then((res) => res.json())
      .then((data) => {
        if (data.creators && Array.isArray(data.creators) && data.creators.length > 0) {
          const mapped: CreatorItem[] = data.creators.map((c: any) => ({
            id: c.id,
            name: c.name,
            stageName: c.stage_name || c.stageName || '',
            category: c.category || '토크 & 소통',
            platform: c.platform || 'SOOP / 틱톡',
            tag: c.tag || '#라이브 #소통',
            image: c.image || '/creators/creator1.jpg',
            description: c.description || '',
          }));
          setCreators(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    { key: 'ALL', label: '전체보기' },
    { key: 'TALK', label: '토크 & 소통' },
    { key: 'RADIO', label: '보이는 라디오' },
    { key: 'LIFESTYLE', label: '라이프스타일 & 뷰티' },
  ];

  const filteredCreators = selectedCategory === 'ALL'
    ? creators
    : creators.filter(c => {
      if (selectedCategory === 'TALK') return c.category.includes('토크') || c.category.includes('소통');
      if (selectedCategory === 'RADIO') return c.category.includes('라디오') || c.category.includes('버라이어티');
      if (selectedCategory === 'LIFESTYLE') return c.category.includes('라이프') || c.category.includes('뷰티') || c.category.includes('일상');
      return true;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            VELIX MEDIA EXCLUSIVE CREATORS
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            차세대 라이브를 이끄는 <br />
            <span className="gradient-text">소속 크리에이터</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            독보적인 개성과 대중을 사로잡는 매력으로 새로운 미디어 문화를 창조하는
            VELIX MEDIA의 대표 호스트 크리에이터들을 소개합니다.
          </p>
        </ScrollReveal>
      </div>

      {/* Filter Tabs */}
      <ScrollReveal direction="up" delay={0.25}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${selectedCategory === cat.key
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/40'
                : 'glass-panel text-gray-400 hover:text-white border-white/10 hover:border-cyan-500/30'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCreators.map((creator, idx) => (
          <ScrollReveal key={creator.id} direction="up" delay={idx * 0.1}>
            <div className="group rounded-3xl p-6 glass-panel border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 bg-[#080e1e]/80 hover:bg-[#0c1428] hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between h-full relative overflow-hidden">
              {/* Background ambient glow on hover */}
              <div className="absolute -top-20 -right-20 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

              <div className="space-y-6">
                {/* Profile Image with refined frame */}
                <div className="relative mx-auto w-48 h-48 sm:w-52 sm:h-52">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-purple-600 p-[3px] shadow-xl group-hover:scale-105 transition-transform duration-500">
                    <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0f1d] relative">
                      <img
                        src={getDisplayUrl(creator.image)}
                        alt={`${creator.name} 프로필 사진`}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/creators/creator1.jpg';
                        }}
                      />
                    </div>
                  </div>

                  {/* Live Badge */}
                  <div className="absolute bottom-1 right-3 px-3 py-1 rounded-full bg-[#060913]/90 border border-cyan-500/40 text-[11px] font-extrabold text-cyan-300 flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>HOST</span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="text-center space-y-2 pt-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs font-black tracking-widest text-cyan-400 uppercase">
                      {creator.stageName}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                    <span className="text-xs text-gray-400 font-medium">
                      {creator.platform}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                    {creator.name}
                  </h3>

                  <div className="inline-block px-3 py-1 rounded-xl bg-blue-600/20 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
                    {creator.category}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light pt-2 px-2">
                    {creator.description}
                  </p>
                </div>
              </div>

              {/* Tag & Footer */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span className="text-cyan-400/80 font-mono text-[11px]">
                  {creator.tag}
                </span>
                <span className="text-gray-400 group-hover:text-white transition-colors font-medium">
                  VELIX ENT
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Bottom CTA for Applying */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="rounded-3xl p-10 sm:p-14 glass-panel border border-cyan-500/30 bg-gradient-to-r from-blue-950/40 via-[#0a1226] to-cyan-950/40 text-center space-y-6 relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-xl">
            <Sparkles className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              당신도 <span className="gradient-text">VELIX MEDIA</span>의 차세대 크리에이터가 될 수 있습니다
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-300 font-light">
              1:1 맞춤형 전담 방송 케어, 방송 필수 장비 세트 전폭 지원, 확실한 수익 창출 기회를 함께 누려보세요.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/creator/apply"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:scale-105 transition-all border border-cyan-400/30"
            >
              <span>BJ / 크리에이터 지원하기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
