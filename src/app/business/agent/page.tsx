'use client';

import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Send, Upload, CheckCircle2, AlertCircle, FileVideo, Image as ImageIcon, Paperclip, X, UserCheck, ShieldCheck, Award, Sparkles } from 'lucide-react';

export default function AgentApplyPage() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '여성',
    phone: '',
    email: '',
    residence: '',
    sns: '',
    bio: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selected]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        body.append(key, value);
      });

      files.forEach((f) => {
        body.append('files', f);
      });

      const res = await fetch('/api/business/agent', {
        method: 'POST',
        body,
      });

      let data: any = {};
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`서버 응답 오류 (${res.status}): ${text.replace(/<[^>]*>?/gm, '').substring(0, 80)}`);
      }

      if (!res.ok) {
        throw new Error(data.error || '에이전트 지원서 제출에 실패하였습니다.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || '오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            Agent Recruitment
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            VelixMEDIA <span className="gradient-text">에이전트 모집 / 지원</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-base text-gray-300">
            크리에이터 발굴 및 캐스팅을 함께 이끌어갈 전문 MCN 에이전트 / 리크루터를 모집합니다.
          </p>
        </ScrollReveal>
      </div>

      {/* Feature Highlights Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="p-6 rounded-2xl glass-panel border border-emerald-500/20 space-y-3 bg-[#080e1e]/60">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">업계 최고 수준 수수료 레버리지</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              발굴한 소속 크리에이터 수익 성과에 연동된 공정하고 파격적인 인센티브 정산 시스템을 보장합니다.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="p-6 rounded-2xl glass-panel border border-blue-500/20 space-y-3 bg-[#080e1e]/60">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">체계적인 영업 툴 & 데이터 인프라</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              크리에이터 캐스팅용 제안서 템플릿, 계약서 가이드 및 1:1 리크루팅 교육 노하우를 제공합니다.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Submitted Success Banner */}
      {submitted ? (
        <ScrollReveal direction="up">
          <div className="rounded-3xl p-10 glass-panel border border-emerald-500/40 text-center space-y-6 bg-emerald-950/20">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-white">에이전트 지원서가 성공적으로 접수되었습니다!</h2>
            <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
              작성해주신 프로필 및 제출 서류를 바탕으로 24시간 이내에 담당자가 연락드리겠습니다.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  gender: '여성',
                  phone: '',
                  email: '',
                  residence: '',
                  sns: '',
                  bio: '',
                });
                setFiles([]);
              }}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg"
            >
              추가 에이전트 지원서 작성하기
            </button>
          </div>
        </ScrollReveal>
      ) : (
        /* Agent Application Form Container */
        <ScrollReveal direction="up" delay={0.3}>
          <form onSubmit={handleSubmit} className="rounded-3xl p-8 sm:p-12 glass-panel border border-emerald-500/30 shadow-2xl space-y-8 bg-[#080e1e]/80">
            <div className="pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <span>에이전트 지원서 작성 지원 양식</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">아래 지원 항목을 작성 후 제출 버튼을 클릭해 주세요.</p>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  성명 <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="성함을 입력하세요 (예: 홍길동)"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  성별 <span className="text-emerald-400">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#101728] border border-white/10 text-white focus:outline-none focus:border-emerald-500 text-sm"
                >
                  <option value="여성">여성</option>
                  <option value="남성">남성</option>
                  <option value="기타/비공개">기타/비공개</option>
                </select>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  연락처 (휴대폰) <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  이메일 주소 <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@velixent.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                />
              </div>

              {/* Residence */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  거주 지역
                </label>
                <input
                  type="text"
                  name="residence"
                  value={formData.residence}
                  onChange={handleInputChange}
                  placeholder="예: 서울 강남구 / 경기 성남시"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                />
              </div>

              {/* SNS Account */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  SNS 계정 (인스타그램/블로그/링크)
                </label>
                <input
                  type="text"
                  name="sns"
                  value={formData.sns}
                  onChange={handleInputChange}
                  placeholder="예: @velix_agent 또는 URL"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Bio / Self-Introduction */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                자기소개 및 주요 리크루팅 / 엔터 경력
              </label>
              <textarea
                name="bio"
                rows={5}
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="본인의 경력, 크리에이터 캐스팅 포부 및 자기소개를 작성해 주세요."
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>

            {/* Multiple File / Media Upload (Photos/Videos) */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                사진, 동영상 및 이력서/포트폴리오 첨부 (다중 첨부 가능)
              </label>

              <div className="relative border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-white/5">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,application/pdf"
                  onChange={handleFileAdd}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="space-y-3 flex flex-col items-center justify-center">
                  <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-200">
                      클릭하거나 파일을 드래그하여 다중 첨부하세요 (사진, 영상, PDF 이력서)
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      지원 형식: JPG, PNG, GIF, MP4, MOV, PDF (여러 파일 동시 제출 가능)
                    </p>
                  </div>
                </div>
              </div>

              {/* Selected File Chips List */}
              {files.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {files.map((f, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl glass-panel border border-emerald-500/30 bg-white/5">
                      <div className="flex items-center gap-2.5 truncate">
                        {f.type.startsWith('video/') ? (
                          <FileVideo className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : f.type.startsWith('image/') ? (
                          <ImageIcon className="w-5 h-5 text-teal-400 shrink-0" />
                        ) : (
                          <Paperclip className="w-5 h-5 text-cyan-400 shrink-0" />
                        )}
                        <div className="truncate">
                          <p className="text-xs font-bold text-white truncate">{f.name}</p>
                          <p className="text-[10px] text-gray-400">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="p-1 rounded-lg hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base shadow-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 border border-emerald-400/30"
              >
                {loading ? (
                  <span>제출 중입니다...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>에이전트 지원서 제출하기 ({files.length}개 첨부됨)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </ScrollReveal>
      )}
    </div>
  );
}
