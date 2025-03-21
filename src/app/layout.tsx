import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2'
});

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
      <body className={`text-black ${pretendard.className} antialiased`}>{children}</body>
    </html>
  );
}
