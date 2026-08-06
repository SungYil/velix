'use client';

import React, { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Megaphone, Calendar, ChevronDown, Bell } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [openNoticeId, setOpenNoticeId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/notices')
      .then((res) => res.json())
      .then((data) => setNotices(data.notices || []))
      .catch((err) => console.error(err));
  }, []);

  const toggleNotice = (id: number) => {
    setOpenNoticeId(openNoticeId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-violet-400 bg-violet-500/10 px-4 py-1.5 rounded-full border border-violet-500/20">
            Official Announcements
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            VelixENT <span className="gradient-text">공지사항</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-base text-gray-300">
            벨릭스엔터테인먼트의 주요 소식 및 크리에이터 공지 내용을 확인하세요.
          </p>
        </ScrollReveal>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((n, idx) => {
          const isOpen = openNoticeId === n.id;
          return (
            <ScrollReveal key={n.id} direction="up" delay={idx * 0.05}>
              <div className={`rounded-2xl glass-panel border transition-all ${
                isOpen ? 'border-violet-500/50 bg-white/5 shadow-xl' : 'border-white/10 hover:border-white/20'
              }`}>
                <button
                  onClick={() => toggleNotice(n.id)}
                  className="w-full p-6 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-400 shrink-0">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-violet-500/20 text-violet-300">
                          공지
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(n.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white hover:text-violet-300 transition-colors">
                        {n.title}
                      </h3>
                      {/* Short Content Snippet Preview */}
                      {!isOpen && (
                        <p className="text-xs text-gray-400 line-clamp-1">
                          {n.content}
                        </p>
                      )}
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-violet-400' : ''
                    }`}
                  />
                </button>

                {/* Expanded Full Notice */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5 whitespace-pre-line font-light">
                    {n.content}
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
