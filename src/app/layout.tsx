import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "BuildWork",
    template: "%s | BuildWork",
  },
  description: "교육과 연구를 위한 데이터 분석, 시각화, AI 강의",
  keywords: ["데이터 분석", "데이터 시각화", "대시보드", "AI", "인공지능", "교육", "강의", "BuildWork"],
  authors: [{ name: "권수현", url: "mailto:hohoho3060@naver.com" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "BuildWork",
    title: "BuildWork",
    description: "교육과 연구를 위한 데이터 분석, 시각화, AI 강의",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {/* Pretendard font via CDN */}
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col bg-white">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
