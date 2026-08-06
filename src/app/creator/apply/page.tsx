'use client';

import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Upload, CheckCircle2, AlertCircle, Sparkles, Send, FileVideo, Image as ImageIcon } from 'lucide-react';

export default function CreatorApplyPage() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '여성',
    phone: '',
    email: '',
    birthdate: '',
    residence: '',
    sns: '',
    hasStudio: 'Y',
    bio: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

      const res = await fetch('/api/creator/apply', {
        method: 'POST',
        body,
      });

      const data = await res.json();
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
          <span className="text-xs uppercase font-bold tracking-widest text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
            Creator Application
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            BJ / 크리에이터 <span className="gradient-text">지원하기</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-base text-gray-300">
            양식을 작성하여 제출해 주시면 24시간 이내에 전담 매니저가 검토 후 개별 연락드립니다.
          </p>
        </ScrollReveal>
      </div>

      {/* Submitted Success Banner */}
      {submitted ? (
        <ScrollReveal direction="up">
          <div className="rounded-3xl p-10 glass-panel border border-emerald-500/40 text-center space-y-6 bg-emerald-950/20">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-white">지원서가 성공적으로 접수되었습니다!</h2>
            <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
              작성해주신 정보와 첨부파일이 안전하게 관리자 시스템에 전달되었습니다. 빠른 시일 내에 기재해주신 연락처로 안내드리겠습니다.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  gender: '여성',
                  phone: '',
                  email: '',
                  birthdate: '',
                  residence: '',
                  sns: '',
                  hasStudio: 'Y',
                  bio: '',
                });
                setFile(null);
                setFilePreview(null);
              }}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all"
            >
              추가 지원서 작성하기
            </button>
          </div>
        </ScrollReveal>
      ) : (
        /* Application Form Container */
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
                  성명 / 활동명 <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="예: 홍길동"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  성별 <span className="text-purple-400">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#121420] border border-white/10 text-white focus:outline-none focus:border-purple-500 text-sm"
                >
                  <option value="여성">여성</option>
                  <option value="남성">남성</option>
                  <option value="기타/비공개">기타/비공개</option>
                </select>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  연락처 (휴대폰) <span className="text-purple-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  이메일 주소 <span className="text-purple-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@velixent.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
                />
              </div>

              {/* Birthdate */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  생년월일 (8자리 또는 YYYY-MM-DD)
                </label>
                <input
                  type="text"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  placeholder="예: 2000-01-01"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
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
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
                />
              </div>

              {/* Instagram / SNS Account */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  인스타그램 또는 SNS 계정 (링크/아이디)
                </label>
                <input
                  type="text"
                  name="sns"
                  value={formData.sns}
                  onChange={handleInputChange}
                  placeholder="예: @velix_official 또는 URL"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
                />
              </div>

              {/* Has Personal Studio */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  개인 스튜디오 보유 여부
                </label>
                <select
                  name="hasStudio"
                  value={formData.hasStudio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#121420] border border-white/10 text-white focus:outline-none focus:border-purple-500 text-sm"
                >
                  <option value="Y">보유함 (개인 방송 환경 있음)</option>
                  <option value="N">미보유 (본사 스튜디오/장비 지원 희망)</option>
                </select>
              </div>
            </div>

            {/* Short Bio */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                간단한 자기소개 및 주요 경력
              </label>
              <textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="본인의 매력, 방송 경험 또는 앞으로의 포부를 자유롭게 적어주세요."
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
              />
            </div>

            {/* File / Media Upload (Photo/Video) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                프로필 사진 또는 동영상 첨부 (선택)
              </label>
              <div className="relative border-2 border-dashed border-white/20 hover:border-purple-500/50 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-white/5">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-3 flex flex-col items-center justify-center">
                  <div className="p-3 rounded-full bg-purple-600/20 text-purple-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  {file ? (
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-purple-300">{file.name}</p>
                      <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      {filePreview && (
                        <div className="mt-3 w-24 h-24 rounded-xl overflow-hidden mx-auto border border-purple-500/40">
                          <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-gray-300">
                        클릭하여 사진이나 영상 파일을 업로드하세요
                      </p>
                      <p className="text-xs text-gray-500">
                        지원 형식: JPG, PNG, GIF, MP4, MOV (최대 50MB)
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
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-black text-base shadow-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? (
                  <span>제출 중입니다...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>지원서 제출하기</span>
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
