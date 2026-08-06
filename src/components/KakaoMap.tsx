'use client';

import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';

export default function KakaoMap() {
  const [copied, setCopied] = useState(false);
  const address = '서울특별시 강남구 테헤란로 123 벨릭스타워 8층';
  const phone = '02-555-0199';

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Map Container */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl">
        {/* Embedded Interactive Map iframe / KakaoMap View */}
        <iframe
          title="VelixENT 오시는길 카카오맵"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.3475283944645!2d127.0315!3d37.5005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca158f0000001%3A0x123456789!2z7ISc7Jq47Yq567OE7IucIOugneqwgOq1rCDthYztl6TrnoAxMjM!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
          className="w-full h-full border-0 filter grayscale brightness-90 contrast-125"
          allowFullScreen
          loading="lazy"
        ></iframe>

        {/* Map Overlay Badge */}
        <div className="absolute top-6 left-6 p-4 rounded-2xl glass-panel border border-purple-500/30 shadow-2xl max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <h4 className="font-bold text-white text-sm">VelixENT 본사 타워</h4>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">{address}</p>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Address Card */}
        <div className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400">주소 안내</div>
              <div className="text-sm font-bold text-white">서울 강남구 테헤란로 123</div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-xs text-gray-400">벨릭스타워 8층</span>
            <button
              onClick={copyAddress}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-purple-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사됨!' : '주소 복사'}</span>
            </button>
          </div>
        </div>

        {/* Phone Card */}
        <div className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-pink-600/20 text-pink-400">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400">대표전화</div>
              <div className="text-sm font-bold text-white">{phone}</div>
            </div>
          </div>
          <div className="pt-2 border-t border-white/10">
            <a
              href={`tel:${phone.replace(/-/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-pink-600/30 hover:bg-pink-600/50 text-xs font-bold text-pink-200 transition-colors"
            >
              <span>전화 연결하기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* KakaoTalk Consultation Card */}
        <div className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#FEE500]/20 text-[#FEE500]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400">카카오톡 상담</div>
              <div className="text-sm font-bold text-white">VelixENT 공식채널</div>
            </div>
          </div>
          <div className="pt-2 border-t border-white/10">
            <a
              href="https://pf.kakao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#FEE500] text-[#191919] font-bold text-xs hover:bg-[#FADA0A] transition-colors"
            >
              <span>실시간 1:1 상담 시작</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
