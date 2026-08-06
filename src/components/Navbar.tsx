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
        { label: '조직도', href: '/velixent/org' },
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
        scrolled ? 'glass-panel py-3 border-b border-white/10 shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" prefetch={false} className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-pink-500 to-amber-400 flex items-center justify-center font-black text-white text-lg shadow-lg group-hover:scale-105 transition-transform">
              V
            </span>
            <span className="text-2xl font-black tracking-tight text-white group-hover:text-purple-400 transition-colors">
              Velix<span className="gradient-text font-bold">ENT</span>
            </span>
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
                  className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    activeDropdown === menu.key ? 'text-purple-400 font-bold' : 'text-gray-200 hover:text-purple-400'
                  }`}
                >
                  <span>{menu.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === menu.key ? 'rotate-180 text-purple-400' : 'opacity-70'}`} />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === menu.key && (
                  <div
                    className="absolute top-full left-0 pt-2 w-48 z-50"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="rounded-2xl glass-panel p-2 shadow-2xl border border-white/15 animate-in fade-in slide-in-from-top-2 duration-200 bg-black/90 backdrop-blur-xl">
                      {menu.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          prefetch={false}
                          onClick={() => setActiveDropdown(null)}
                          className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            pathname === item.href
                              ? 'bg-purple-600/40 text-purple-300 font-bold'
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
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-purple-600/20 text-gray-200 hover:text-white border border-purple-500/30 text-sm font-medium transition-all group"
            >
              <Phone className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span>대표전화: 02-555-0199</span>
            </a>

            <Link
              href="/admin"
              prefetch={false}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>관리자</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="tel:025550199"
              className="p-2 rounded-xl glass-panel text-purple-400 hover:text-white"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl glass-panel text-gray-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 py-6 mt-3 space-y-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-300 bg-black/95">
          {navLinks.map((menu) => (
            <div key={menu.key} className="space-y-2">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider px-2">
                {menu.name}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {menu.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl text-sm font-medium ${
                      pathname === item.href
                        ? 'bg-purple-600/30 text-purple-300 font-bold'
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
              className="flex-1 text-center py-3 rounded-xl bg-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              대표전화 연결 (02-555-0199)
            </a>
            <Link
              href="/admin"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="ml-2 px-4 py-3 rounded-xl bg-white/10 text-gray-300 hover:text-white text-sm font-medium"
            >
              관리자
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
