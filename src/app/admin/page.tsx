'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Briefcase,
  FileText,
  Bell,
  HelpCircle,
  LogOut,
  Trash2,
  Download,
  Plus,
  Eye,
  CheckCircle,
  X,
  FileDown,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'creators' | 'business' | 'insights' | 'notices' | 'faqs'>('creators');
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  // Data states
  const [applications, setApplications] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  // Selected Detail Modal
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Form states for CMS
  const [newInsight, setNewInsight] = useState({ title: '', category: 'INSIGHT', excerpt: '', content: '', thumbnailUrl: '' });
  const [insightFile, setInsightFile] = useState<File | null>(null);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: '일반' });

  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Check auth
  useEffect(() => {
    fetch('/api/admin/auth-check')
      .then((res) => {
        if (!res.ok) {
          router.push('/admin/login');
        } else {
          setAuthChecked(true);
          loadAllData();
        }
      })
      .catch(() => router.push('/admin/login'));
  }, [router]);

  const loadAllData = () => {
    // Load Applications
    fetch('/api/admin/applications')
      .then((res) => res.json())
      .then((data) => setApplications(data.applications || []));

    // Load Inquiries
    fetch('/api/admin/inquiries')
      .then((res) => res.json())
      .then((data) => setInquiries(data.inquiries || []));

    // Load Insights
    fetch('/api/insights?limit=50')
      .then((res) => res.json())
      .then((data) => setInsights(data.insights || []));

    // Load Notices
    fetch('/api/notices')
      .then((res) => res.json())
      .then((data) => setNotices(data.notices || []));

    // Load FAQs
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => setFaqs(data.faqs || []));
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // Delete Handlers
  const handleDeleteApplication = async (id: number) => {
    if (!confirm('이 지원서를 삭제하시겠습니까?')) return;
    await fetch('/api/admin/applications', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const handleDeleteInquiry = async (id: number) => {
    if (!confirm('이 비즈니스 문의를 삭제하시겠습니까?')) return;
    await fetch('/api/admin/inquiries', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  const handleDeleteInsight = async (id: number) => {
    if (!confirm('이 인사이트 글을 삭제하시겠습니까?')) return;
    await fetch('/api/admin/insights', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setInsights((prev) => prev.filter((i) => i.id !== id));
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm('이 공지사항을 삭제하시겠습니까?')) return;
    await fetch('/api/admin/notices', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const handleDeleteFaq = async (id: number) => {
    if (!confirm('이 FAQ를 삭제하시겠습니까?')) return;
    await fetch('/api/admin/faqs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  // Create CMS Handlers
  const handleCreateInsight = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', newInsight.title);
      formData.append('category', newInsight.category);
      formData.append('excerpt', newInsight.excerpt);
      formData.append('content', newInsight.content);
      formData.append('thumbnailUrl', newInsight.thumbnailUrl);
      if (insightFile) {
        formData.append('thumbnail', insightFile);
      }

      const res = await fetch('/api/admin/insights', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setNewInsight({ title: '', category: 'INSIGHT', excerpt: '', content: '', thumbnailUrl: '' });
        setInsightFile(null);
        setActionSuccess('인사이트가 성공적으로 등록되었습니다.');
        setTimeout(() => setActionSuccess(''), 3000);
        loadAllData();
      } else {
        alert(data.error || '인사이트 등록 중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || '등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice),
      });

      const data = await res.json();
      if (res.ok) {
        setNewNotice({ title: '', content: '' });
        setActionSuccess('공지사항이 성공적으로 등록되었습니다.');
        setTimeout(() => setActionSuccess(''), 3000);
        loadAllData();
      } else {
        alert(data.error || '공지사항 등록 중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || '등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFaq),
      });

      const data = await res.json();
      if (res.ok) {
        setNewFaq({ question: '', answer: '', category: '일반' });
        setActionSuccess('FAQ 항목이 성공적으로 등록되었습니다.');
        setTimeout(() => setActionSuccess(''), 3000);
        loadAllData();
      } else {
        alert(data.error || 'FAQ 등록 중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || '등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked) {
    return <div className="min-h-screen flex items-center justify-center text-white">인증 확인 중...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-purple-400">Management Panel</span>
          <h1 className="text-3xl font-black text-white">VelixENT 관리자 대시보드</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600/20 text-rose-300 hover:bg-rose-600/40 font-bold text-xs transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>관리자 로그아웃</span>
        </button>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl glass-panel border border-white/10">
        <button
          onClick={() => setActiveTab('creators')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'creators'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>크리에이터 지원서 ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('business')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'business'
              ? 'bg-cyan-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>비즈니스 문의 ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('insights')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'insights'
              ? 'bg-amber-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>인사이트 CMS ({insights.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'notices'
              ? 'bg-violet-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>공지사항 CMS ({notices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'faqs'
              ? 'bg-pink-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQ CMS ({faqs.length})</span>
        </button>
      </div>

      {/* TAB 1: Creator Applications */}
      {activeTab === 'creators' && (
        <div className="rounded-3xl glass-panel border border-white/10 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white">접수된 크리에이터 지원자 목록</h2>
            <span className="text-xs text-gray-400">총 {applications.length}건</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 text-gray-400 font-bold uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">접수일</th>
                  <th className="py-3 px-4">이름</th>
                  <th className="py-3 px-4">성별</th>
                  <th className="py-3 px-4">연락처</th>
                  <th className="py-3 px-4">이메일</th>
                  <th className="py-3 px-4">스튜디오여부</th>
                  <th className="py-3 px-4">첨부파일</th>
                  <th className="py-3 px-4">상세/관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">{new Date(app.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-bold text-white">{app.name}</td>
                    <td className="py-3 px-4">{app.gender}</td>
                    <td className="py-3 px-4 font-mono">{app.phone}</td>
                    <td className="py-3 px-4 font-mono">{app.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        app.has_studio === 'Y' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {app.has_studio === 'Y' ? '보유' : '미보유'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {app.file_url ? (
                        <a
                          href={app.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-purple-400 hover:underline font-semibold"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{app.file_name || '다운로드'}</span>
                        </a>
                      ) : (
                        <span className="text-gray-600">없음</span>
                      )}
                    </td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedItem({ type: 'creator', data: app })}
                        className="p-1.5 rounded bg-purple-600/30 text-purple-300 hover:bg-purple-600/50"
                        title="상세보기"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteApplication(app.id)}
                        className="p-1.5 rounded bg-rose-600/30 text-rose-300 hover:bg-rose-600/50"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      접수된 지원서가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Business Inquiries */}
      {activeTab === 'business' && (
        <div className="rounded-3xl glass-panel border border-white/10 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white">접수된 비즈니스 문의 목록</h2>
            <span className="text-xs text-gray-400">총 {inquiries.length}건</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 text-gray-400 font-bold uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">접수일</th>
                  <th className="py-3 px-4">이름/담당자</th>
                  <th className="py-3 px-4">이메일</th>
                  <th className="py-3 px-4">연락처</th>
                  <th className="py-3 px-4">SNS/회사주소</th>
                  <th className="py-3 px-4">첨부파일</th>
                  <th className="py-3 px-4">상세/관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">{new Date(inq.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-bold text-white">{inq.name}</td>
                    <td className="py-3 px-4 font-mono">{inq.email}</td>
                    <td className="py-3 px-4 font-mono">{inq.phone}</td>
                    <td className="py-3 px-4 truncate max-w-[150px]">{inq.sns || '-'}</td>
                    <td className="py-3 px-4">
                      {inq.file_url ? (
                        <a
                          href={inq.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-cyan-400 hover:underline font-semibold"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{inq.file_name || '다운로드'}</span>
                        </a>
                      ) : (
                        <span className="text-gray-600">없음</span>
                      )}
                    </td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedItem({ type: 'business', data: inq })}
                        className="p-1.5 rounded bg-cyan-600/30 text-cyan-300 hover:bg-cyan-600/50"
                        title="상세보기"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-1.5 rounded bg-rose-600/30 text-rose-300 hover:bg-rose-600/50"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      접수된 문의사항이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Insights CMS */}
      {activeTab === 'insights' && (
        <div className="space-y-8">
          {/* Form */}
          <form onSubmit={handleCreateInsight} className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              새 인사이트 아티클 등록
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="제목"
                value={newInsight.title}
                onChange={(e) => setNewInsight({ ...newInsight, title: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
              />
              <input
                type="text"
                placeholder="카테고리 (예: 트렌드, 브랜딩)"
                value={newInsight.category}
                onChange={(e) => setNewInsight({ ...newInsight, category: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
              />
            </div>

            <textarea
              placeholder="요약설명 (Excerpt)"
              rows={2}
              value={newInsight.excerpt}
              onChange={(e) => setNewInsight({ ...newInsight, excerpt: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
            />

            <textarea
              required
              placeholder="상세 본문 내용"
              rows={5}
              value={newInsight.content}
              onChange={(e) => setNewInsight({ ...newInsight, content: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">썸네일 이미지 파일 업로드</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setInsightFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-xs text-gray-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">또는 이미지 URL 직접 입력</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newInsight.thumbnailUrl}
                  onChange={(e) => setNewInsight({ ...newInsight, thumbnailUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-xl transition-all"
            >
              인사이트 게시글 등록하기
            </button>
          </form>

          {/* List */}
          <div className="rounded-3xl glass-panel border border-white/10 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">등록된 인사이트 목록</h3>
            <div className="space-y-3">
              {insights.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-white text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-400 line-clamp-1">{item.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteInsight(item.id)}
                    className="p-2 rounded bg-rose-600/30 text-rose-300 hover:bg-rose-600/50 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Notices CMS */}
      {activeTab === 'notices' && (
        <div className="space-y-8">
          <form onSubmit={handleCreateNotice} className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-violet-400" />
              새 공지사항 등록
            </h2>

            <input
              type="text"
              required
              placeholder="공지사항 제목"
              value={newNotice.title}
              onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
            />

            <textarea
              required
              placeholder="공지사항 상세 내용"
              rows={5}
              value={newNotice.content}
              onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
            />

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-xl transition-all"
            >
              공지사항 등록하기
            </button>
          </form>

          <div className="rounded-3xl glass-panel border border-white/10 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">등록된 공지사항 목록</h3>
            <div className="space-y-3">
              {notices.map((n) => (
                <div key={n.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">{n.title}</h4>
                    <p className="text-xs text-gray-400 line-clamp-1">{n.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteNotice(n.id)}
                    className="p-2 rounded bg-rose-600/30 text-rose-300 hover:bg-rose-600/50 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FAQs CMS */}
      {activeTab === 'faqs' && (
        <div className="space-y-8">
          <form onSubmit={handleCreateFaq} className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-pink-400" />
              새 자주묻는질문 (FAQ) 등록
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="질문 (Question)"
                value={newFaq.question}
                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
              />
              <input
                type="text"
                placeholder="카테고리 (예: 지원관련, 장비지원)"
                value={newFaq.category}
                onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
              />
            </div>

            <textarea
              required
              placeholder="답변 상세 내용 (Answer)"
              rows={4}
              value={newFaq.answer}
              onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
            />

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm shadow-xl transition-all"
            >
              FAQ 항목 등록하기
            </button>
          </form>

          <div className="rounded-3xl glass-panel border border-white/10 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">등록된 FAQ 목록</h3>
            <div className="space-y-3">
              {faqs.map((f) => (
                <div key={f.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">
                      {f.category}
                    </span>
                    <h4 className="font-bold text-white text-sm">Q. {f.question}</h4>
                    <p className="text-xs text-gray-400 line-clamp-1">A. {f.answer}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteFaq(f.id)}
                    className="p-2 rounded bg-rose-600/30 text-rose-300 hover:bg-rose-600/50 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Selected Application/Inquiry Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl glass-panel border border-white/20 p-8 shadow-2xl bg-[#0f111c] space-y-6">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 rounded-full glass-panel text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-black text-white border-b border-white/10 pb-4">
              {selectedItem.type === 'creator' ? '크리에이터 지원서 상세보기' : '비즈니스 문의 상세보기'}
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div><strong className="text-gray-400">성명:</strong> <span className="text-white font-bold">{selectedItem.data.name}</span></div>
              <div><strong className="text-gray-400">연락처:</strong> <span className="text-white font-mono">{selectedItem.data.phone}</span></div>
              <div><strong className="text-gray-400">이메일:</strong> <span className="text-white font-mono">{selectedItem.data.email}</span></div>
              <div><strong className="text-gray-400">생년월일:</strong> <span className="text-white">{selectedItem.data.birthdate || '-'}</span></div>
              <div><strong className="text-gray-400">거주지역:</strong> <span className="text-white">{selectedItem.data.residence || '-'}</span></div>
              <div><strong className="text-gray-400">SNS 계정:</strong> <span className="text-white">{selectedItem.data.sns || '-'}</span></div>
              {selectedItem.type === 'creator' && (
                <div><strong className="text-gray-400">스튜디오 보유:</strong> <span className="text-purple-300 font-bold">{selectedItem.data.has_studio === 'Y' ? '예' : '아니오'}</span></div>
              )}
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4">
              <strong className="text-xs text-gray-400">자기소개 및 내용:</strong>
              <div className="p-4 rounded-xl bg-white/5 text-sm text-gray-200 whitespace-pre-line leading-relaxed">
                {selectedItem.data.bio || '내용이 없습니다.'}
              </div>
            </div>

            {selectedItem.data.file_url && (
              <div className="space-y-2 border-t border-white/10 pt-4">
                <strong className="text-xs text-gray-400">첨부 파일:</strong>
                <div className="flex items-center justify-between p-3 rounded-xl bg-purple-600/10 border border-purple-500/30">
                  <span className="text-xs text-purple-300 font-semibold">{selectedItem.data.file_name || '첨부파일'}</span>
                  <a
                    href={selectedItem.data.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>열기/다운로드</span>
                  </a>
                </div>
                {/* Media Preview if Image */}
                {/\.(jpg|jpeg|png|gif|webp)$/i.test(selectedItem.data.file_url) && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-white/10 max-h-60">
                    <img src={selectedItem.data.file_url} alt="File Preview" className="w-full h-full object-contain bg-black" />
                  </div>
                )}
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
