'use client';

import React, { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import FaqAccordion from '@/components/FaqAccordion';

interface Faq {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => setFaqs(data.faqs || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
            Frequently Asked Questions
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            자주 묻는 <span className="gradient-text">질문 (FAQ)</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-base text-gray-300">
            궁금하신 사항의 제목을 클릭하시면 상세한 안내 답변이 아래로 펼쳐집니다.
          </p>
        </ScrollReveal>
      </div>

      {/* Accordion Component */}
      {faqs.length > 0 ? (
        <ScrollReveal direction="up" delay={0.3}>
          <FaqAccordion items={faqs} />
        </ScrollReveal>
      ) : (
        <div className="text-center text-gray-400 py-12">등록된 FAQ가 없습니다.</div>
      )}
    </div>
  );
}
