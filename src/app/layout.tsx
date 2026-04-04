import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "buildwork",
    template: "%s | buildwork",
  },
  description: "AI로 더 편하게, 더 쉽게, 가치있는 일에 집중할 수 있도록 도와준다",
  keywords: ["AI", "인공지능", "교육", "강의", "웹개발", "buildwork"],
  authors: [{ name: "권수현", url: "mailto:hohoho3060@naver.com" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "buildwork",
    title: "buildwork",
    description: "AI로 더 편하게, 더 쉽게, 가치있는 일에 집중할 수 있도록 도와준다",
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
