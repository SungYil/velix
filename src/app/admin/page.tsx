'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Edit,
  Image as ImageIcon,
  Video as VideoIcon,
  Paperclip,
  ExternalLink,
  UserCheck,
  Lock,
} from 'lucide-react';

function getDisplayUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('/api/files') || url.startsWith('/uploads/') || url.startsWith('http://') || url.startsWith('https://')) {
    if (url.includes('s3.ap-northeast-2.amazonaws.com/')) {
      const key = url.split('amazonaws.com/')[1] || '';
      return `/api/files?key=${encodeURIComponent(key)}`;
    }
    return url;
  }
  return url;
}

function getDownloadUrl(url: string, filename?: string) {
  if (!url) return '';
  let key = url;
  if (url.includes('s3.ap-northeast-2.amazonaws.com/')) {
    key = url.split('amazonaws.com/')[1] || '';
  } else if (url.startsWith('/uploads/')) {
    key = url.replace(/^\//, '');
  } else if (url.startsWith('/api/files')) {
    const search = url.split('?key=')[1];
    if (search) key = decodeURIComponent(search.split('&')[0]);
  }
  return `/api/files?key=${encodeURIComponent(key)}&download=true${filename ? `&filename=${encodeURIComponent(filename)}` : ''}`;
}

// Visual WYSIWYG Rich Text Editor Component
function VisualRichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isUpdatingRef.current) {
      if (editorRef.current.innerHTML !== (value || '')) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      isUpdatingRef.current = true;
      onChange(editorRef.current.innerHTML);
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    }
  };

  const execCmd = (cmd: string, arg: string = '') => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, arg);
    handleInput();
  };

  const handleInsertMedia = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const body = new FormData();
      body.append('file', file);

      try {
        const res = await fetch('/api/admin/media/upload', {
          method: 'POST',
          body,
        });
        const data = await res.json();
        if (data.success && data.fileUrl) {
          const htmlTag = data.isVideo
            ? `<div contenteditable="false" style="margin:16px 0;"><video src="${data.fileUrl}" controls style="max-width:100%; border-radius:16px; border:1px solid rgba(255,255,255,0.2);"></video></div><p><br></p>`
            : `<div contenteditable="false" style="margin:16px 0;"><img src="${data.fileUrl}" alt="첨부 이미지" style="max-width:100%; border-radius:16px; border:1px solid rgba(255,255,255,0.2);" /></div><p><br></p>`;

          editorRef.current?.focus();
          document.execCommand('insertHTML', false, htmlTag);
          handleInput();
        } else {
          alert(data.error || '미디어 업로드에 실패했습니다.');
        }
      } catch (err: any) {
        alert('업로드 중 오류가 발생했습니다: ' + err.message);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-2">
      {/* Visual Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-[#141727] border border-white/15">
        <button
          type="button"
          onClick={() => execCmd('bold')}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-cyan-600/50 text-white font-black text-xs"
          title="굵게 (Bold)"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => execCmd('italic')}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-cyan-600/50 text-white text-xs italic"
          title="기울임 (Italic)"
        >
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={() => execCmd('underline')}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-cyan-600/50 text-white text-xs underline"
          title="밑줄 (Underline)"
        >
          <u>U</u>
        </button>

        <span className="w-px h-4 bg-white/20 mx-1" />

        <button
          type="button"
          onClick={() => execCmd('formatBlock', '<h2>')}
          className="px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-cyan-200 font-bold text-xs"
        >
          H1 대제목
        </button>
        <button
          type="button"
          onClick={() => execCmd('formatBlock', '<h3>')}
          className="px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-cyan-200 font-bold text-xs"
        >
          H2 중제목
        </button>

        <span className="w-px h-4 bg-white/20 mx-1" />

        <select
          onChange={(e) => {
            if (e.target.value) {
              execCmd('fontSize', e.target.value);
              e.target.value = '';
            }
          }}
          className="px-2 py-1 rounded-lg bg-[#1e2238] text-gray-200 text-xs font-semibold border border-white/10 focus:outline-none cursor-pointer"
        >
          <option value="">글자 크기</option>
          <option value="2">작게 (12px)</option>
          <option value="3">보통 (14px)</option>
          <option value="4">크게 (18px)</option>
          <option value="5">매우 크게 (24px)</option>
          <option value="6">특대 (32px)</option>
        </select>

        <select
          onChange={(e) => {
            if (e.target.value) {
              execCmd('foreColor', e.target.value);
              e.target.value = '';
            }
          }}
          className="px-2 py-1 rounded-lg bg-[#1e2238] text-gray-200 text-xs font-semibold border border-white/10 focus:outline-none cursor-pointer"
        >
          <option value="">글자 색상</option>
          <option value="#38bdf8">🔵 사이버시안</option>
          <option value="#60a5fa">🟦 블루</option>
          <option value="#facc15">🟡 노랑/골드</option>
          <option value="#34d399">🟢 민트/초록</option>
          <option value="#c084fc">🟣 보라색</option>
          <option value="#ffffff">⚪ 흰색</option>
        </select>

        <span className="w-px h-4 bg-white/20 mx-1" />

        <button
          type="button"
          onClick={() => execCmd('insertUnorderedList')}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 text-xs"
          title="글머리 기호 목록"
        >
          • 목록
        </button>

        <button
          type="button"
          onClick={() => execCmd('removeFormat')}
          className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 text-xs"
          title="서식 초기화"
        >
          서식 지우기
        </button>

        <button
          type="button"
          onClick={handleInsertMedia}
          className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-white font-bold text-xs flex items-center gap-1.5 ml-auto shadow-md"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>+ 사진 / 동영상 실시간 본문 삽입</span>
        </button>
      </div>

      {/* Editable Visual Container */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        className="min-h-[240px] max-h-[500px] overflow-y-auto p-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 font-sans leading-relaxed transition-colors select-text"
        style={{ minHeight: '240px' }}
      />
    </div>
  );
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'creators' | 'agents' | 'business' | 'insights' | 'notices' | 'faqs'>('creators');
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  // Data states
  const [applications, setApplications] = useState<any[]>([]);
  const [agentApplications, setAgentApplications] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  // Selected Detail Modal
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Edit Modal States
  const [editInsightModal, setEditInsightModal] = useState<any | null>(null);
  const [editNoticeModal, setEditNoticeModal] = useState<any | null>(null);
  const [editFaqModal, setEditFaqModal] = useState<any | null>(null);

  // Form states for CMS Creation
  const [newInsight, setNewInsight] = useState({ title: '', category: 'INSIGHT', excerpt: '', content: '', thumbnailUrl: '' });
  const [insightFile, setInsightFile] = useState<File | null>(null);
  const [editInsightFile, setEditInsightFile] = useState<File | null>(null);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: '일반' });

  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Password Change State
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passForm.newPassword !== passForm.confirmPassword) {
      alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passForm.currentPassword,
          newPassword: passForm.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '비밀번호 변경 실패');

      setActionSuccess('관리자 비밀번호가 성공적으로 변경되었습니다!');
      setPasswordModalOpen(false);
      setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

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
    fetch('/api/admin/applications')
      .then((res) => res.json())
      .then((data) => setApplications(data.applications || []));

    fetch('/api/admin/agent-applications')
      .then((res) => res.json())
      .then((data) => setAgentApplications(data.applications || []));

    fetch('/api/admin/inquiries')
      .then((res) => res.json())
      .then((data) => setInquiries(data.inquiries || []));

    fetch('/api/insights?limit=50')
      .then((res) => res.json())
      .then((data) => setInsights(data.insights || []));

    fetch('/api/notices')
      .then((res) => res.json())
      .then((data) => setNotices(data.notices || []));

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
    loadAllData();
  };

  const handleDeleteAgentApplication = async (id: number) => {
    if (!confirm('이 에이전트 지원서를 삭제하시겠습니까?')) return;
    await fetch('/api/admin/agent-applications', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadAllData();
  };

  const handleDeleteInquiry = async (id: number) => {
    if (!confirm('이 문의건을 삭제하시겠습니까?')) return;
    await fetch('/api/admin/inquiries', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadAllData();
  };

  const handleDeleteInsight = async (id: number) => {
    if (!confirm('이 인사이트 게시글을 삭제하시겠습니까?')) return;
    await fetch('/api/admin/insights', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadAllData();
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm('이 공지사항을 삭제하시겠습니까?')) return;
    await fetch('/api/admin/notices', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadAllData();
  };

  const handleDeleteFaq = async (id: number) => {
    if (!confirm('이 FAQ를 삭제하시겠습니까?')) return;
    await fetch('/api/admin/faqs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadAllData();
  };

  // Create Handlers
  const handleCreateInsight = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = new FormData();
      body.append('title', newInsight.title);
      body.append('category', newInsight.category);
      body.append('excerpt', newInsight.excerpt);
      body.append('content', newInsight.content);
      body.append('thumbnailUrl', newInsight.thumbnailUrl);
      if (insightFile) body.append('thumbnail', insightFile);

      const res = await fetch('/api/admin/insights', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '등록 실패');

      setActionSuccess('인사이트가 새로 등록되었습니다!');
      setNewInsight({ title: '', category: 'INSIGHT', excerpt: '', content: '', thumbnailUrl: '' });
      setInsightFile(null);
      loadAllData();
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit Handlers
  const handleUpdateInsight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editInsightModal) return;
    setLoading(true);
    try {
      const body = new FormData();
      body.append('id', editInsightModal.id);
      body.append('title', editInsightModal.title);
      body.append('category', editInsightModal.category || 'INSIGHT');
      body.append('excerpt', editInsightModal.excerpt || '');
      body.append('content', editInsightModal.content);
      body.append('existingThumbnail', editInsightModal.thumbnail || '');
      if (editInsightFile) body.append('thumbnail', editInsightFile);

      const res = await fetch('/api/admin/insights', { method: 'PUT', body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '수정 실패');

      setActionSuccess('인사이트 게시글이 성공적으로 수정되었습니다!');
      setEditInsightModal(null);
      setEditInsightFile(null);
      loadAllData();
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
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
      if (!res.ok) throw new Error(data.error || '등록 실패');

      setActionSuccess('공지사항이 등록되었습니다!');
      setNewNotice({ title: '', content: '' });
      loadAllData();
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editNoticeModal) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/notices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editNoticeModal),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '수정 실패');

      setActionSuccess('공지사항이 성공적으로 수정되었습니다!');
      setEditNoticeModal(null);
      loadAllData();
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
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
      if (!res.ok) throw new Error(data.error || '등록 실패');

      setActionSuccess('FAQ가 등록되었습니다!');
      setNewFaq({ question: '', answer: '', category: '일반' });
      loadAllData();
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFaqModal) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFaqModal),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '수정 실패');

      setActionSuccess('FAQ가 성공적으로 수정되었습니다!');
      setEditFaqModal(null);
      loadAllData();
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-cyan-400 animate-spin" />
          <span className="text-sm font-semibold">관리자 인증 상태 확인 중...</span>
        </div>
      </div>
    );
  }

  // Parse files list for applications or inquiries
  const parseFilesList = (item: any) => {
    if (item.files_json) {
      try {
        const parsed = typeof item.files_json === 'string' ? JSON.parse(item.files_json) : item.files_json;
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    if (item.file_url) {
      if (typeof item.file_url === 'string' && item.file_url.startsWith('[')) {
        try {
          const parsed = JSON.parse(item.file_url);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {}
      }
      return [{ url: item.file_url, name: item.file_name || '첨부파일' }];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-[#060913] text-gray-100 p-4 sm:p-8">
      {/* Top Admin Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            VelixMEDIA Admin CMS
          </span>
          <h1 className="text-3xl font-black text-white mt-2">관리자 종합 통합 대시보드</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 rounded-xl glass-panel hover:bg-white/10 text-xs font-semibold text-gray-300 flex items-center gap-1.5 border border-cyan-500/30"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>메인 웹사이트 이동</span>
          </button>
          <button
            onClick={() => setPasswordModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-cyan-600/20 border border-cyan-500/30 hover:bg-cyan-600/30 text-cyan-300 text-xs font-bold flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>비밀번호 변경</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-600/20 border border-rose-500/30 hover:bg-rose-600/30 text-rose-300 text-xs font-bold flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>로그아웃</span>
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="max-w-7xl mx-auto mt-4 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-wrap gap-2 pb-4 border-b border-white/10">
        <button
          onClick={() => setActiveTab('creators')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors ${
            activeTab === 'creators' ? 'bg-blue-600 text-white shadow-lg border border-cyan-400/40' : 'glass-panel text-gray-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>크리에이터 지원서 ({applications.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors ${
            activeTab === 'agents' ? 'bg-emerald-600 text-white shadow-lg border border-emerald-400/40' : 'glass-panel text-gray-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>에이전트 지원서 ({agentApplications.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('business')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors ${
            activeTab === 'business' ? 'bg-blue-600 text-white shadow-lg border border-cyan-400/40' : 'glass-panel text-gray-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>비즈니스 문의 ({inquiries.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors ${
            activeTab === 'insights' ? 'bg-blue-600 text-white shadow-lg border border-cyan-400/40' : 'glass-panel text-gray-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>인사이트 관리 ({insights.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('notices')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors ${
            activeTab === 'notices' ? 'bg-blue-600 text-white shadow-lg border border-cyan-400/40' : 'glass-panel text-gray-400 hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>공지사항 관리 ({notices.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors ${
            activeTab === 'faqs' ? 'bg-blue-600 text-white shadow-lg border border-cyan-400/40' : 'glass-panel text-gray-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQ 관리 ({faqs.length})</span>
        </button>
      </div>

      {/* Main Content Areas */}
      <div className="max-w-7xl mx-auto mt-8">
        {/* Tab 1: Creators Applications */}
        {activeTab === 'creators' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>접수된 크리에이터 / BJ 지원서 목록</span>
            </h2>
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-400 text-xs font-semibold uppercase">
                    <tr>
                      <th className="p-4">접수일시</th>
                      <th className="p-4">성명/활동명</th>
                      <th className="p-4">성별</th>
                      <th className="p-4">연락처</th>
                      <th className="p-4">이메일</th>
                      <th className="p-4">스튜디오</th>
                      <th className="p-4">첨부파일(미디어 목록)</th>
                      <th className="p-4 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {applications.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-gray-500">
                          접수된 크리에이터 지원서가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      applications.map((app) => {
                        const fileList = parseFilesList(app);
                        return (
                          <tr key={app.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 text-xs text-gray-400">{new Date(app.created_at).toLocaleString('ko-KR')}</td>
                            <td className="p-4 font-bold text-white">{app.name}</td>
                            <td className="p-4">{app.gender}</td>
                            <td className="p-4 text-cyan-300">{app.phone}</td>
                            <td className="p-4">{app.email}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${app.has_studio === 'Y' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                                {app.has_studio === 'Y' ? '보유' : '미보유'}
                              </span>
                            </td>
                            <td className="p-4">
                              {fileList.length > 0 ? (
                                <div className="flex flex-col gap-1.5">
                                  {fileList.map((f: any, idx: number) => (
                                    <a
                                      key={idx}
                                      href={getDownloadUrl(f.url, f.name)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 underline font-semibold"
                                    >
                                      <FileDown className="w-3.5 h-3.5" />
                                      <span className="max-w-[160px] truncate">{f.name || `파일 ${idx + 1}`}</span>
                                    </a>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-gray-500 text-xs">-</span>
                              )}
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setSelectedItem({ type: 'creator', data: app })}
                                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                                  title="상세보기"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteApplication(app.id)}
                                  className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 transition-colors"
                                  title="삭제"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Agent Applications */}
        {activeTab === 'agents' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span>접수된 에이전트 지원서 목록</span>
            </h2>
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-400 text-xs font-semibold uppercase">
                    <tr>
                      <th className="p-4">접수일시</th>
                      <th className="p-4">성명</th>
                      <th className="p-4">성별</th>
                      <th className="p-4">연락처</th>
                      <th className="p-4">이메일</th>
                      <th className="p-4">거주지역</th>
                      <th className="p-4">첨부파일 목록</th>
                      <th className="p-4 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {agentApplications.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-gray-500">
                          접수된 에이전트 지원서가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      agentApplications.map((agent) => {
                        const fileList = parseFilesList(agent);
                        return (
                          <tr key={agent.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 text-xs text-gray-400">{new Date(agent.created_at).toLocaleString('ko-KR')}</td>
                            <td className="p-4 font-bold text-white">{agent.name}</td>
                            <td className="p-4">{agent.gender}</td>
                            <td className="p-4 text-emerald-300 font-bold">{agent.phone}</td>
                            <td className="p-4">{agent.email}</td>
                            <td className="p-4">{agent.residence || '-'}</td>
                            <td className="p-4">
                              {fileList.length > 0 ? (
                                <div className="flex flex-col gap-1.5">
                                  {fileList.map((f: any, idx: number) => (
                                    <a
                                      key={idx}
                                      href={getDownloadUrl(f.url, f.name)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 underline font-semibold"
                                    >
                                      <FileDown className="w-3.5 h-3.5" />
                                      <span className="max-w-[160px] truncate">{f.name || `파일 ${idx + 1}`}</span>
                                    </a>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-gray-500 text-xs">-</span>
                              )}
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setSelectedItem({ type: 'agent', data: agent })}
                                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                                  title="상세보기"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAgentApplication(agent.id)}
                                  className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 transition-colors"
                                  title="삭제"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Business Inquiries */}
        {activeTab === 'business' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>접수된 비즈니스 제휴 / 문의 목록</span>
            </h2>
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-400 text-xs font-semibold uppercase">
                    <tr>
                      <th className="p-4">접수일시</th>
                      <th className="p-4">문의자/회사명</th>
                      <th className="p-4">연락처</th>
                      <th className="p-4">이메일</th>
                      <th className="p-4">첨부 제안서 목록</th>
                      <th className="p-4 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-500">
                          접수된 비즈니스 문의가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => {
                        const fileList = parseFilesList(inq);
                        return (
                          <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 text-xs text-gray-400">{new Date(inq.created_at).toLocaleString('ko-KR')}</td>
                            <td className="p-4 font-bold text-white">{inq.name}</td>
                            <td className="p-4 text-cyan-300">{inq.phone}</td>
                            <td className="p-4">{inq.email}</td>
                            <td className="p-4">
                              {fileList.length > 0 ? (
                                <div className="flex flex-col gap-1.5">
                                  {fileList.map((f: any, idx: number) => (
                                    <a
                                      key={idx}
                                      href={getDownloadUrl(f.url, f.name)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 underline font-semibold"
                                    >
                                      <FileDown className="w-3.5 h-3.5" />
                                      <span className="max-w-[160px] truncate">{f.name || `제안서 ${idx + 1}`}</span>
                                    </a>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-gray-500 text-xs">-</span>
                              )}
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setSelectedItem({ type: 'business', data: inq })}
                                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                                  title="상세보기"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 transition-colors"
                                  title="삭제"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Insights CMS */}
        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Form */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 h-fit">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>새 인사이트 게시글 작성</span>
              </h2>
              <form onSubmit={handleCreateInsight} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">제목</label>
                  <input
                    type="text"
                    required
                    value={newInsight.title}
                    onChange={(e) => setNewInsight({ ...newInsight, title: e.target.value })}
                    placeholder="인사이트 게시글 제목"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">카테고리</label>
                  <input
                    type="text"
                    value={newInsight.category}
                    onChange={(e) => setNewInsight({ ...newInsight, category: e.target.value })}
                    placeholder="예: 트렌드, 브랜딩, MCN"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">요약 설명 (Excerpt)</label>
                  <input
                    type="text"
                    value={newInsight.excerpt}
                    onChange={(e) => setNewInsight({ ...newInsight, excerpt: e.target.value })}
                    placeholder="목록에 노출될 간단한 대표 한 줄 요약"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">본문 내용 (WYSIWYG 실시간 비주얼 에디터)</label>
                  <VisualRichTextEditor
                    value={newInsight.content}
                    onChange={(val) => setNewInsight({ ...newInsight, content: val })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">대표 썸네일 이미지 파일</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setInsightFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg"
                >
                  {loading ? '등록 중...' : '인사이트 등록하기'}
                </button>
              </form>
            </div>

            {/* List & Edit Trigger */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-white">등록된 인사이트 목록 ({insights.length})</h2>
              <div className="space-y-3">
                {insights.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 truncate">
                      {item.thumbnail && (
                        <img src={getDisplayUrl(item.thumbnail)} alt={item.title} className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0" />
                      )}
                      <div className="truncate">
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">{item.category}</span>
                        <h3 className="font-bold text-white text-sm truncate mt-1">{item.title}</h3>
                        <p className="text-xs text-gray-400 truncate">{item.excerpt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditInsightModal({ ...item })}
                        className="px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 font-bold text-xs flex items-center gap-1 border border-cyan-500/30"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>수정</span>
                      </button>
                      <button
                        onClick={() => handleDeleteInsight(item.id)}
                        className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Notices CMS */}
        {activeTab === 'notices' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 h-fit">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>새 공지사항 작성</span>
              </h2>
              <form onSubmit={handleCreateNotice} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">공지 제목</label>
                  <input
                    type="text"
                    required
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    placeholder="공지사항 제목"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">공지 내용 (WYSIWYG 실시간 비주얼 에디터)</label>
                  <VisualRichTextEditor
                    value={newNotice.content}
                    onChange={(val) => setNewNotice({ ...newNotice, content: val })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg"
                >
                  {loading ? '등록 중...' : '공지사항 등록하기'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-white">등록된 공지사항 목록 ({notices.length})</h2>
              <div className="space-y-3">
                {notices.map((notice) => (
                  <div key={notice.id} className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-white text-sm">{notice.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{new Date(notice.created_at).toLocaleDateString('ko-KR')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditNoticeModal({ ...notice })}
                        className="px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 font-bold text-xs flex items-center gap-1 border border-cyan-500/30"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>수정</span>
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(notice.id)}
                        className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: FAQs CMS */}
        {activeTab === 'faqs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 h-fit">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>새 FAQ 항목 작성</span>
              </h2>
              <form onSubmit={handleCreateFaq} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">카테고리</label>
                  <input
                    type="text"
                    value={newFaq.category}
                    onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                    placeholder="예: 지원관련, 계약관련, 정산"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">질문 (Question)</label>
                  <input
                    type="text"
                    required
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    placeholder="자주 묻는 질문 항목"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">답변 (WYSIWYG 실시간 비주얼 에디터)</label>
                  <VisualRichTextEditor
                    value={newFaq.answer}
                    onChange={(val) => setNewFaq({ ...newFaq, answer: val })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg"
                >
                  {loading ? '등록 중...' : 'FAQ 등록하기'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-white">등록된 FAQ 목록 ({faqs.length})</h2>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.id} className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-4">
                    <div>
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">{faq.category}</span>
                      <h3 className="font-bold text-white text-sm mt-1">Q. {faq.question}</h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{faq.answer.replace(/<[^>]*>?/gm, '')}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditFaqModal({ ...faq })}
                        className="px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 font-bold text-xs flex items-center gap-1 border border-cyan-500/30"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>수정</span>
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Viewer Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-8 rounded-3xl border border-white/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">
                {selectedItem.type === 'creator' ? '크리에이터 지원서 상세보기' : selectedItem.type === 'agent' ? '에이전트 지원서 상세보기' : '비즈니스 제휴 문의 상세보기'}
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-gray-400 block">성명/활동명</span>
                  <span className="font-bold text-white text-base">{selectedItem.data.name}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">성별</span>
                  <span className="font-bold text-white">{selectedItem.data.gender || '-'}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">연락처</span>
                  <span className="font-bold text-cyan-300">{selectedItem.data.phone}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">이메일</span>
                  <span className="font-bold text-white">{selectedItem.data.email}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-400 block">자기소개 및 주요 경력</span>
                <p className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-200 mt-1 whitespace-pre-wrap">
                  {selectedItem.data.bio || '작성된 자기소개가 없습니다.'}
                </p>
              </div>

              {/* Attachments Section (Multiple Files Support) */}
              <div>
                <span className="text-xs text-gray-400 block mb-2 font-bold uppercase tracking-wider">
                  첨부 미디어 및 포트폴리오 파일 목록 ({parseFilesList(selectedItem.data).length}개)
                </span>
                {parseFilesList(selectedItem.data).length > 0 ? (
                  <div className="space-y-4">
                    {parseFilesList(selectedItem.data).map((f: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 truncate">
                            <Paperclip className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span className="font-bold text-cyan-300 text-sm truncate">{f.name || `첨부파일 ${idx + 1}`}</span>
                          </div>
                          <a
                            href={getDownloadUrl(f.url, f.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-md border border-cyan-400/30"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>다운로드</span>
                          </a>
                        </div>

                        {/* Media Preview inside Detail Modal */}
                        {f.url && (f.url.endsWith('.mp4') || f.url.endsWith('.webm') || (f.type && f.type.startsWith('video/'))) ? (
                          <video src={getDisplayUrl(f.url)} controls className="w-full max-h-72 rounded-xl border border-white/10 bg-black/60" />
                        ) : f.url && (f.url.endsWith('.jpg') || f.url.endsWith('.jpeg') || f.url.endsWith('.png') || f.url.endsWith('.webp') || f.url.endsWith('.gif') || f.url.includes('/api/files') || (f.type && f.type.startsWith('image/'))) ? (
                          <img src={getDisplayUrl(f.url)} alt={f.name} className="w-full max-h-72 object-contain rounded-xl border border-white/10 bg-black/40" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 text-xs">첨부된 파일이 없습니다.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insight Edit Modal */}
      {editInsightModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-8 rounded-3xl border border-white/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">인사이트 게시글 수정</h3>
              <button onClick={() => setEditInsightModal(null)} className="p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateInsight} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">제목</label>
                <input
                  type="text"
                  required
                  value={editInsightModal.title}
                  onChange={(e) => setEditInsightModal({ ...editInsightModal, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">카테고리</label>
                <input
                  type="text"
                  value={editInsightModal.category}
                  onChange={(e) => setEditInsightModal({ ...editInsightModal, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">요약 설명</label>
                <input
                  type="text"
                  value={editInsightModal.excerpt || ''}
                  onChange={(e) => setEditInsightModal({ ...editInsightModal, excerpt: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">본문 내용 (WYSIWYG 실시간 비주얼 에디터)</label>
                <VisualRichTextEditor
                  value={editInsightModal.content}
                  onChange={(val) => setEditInsightModal({ ...editInsightModal, content: val })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">썸네일 변경 (선택)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditInsightFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditInsightModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-gray-300 text-sm font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg"
                >
                  {loading ? '수정 저장 중...' : '인사이트 수정 저장'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notice Edit Modal */}
      {editNoticeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-8 rounded-3xl border border-white/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">공지사항 수정</h3>
              <button onClick={() => setEditNoticeModal(null)} className="p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">제목</label>
                <input
                  type="text"
                  required
                  value={editNoticeModal.title}
                  onChange={(e) => setEditNoticeModal({ ...editNoticeModal, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">내용 (WYSIWYG 실시간 비주얼 에디터)</label>
                <VisualRichTextEditor
                  value={editNoticeModal.content}
                  onChange={(val) => setEditNoticeModal({ ...editNoticeModal, content: val })}
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditNoticeModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-gray-300 text-sm font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg"
                >
                  {loading ? '수정 저장 중...' : '공지사항 수정 저장'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ Edit Modal */}
      {editFaqModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-8 rounded-3xl border border-white/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">FAQ 수정</h3>
              <button onClick={() => setEditFaqModal(null)} className="p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateFaq} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">카테고리</label>
                <input
                  type="text"
                  value={editFaqModal.category}
                  onChange={(e) => setEditFaqModal({ ...editFaqModal, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">질문</label>
                <input
                  type="text"
                  required
                  value={editFaqModal.question}
                  onChange={(e) => setEditFaqModal({ ...editFaqModal, question: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">답변 (WYSIWYG 실시간 비주얼 에디터)</label>
                <VisualRichTextEditor
                  value={editFaqModal.answer}
                  onChange={(val) => setEditFaqModal({ ...editFaqModal, answer: val })}
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditFaqModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-gray-300 text-sm font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg"
                >
                  {loading ? '수정 저장 중...' : 'FAQ 수정 저장'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/40 bg-[#0c1222] shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">관리자 비밀번호 변경</h3>
                  <p className="text-xs text-gray-400">시스템 접속 인증 비밀번호를 새롭게 설정합니다.</p>
                </div>
              </div>
              <button
                onClick={() => setPasswordModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">현재 비밀번호</label>
                <input
                  type="password"
                  required
                  value={passForm.currentPassword}
                  onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })}
                  placeholder="현재 사용 중인 비밀번호"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">새 비밀번호</label>
                <input
                  type="password"
                  required
                  value={passForm.newPassword}
                  onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                  placeholder="변경할 새 비밀번호"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">새 비밀번호 확인</label>
                <input
                  type="password"
                  required
                  value={passForm.confirmPassword}
                  onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                  placeholder="새 비밀번호 다시 입력"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-gray-300 text-sm font-bold hover:bg-white/20"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:opacity-90 text-white font-bold text-sm shadow-lg disabled:opacity-50"
                >
                  {loading ? '변경 중...' : '비밀번호 변경 완료'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
