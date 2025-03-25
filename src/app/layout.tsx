import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import TQProvider from '@/lib/providers/TQProvider';
import Script from 'next/script';
import { KakaoType } from '@/types/common.type';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2'
});

declare global {
  interface Window {
    Kakao: KakaoType;
  }
}

export const metadata: Metadata = {
  title: 'DoGather',
  description: '습관 형성 챌린지 플랫폼'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`text-black ${pretendard.className} antialiased`}>
        <TQProvider>{children}</TQProvider>
      </body>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" />
    </html>
  );
}
