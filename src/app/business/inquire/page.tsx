'use client';

import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Upload, CheckCircle2, AlertCircle, Send } from 'lucide-react';

export default function BusinessInquirePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    residence: '',
    sns: '',
    bio: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => setFilePreview(event.target?.result as string);
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
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

      if (file) {
        body.append('file', file);
      }

      const res = await fetch('/api/business/inquire', {
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
        throw new Error(data.error || '제출에 실패하였습니다.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || '오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <ScrollReveal direction="up">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            Business Inquiry
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            비즈니스 <span className="gradient-text">제휴 문의</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-base text-gray-300">
            광고 협찬, 브랜드 제휴, 스튜디오 대관 문의사항을 남겨주시면 전담 마케팅 팀이 24시간 내 답변해 드립니다.
          </p>
        </ScrollReveal>
      </div>

      {/* Submitted Banner */}
      {submitted ? (
        <ScrollReveal direction="up">
          <div className="rounded-3xl p-10 glass-panel border border-emerald-500/40 text-center space-y-6 bg-emerald-950/20">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-white">비즈니스 문의가 정상 접수되었습니다!</h2>
            <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
              제출하신 내역과 첨부파일이 관리자 시스템에 기록되었습니다. 검토 후 입력해주신 이메일 및 연락처로 시속히 답변드리겠습니다.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  birthdate: '',
                  residence: '',
                  sns: '',
                  bio: '',
                });
                setFile(null);
                setFilePreview(null);
              }}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all"
            >
              추가 문의 작성하기
            </button>
          </div>
        </ScrollReveal>
      ) : (
        /* Form Container */
        <ScrollReveal direction="up" delay={0.3}>
          <form onSubmit={handleSubmit} className="rounded-3xl p-8 sm:p-12 glass-panel border border-white/15 shadow-2xl space-y-8">
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
                  이름 / 담당자명 <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="예: 홍길동 팀장"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  이메일 주소 <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="partner@company.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  연락처 <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
                />
              </div>

              {/* Birthdate */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  생년월일 (또는 사업자등록번호)
                </label>
                <input
                  type="text"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  placeholder="예: 1990-05-15"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
                />
              </div>

              {/* Residence / Location */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  거주지역 / 회사 위치
                </label>
                <input
                  type="text"
                  name="residence"
                  value={formData.residence}
                  onChange={handleInputChange}
                  placeholder="예: 서울 강남구"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
                />
              </div>

              {/* SNS URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  SNS 주소 / 회사 웹사이트
                </label>
                <input
                  type="text"
                  name="sns"
                  value={formData.sns}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
                />
              </div>
            </div>

            {/* Self Bio / Partnership Proposal */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                자기소개 및 제휴 문의 내용
              </label>
              <textarea
                name="bio"
                rows={5}
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="제휴 목적, 예산 범위, 제품/서비스 소개 등 세부 문의사항을 자유롭게 작성해 주세요."
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
              />
            </div>

            {/* Attachment Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                제휴 제안서 또는 사진/동영상 첨부 (선택)
              </label>
              <div className="relative border-2 border-dashed border-white/20 hover:border-cyan-500/50 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-white/5">
                <input
                  type="file"
                  accept="image/*,video/*,.pdf,.pptx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-3 flex flex-col items-center justify-center">
                  <div className="p-3 rounded-full bg-cyan-600/20 text-cyan-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  {file ? (
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-cyan-300">{file.name}</p>
                      <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      {filePreview && (
                        <div className="mt-3 w-24 h-24 rounded-xl overflow-hidden mx-auto border border-cyan-500/40">
                          <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-gray-300">
                        클릭하여 소개서나 미디어 파일을 첨부하세요
                      </p>
                      <p className="text-xs text-gray-500">
                        지원 형식: 이미지, 영상, PDF, PPTX (최대 50MB)
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-black text-base shadow-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? (
                  <span>제출 처리 중...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>비즈니스 문의 제출하기</span>
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
