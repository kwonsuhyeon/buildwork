import type { Metadata } from "next"
import Link from "next/link"
import { getInsights } from "@/lib/notion"
import HeroSection from "@/components/sections/HeroSection"
import ContentCard from "@/components/sections/ContentCard"

export const revalidate = 60

export const metadata: Metadata = {
  title: "buildwork — AI 인사이트와 실무 지식",
  description: "AI로 더 편하게, 더 쉽게, 가치있는 일에 집중할 수 있도록 도와준다",
}

const SERVICES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "AI 인사이트",
    description: "AI 트렌드와 활용 노하우를 공유합니다. 실무에서 바로 활용 가능한 인사이트를 제공합니다.",
    href: "/insights",
    label: "인사이트 보기",
    accentColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "강의자료",
    description: "실무 중심의 강의자료를 제공합니다. Java, Spring, React 웹개발부터 AI 활용까지.",
    href: "/resources",
    label: "강의자료 보기",
    accentColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: "큐레이션",
    description: "유용한 외부 리소스, 도구, 아티클을 엄선하여 공유합니다.",
    href: "/curation",
    label: "큐레이션 보기",
    accentColor: "text-amber-500",
    bgColor: "bg-amber-50",
  },
]

export default async function HomePage() {
  const insights = await getInsights()
  const recentInsights = insights.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Services Section */}
      <section className="bg-white py-20" aria-labelledby="services-heading">
        <div className="section-container">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500 mb-2">
              무엇을 제공하나요
            </p>
            <h2
              id="services-heading"
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1a3a6b] to-[#1a7a6b]">BuildWork</span>가 하는 일
            </h2>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="group rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-card hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`inline-flex items-center justify-center rounded-xl p-3 ${service.bgColor} ${service.accentColor} mb-5`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-1 text-sm font-medium ${service.accentColor} hover:opacity-80 transition-opacity`}
                >
                  {service.label}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Insights Section */}
      <section className="bg-slate-50 py-20" aria-labelledby="insights-heading">
        <div className="section-container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500 mb-2">
                최신 콘텐츠
              </p>
              <h2
                id="insights-heading"
                className="text-2xl font-bold text-slate-900 sm:text-3xl"
              >
                최신 AI 인사이트
              </h2>
            </div>
            <Link
              href="/insights"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              전체 보기
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {recentInsights.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {recentInsights.map((insight) => (
                <ContentCard key={insight.id} insight={insight} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 py-20 text-center">
              <p className="text-slate-400">준비 중입니다. 곧 인사이트가 게시됩니다.</p>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link href="/insights" className="btn-outline btn-md">
              전체 보기
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20" aria-labelledby="cta-heading">
        <div className="section-container text-center">
          <div className="mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-900/30 px-4 py-1.5 text-sm text-emerald-400 mb-6">
              BuildWork 소개
            </div>
            <h2
              id="cta-heading"
              className="text-2xl font-bold text-white sm:text-3xl text-balance"
            >
              당신의 일하는 방식, AI로 다시 설계하세요
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              현장에서 검증된 인사이트, 바로 쓸 수 있는 강의자료, 엄선된 AI 큐레이션까지.
              <strong className="text-white"> BuildWork</strong>에서 시작하세요.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/about" className="btn-primary btn-lg w-full sm:w-auto">
                더 알아보기
              </Link>
              <a
                href="mailto:hohoho3060@naver.com"
                className="btn-dark btn-lg w-full sm:w-auto"
              >
                문의하기
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
