import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingMenu from '@/components/FloatingMenu';

export const metadata: Metadata = {
  title: 'VelixMEDIA | (주)벨릭스미디어 - 차세대 MCN & 크리에이터 그룹',
  description: 'VelixMEDIA는 차세대 1인 미디어 및 라이브 크리에이터 브랜딩을 선도하는 프리미엄 엔터테인먼트 그룹입니다.',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'VelixMEDIA (주)벨릭스미디어',
    description: '차세대 1인 미디어 및 라이브 크리에이터 브랜딩을 선도하는 프리미엄 MCN 그룹',
    images: [{ url: '/logo.png' }],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <FloatingMenu />
      </body>
    </html>
  );
}
