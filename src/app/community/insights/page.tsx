'use client';

import React, { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, X, Eye } from 'lucide-react';

interface Insight {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  created_at: string;
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Insight | null>(null);

  const fetchInsights = async (pageNum: number, isLoadMore = false) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/insights?page=${pageNum}&limit=4`);
      const data = await res.json();
      
      if (isLoadMore) {
        setInsights((prev) => [...prev, ...data.insights]);
      } else {
        setInsights(data.insights);
      }
      setHasMore(data.hasMore);
    } catch (err) {
      console.error('Error fetching insights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchInsights(nextPage, true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Media Insights & Column
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            VelixENT <span className="gradient-text">인사이트</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-base text-gray-300">
            미디어 크리에이터 트렌드, 1인 스트리밍 브랜딩 가이드 및 최신 MCN 인사이트를 공유합니다.
          </p>
        </ScrollReveal>
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {insights.map((item) => (
          <ScrollReveal key={item.id} direction="up" delay={0.1}>
            <div
              onClick={() => setSelectedPost(item)}
              className="group cursor-pointer rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col h-full hover:-translate-y-1"
            >
              {/* Thumbnail Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
                <img
                  src={item.thumbnail || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {item.category || 'INSIGHT'}
                  </span>
                </div>
              </div>

              {/* Card Text Snippet */}
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {item.excerpt || item.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>아티클 자세히 읽기</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Read More / Lead More Pagination Button */}
      {hasMore && (
        <div className="text-center pt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-10 py-4 rounded-2xl glass-panel hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-sm transition-all shadow-xl hover:scale-105 disabled:opacity-50"
          >
            {loading ? '인사이트 불러오는 중...' : 'Read More (더보기)'}
          </button>
        </div>
      )}

      {/* Detail Modal View */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl glass-panel border border-amber-500/40 p-8 sm:p-12 shadow-2xl bg-[#0f111c] space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 p-2 rounded-full glass-panel text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block">
                  {selectedPost.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  {selectedPost.title}
                </h2>
                <div className="text-xs text-gray-500">
                  작성일: {new Date(selectedPost.created_at).toLocaleString()}
                </div>
              </div>

              {selectedPost.thumbnail && (
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={selectedPost.thumbnail}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="text-gray-200 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-white/10 pt-6 font-light">
                {selectedPost.content}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
