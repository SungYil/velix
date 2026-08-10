'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Phone, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    {
      name: 'VelixENT',
      key: 'velixent',
      items: [
        { label: '회사소개', href: '/velixent/about' },
        { label: '인삿말', href: '/velixent/greeting' },
        { label: '오시는길', href: '/velixent/location' },
      ],
    },
    {
      name: '크리에이터',
      key: 'creator',
      items: [
        { label: '지원혜택', href: '/creator/benefits' },
        { label: '지원하기', href: '/creator/apply' },
      ],
    },
    {
      name: '사업영역',
      key: 'business',
      items: [
        { label: '사업소개', href: '/business/intro' },
        { label: '비즈니스 문의', href: '/business/inquire' },
        { label: '에이전트 지원', href: '/business/agent' },
      ],
    },
    {
      name: '커뮤니티',
      key: 'community',
      items: [
        { label: '인사이트', href: '/community/insights' },
        { label: '공지사항', href: '/community/notices' },
        { label: '자주묻는질문', href: '/community/faqs' },
      ],
    },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-panel py-3 border-b border-cyan-500/20 shadow-2xl bg-[#060913]/90' : 'bg-gradient-to-b from-[#060913]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" prefetch={false} className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="Velix Media Logo"
              className="h-10 w-auto object-contain rounded-xl shadow-lg border border-cyan-500/30 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors leading-none">
                VELIX<span className="gradient-text font-black ml-1">MEDIA</span>
              </span>
              <span className="text-[9px] font-extrabold tracking-widest text-cyan-400/80 uppercase mt-0.5">
                Entertainment Group
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((menu) => (
              <div
                key={menu.key}
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown(menu.key)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === menu.key ? null : menu.key)}
                  className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${
                    activeDropdown === menu.key ? 'text-cyan-400 font-extrabold' : 'text-gray-200 hover:text-cyan-400'
                  }`}
                >
                  <span>{menu.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === menu.key ? 'rotate-180 text-cyan-400' : 'opacity-70'}`} />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === menu.key && (
                  <div
                    className="absolute top-full left-0 pt-2 w-48 z-50"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="rounded-2xl glass-panel p-2 shadow-2xl border border-cyan-500/30 animate-in fade-in slide-in-from-top-2 duration-200 bg-[#080e1e]/95 backdrop-blur-xl">
                      {menu.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          prefetch={false}
                          onClick={() => setActiveDropdown(null)}
                          className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                            pathname === item.href
                              ? 'bg-blue-600/40 text-cyan-300 border border-cyan-500/30'
                              : 'text-gray-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Header Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Phone Call Link Button */}
            <a
              href="tel:025550199"
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-cyan-500/20 text-gray-200 hover:text-white border border-cyan-500/30 text-sm font-semibold transition-all group"
            >
              <Phone className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>대표전화: 02-555-0199</span>
            </a>

            <Link
              href="/admin"
              prefetch={false}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-bold shadow-lg shadow-blue-600/40 transition-all hover:scale-105 border border-cyan-400/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>관리자</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="tel:025550199"
              className="p-2 rounded-xl glass-panel text-cyan-400 hover:text-white border border-cyan-500/30"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl glass-panel text-gray-200 hover:text-white border border-cyan-500/30"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-cyan-500/30 px-4 py-6 mt-3 space-y-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-300 bg-[#060913]/98">
          {navLinks.map((menu) => (
            <div key={menu.key} className="space-y-2">
              <div className="text-xs font-black text-cyan-400 uppercase tracking-wider px-2">
                {menu.name}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {menu.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl text-sm font-semibold ${
                      pathname === item.href
                        ? 'bg-blue-600/40 text-cyan-300 font-bold border border-cyan-500/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <a
              href="tel:025550199"
              className="flex-1 text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              대표전화 연결 (02-555-0199)
            </a>
            <Link
              href="/admin"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="ml-2 px-4 py-3 rounded-xl bg-white/10 text-gray-300 hover:text-white text-sm font-bold"
            >
              관리자
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
