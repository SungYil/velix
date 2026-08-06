import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingMenu from '@/components/FloatingMenu';

export const metadata: Metadata = {
  title: 'VelixENT | (주)벨릭스엔터테인먼트 - 차세대 MCN & 크리에이터 그룹',
  description: 'VelixENT는 차세대 1인 미디어 및 라이브 크리에이터 브랜딩을 선도하는 프리미엄 엔터테인먼트 그룹입니다.',
  openGraph: {
    title: 'VelixENT (주)벨릭스엔터테인먼트',
    description: '차세대 1인 미디어 및 라이브 크리에이터 브랜딩을 선도하는 프리미엄 MCN 그룹',
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
      <body className="antialiased selection:bg-purple-600 selection:text-white">
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
