'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(items[0]?.id || null);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl glass-panel transition-all duration-300 border ${
              isOpen ? 'border-purple-500/50 bg-white/5 shadow-xl' : 'border-white/10 hover:border-white/20'
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  isOpen ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
                }`}>
                  Q
                </span>
                <div>
                  {item.category && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 mb-1 inline-block">
                      {item.category}
                    </span>
                  )}
                  <h3 className="text-base sm:text-lg font-bold text-gray-100">{item.question}</h3>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-purple-400' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5 flex gap-4">
                    <span className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 font-bold text-xs flex items-center justify-center shrink-0">
                      A
                    </span>
                    <div className="pt-1 whitespace-pre-line">{item.answer}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
